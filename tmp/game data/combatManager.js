"use strict";
const TICK_INTERVAL = 50;
class CombatManager extends BaseManager {
    constructor() {
        super();
        this.player = new Player(this);
        this.enemy = new Enemy(MONSTERS[0],this);
        this.areaData = combatAreas[0];
        this.dungeonProgress = 0;
        this.selectedMonster = -1;
        this.dropWeightCache = new Map();
        this.bank = new BankHelper(this);
        this.loot = new CombatLoot(16);
        this.slayerTask = new SlayerTask(this.player);
        this.paused = false;
        this.itmMonsters = MONSTERS.filter((monster)=>{
            const blackList = [134, 135, 136];
            const combatLevel = getMonsterCombatLevel(monster.id);
            return (combatLevel >= 165 && combatLevel <= 677 && !blackList.includes(monster.id));
        }
        ).map(monster=>monster.id);
        this.openCombatAreaMenu = 'None';
        console.log('Combat Manager Built...');
    }
    get isFightingITMBoss() {
        const itm = DUNGEONS[CONSTANTS.dungeon.Into_the_Mist];
        return (this.areaData === itm && this.dungeonProgress > (itm.monsters.length - 4));
    }
    get onSlayerTask() {
        return this.slayerTask.active && this.slayerTask.monster.id === this.selectedMonster && this.areaType !== 'Dungeon' && this.areaType !== 'None';
    }
    get canInteruptAttacks() {
        return this.fightInProgress && !this.paused;
    }
    get areaRequirements() {
        return this.areaData.entryRequirements;
    }
    get areaModifiers() {
        const modifiers = {};
        const areaData = this.areaData;
        if (this.areaType !== 'None' && areaData.type === 'Slayer' && areaData.areaEffect && !(this.player.attackType === 'magic' && areaData.id === 6)) {
            modifiers[areaData.areaEffectModifier] = this.player.calculateAreaEffectValue(areaData.areaEffectValue);
        }
        return modifiers;
    }
    initialize() {
        this.slayerTask.renderRequired = true;
        this.slayerTask.renderNewButton = true;
        super.initialize();
    }
    tick() {
        this.slayerTask.tick();
        super.tick();
    }
    runCombat() {
        if (this.isInCombat)
            offline.timestamp = new Date().getTime();
        super.runCombat();
    }
    render() {
        super.render();
        this.loot.render();
        if (this.rendersRequired.dungeonCompletion)
            this.renderDungeonCompletion();
        this.slayerTask.render();
        this.renderPause();
    }
    renderPause() {
        if (this.rendersRequired.pause) {
            if (this.paused) {
                $('#combat-pause-container').removeClass('d-none');
            } else {
                $('#combat-pause-container').addClass('d-none');
            }
        }
        this.rendersRequired.pause = false;
    }
    renderLocation() {
        let floorText = '';
        let countText = '';
        let effectText = '';
        let areaName = 'No Monster Selected';
        let areaMedia = unknownArea.media;
        if (this.areaType !== 'None') {
            areaMedia = this.areaData.media;
            areaName = this.areaData.name;
            switch (this.areaData.type) {
            case 'Dungeon':
                if (this.areaData.floors !== undefined) {
                    let floorCount = 0;
                    let floor = 0;
                    for (let i = 0; i < this.areaData.floors.length; i++) {
                        floorCount += this.areaData.floors[i];
                        floor++;
                        if (floorCount > this.dungeonProgress) {
                            floorCount -= this.areaData.floors[i];
                            break;
                        }
                    }
                    floorText = ` - Floor (${floor} / ${this.areaData.floors.length})`;
                    countText = `(${this.dungeonProgress - floorCount + 1} / ${this.areaData.floors[floor - 1]})`;
                } else {
                    countText = `(${this.dungeonProgress + 1} / ${this.areaData.monsters.length})`;
                }
                break;
            case 'Slayer':
                if (this.areaData.areaEffect) {
                    effectText = this.areaData.areaEffectDescription;
                    this.locationElements.areaEffect.classList.add('text-danger');
                    this.locationElements.areaEffect.classList.remove('text-success');
                } else {
                    effectText = 'No Area Effect';
                    this.locationElements.areaEffect.classList.remove('text-danger');
                    this.locationElements.areaEffect.classList.add('text-success');
                }
                break;
            }
        }
        this.locationElements.name.textContent = areaName;
        this.locationElements.floorCount.textContent = floorText;
        this.locationElements.count.textContent = countText;
        this.locationElements.areaEffect.textContent = effectText;
        this.locationElements.image.src = areaMedia;
        this.rendersRequired.location = false;
    }
    renderDungeonCompletion() {
        this.player.rendersRequired.equipment = true;
        updateSpellbook('ancient');
        updateShop('godUpgrades');
        updateAreaRequirements();
        checkForItemsToAddToBank();
        this.rendersRequired.dungeonCompletion = false;
    }
    onPlayerDeath() {
        super.onPlayerDeath();
        gloveCheck();
        if (GAMEMODES[currentGamemode].isPermaDeath && !isGolbinRaid) {
            sendDiscordEvent(0, this.enemy.data.id);
            if (connectedToSteam)
                unlockSteamAchievement('NEW_ACHIEVEMENT_2_29', 61);
            resetAccountData();
        }
    }
    onEnemyDeath() {
        var _a;
        (_a = this.rendersRequired).completionLog || (_a.completionLog = monsterStats[this.enemy.data.id].stats[2] === 0);
        let stopCombat = false;
        this.player.trackWeaponStat(Stats.EnemiesKilled);
        this.addCombatStat(0);
        this.player.rewardGPForKill();
        if (this.areaData.type === 'Dungeon') {
            this.dungeonProgress++;
            this.rendersRequired.location = true;
            if (this.areaData.dropBones)
                this.dropEnemyBones();
            if (this.dungeonProgress === this.areaData.monsters.length) {
                this.dungeonProgress = 0;
                const lootQty = rollPercentage(this.player.modifiers.combatLootDoubleChance) ? 2 : 1;
                this.areaData.rewards.forEach((itemID)=>{
                    this.bank.addItem(itemID, lootQty);
                }
                );
                this.dropEnemyGP();
                this.dropSignetHalfB();
                dungeonCompleteCount[this.areaData.id]++;
                rollForPetDungeonPet(this.areaData.petID, this.areaData.id);
                this.rendersRequired.dungeonCompletion = true;
                if (this.player.modifiers.bonusCoalOnDungeonCompletion) {
                    if (rollPercentage(1))
                        this.bank.addItem(CONSTANTS.item.Coal_Ore, this.player.modifiers.bonusCoalOnDungeonCompletion);
                }
                if (!(autoRestartDungeon && this.areaData.id !== CONSTANTS.dungeon.Into_the_Mist)) {
                    activateTutorialTip(6);
                    this.loot.lootAll();
                    stopCombat = true;
                    addModalToQueue({
                        title: "Dungeon Complete!",
                        text: "Well Done! You beat the dungeon. A reward has been added to your bank.",
                        imageUrl: "assets/media/skills/combat/dungeon.svg",
                        imageWidth: 64,
                        imageHeight: 64,
                        imageAlt: "Dungeon Complete",
                    });
                }
            }
        } else {
            this.rewardForEnemyDeath();
        }
        return super.onEnemyDeath() || stopCombat;
    }
    rewardForEnemyDeath() {
        if (this.areaData === slayerAreas[9])
            rollForPet(22);
        if (this.areaData === slayerAreas[10])
            rollForPet(23);
        this.dropEnemyBones();
        this.dropSignetHalfB();
        this.dropEnemyLoot();
        this.dropEnemyGP();
        let slayerXPReward = 0;
        if (this.areaType === 'Slayer') {
            slayerXPReward += this.enemy.stats.maxHitpoints / numberMultiplier / 2;
        }
        if (this.onSlayerTask) {
            this.slayerTask.addKill();
            this.player.rewardSlayerCoins();
            slayerXPReward += this.enemy.stats.maxHitpoints / numberMultiplier;
        }
        if (slayerXPReward > 0)
            this.player.addXP(CONSTANTS.skill.Slayer, slayerXPReward);
    }
    dropEnemyLoot() {
        const monster = this.enemy.data;
        const table = monster.lootTable;
        if (rollPercentage(monster.lootChance)) {
            let totalWeight = this.dropWeightCache.get(table);
            if (totalWeight === undefined) {
                totalWeight = table.reduce((prev,loot)=>prev + loot[1], 0);
                this.dropWeightCache.set(table, totalWeight);
            }
            const dropRoll = Math.floor(Math.random() * totalWeight);
            let itemWeight = 0;
            const lootIndex = table.findIndex((loot)=>{
                itemWeight += loot[1];
                return dropRoll < itemWeight;
            }
            );
            let itemID = table[lootIndex][0];
            let itemQty = rollInteger(1, table[lootIndex][2]);
            let item = items[itemID];
            if (isSeedItem(item) && item.tier === 'Herb') {
                this.player.consumePotionCharge('HerbSeedDrop');
                if (rollPercentage(this.player.modifiers.increasedChanceToConvertSeedDrops)) {
                    itemID = item.grownItemID;
                    item = items[itemID];
                    itemQty += 3;
                }
            }
            if (rollPercentage(this.player.modifiers.combatLootDoubleChance))
                itemQty *= 2;
            if (!(this.player.modifiers.autoLooting && this.bank.addItem(itemID, itemQty))) {
                this.loot.add(itemID, itemQty, false);
            }
        }
    }
    dropSignetHalfB() {
        const chance = getMonsterCombatLevel(this.enemy.data.id) / 5000;
        if (rollPercentage(chance)) {
            let itemID = CONSTANTS.item.Gold_Topaz_Ring;
            if (this.player.modifiers.allowSignetDrops)
                itemID = CONSTANTS.item.Signet_Ring_Half_B;
            this.bank.addItem(itemID, 1);
        }
    }
    dropEnemyBones() {
        var _a;
        const monster = this.enemy.data;
        if (monster.bones !== -1) {
            let itemQty = (_a = monster.boneQty) !== null && _a !== void 0 ? _a : 1;
            if (rollPercentage(this.player.modifiers.combatLootDoubleChance))
                itemQty *= 2;
            const item = items[monster.bones];
            if (item.prayerPoints !== undefined && this.player.modifiers.autoBurying > 0) {
                this.player.addPrayerPoints(applyModifier(itemQty * item.prayerPoints, this.player.modifiers.autoBurying));
            } else if (!(this.player.modifiers.autoLooting && this.bank.addItem(monster.bones, itemQty))) {
                this.loot.add(monster.bones, itemQty, true);
            }
        }
    }
    dropEnemyGP() {
        const monster = this.enemy.data;
        let gpToAdd = rollInteger(...monster.dropCoins);
        gpToAdd += this.player.modifiers.increasedGPFromMonstersFlat - this.player.modifiers.decreasedGPFromMonstersFlat;
        let gpModifier = this.player.modifiers.increasedCombatGP;
        if (this.onSlayerTask)
            gpModifier += this.player.modifiers.summoningSynergy_0_12;
        if (this.enemy.isBurning)
            gpModifier += this.player.modifiers.summoningSynergy_0_15;
        gpToAdd = applyModifier(gpToAdd, gpModifier);
        this.player.addGP(gpToAdd);
    }
    selectMonster(monsterID, areaData) {
        if (!checkRequirements(areaData.entryRequirements, true, 'fight this monster.')) {
            return;
        }
        this.preSelection();
        this.areaType = areaData.type;
        this.areaData = areaData;
        this.selectedMonster = monsterID;
        this.onSelection();
    }
    selectDungeon(dungeonID) {
        if (!checkRequirements(DUNGEONS[dungeonID].entryRequirements, true, 'enter this dungeon.')) {
            return;
        }
        this.preSelection();
        this.areaType = 'Dungeon';
        this.areaData = DUNGEONS[dungeonID];
        this.dungeonProgress = 0;
        this.onSelection();
    }
    preSelection() {
        idleChecker(CONSTANTS.skill.Hitpoints);
        this.stopCombat(true, true);
        offline.skill = CONSTANTS.skill.Hitpoints;
        offline.timestamp = new Date().getTime();
    }
    stopCombat(fled=true, areaChange=false) {
        super.stopCombat(fled);
        this.loot.removeAll();
        this.areaType = 'None';
        if (this.enemy.state === 'Alive' && fled) {
            this.addMonsterStat(9);
        }
        if (this.paused) {
            this.rendersRequired.pause = true;
            this.paused = false;
        }
        clearOffline(!areaChange && !loadingOfflineProgress);
    }
    loadNextEnemy() {
        let nextEnemyID;
        switch (this.areaData.type) {
        case 'Combat':
        case 'Slayer':
            nextEnemyID = this.selectedMonster;
            break;
        case 'Dungeon':
            nextEnemyID = this.areaData.monsters[this.dungeonProgress];
            break;
        }
        if (nextEnemyID === -1) {
            nextEnemyID = this.itmMonsters[rollInteger(0, this.itmMonsters.length - 1)];
        }
        this.selectedMonster = nextEnemyID;
        super.loadNextEnemy();
    }
    createNewEnemy() {
        this.enemy = new Enemy(MONSTERS[this.selectedMonster],this);
        this.enemy.isAfflicted = (this.areaData === DUNGEONS[CONSTANTS.dungeon.Into_the_Mist]);
    }
    spawnEnemy() {
        super.spawnEnemy();
        if (this.areaData === DUNGEONS[CONSTANTS.dungeon.Into_the_Mist] && this.dungeonProgress >= 20) {
            this.pauseDungeon();
        } else {
            this.startFight();
        }
    }
    pauseDungeon() {
        this.rendersRequired.pause = true;
        this.paused = true;
    }
    resumeDungeon() {
        this.rendersRequired.pause = true;
        this.startFight();
        this.paused = false;
    }
    onSelection() {
        super.onSelection();
        this.closeAreaMenu();
    }
    openAreaMenu(areaType) {
        if (areaType !== this.openCombatAreaMenu) {
            if (this.openCombatAreaMenu !== 'None')
                this.closeAreaMenu();
            if (areaType === 'Slayer' && isSkillLocked(CONSTANTS.skill.Slayer)) {
                lockedSkillAlert(CONSTANTS.skill.Slayer, 'explore this Combat Area.');
                return;
            }
            $("#combat-select-area-" + areaType).removeClass("d-none");
            $("#combat-select-" + areaType).addClass("bg-combat-menu-selected");
            this.openCombatAreaMenu = areaType;
        } else {
            this.closeAreaMenu();
        }
    }
    closeAreaMenu() {
        $("#combat-select-area-" + this.openCombatAreaMenu).addClass("d-none");
        $("#combat-select-" + this.openCombatAreaMenu).removeClass("bg-combat-menu-selected");
        this.openCombatAreaMenu = 'None';
    }
    serialize() {
        const writer = new DataWriter();
        writer.addVariableLengthChunk(super.serialize());
        writer.addLocation(this.areaData);
        writer.addNumber(this.dungeonProgress);
        writer.addNumber(this.selectedMonster);
        writer.addBool(this.paused);
        writer.addVariableLengthChunk(this.loot.serialize());
        writer.addVariableLengthChunk(this.slayerTask.serialize());
        return writer.data;
    }
    deserialize(reader, version) {
        super.deserialize(reader.getVariableLengthChunk(), version);
        this.areaData = reader.getLocation();
        this.dungeonProgress = reader.getNumber();
        this.selectedMonster = reader.getNumber();
        this.paused = reader.getBool();
        this.loot.deserialize(reader.getVariableLengthChunk(), version);
        this.slayerTask.deserialize(reader.getVariableLengthChunk(), version);
    }
    snapShotOffline() {
        const quiverID = this.player.equipment.slots.Quiver.item.id;
        let quiverQty = 0;
        if (quiverID !== -1)
            quiverQty = itemStats[quiverID].stats[Stats.AmountUsedInCombat];
        const snapshot = {
            gp: gp,
            slayercoins: this.player.slayercoins,
            prayerPoints: this.player.prayerPoints,
            experience: [...skillXP],
            levels: [...skillLevel],
            food: {
                itemID: this.player.food.currentSlot.item.id,
                qty: this.player.food.currentSlot.quantity
            },
            quiverItem: {
                itemID: quiverID,
                qty: quiverQty
            },
            summon1ID: this.player.equipment.slots.Summon1.item.id,
            summon2ID: this.player.equipment.slots.Summon2.item.id,
            bank: new Map(),
            loot: new Map(),
            monsterKills: monsterStats.map((stat)=>stat.stats[2]),
            dungeonCompletion: [...dungeonCompleteCount],
            taskCompletions: [...this.slayerTask.completion],
            summoningMarks: Object.values(summoningData.MarksDiscovered)
        };
        bank.forEach((bankItem)=>{
            snapshot.bank.set(bankItem.id, bankItem.qty);
        }
        );
        this.loot.drops.forEach((drop)=>{
            var _a;
            snapshot.loot.set(drop.item.id, ((_a = snapshot.loot.get(drop.item.id)) !== null && _a !== void 0 ? _a : 0) + drop.qty);
        }
        );
        return snapshot;
    }
    createOfflineModal(oldSnapshot, timeDiff) {
        const newSnapshot = this.snapShotOffline();
        const lostLoot = this.loot.lostLoot;
        const seconds = timeDiff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        let timeUnit = 'second';
        let timeAmount = Math.floor(seconds);
        if (hours > 1) {
            timeAmount = Math.floor(hours);
            timeUnit = 'hour';
        } else if (minutes > 1) {
            timeAmount = Math.floor(minutes);
            timeUnit = 'minute';
        }
        let timeText = `${timeAmount} ${timeUnit}${pluralS(timeAmount)}`;
        if (hours >= 12)
            timeText += '<br><small class="text-danger">(12 Hours is the maximum offline progression)</small>';
        const gpDiff = newSnapshot.gp - oldSnapshot.gp;
        const scDiff = newSnapshot.slayercoins - oldSnapshot.slayercoins;
        const ppDiff = newSnapshot.prayerPoints - oldSnapshot.prayerPoints;
        const xpGain = newSnapshot.experience.map((xp,skillID)=>Math.floor(xp - oldSnapshot.experience[skillID]));
        const levelGain = newSnapshot.levels.map((level,skillID)=>level - oldSnapshot.levels[skillID]);
        const itemsGained = new Map();
        const itemsUsed = new Map();
        const monstersKilled = newSnapshot.monsterKills.map((newCount,id)=>newCount - oldSnapshot.monsterKills[id]);
        const dungeonsCompleted = newSnapshot.dungeonCompletion.map((newCount,id)=>newCount - oldSnapshot.dungeonCompletion[id]);
        const tasksCompleted = newSnapshot.taskCompletions.map((newCount,tier)=>newCount - oldSnapshot.taskCompletions[tier]);
        const marksFound = newSnapshot.summoningMarks.map((newCount,id)=>newCount - oldSnapshot.summoningMarks[id]);
        items.forEach((item,id)=>{
            var _a, _b;
            const qtyDiff = ((_a = newSnapshot.bank.get(id)) !== null && _a !== void 0 ? _a : 0) - ((_b = oldSnapshot.bank.get(id)) !== null && _b !== void 0 ? _b : 0);
            if (qtyDiff > 0) {
                itemsGained.set(id, qtyDiff);
            } else if (qtyDiff < 0) {
                itemsUsed.set(id, qtyDiff);
            }
        }
        );
        const image = (media)=>`<img class="skill-icon-xs" src="${media}">`;
        const times = (count)=>{
            let text = 'once';
            if (count > 1)
                text = `${count} times`;
            return text;
        }
        ;
        const posSpan = (text)=>`<span class='text-success'>${text}</span>`;
        const negSpan = (text)=>`<span class='text-danger'>${text}</span>`;
        const currencyDiff = (diff,name,media)=>{
            if (diff > 0) {
                return `You earned ${posSpan(numberWithCommas(diff))} ${image(media)} ${name}`;
            } else {
                return `You spent ${negSpan(numberWithCommas(-diff))} ${image(media)} ${name}`;
            }
        }
        ;
        const outputHeaders = [];
        xpGain.forEach((gain,skillID)=>{
            if (gain > 0) {
                outputHeaders.push(`You gained <span class='text-success'>${numberWithCommas(gain)}</span> ${skillName[skillID]} XP`);
                const levelIncrease = levelGain[skillID];
                if (levelIncrease > 0) {
                    outputHeaders.push(`You leveled up ${skillName[skillID]} ${times(levelIncrease)} (${oldSnapshot.levels[skillID]}->${newSnapshot.levels[skillID]})`);
                }
            }
        }
        );
        monstersKilled.forEach((killDiff,mID)=>{
            if (killDiff > 0) {
                const monster = MONSTERS[mID];
                outputHeaders.push(`You killed ${killDiff} ${image(getMonsterMedia(monster))} ${monster.name}`);
            }
        }
        );
        dungeonsCompleted.forEach((countDiff,dID)=>{
            if (countDiff > 0) {
                const dungeon = DUNGEONS[dID];
                outputHeaders.push(`You completed ${image(dungeon.media)} ${dungeon.name} ${times(countDiff)}`);
            }
        }
        );
        tasksCompleted.forEach((taskCount,tier)=>{
            if (taskCount > 0) {
                outputHeaders.push(`You completed ${taskCount} ${SlayerTask.data[tier].display} slayer tasks`);
            }
        }
        );
        marksFound.forEach((markCount,summonID)=>{
            if (markCount > 0) {
                outputHeaders.push(`You found ${posSpan(`${markCount}`)}${image(getSummoningMarkImg(summonID))}${getSummoningMarkName(summonID)}`);
            }
        }
        );
        itemsGained.forEach((qty,itemID)=>{
            outputHeaders.push(`You gained ${posSpan(numberWithCommas(qty))} ${image(getItemMedia(itemID))} ${items[itemID].name}`);
        }
        );
        newSnapshot.loot.forEach((qty,itemID)=>{
            outputHeaders.push(`You have ${posSpan(numberWithCommas(qty))} ${image(getItemMedia(itemID))} ${items[itemID].name} to loot`);
        }
        );
        lostLoot.forEach((qty,itemID)=>{
            outputHeaders.push(`You looted ${posSpan(numberWithCommas(qty))} ${image(getItemMedia(itemID))} ${items[itemID].name}, but your lootbox was full :(`);
        }
        );
        if (gpDiff !== 0) {
            outputHeaders.push(currencyDiff(gpDiff, 'GP', `${CDNDIR}assets/media/main/coins.svg`));
        }
        if (scDiff !== 0) {
            outputHeaders.push(currencyDiff(scDiff, 'Slayer Coins', `${CDNDIR}assets/media/main/slayer_coins.svg`));
        }
        if (ppDiff !== 0) {
            outputHeaders.push(currencyDiff(ppDiff, 'Prayer Points', `${CDNDIR}assets/media/skills/prayer/prayer.svg`));
        }
        itemsUsed.forEach((qty,itemID)=>{
            outputHeaders.push(`You used ${negSpan(numberWithCommas(-qty))} ${image(getItemMedia(itemID))} ${items[itemID].name}`);
        }
        );
        if (this.player.chargesUsed.Summon1 > 0) {
            const itemID = oldSnapshot.summon1ID;
            outputHeaders.push(`You used ${negSpan(numberWithCommas(this.player.chargesUsed.Summon1))} ${image(getItemMedia(itemID))} ${items[itemID].name}`);
        }
        if (this.player.chargesUsed.Summon2 > 0) {
            const itemID = oldSnapshot.summon2ID;
            outputHeaders.push(`You used ${negSpan(numberWithCommas(this.player.chargesUsed.Summon2))} ${image(getItemMedia(itemID))} ${items[itemID].name}`);
        }
        const ammoUsed = newSnapshot.quiverItem.qty - oldSnapshot.quiverItem.qty;
        if (ammoUsed > 0) {
            const itemID = oldSnapshot.quiverItem.itemID;
            outputHeaders.push(`You used ${negSpan(numberWithCommas(ammoUsed))} ${image(getItemMedia(itemID))} ${items[itemID].name}`);
        }
        const foodEaten = oldSnapshot.food.qty - newSnapshot.food.qty;
        if (oldSnapshot.food.itemID !== -1 && foodEaten > 0) {
            outputHeaders.push(`You ate ${negSpan(numberWithCommas(foodEaten))} ${image(getItemMedia(oldSnapshot.food.itemID))} ${items[oldSnapshot.food.itemID].name}`);
        }
        let html = `<h5 class='font-w400'>You were gone for roughly ${timeText}</h5>
    <h5 class='font-w400 font-size-sm mb-1'>While you were gone:</h5>`;
        html += `<h5 class='font-w600 mb-1'>${outputHeaders.join(`</h5><h5 class='font-w600 mb-1'>`)}</h5>`;
        return html;
    }
    processOffline() {
        if (DEBUGENABLED)
            this.compareStatsWithSavedStats();
        this.player.chargesUsed.Summon1 = 0;
        this.player.chargesUsed.Summon2 = 0;
        this.loot.lostLoot.clear();
        loadingOfflineProgress = true;
        const html = '<div id="offline-modal" style="height:auto;"><small><div class="spinner-border spinner-border-sm text-primary mr-2" id="offline-progress-spinner" role="status"></div>Loading your offline progress. Please wait...</small></div>';
        const welcomeBackModal = {
            title: 'Welcome back!',
            html: html,
            imageUrl: `${CDNDIR}assets/media/skills/combat/combat.svg`,
            imageWidth: 64,
            imageHeight: 64,
            imageAlt: 'Offline',
            allowOutsideClick: false,
        };
        addModalToQueue(welcomeBackModal);
        const snapShot = this.snapShotOffline();
        this.renderCombat = false;
        const currentTime = new Date().getTime();
        if (offline.timestamp === null)
            throw new Error('Offline timestamp is null');
        let timeDiff = currentTime - offline.timestamp;
        timeDiff = Math.min(timeDiff, 43200000);
        setTimeout(()=>{
            this.runTicks(Math.floor(timeDiff / TICK_INTERVAL));
            const offlineMessage = this.createOfflineModal(snapShot, timeDiff);
            if (document.getElementById('offline-modal') !== null) {
                $('#offline-modal').html(offlineMessage);
            } else {
                welcomeBackModal.html = `<div id="offline-modal" style="height:auto;">${offlineMessage}</div>`;
            }
            this.renderCombat = true;
            loadingOfflineProgress = false;
        }
        , 0);
    }
    convertFromOldSaveFormat(saveGame) {
        var _a, _b;
        this.player.convertFromOldSaveFormat(saveGame);
        this.slayerTask.convertFromOldSaveFormat((_a = saveGame.slayerTask) !== null && _a !== void 0 ? _a : [], (_b = saveGame.slayerTaskCompletion) !== null && _b !== void 0 ? _b : defaultSaveValues.slayerTaskCompletion);
    }
    testForOffline(timeToGoBack) {
        this.stopCombatLoop();
        if (offline.timestamp !== null)
            offline.timestamp -= timeToGoBack * 60 * 60 * 1000;
        saveData('all');
        this.processOffline();
        this.startCombatLoop();
    }
    getStatsLog() {
        return {
            player: {
                stats: this.player.stats.getValueTable(),
                modifiers: this.player.modifiers.getActiveModifiers(),
            },
            enemy: {
                stats: this.enemy.stats.getValueTable(),
                modifiers: this.enemy.modifiers.getActiveModifiers(),
            }
        };
    }
    stopAndSave() {
        this.stopCombatLoop();
        this.saveStats();
        saveData();
    }
    saveStats() {
        setItem(`${key}statsLog`, this.getStatsLog());
    }
    compareStatsWithSavedStats() {
        const oldStats = getItem(`${key}statsLog`);
        if (oldStats === undefined) {
            console.log('No Saved Stats');
            return;
        }
        const curStats = this.getStatsLog();
        console.log('Comparing player stats:');
        compareNameValuePairs(curStats.player.stats, oldStats.player.stats);
        console.log('Comparing player modifiers:');
        compareNameValuePairs(curStats.player.modifiers, oldStats.player.modifiers);
        console.log('Comparing enemy stats:');
        compareNameValuePairs(curStats.enemy.stats, oldStats.enemy.stats);
        console.log('Comparing enemy modifiers:');
        compareNameValuePairs(curStats.enemy.modifiers, oldStats.enemy.modifiers);
    }
}
class Timer {
    constructor(type, action) {
        this.type = type;
        this.action = action;
        this._ticksLeft = -1;
        this._maxTicks = -1;
        this.active = false;
    }
    tick() {
        if (this.active) {
            this._ticksLeft--;
            if (this._ticksLeft === 0) {
                this.active = false;
                this.action();
            }
        }
    }
    start(time) {
        const ticks = Math.floor(time / TICK_INTERVAL);
        if (ticks < 1)
            throw new Error(`Tried to start timer: ${this.type} with invalid tick amount: ${ticks}`);
        this.active = true;
        this._maxTicks = ticks;
        this._ticksLeft = ticks;
    }
    stop() {
        this.active = false;
    }
    get isActive() {
        return this.active;
    }
    get maxTicks() {
        return this._maxTicks;
    }
    get ticksLeft() {
        return this._ticksLeft;
    }
    serialize() {
        const sData = [];
        sData.push(this._ticksLeft, this._maxTicks, this.active ? 1 : 0);
        return sData;
    }
    deserialize(sData, version) {
        this._ticksLeft = sData[0];
        this._maxTicks = sData[1];
        this.active = sData[2] === 1;
    }
}
