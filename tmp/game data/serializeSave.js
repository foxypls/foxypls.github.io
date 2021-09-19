"use strict";
const reconstructedVars = ["skillLevel", "nextLevelProgress"];
const currentSaveVersion = 3;
const numberVars = {
    0: ["firstTime", "nameChanges", "gp", "defaultPageOnLoad", "levelUpScreen", "attackStyle", "currentCombatFood", "showItemNotify", "myBankVersion", "selectedSpell", "buyQty", "sellQty", "accountGameVersion", "prayerPoints", "slayerCoins", "selectedEquipmentSet", "formatNumberSetting", "saveTimestamp", "activeAurora", "currentGamemode", "raidCoins", "agilityPassivePillarActive"],
    1: ["firstTime", "nameChanges", "gp", "defaultPageOnLoad", "levelUpScreen", "attackStyle", "currentCombatFood", "showItemNotify", "myBankVersion", "selectedSpell", "buyQty", "sellQty", "accountGameVersion", "prayerPoints", "slayerCoins", "selectedEquipmentSet", "formatNumberSetting", "saveTimestamp", "activeAurora", "currentGamemode", "raidCoins", "agilityPassivePillarActive"],
    2: ["firstTime", "nameChanges", "gp", "defaultPageOnLoad", "levelUpScreen", "attackStyle", "showItemNotify", "myBankVersion", "buyQty", "sellQty", "accountGameVersion", "formatNumberSetting", "saveTimestamp", "currentGamemode", "raidCoins", "agilityPassivePillarActive"],
    3: ["firstTime", "nameChanges", "gp", "defaultPageOnLoad", "levelUpScreen", "attackStyle", "showItemNotify", "myBankVersion", "buyQty", "sellQty", "accountGameVersion", "formatNumberSetting", "saveTimestamp", "currentGamemode", "raidCoins", "agilityPassivePillarActive"],
};
const boolVars = {
    0: ["ignoreBankFull", "continueThievingOnStun", "autoRestartDungeon", "autoSaveCloud", "darkMode", "showGPNotify", "enableAccessibility", "showEnemySkillLevels", "confirmationOnClose", "autoPotion", "showCommas", "showVirtualLevels", "secretAreaUnlocked", "showSaleNotifications", "showShopNotifications", "pauseOfflineActions", "showCombatMinibar", "showCombatMinibarCombat", "showSkillMinibar", "disableAds", "useCombinationRunes", "firstTimeLoad", "autoSlayer"],
    1: ["ignoreBankFull", "continueThievingOnStun", "autoRestartDungeon", "autoSaveCloud", "darkMode", "showGPNotify", "enableAccessibility", "showEnemySkillLevels", "confirmationOnClose", "autoPotion", "showCommas", "showVirtualLevels", "secretAreaUnlocked", "showSaleNotifications", "showShopNotifications", "pauseOfflineActions", "showCombatMinibar", "showCombatMinibarCombat", "showSkillMinibar", "disableAds", "useCombinationRunes", "firstTimeLoad", "autoSlayer"],
    2: ["ignoreBankFull", "continueThievingOnStun", "autoRestartDungeon", "autoSaveCloud", "darkMode", "showGPNotify", "enableAccessibility", "showEnemySkillLevels", "confirmationOnClose", "autoPotion", "showCommas", "showVirtualLevels", "secretAreaUnlocked", "showSaleNotifications", "showShopNotifications", "pauseOfflineActions", "showCombatMinibar", "showCombatMinibarCombat", "showSkillMinibar", "disableAds", "useCombinationRunes", "firstTimeLoad", "autoSlayer"],
    3: ["ignoreBankFull", "continueThievingOnStun", "autoRestartDungeon", "autoSaveCloud", "darkMode", "showGPNotify", "enableAccessibility", "showEnemySkillLevels", "confirmationOnClose", "autoPotion", "showCommas", "showVirtualLevels", "secretAreaUnlocked", "showSaleNotifications", "showShopNotifications", "pauseOfflineActions", "showCombatMinibar", "showCombatMinibarCombat", "showSkillMinibar", "disableAds", "useCombinationRunes", "firstTimeLoad", "autoSlayer"],
};
const oldVars = ["currentBankUpgrade", "treeMasteryData", "currentAxe", "treeCutLimit", "bankMax", "logsMastery", "fishMastery", "currentRod", "cookingMastery", "upgradedToRange", "miningOreMastery", "currentPickaxe", "smithingMastery", "thievingMastery", "farmingMastery", "currentCookingFire", "fletchingMastery", "craftingMastery", "runecraftingMastery", "itemLog", "showSkillNav", "herbloreMastery", "currentAutoEat", "equipmentSetsPurchased", "autoUseSpecialAttack", "showHPNotify", "equipmentSwapPurchased", "godUpgrade", "autoSlayerUnlocked", "xmasPresents"];
const otherVars = {
    0: ["offline", "titleNewsID", "scheduledPushNotifications", "username", "gameUpdateNotification", "randomModifiers", ],
    1: ["offline", "titleNewsID", "scheduledPushNotifications", "username", "gameUpdateNotification", "randomModifiers", "summoningData", ],
    2: ["offline", "titleNewsID", "scheduledPushNotifications", "username", "gameUpdateNotification", "summoningData", ],
    3: ["offline", "titleNewsID", "scheduledPushNotifications", "username", "gameUpdateNotification", "summoningData", ],
};
const serialVars = {
    0: ["bank", "statsGeneral", "statsWoodcutting", "statsFiremaking", "statsFishing", "statsCooking", "statsMining", "statsSmithing", "statsCombat", "statsThieving", "statsFarming", "statsFletching", "statsCrafting", "statsRunecrafting", "statsHerblore", "glovesTracker", "rockData", "herbloreBonuses", "tutorialTips", "shopItemsPurchased", "combatData", "equippedFood", "SETTINGS", "monsterStats", "petUnlocked", "skillsUnlocked", "equipmentSets", "skillXP", "dungeonCompleteCount", "selectedAttackStyle", "lockedItems", "golbinRaidStats", "slayerTask", "slayerTaskCompletion", "chosenAgilityObstacles", "agilityObstacleBuildCount", "itemsAlreadyFound", "saveStateBeforeRaid"],
    1: ["bank", "statsGeneral", "statsWoodcutting", "statsFiremaking", "statsFishing", "statsCooking", "statsMining", "statsSmithing", "statsCombat", "statsThieving", "statsFarming", "statsFletching", "statsCrafting", "statsRunecrafting", "statsHerblore", "glovesTracker", "rockData", "herbloreBonuses", "tutorialTips", "shopItemsPurchased", "combatData", "equippedFood", "SETTINGS", "monsterStats", "petUnlocked", "skillsUnlocked", "equipmentSets", "skillXP", "dungeonCompleteCount", "selectedAttackStyle", "lockedItems", "golbinRaidStats", "slayerTask", "slayerTaskCompletion", "chosenAgilityObstacles", "agilityObstacleBuildCount", "itemsAlreadyFound", "saveStateBeforeRaid"],
    2: ["bank", "statsGeneral", "statsWoodcutting", "statsFiremaking", "statsFishing", "statsCooking", "statsMining", "statsSmithing", "statsCombat", "statsThieving", "statsFarming", "statsFletching", "statsCrafting", "statsRunecrafting", "statsHerblore", "glovesTracker", "rockData", "herbloreBonuses", "tutorialTips", "shopItemsPurchased", "SETTINGS", "monsterStats", "petUnlocked", "skillsUnlocked", "skillXP", "dungeonCompleteCount", "lockedItems", "golbinRaidStats", "chosenAgilityObstacles", "agilityObstacleBuildCount", "itemsAlreadyFound"],
    3: ["bank", "statsGeneral", "statsWoodcutting", "statsFiremaking", "statsFishing", "statsCooking", "statsMining", "statsSmithing", "statsCombat", "statsThieving", "statsFarming", "statsFletching", "statsCrafting", "statsRunecrafting", "statsHerblore", "glovesTracker", "rockData", "herbloreBonuses", "tutorialTips", "shopItemsPurchased", "SETTINGS", "monsterStats", "petUnlocked", "skillsUnlocked", "skillXP", "dungeonCompleteCount", "lockedItems", "golbinRaidStats", "chosenAgilityObstacles", "agilityObstacleBuildCount", "itemsAlreadyFound"],
};
const nestedVars = {
    0: ["newFarmingAreas", "MASTERY", "golbinRaidHistory", "itemStats"],
    1: ["newFarmingAreas", "MASTERY", "golbinRaidHistory", "itemStats"],
    2: ["newFarmingAreas", "MASTERY", "golbinRaidHistory", "itemStats"],
    3: ["newFarmingAreas", "MASTERY", "golbinRaidHistory", "itemStats"],
};
function isEmptyObject(obj) {
    for (const i in obj)
        return false;
    return true;
}
const serializeItemsFound = (foundArray)=>{
    const sData = [];
    bank.forEach((bankItem)=>{
        if (!foundArray.includes(bankItem.id))
            sData.push(bankItem.id);
    }
    );
    return sData;
}
;
const serializeNumberArray = (array)=>{
    return [...array];
}
;
const deserializeNumberArray = (sData,sVersion)=>{
    return [...sData];
}
;
const serializeRaidHistory = (histories)=>{
    return histories.map((history)=>{
        const sData = [];
        sData.push(history.ammo, ...history.equipment, history.food.itemID, history.food.qty, history.kills, history.raidCoinsEarned, ...history.skillLevels, history.timestamp, history.wave);
        history.inventory.forEach((item)=>{
            sData.push(item.id, item.qty);
        }
        );
        return sData;
    }
    );
}
;
const deserializeRaidHistory = (sData,sVersion)=>{
    const golbinRaidHistory = [];
    let equipLength = Object.keys(equipmentSlotData).length;
    if (sVersion < 1) {
        equipLength = 12;
    }
    sData.forEach((subData)=>{
        const inventory = [];
        for (let i = equipLength + 13; i < subData.length; i += 2) {
            inventory.push({
                id: subData[i],
                qty: subData[i + 1],
            });
        }
        const equipment = subData.slice(1, equipLength + 1);
        if (sVersion < 1) {
            equipment.push(0, 0);
        }
        golbinRaidHistory.push({
            skillLevels: subData.slice(equipLength + 5, equipLength + 11),
            equipment: equipment,
            ammo: subData[0],
            inventory: inventory,
            food: {
                itemID: subData[equipLength + 1],
                qty: subData[equipLength + 2]
            },
            wave: subData[equipLength + 12],
            kills: subData[equipLength + 3],
            timestamp: subData[equipLength + 11],
            raidCoinsEarned: subData[equipLength + 4],
        });
    }
    );
    return golbinRaidHistory;
}
;
const serializeMastery = (mastery)=>{
    return Object.entries(mastery).map(([skillID,masteryData])=>{
        return [parseInt(skillID), masteryData.pool, ...masteryData.xp];
    }
    );
}
;
const deserializeMastery = (sData,sVersion)=>{
    const MASTERY = {};
    sData.forEach((subData)=>{
        MASTERY[subData[0]] = {
            pool: subData[1],
            xp: subData.slice(2),
        };
    }
    );
    return MASTERY;
}
;
const serializeEquipment = (sets)=>{
    const sData = [];
    sets.forEach((set)=>{
        sData.push(set.ammo, ...set.summonAmmo, ...set.equipment);
    }
    );
    return sData;
}
;
const deserializeEquipment = (sData,sVersion)=>{
    let numSlots = 14;
    const equipmentSets = [];
    switch (sVersion) {
    case 1:
        {
            for (let i = 0; i < sData.length; i += 17) {
                equipmentSets.push({
                    equipment: [...sData.slice(i + 3, i + 3 + numSlots)],
                    ammo: sData[i],
                    summonAmmo: [sData[i + 1], sData[i + 2]],
                });
            }
            break;
        }
    case 0:
        {
            numSlots = 12;
            for (let i = 0; i < sData.length; i += 13) {
                equipmentSets.push({
                    equipment: [...sData.slice(i + 1, i + 1 + numSlots), 0, 0],
                    ammo: sData[i],
                    summonAmmo: [0, 0],
                });
            }
            break;
        }
    }
    return equipmentSets;
}
;
const serializeBoolArray = (boolArray)=>{
    const sData = [];
    boolArray.forEach((value)=>{
        sData.push(value ? 1 : 0);
    }
    );
    return sData;
}
;
const deserializeBoolArray = (sData,sVersion)=>{
    return sData.map((val)=>val === 1);
}
;
const serializeMonsterStats = (stats)=>{
    const sData = [];
    stats.forEach((stat)=>{
        sData.push(...stat.stats);
    }
    );
    return sData;
}
;
const deserializeMonsterStats = (sData,sVersion)=>{
    const numStats = 10;
    const monsterStats = [];
    for (let i = 0; i < sData.length; i += numStats) {
        monsterStats.push({
            monsterID: i / numStats,
            stats: sData.slice(i, i + numStats),
        });
    }
    return monsterStats;
}
;
var Stats;
(function(Stats) {
    Stats[Stats["TimesFound"] = 0] = "TimesFound";
    Stats[Stats["TimesSold"] = 1] = "TimesSold";
    Stats[Stats["GpFromSale"] = 2] = "GpFromSale";
    Stats[Stats["TimesLostToDeath"] = 3] = "TimesLostToDeath";
    Stats[Stats["DamageTaken"] = 4] = "DamageTaken";
    Stats[Stats["DamageDealt"] = 5] = "DamageDealt";
    Stats[Stats["MissedAttacks"] = 6] = "MissedAttacks";
    Stats[Stats["TimesEaten"] = 7] = "TimesEaten";
    Stats[Stats["HealedFor"] = 8] = "HealedFor";
    Stats[Stats["TotalAttacks"] = 9] = "TotalAttacks";
    Stats[Stats["AmountUsedInCombat"] = 10] = "AmountUsedInCombat";
    Stats[Stats["TimeWaited"] = 11] = "TimeWaited";
    Stats[Stats["TimesDied"] = 12] = "TimesDied";
    Stats[Stats["TimesGrown"] = 13] = "TimesGrown";
    Stats[Stats["HarvestAmount"] = 14] = "HarvestAmount";
    Stats[Stats["EnemiesKilled"] = 15] = "EnemiesKilled";
    Stats[Stats["TimesOpened"] = 16] = "TimesOpened";
}
)(Stats || (Stats = {}));
function fixStats(stats) {
    itemStatsData.armour.items.forEach((id)=>{
        const stat = stats[id].stats;
        stat[Stats.DamageTaken] += stat[Stats.DamageDealt];
        stat[Stats.DamageDealt] = 0;
    }
    );
}
function reduceToID(predicate) {
    return (idList,item,id)=>{
        if (predicate(item))
            idList.push(id);
        return idList;
    }
    ;
}
const itemStatsData = {
    all: {
        stats: [Stats.TimesFound, Stats.TimesSold, Stats.GpFromSale],
        items: items.map((item,id)=>id),
    },
    weapon: {
        stats: [Stats.TimesLostToDeath, Stats.DamageDealt, Stats.MissedAttacks, Stats.TotalAttacks, Stats.EnemiesKilled],
        items: items.reduce(reduceToID((item)=>isEquipment(item) && item.validSlots.includes("Weapon")), []),
    },
    quiver: {
        stats: [Stats.TimesLostToDeath, Stats.DamageDealt, Stats.MissedAttacks, Stats.TotalAttacks, Stats.EnemiesKilled, Stats.AmountUsedInCombat],
        items: items.reduce(reduceToID((item)=>isEquipment(item) && item.validSlots.includes("Quiver")), []),
    },
    armour: {
        stats: [Stats.TimesLostToDeath, Stats.DamageTaken],
        items: items.reduce(reduceToID((item)=>isEquipment(item) && !item.validSlots.includes("Weapon")), []),
    },
    chests: {
        stats: [Stats.TimesOpened],
        items: items.reduce(reduceToID((item)=>{
            var _a;
            return (_a = item.canOpen) !== null && _a !== void 0 ? _a : false;
        }
        ), []),
    },
    seeds: {
        stats: [Stats.TimeWaited, Stats.TimesDied, Stats.TimesGrown],
        items: items.reduce(reduceToID((item)=>item.grownItemID !== undefined), []),
    },
    harvest: {
        stats: [Stats.HarvestAmount],
        items: items.reduce((idList,item)=>{
            if (item.grownItemID !== undefined)
                idList.push(item.grownItemID);
            return idList;
        }
        , []),
    },
    food: {
        stats: [Stats.TimesEaten, Stats.HealedFor],
        items: items.reduce(reduceToID((item)=>{
            var _a;
            return (_a = item.canEat) !== null && _a !== void 0 ? _a : false;
        }
        ), []),
    },
    rune: {
        stats: [Stats.AmountUsedInCombat],
        items: items.reduce(reduceToID((item)=>item.type === "Rune"), []),
    },
};
const itemStatTypes = ["all", "weapon", "quiver", "armour", "chests", "seeds", "harvest", "food", "rune"];
function serializeStatPortion(portion, stats) {
    const sData = [];
    portion.items.forEach((itemID)=>{
        portion.stats.forEach((statID)=>{
            sData.push(stats[itemID].stats[statID]);
        }
        );
    }
    );
    return sData;
}
function deserializeItemStatsPortion(portion, subData, stats) {
    const numStats = portion.stats.length;
    for (let i = 0; i < subData.length; i += numStats) {
        const stat = stats[portion.items[i / numStats]];
        portion.stats.forEach((statID,j)=>{
            stat.stats[statID] = subData[i + j];
        }
        );
    }
}
const serializeItemStats = (stats)=>{
    const sData = [];
    fixStats(stats);
    itemStatTypes.forEach((type)=>{
        sData.push(serializeStatPortion(itemStatsData[type], stats));
    }
    );
    return sData;
}
;
const deserializeItemStats = (sData,sVersion)=>{
    const itemStats = items.map((item,id)=>{
        return {
            itemID: id,
            stats: Array(17).fill(0),
        };
    }
    );
    itemStatTypes.forEach((type,i)=>{
        deserializeItemStatsPortion(itemStatsData[type], sData[i], itemStats);
    }
    );
    return itemStats;
}
;
const serializeSettings = (settings)=>{
    const sData = [settings.bank.bankBorder, settings.bank.currentEquipDefault ? 1 : 0, settings.bank.defaultBankSort, settings.mastery.hideMaxLevel ? 1 : 0, settings.mastery.confirmationCheckpoint ? 1 : 0, settings.general.pushNotificationOffline ? 1 : 0, settings.general.pushNotificationFarming ? 1 : 0, settings.notifications.combatStunned ? 1 : 0, settings.notifications.combatSleep ? 1 : 0, settings.notifications.summoningMark ? 1 : 0, settings.performance.disableDamageSplashes ? 1 : 0, settings.performance.disableProgressBars ? 1 : 0, settings.general.enabledOfflineCombat ? 0 : 1, settings.general.enableNeutralSpecModifiers ? 0 : 1];
    sData.push(...serializeDefaultItemTabs(settings.bank.defaultItemTab));
    return sData;
}
;
const deserializeSettings = (sData,sVersion)=>{
    let numSettings = 14;
    if (sVersion < 3)
        numSettings = 12;
    if (sVersion < 2)
        numSettings = 7;
    const newSettings = {
        bank: {
            bankBorder: sData[0],
            currentEquipDefault: sData[1] === 1,
            defaultBankSort: sData[2],
            defaultItemTab: deserializeDefaultItemTabs(sData.slice(numSettings), sVersion),
        },
        mastery: {
            hideMaxLevel: sData[3] === 1,
            confirmationCheckpoint: sData[4] === 1,
        },
        general: {
            pushNotificationOffline: sData[5] === 1,
            pushNotificationFarming: sData[6] === 1,
            enabledOfflineCombat: sVersion < 3 ? false : sData[12] === 0,
            enableNeutralSpecModifiers: sVersion < 3 ? false : sData[13] === 0,
        },
        notifications: {
            combatStunned: sVersion < 2 ? true : sData[7] === 1,
            combatSleep: sVersion < 2 ? true : sData[8] === 1,
            summoningMark: sVersion < 2 ? true : sData[9] === 1,
        },
        performance: {
            disableDamageSplashes: sVersion < 2 ? false : sData[10] === 1,
            disableProgressBars: sVersion < 2 ? false : sData[11] === 1,
        },
    };
    return newSettings;
}
;
const serializeDefaultItemTabs = (defaultTabs)=>{
    const sData = [];
    defaultTabs.forEach((item)=>{
        sData.push(item.itemID, item.tab);
    }
    );
    return sData;
}
;
const deserializeDefaultItemTabs = (sData,sVersion)=>{
    let nullCount = 0;
    let lastNull = sData.length - 1;
    for (let i = sData.length - 1; i >= 0; i--) {
        if (sData[i] === null) {
            nullCount++;
            lastNull = i;
        }
    }
    if (nullCount !== 0) {
        sData = sData.slice(nullCount, lastNull);
    }
    const defaultItemTab = [];
    for (let i = 0; i < sData.length; i += 2) {
        defaultItemTab.push({
            itemID: sData[i],
            tab: sData[i + 1],
        });
    }
    return defaultItemTab;
}
;
const serializeNumbers = (varNames)=>{
    return varNames.map((key)=>{
        const value = window[key];
        return value === null ? 0 : value;
    }
    );
}
;
const serializeBools = (varNames)=>{
    return varNames.map((key)=>{
        return window[key] ? 1 : 0;
    }
    );
}
;
const serializeBank = (bank)=>{
    const sData = [];
    bank.forEach((bankItem)=>{
        sData.push(bankItem.id, bankItem.qty, bankItem.tab);
    }
    );
    return sData;
}
;
const deserializeBank = (sData,sVersion)=>{
    const bank = [];
    for (let i = 0; i < sData.length; i += 3) {
        const id = sData[i];
        const qty = sData[i + 1];
        const tab = sData[i + 2];
        bank.push({
            id: id,
            qty: qty,
            tab: tab,
            sellsFor: items[id].sellsFor,
            locked: lockedItems.includes(id),
            stackValue: items[id].sellsFor * qty,
        });
    }
    return bank;
}
;
const serializeStats = (statVar)=>{
    return statVar.map((stat)=>{
        return stat.count;
    }
    );
}
;
function getStatDeserializer(statVar) {
    const templateVar = JSON.stringify(statVar);
    return (sData,sVersion)=>{
        const gameStat = JSON.parse(templateVar);
        sData.forEach((count,i)=>{
            gameStat[i].count = count;
        }
        );
        return gameStat;
    }
    ;
}
const deserializeStats = {
    general: getStatDeserializer(statsGeneral),
    woodcutting: getStatDeserializer(statsWoodcutting),
    firemaking: getStatDeserializer(statsFiremaking),
    fishing: getStatDeserializer(statsFishing),
    cooking: getStatDeserializer(statsCooking),
    mining: getStatDeserializer(statsMining),
    smithing: getStatDeserializer(statsSmithing),
    combat: getStatDeserializer(statsCombat),
    thieving: getStatDeserializer(statsThieving),
    farming: getStatDeserializer(statsFarming),
    fletching: getStatDeserializer(statsFletching),
    crafting: getStatDeserializer(statsCrafting),
    runecrafting: getStatDeserializer(statsRunecrafting),
    herblore: getStatDeserializer(statsHerblore),
};
const serializeGlovesTracker = (tracker)=>{
    const sData = [];
    tracker.forEach((glove)=>{
        sData.push(glove.isActive ? 1 : 0);
        sData.push(glove.remainingActions);
    }
    );
    return sData;
}
;
const deserializeGlovesTracker = (function() {
    const trackerTemplate = JSON.stringify(glovesTracker);
    return (sData,sVersion)=>{
        const newGlovesTracker = JSON.parse(trackerTemplate);
        for (let i = 0; i < sData.length; i += 2) {
            newGlovesTracker[i / 2].isActive = sData[i] === 1;
            newGlovesTracker[i / 2].remainingActions = sData[i + 1];
        }
        return newGlovesTracker;
    }
    ;
}
)();
const serializeRockData = (data)=>{
    const sData = [];
    data.forEach((rock)=>{
        sData.push(rock.maxHP);
        sData.push(rock.damage);
        sData.push(rock.depleted ? 1 : 0);
    }
    );
    return sData;
}
;
const deserializeRockData = (sData,sVersion)=>{
    const rockData = [];
    for (let i = 0; i < sData.length; i += 3) {
        rockData.push({
            maxHP: sData[i],
            damage: sData[i + 1],
            depleted: sData[i + 2] === 1,
            respawnTimer: null,
        });
    }
    return rockData;
}
;
const deserializeSlayerTask = (sData,sVersion)=>{
    const slayerTask = [];
    for (let i = 0; i < sData.length; i += 4) {
        slayerTask.push({
            monsterID: sData[i],
            count: sData[i + 1],
            tier: sData[i + 2],
            extended: sData[i + 3] === 1,
        });
    }
    return slayerTask;
}
;
const serializeFarmingAreas = (areas)=>{
    const sData = [];
    areas.forEach((area)=>{
        const subData = [];
        area.patches.forEach((patch)=>{
            subData.push(patch.seedID, patch.compost, patch.timePlanted, patch.setInterval, patch.hasGrown ? 1 : 0, patch.unlocked ? 1 : 0, patch.gloop ? 1 : 0);
        }
        );
        sData.push(subData);
    }
    );
    return sData;
}
;
const deserializeFarmingAreas = (function() {
    const areaTemplate = JSON.stringify(newFarmingAreas);
    return (sData,sVersion)=>{
        const farmingAreas = JSON.parse(areaTemplate);
        sData.forEach((subData,j)=>{
            for (let i = 0; i < subData.length; i += 7) {
                const patch = farmingAreas[j].patches[i / 7];
                patch.seedID = subData[i];
                patch.compost = subData[i + 1];
                patch.timePlanted = subData[i + 2];
                patch.setInterval = subData[i + 3];
                patch.hasGrown = subData[i + 4] === 1;
                patch.unlocked = subData[i + 5] === 1;
                patch.gloop = subData[i + 6] === 1;
            }
        }
        );
        return farmingAreas;
    }
    ;
}
)();
const serializeHerbloreBonuses = (bonuses)=>{
    const sData = [];
    potionPages.forEach((page)=>{
        var _a, _b;
        const bonus = bonuses[page];
        if (bonus !== null)
            sData.push(page, bonus.itemID, (_a = bonus.bonus[0]) !== null && _a !== void 0 ? _a : -1, (_b = bonus.bonus[1]) !== null && _b !== void 0 ? _b : -1, bonus.charges);
    }
    );
    return sData;
}
;
const deserializeHerbloreBonuses = (sData,sVersion)=>{
    const herbloreBonuses = {};
    for (let i = 0; i < sData.length; i += 5) {
        let bonus1 = sData[i + 2];
        let bonus2 = sData[i + 3];
        if (bonus1 === -1)
            bonus1 = null;
        if (bonus2 === -1)
            bonus2 = null;
        herbloreBonuses[sData[i]] = {
            itemID: sData[i + 1],
            bonus: [bonus1, bonus2],
            charges: sData[i + 4],
        };
    }
    return herbloreBonuses;
}
;
const serializeTutorialTips = (tips)=>{
    return tips.map((tip)=>(tip.activated ? 1 : 0));
}
;
const deserializeTutorialTips = (sData,sVersion)=>{
    const newTips = [];
    sData.forEach((tipActive)=>{
        newTips.push({
            activated: tipActive === 1
        });
    }
    );
    return newTips;
}
;
const serializeShopItems = (shopPurchases)=>{
    const shopCategories = Object.keys(SHOP);
    const sData = [];
    shopPurchases.forEach((purchase)=>{
        sData.push(shopCategories.findIndex((cat)=>cat === purchase.category), purchase.id, purchase.quantity);
    }
    );
    return sData;
}
;
const deserializeShopItems = (sData,sVersion)=>{
    const shopCategories = Object.keys(SHOP);
    const shopItemsPurchased = new Map();
    for (let i = 0; i < sData.length; i += 3) {
        shopItemsPurchased.set(`${shopCategories[sData[i]]}:${sData[i + 1]}`, {
            category: shopCategories[sData[i]],
            id: sData[i + 1],
            quantity: sData[i + 2],
        });
    }
    return shopItemsPurchased;
}
;
const serializeCombatData = (data)=>{
    return [data.player.hitpoints];
}
;
const deserializeCombatData = (sData,sVersion)=>{
    return {
        player: {
            hitpoints: sData[0],
        },
        enemy: {},
    };
}
;
const serailizeFood = (foods)=>{
    const sData = [];
    foods.forEach((food)=>{
        sData.push(food.itemID, food.qty);
    }
    );
    return sData;
}
;
const deserializeFood = (sData,sVersion)=>{
    const newEquippedFood = [];
    for (let i = 0; i < sData.length; i += 2) {
        newEquippedFood.push({
            itemID: sData[i],
            qty: sData[i + 1],
        });
    }
    return newEquippedFood;
}
;
function serializeVars(saveGame) {
    const serializedVars = [];
    serialVars[currentSaveVersion].forEach((key)=>{
        let sData;
        switch (key) {
        case "bank":
            sData = serializeBank(saveGame[key]);
            break;
        case "statsGeneral":
        case "statsWoodcutting":
        case "statsFiremaking":
        case "statsFishing":
        case "statsCooking":
        case "statsMining":
        case "statsSmithing":
        case "statsCombat":
        case "statsThieving":
        case "statsFarming":
        case "statsFletching":
        case "statsCrafting":
        case "statsRunecrafting":
        case "statsHerblore":
            sData = serializeStats(saveGame[key]);
            break;
        case "glovesTracker":
            sData = serializeGlovesTracker(saveGame[key]);
            break;
        case "rockData":
            sData = serializeRockData(saveGame[key]);
            break;
        case "herbloreBonuses":
            sData = serializeHerbloreBonuses(saveGame[key]);
            break;
        case "tutorialTips":
            sData = serializeTutorialTips(saveGame[key]);
            break;
        case "shopItemsPurchased":
            sData = serializeShopItems(saveGame[key]);
            break;
        case "SETTINGS":
            sData = serializeSettings(saveGame[key]);
            break;
        case "monsterStats":
            sData = serializeMonsterStats(saveGame[key]);
            break;
        case "petUnlocked":
        case "skillsUnlocked":
            sData = serializeBoolArray(saveGame[key]);
            break;
        case "skillXP":
        case "dungeonCompleteCount":
        case "lockedItems":
        case "golbinRaidStats":
        case "chosenAgilityObstacles":
        case "agilityObstacleBuildCount":
            sData = serializeNumberArray(saveGame[key]);
            break;
        case "itemsAlreadyFound":
            sData = serializeItemsFound(saveGame[key]);
            break;
        default:
            throw new Error(`Error Saving. Invalid variable for serialization: ${key}`);
        }
        serializedVars.push(sData);
    }
    );
    return serializedVars;
}
function serializeNestedVars(saveGame) {
    const nestedSData = [];
    nestedVars[currentSaveVersion].forEach((key)=>{
        let sData;
        switch (key) {
        case "MASTERY":
            sData = serializeMastery(saveGame[key]);
            break;
        case "golbinRaidHistory":
            sData = serializeRaidHistory(saveGame[key]);
            break;
        case "itemStats":
            sData = serializeItemStats(saveGame[key]);
            break;
        case "newFarmingAreas":
            sData = serializeFarmingAreas(saveGame[key]);
            break;
        default:
            throw new Error(`Error Saving. Invalid variable for nested serialization: ${key}`);
        }
        nestedSData.push(sData);
    }
    );
    return nestedSData;
}
function packageSave(saveGame) {
    return {
        v: currentSaveVersion,
        n: serializeNumbers(numberVars[currentSaveVersion]),
        b: serializeBools(boolVars[currentSaveVersion]),
        s: serializeVars(saveGame),
        ns: serializeNestedVars(saveGame),
        o: otherVars[currentSaveVersion].map((key)=>{
            return JSON.stringify(saveGame[key]);
        }
        ),
        cd: combatManager.serialize(),
    };
}
function getCompressedSaveString() {
    const raw = JSON.stringify(packageSave(getSaveGameFromWindow()));
    const compressed = btoa(pako.gzip(raw, {
        to: "string"
    }));
    return compressed;
}
function decompressSaveString(saveString) {
    const toUnpack = atob(saveString);
    let raw;
    try {
        raw = pako.ungzip(atob(saveString), {
            to: "string"
        });
    } catch (_a) {
        raw = toUnpack;
    }
    return JSON.parse(raw);
}
function getSaveFromString(saveString) {
    let saveGame = {};
    const packed = decompressSaveString(saveString);
    let oldFormat = false;
    let saveVersion = 1;
    if (!("v"in packed)) {
        saveGame = packed;
        oldFormat = true;
    } else {
        const serializedData = packed.s;
        const nestedSerializedData = packed.ns;
        const numberData = packed.n;
        const boolData = packed.b;
        const otherData = packed.o;
        saveVersion = packed.v;
        numberData.forEach((value,i)=>{
            saveGame[numberVars[saveVersion][i]] = value;
        }
        );
        boolData.forEach((value,i)=>{
            saveGame[boolVars[saveVersion][i]] = value === 1;
        }
        );
        serialVars[saveVersion].forEach((key,i)=>{
            const args = [serializedData[i], saveVersion];
            switch (key) {
            case "bank":
                saveGame[key] = deserializeBank(...args);
                break;
            case "statsGeneral":
                saveGame[key] = deserializeStats.general(...args);
                break;
            case "statsWoodcutting":
                saveGame[key] = deserializeStats.woodcutting(...args);
                break;
            case "statsFiremaking":
                saveGame[key] = deserializeStats.firemaking(...args);
                break;
            case "statsFishing":
                saveGame[key] = deserializeStats.fishing(...args);
                break;
            case "statsCooking":
                saveGame[key] = deserializeStats.cooking(...args);
                break;
            case "statsMining":
                saveGame[key] = deserializeStats.mining(...args);
                break;
            case "statsSmithing":
                saveGame[key] = deserializeStats.smithing(...args);
                break;
            case "statsCombat":
                saveGame[key] = deserializeStats.combat(...args);
                break;
            case "statsThieving":
                saveGame[key] = deserializeStats.thieving(...args);
                break;
            case "statsFarming":
                saveGame[key] = deserializeStats.farming(...args);
                break;
            case "statsFletching":
                saveGame[key] = deserializeStats.fletching(...args);
                break;
            case "statsCrafting":
                saveGame[key] = deserializeStats.crafting(...args);
                break;
            case "statsRunecrafting":
                saveGame[key] = deserializeStats.runecrafting(...args);
                break;
            case "statsHerblore":
                saveGame[key] = deserializeStats.herblore(...args);
                break;
            case "glovesTracker":
                saveGame[key] = deserializeGlovesTracker(...args);
                break;
            case "rockData":
                saveGame[key] = deserializeRockData(...args);
                break;
            case "herbloreBonuses":
                saveGame[key] = deserializeHerbloreBonuses(...args);
                break;
            case "tutorialTips":
                saveGame[key] = deserializeTutorialTips(...args);
                break;
            case "shopItemsPurchased":
                saveGame[key] = deserializeShopItems(...args);
                break;
            case "combatData":
                saveGame[key] = deserializeCombatData(...args);
                break;
            case "equippedFood":
                saveGame[key] = deserializeFood(...args);
                break;
            case "SETTINGS":
                saveGame[key] = deserializeSettings(...args);
                break;
            case "monsterStats":
                saveGame[key] = deserializeMonsterStats(...args);
                break;
            case "skillsUnlocked":
            case "petUnlocked":
                saveGame[key] = deserializeBoolArray(...args);
                break;
            case "equipmentSets":
                saveGame[key] = deserializeEquipment(...args);
                break;
            case "skillXP":
            case "dungeonCompleteCount":
            case "selectedAttackStyle":
            case "lockedItems":
            case "golbinRaidStats":
            case "slayerTaskCompletion":
            case "chosenAgilityObstacles":
            case "agilityObstacleBuildCount":
            case "itemsAlreadyFound":
            case "saveStateBeforeRaid":
                saveGame[key] = deserializeNumberArray(...args);
                break;
            case "slayerTask":
                saveGame[key] = deserializeSlayerTask(...args);
                break;
            default:
                throw new Error(`Error loading save: Invalid variable for deserialization: ${key}`);
            }
        }
        );
        nestedVars[saveVersion].forEach((key,i)=>{
            const args = [nestedSerializedData[i], saveVersion];
            switch (key) {
            case "newFarmingAreas":
                saveGame[key] = deserializeFarmingAreas(...args);
                break;
            case "MASTERY":
                saveGame[key] = deserializeMastery(...args);
                break;
            case "golbinRaidHistory":
                saveGame[key] = deserializeRaidHistory(...args);
                break;
            case "itemStats":
                saveGame[key] = deserializeItemStats(...args);
                break;
            default:
                throw new Error(`Error loading save: Invalid variable for nested deserialization: ${key}`);
            }
        }
        );
        otherVars[saveVersion].forEach((key,i)=>{
            saveGame[key] = JSON.parse(otherData[i]);
        }
        );
        constructRedundantVars(saveGame, saveVersion);
        if (saveVersion > 1)
            saveGame.serialCombat = new DataReader(packed.cd);
    }
    saveGame.version = saveVersion;
    return {
        saveGame: saveGame,
        oldFormat: oldFormat
    };
}
function convertHerbloreBonusesFromArray(herbloreBonuses) {
    const newBonuses = {};
    potionPages.forEach((page)=>{
        if (herbloreBonuses[page] === undefined) {
            newBonuses[page] = {
                itemID: 0,
                bonus: [null, null],
                charges: 0,
            };
        } else {
            newBonuses[page] = herbloreBonuses[page];
        }
    }
    );
    return newBonuses;
}
function constructRedundantVars(saveGame, saveVersion) {
    var _a;
    saveGame.skillLevel = saveGame.skillXP.map((xp)=>Math.max(Math.min(exp.xp_to_level(xp) - 1, 99), 1));
    saveGame.nextLevelProgress = (_a = saveGame.skillXP) === null || _a === void 0 ? void 0 : _a.map((xp,skill)=>{
        const currentLevelXP = exp.level_to_xp(saveGame.skillLevel[skill]);
        const nextLevelXP = exp.level_to_xp(saveGame.skillLevel[skill] + 1);
        let progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        progress = Math.min(progress, 100);
        return progress;
    }
    );
    if (saveGame.equipmentSets !== undefined && saveGame.selectedEquipmentSet !== undefined) {
        saveGame.equippedItems = saveGame.equipmentSets[saveGame.selectedEquipmentSet].equipment;
        saveGame.ammo = saveGame.equipmentSets[saveGame.selectedEquipmentSet].ammo;
    }
    const sData = saveGame.itemsAlreadyFound;
    saveGame.itemsAlreadyFound = [];
    saveGame.itemStats.forEach((stat,id)=>{
        if (stat.stats[0] > 0 && !sData.includes(id))
            saveGame.itemsAlreadyFound.push(id);
    }
    );
    saveGame.bank.forEach((bankItem)=>{
        bankItem.locked = saveGame.lockedItems.includes(bankItem.id);
    }
    );
}
function snapShotAllVars(saveGame) {
    const saveObject = {};
    allVars.forEach((key)=>{
        saveObject[key] = JSON.stringify(saveGame[key]);
    }
    );
    return saveObject;
}
const newAllVars = [...boolVars[currentSaveVersion], ...numberVars[currentSaveVersion], ...serialVars[currentSaveVersion], ...nestedVars[currentSaveVersion], ...otherVars[currentSaveVersion], ...reconstructedVars];
function getSaveGameFromWindow() {
    const saveGame = {};
    boolVars[currentSaveVersion].forEach;
    newAllVars.forEach((key)=>{
        saveGame[key] = window[key];
    }
    );
    return saveGame;
}
function testSaveMethods() {
    const oldSnap = snapShotAllVars(getSaveGameFromWindow());
    const saveString = getCompressedSaveString();
    const newSaveGame = getSaveFromString(saveString).saveGame;
    const newSnap = snapShotAllVars(newSaveGame);
    Object.entries(oldSnap).forEach(([key,oldValue])=>{
        const newValue = newSnap[key];
        if (newValue === undefined) {
            if (!oldVars.includes(key))
                console.log(`Variable ${key} was not saved.`);
        } else if (newValue !== oldValue) {
            console.log(`Variable: ${key} is different`);
            const oldVar = JSON.parse(oldValue);
            const newVar = JSON.parse(newValue);
            if (Array.isArray(oldVar) && Array.isArray(newVar)) {
                oldVar.forEach((val,i)=>{
                    if (JSON.stringify(val) !== JSON.stringify(newVar[i])) {
                        console.log(`Index: ${i} different`);
                        console.log(val);
                        console.log(newVar[i]);
                    }
                }
                );
            }
        }
    }
    );
}
function testLength() {
    const oldSaveLength = getSave().length;
    const newSaveLength = getCompressedSaveString().length;
    console.log(`Old Save Length: ${oldSaveLength}, New Save Length: ${newSaveLength}, Diff: %c${newSaveLength - oldSaveLength}`, `color:${newSaveLength - oldSaveLength > 0 ? "red" : "green"};`);
}
class DataReader {
    constructor(data) {
        this.data = data;
        this.dataIndex = 0;
    }
    get dataLength() {
        return this.data.length;
    }
    getBool() {
        return this.nextValue() === 1;
    }
    getNumber() {
        let value = this.nextValue();
        if (value === null)
            value = Infinity;
        return value;
    }
    nextValue() {
        const value = this.data[this.dataIndex];
        this.dataIndex++;
        return value;
    }
    getChunk(length) {
        const chunk = this.data.slice(this.dataIndex, this.dataIndex + length);
        this.dataIndex += length;
        return chunk;
    }
    getVariableLengthChunk() {
        const dataLength = this.nextValue();
        return new DataReader(this.getChunk(dataLength));
    }
    getStunFlavour() {
        return this.nextValue() === 1 ? "Stun" : "Freeze";
    }
    getActionType() {
        return this.nextValue() === 1 ? "Attack" : "Nothing";
    }
    getAttack() {
        return getAttackFromID(this.nextValue());
    }
    getCurse() {
        return CURSES[this.nextValue()];
    }
    getAttackEffect(attack) {
        let effect;
        const effectType = this.getNumber();
        const effectID = this.getNumber();
        switch (effectType) {
        case 0:
            effect = attack.onhitEffects[effectID];
            break;
        case 1:
            effect = attack.prehitEffects[effectID];
            break;
        case 2:
            effect = afflictionEffect;
            break;
        default:
            throw new Error(`Error deserializing data, effectType ${effectType} is invalid.`);
        }
        return effect;
    }
    getDOTType() {
        return DotTypeIDs[this.getNumber()];
    }
    getMonster() {
        return MONSTERS[this.getNumber()];
    }
    getAttackStyle() {
        return attackStyles[AttackStyles[this.getNumber()]].name;
    }
    getLocationType() {
        return LocationTypeIDs[this.getNumber()];
    }
    getLocation() {
        switch (this.getLocationType()) {
        case "Combat":
            {
                const areaID = this.getNumber();
                if (areaID === -1) {
                    return unknownArea;
                } else {
                    return combatAreas[areaID];
                }
            }
        case "Dungeon":
            return DUNGEONS[this.getNumber()];
        case "Slayer":
            return slayerAreas[this.getNumber()];
        default:
            throw new Error(`Error deserializing data, invalid location type.`);
        }
    }
    getEnemyState() {
        return EnemyStateID[this.getNumber()];
    }
}
class DataWriter {
    constructor() {
        this.data = [];
    }
    addNumber(value) {
        this.data.push(value);
    }
    addBool(value) {
        this.data.push(value ? 1 : 0);
    }
    addChunk(data) {
        this.data = this.data.concat(data);
    }
    addVariableLengthChunk(data) {
        this.data.push(data.length);
        this.addChunk(data);
    }
    addStunFlavour(flavour) {
        this.data.push(flavour === "Stun" ? 1 : 0);
    }
    addActionType(action) {
        this.data.push(action === "Attack" ? 1 : 0);
    }
    addAttack(attack) {
        this.data.push(attack.id);
    }
    addCurse(curse) {
        this.data.push(curse.id);
    }
    addAttackEffect(effect, attack) {
        let effectType = 0;
        let effectID = attack.onhitEffects.findIndex((onhit)=>onhit === effect);
        if (effectID === -1) {
            effectID = attack.prehitEffects.findIndex((prehit)=>prehit === effect);
            effectType = 1;
        }
        if (effectID === -1) {
            if (effect === afflictionEffect)
                effectType = 2;
            else
                throw new Error("Attempted to serialize invalid modifier effect.");
        }
        this.addNumber(effectType);
        this.addNumber(effectID);
    }
    addDOTType(type) {
        this.addNumber(DotTypeIDs[type]);
    }
    addMonster(monster) {
        this.addNumber(monster.id);
    }
    addAttackStyle(attackStyle) {
        this.addNumber(attackStyles[attackStyle].id);
    }
    addLocationType(type) {
        this.addNumber(LocationTypeIDs[type]);
    }
    addLocation(data) {
        this.addLocationType(data.type);
        this.addNumber(data.id);
    }
    addEnemyState(state) {
        this.addNumber(EnemyStateID[state]);
    }
}
var DotTypeIDs;
(function(DotTypeIDs) {
    DotTypeIDs[DotTypeIDs["Burn"] = 0] = "Burn";
    DotTypeIDs[DotTypeIDs["Bleed"] = 1] = "Bleed";
    DotTypeIDs[DotTypeIDs["Poison"] = 2] = "Poison";
    DotTypeIDs[DotTypeIDs["Regen"] = 3] = "Regen";
}
)(DotTypeIDs || (DotTypeIDs = {}));
var LocationTypeIDs;
(function(LocationTypeIDs) {
    LocationTypeIDs[LocationTypeIDs["None"] = 0] = "None";
    LocationTypeIDs[LocationTypeIDs["Combat"] = 1] = "Combat";
    LocationTypeIDs[LocationTypeIDs["Slayer"] = 2] = "Slayer";
    LocationTypeIDs[LocationTypeIDs["Dungeon"] = 3] = "Dungeon";
}
)(LocationTypeIDs || (LocationTypeIDs = {}));
var EnemyStateID;
(function(EnemyStateID) {
    EnemyStateID[EnemyStateID["Dead"] = 0] = "Dead";
    EnemyStateID[EnemyStateID["Alive"] = 1] = "Alive";
    EnemyStateID[EnemyStateID["Spawning"] = 2] = "Spawning";
}
)(EnemyStateID || (EnemyStateID = {}));
const defaultSaveValues = {
    ignoreBankFull: false,
    continueThievingOnStun: true,
    autoRestartDungeon: false,
    autoSaveCloud: true,
    darkMode: true,
    showGPNotify: true,
    enableAccessibility: false,
    showEnemySkillLevels: false,
    confirmationOnClose: false,
    autoPotion: false,
    showCommas: true,
    showVirtualLevels: false,
    secretAreaUnlocked: false,
    showSaleNotifications: true,
    showShopNotifications: true,
    pauseOfflineActions: true,
    showCombatMinibar: true,
    showCombatMinibarCombat: true,
    showSkillMinibar: true,
    disableAds: false,
    useCombinationRunes: false,
    firstTimeLoad: false,
    autoSlayer: false,
    firstTime: 0,
    nameChanges: 0,
    gp: 0,
    defaultPageOnLoad: 0,
    levelUpScreen: 1,
    attackStyle: 0,
    currentCombatFood: 0,
    showItemNotify: 1,
    myBankVersion: 1,
    buyQty: 1,
    sellQty: 1,
    accountGameVersion: 0,
    formatNumberSetting: 0,
    saveTimestamp: 0,
    currentGamemode: 0,
    raidCoins: 0,
    agilityPassivePillarActive: -1,
    get bank() {
        return [];
    },
    get statsGeneral() {
        return [{
            stat: "Total GP earnt",
            id: "#stat-general-gp-earnt",
            count: 0,
        }, {
            stat: "Total items sold",
            id: "#stat-general-items-sold",
            count: 0,
        }, {
            stat: "Attempts at username changes",
            id: "#stat-general-name-changes",
            count: 0,
        }, ];
    },
    get statsWoodcutting() {
        return [{
            stat: "Total trees cut / Environmental Impact",
            id: "#stat-woodcutting-trees-cut",
            count: 0,
        }, {
            stat: "Logs sold",
            id: "#stat-woodcutting-logs-sold",
            count: 0,
        }, {
            stat: "GP earnt from logs sold",
            id: "#stat-woodcutting-gp-earnt-logs",
            count: 0,
        }, {
            stat: "Seconds spent cutting",
            id: "#stat-woodcutting-seconds-spent-cutting",
            count: 0,
        }, ];
    },
    get statsFiremaking() {
        return [{
            stat: "Logs burnt",
            id: "#stat-firemaking-logs-burnt",
            count: 0,
        }, {
            stat: "GP Burnt",
            id: "#stat-firemaking-gp-burnt",
            count: 0,
        }, {
            stat: "Seconds spent burning",
            id: "#stat-firemaking-seconds-spent-burning",
            count: 0,
        }, {
            stat: "Bonfire bonus XP",
            id: "#stat-firemaking-bonfire-bonus-xp",
            count: 0,
        }, ];
    },
    get statsFishing() {
        return [{
            stat: "Fish caught",
            id: "#stat-fishing-fish-caught",
            count: 0,
        }, {
            stat: "Fish failed to catch",
            id: "#stat-fishing-fish-failed",
            count: 0,
        }, {
            stat: "Seconds spent fishing",
            id: "#stat-fishing-seconds-spent",
            count: 0,
        }, {
            stat: "fish sold",
            id: "#stat-fishing-fish-sold",
            count: 0,
        }, {
            stat: "GP earnt from fishing",
            id: "#stat-fishing-gp-earnt",
            count: 0,
        }, {
            stat: "Junk caught",
            id: "#stat-fishing-junk-caught",
            count: 0,
        }, {
            stat: "Special Items caught",
            id: "#stat-fishing-special-caught",
            count: 0,
        }, ];
    },
    get statsCooking() {
        return [{
            stat: "Food cooked",
            id: "#stat-cooking-food-cooked",
            count: 0,
        }, {
            stat: "Food burnt",
            id: "#stat-cooking-food-burnt",
            count: 0,
        }, {
            stat: "Seconds spent burning",
            id: "#stat-cooking-time-spent",
            count: 0,
        }, ];
    },
    get statsMining() {
        return [{
            stat: "Ores mined",
            id: "#stat-mining-ores-mined",
            count: 0,
        }, {
            stat: "Empty ores miend",
            id: "#stat-mining-empty-ore",
            count: 0,
        }, ];
    },
    get statsSmithing() {
        return [{
            stat: "Bars smithed",
            id: "#stat-smithing-bars-smelted",
            count: 0,
        }, {
            stat: "Items smelted",
            id: "#stat-smithing-items-smithed",
            count: 0,
        }, {
            stat: "Seconds spent smelting",
            id: "#stat-smithing-seconds-smelting",
            count: 0,
        }, {
            stat: "Seconds spend smithing",
            id: "#stat-smithing-seconds-smithing",
            count: 0,
        }, ];
    },
    get statsCombat() {
        return [{
            stat: "Monsters killed",
            id: "#stat-combat-monsters-killed",
            count: 0,
        }, {
            stat: "Damage Dealt",
            id: "#stat-combat-damage-dealt",
            count: 0,
        }, {
            stat: "Damage Taken",
            id: "#stat-combat-damage-taken",
            count: 0,
        }, {
            stat: "Attacks missed",
            id: "#stat-combat-attacks-missed",
            count: 0,
        }, {
            stat: "Deaths",
            id: "#stat-combat-deaths",
            count: 0,
        }, {
            stat: "Food Consumed",
            id: "#stat-combat-food-eaten",
            count: 0,
        }, {
            stat: "Health gained from food",
            id: "#stat-combat-health-from-food",
            count: 0,
        }, ];
    },
    get statsThieving() {
        return [{
            stat: "Total successful pickpockets",
            id: "#stat-thieving-successful-pickpockets",
            count: 0,
        }, {
            stat: "Total failed pickpockets",
            id: "#stat-thieving-failed-pickpockets",
            count: 0,
        }, {
            stat: "Damage taken from NPCs",
            id: "#stat-thieving-damage-taken",
            count: 0,
        }, {
            stat: "Seconds spent stunned",
            id: "#stat-thieving-time-stunned",
            count: 0,
        }, ];
    },
    get statsFarming() {
        return [{
            stat: "Total allotments harvested",
            id: "#stat-farming-allotments-harvested",
            count: 0,
        }, {
            stat: "Compost used",
            id: "#stat-farming-compost-used",
            count: 0,
        }, {
            stat: "Crops died due to intentional neglect",
            id: "#stat-farming-crops-died",
            count: 0,
        }, {
            stat: "Seconds spent waiting for crops to grow",
            id: "#stat-farming-time-spent",
            count: 0,
        }, {
            stat: "Seconds spent waiting for crops to die",
            id: "#stat-farming-time-spent-die",
            count: 0,
        }, {
            stat: "Weird Gloop Used",
            id: "#stat-farming-gloop-used",
            count: 0,
        }, ];
    },
    get statsFletching() {
        return [{
            stat: "Arrow Shafts created",
            id: "#stat-fletching-arrow-shafts",
            count: 0,
        }, {
            stat: "Items fletched",
            id: "#stat-fletching-items-fletched",
            count: 0,
        }, {
            stat: "Time spent fletching",
            id: "#stat-fletching-time-spent",
            count: 0,
        }, ];
    },
    get statsCrafting() {
        return [{
            stat: "Items crafted",
            id: "#stat-crafting-items-crafted",
            count: 0,
        }, {
            stat: "Time spent crafting",
            id: "#stat-crafting-time-spent",
            count: 0,
        }, ];
    },
    get statsRunecrafting() {
        return [{
            stat: "Items crafted",
            id: "#stat-runecrafting-items-crafted",
            count: 0,
        }, {
            stat: "Time spent crafting",
            id: "#stat-runecrafting-time-spent",
            count: 0,
        }, ];
    },
    get statsHerblore() {
        return [{
            stat: "Potions made",
            id: "#stat-herblore-potions-made",
            count: 0,
        }, {
            stat: "Time spent brewing",
            id: "#stat-herblore-time-spent",
            count: 0,
        }, {
            stat: "Potions used",
            id: "#stat-herblore-potions-used",
            count: 0,
        }, {
            stat: "Charges used",
            id: "#stat-herblore-charges-used",
            count: 0,
        }, ];
    },
    get glovesTracker() {
        return [{
            name: "Cooking",
            isActive: false,
            remainingActions: 0,
        }, {
            name: "Mining",
            isActive: false,
            remainingActions: 0,
        }, {
            name: "Smithing",
            isActive: false,
            remainingActions: 0,
        }, {
            name: "Thieving",
            isActive: false,
            remainingActions: 0,
        }, {
            name: "Gems",
            isActive: false,
            remainingActions: 0,
        }, ];
    },
    get rockData() {
        return miningData.map(()=>{
            return {
                maxHP: 6,
                damage: 0,
                depleted: false,
                respawnTimer: null,
            };
        }
        );
    },
    get herbloreBonuses() {
        const data = {};
        potionPages.forEach((page)=>{
            data[page] = {
                itemID: 0,
                bonus: [null, null],
                charges: 0,
            };
        }
        );
        return data;
    },
    get tutorialTips() {
        const tipQty = 7;
        const tips = [];
        for (let i = 0; i < tipQty; i++) {
            tips.push({
                activated: false,
            });
        }
        return tips;
    },
    get shopItemsPurchased() {
        return new Map();
    },
    get SETTINGS() {
        return {
            bank: {
                bankBorder: 0,
                currentEquipDefault: true,
                defaultBankSort: 0,
                defaultItemTab: [],
            },
            mastery: {
                hideMaxLevel: false,
                confirmationCheckpoint: true,
            },
            general: {
                pushNotificationOffline: true,
                pushNotificationFarming: true,
                enabledOfflineCombat: false,
                enableNeutralSpecModifiers: false,
            },
            notifications: {
                combatStunned: true,
                combatSleep: true,
                summoningMark: true,
            },
            performance: {
                disableDamageSplashes: false,
                disableProgressBars: false,
            },
        };
    },
    get monsterStats() {
        return MONSTERS.map((monster,id)=>{
            return {
                monsterID: id,
                stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
        }
        );
    },
    get petUnlocked() {
        return PETS.map(()=>false);
    },
    get skillsUnlocked() {
        return [];
    },
    get skillXP() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 1155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    get dungeonCompleteCount() {
        return DUNGEONS.map(()=>0);
    },
    get lockedItems() {
        return [];
    },
    get golbinRaidStats() {
        return [0, 0, 0, 0, 0, 0];
    },
    get chosenAgilityObstacles() {
        return [];
    },
    get agilityObstacleBuildCount() {
        return [];
    },
    get itemsAlreadyFound() {
        return [];
    },
    get saveStateBeforeRaid() {
        return [];
    },
    get newFarmingAreas() {
        return [{
            id: 0,
            areaName: "Allotments",
            patches: [{
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: true,
                gloop: false,
                level: 1,
                cost: 0,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 1,
                cost: 500,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 1,
                cost: 5000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 10,
                cost: 15000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 20,
                cost: 25000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 30,
                cost: 40000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 40,
                cost: 65000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 50,
                cost: 80000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 60,
                cost: 100000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 70,
                cost: 120000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 80,
                cost: 150000,
            }, {
                type: "Allotment",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 90,
                cost: 200000,
            }, ],
        }, {
            id: 1,
            areaName: "Herbs",
            patches: [{
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 5,
                cost: 10000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 5,
                cost: 20000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 15,
                cost: 35000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 35,
                cost: 50000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 45,
                cost: 80000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 55,
                cost: 100000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 65,
                cost: 125000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 75,
                cost: 150000,
            }, {
                type: "Herb",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 85,
                cost: 200000,
            }, ],
        }, {
            id: 2,
            areaName: "Trees",
            patches: [{
                type: "Tree",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 15,
                cost: 50000,
            }, {
                type: "Tree",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 30,
                cost: 100000,
            }, {
                type: "Tree",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 60,
                cost: 250000,
            }, {
                type: "Tree",
                seedID: 0,
                compost: 0,
                timePlanted: 0,
                setInterval: 0,
                timeout: null,
                hasGrown: false,
                unlocked: false,
                gloop: false,
                level: 80,
                cost: 400000,
            }, ],
        }, ];
    },
    get MASTERY() {
        return {};
    },
    get golbinRaidHistory() {
        return [];
    },
    get itemStats() {
        return items.map((item,id)=>{
            return {
                itemID: id,
                stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
        }
        );
    },
    get offline() {
        return {
            skill: null,
            action: null,
            timestamp: null,
        };
    },
    get titleNewsID() {
        return [];
    },
    get scheduledPushNotifications() {
        return {};
    },
    username: "Insubordinate",
    gameUpdateNotification: "Alpha v0.20",
    get summoningData() {
        return {
            MarksDiscovered: {},
            defaultRecipe: [],
        };
    },
    get skillLevel() {
        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    },
    get nextLevelProgress() {
        return Object.keys(SKILLS).map(()=>0);
    },
    version: currentSaveVersion,
    selectedEquipmentSet: 0,
    selectedSpell: 0,
    prayerPoints: 0,
    slayerCoins: 0,
    activeAurora: -1,
    get equippedFood() {
        return [{
            itemID: 0,
            qty: 0
        }, {
            itemID: 0,
            qty: 0
        }, {
            itemID: 0,
            qty: 0
        }, ];
    },
    equipmentSets: [],
    get combatData() {
        return {
            enemy: {},
            player: {
                hitpoints: 100
            },
        };
    },
    get slayerTask() {
        return [];
    },
    get slayerTaskCompletion() {
        return [0, 0, 0, 0, 0];
    },
    get randomModifiers() {
        return {
            equipment: {},
            player: {}
        };
    },
    get selectedAttackStyle() {
        return [0, 3, 6];
    },
    get equippedItems() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    ammo: 0,
    currentBankUpgrade: 1,
    get treeMasteryData() {
        return [];
    },
    currentAxe: 0,
    treeCutLimit: 0,
    bankMax: 0,
    get logsMastery() {
        return [];
    },
    get fishMastery() {
        return [];
    },
    currentRod: 0,
    get cookingMastery() {
        return [];
    },
    upgradedToRange: false,
    get miningOreMastery() {
        return [];
    },
    currentPickaxe: 0,
    get smithingMastery() {
        return [];
    },
    get thievingMastery() {
        return [];
    },
    get farmingMastery() {
        return [];
    },
    currentCookingFire: 0,
    get fletchingMastery() {
        return [];
    },
    get craftingMastery() {
        return [];
    },
    get runecraftingMastery() {
        return [];
    },
    get itemLog() {
        return [];
    },
    showSkillNav: false,
    get herbloreMastery() {
        return [];
    },
    currentAutoEat: 0,
    get equipmentSetsPurchased() {
        return [false, false];
    },
    showHPNotify: false,
    equipmentSwapPurchased: false,
    get godUpgrade() {
        return [false, false, false, false];
    },
    autoSlayerUnlocked: false,
    get killCount() {
        return [];
    },
    xmasPresents: 0,
    get serialCombat() {
        return new DataReader([]);
    },
};
function updateSavePre110(savegame) {
    if (savegame.skillLevel.length < 18 || savegame.skillXP.length < 18 || savegame.nextLevelProgress.length < 18) {
        console.log("Updating save game to Alpha v0.05...");
        while (savegame.skillLevel.length < 18) {
            savegame.skillLevel.push(1);
        }
        savegame.skillLevel[9] = 10;
        while (savegame.skillXP.length < 18) {
            savegame.skillXP.push(0);
        }
        savegame.skillXP[9] = 1155;
        while (savegame.nextLevelProgress.length < 18) {
            savegame.nextLevelProgress.push(0);
        }
        console.log("Save game update successful...");
    }
    if (savegame.smithingMastery !== undefined) {
        while (savegame.smithingMastery.length < Object.keys(CONSTANTS.mastery.Smithing).length) {
            savegame.smithingMastery.push({
                mastery: 1,
                masteryXP: 0
            });
            console.log("Smithing Mastery +1");
        }
    }
    if (savegame.equippedItems !== undefined) {
        while (savegame.equippedItems.length < 11) {
            savegame.equippedItems.push(0);
            console.log("Updated Equip Array");
        }
        for (let i = 0; i < savegame.glovesTracker.length; i++) {
            if (savegame.glovesTracker[i].isActive) {
                const itemID = gloveID[i];
                const item = items[itemID];
                const foundItem = savegame.bank.some((bankItem)=>bankItem.id);
                if (!foundItem && savegame.equippedItems[CONSTANTS.equipmentSlot.Gloves] != itemID) {
                    console.log("Adding item " + items[itemID].name + " to bank");
                    savegame.bank.push({
                        id: gloveID[i],
                        qty: 1,
                        tab: 0,
                        sellsFor: item.sellsFor,
                        stackValue: item.sellsFor,
                        locked: false
                    });
                }
            }
        }
    }
    if (savegame.upgradedToRange) {
        savegame.upgradedToRange = false;
        savegame.gp += 500000;
        console.log("Cooking Range refunded for 500K");
    }
    if (savegame.glovesTracker.length < 5)
        savegame.glovesTracker.push({
            name: "Gems",
            isActive: false,
            remainingActions: 0
        });
    if (savegame.myBankVersion < 2 && savegame.currentBankUpgrade !== undefined) {
        console.log("Updating bank slots to new formula");
        let totalGP = 0;
        let newGP = 0;
        for (let i = 0; i < savegame.currentBankUpgrade; i++)
            totalGP += bankUpgradeCost.level_to_gp(i);
        for (let i = 0; i < savegame.currentBankUpgrade; i++)
            newGP += newBankUpgradeCost.level_to_gp(i);
        savegame.gp += totalGP - newGP;
        savegame.myBankVersion++;
        console.log(convertGP(totalGP - newGP) + " GP refunded for bank slot adjustment");
    }
    if (savegame.myBankVersion < 4 && savegame.currentBankUpgrade !== undefined) {
        console.log("Updating bank slots to new new formula");
        let totalGP = 0;
        let newGP = 0;
        for (let i = 0; i < savegame.currentBankUpgrade; i++) {
            totalGP += newBankUpgradeCost.level_to_gp(i);
            newGP += newNewBankUpgradeCost.level_to_gp(i);
        }
        if (totalGP > newGP) {
            savegame.gp += totalGP - newGP;
            console.log(convertGP(totalGP - newGP) + " GP refunded for bank slot adjustment");
        } else
            console.log("No refund required for new bankslot formula");
        savegame.myBankVersion = 4;
    }
    savegame.gp = Math.floor(savegame.gp);
    if (savegame.combatData !== undefined)
        savegame.combatData.player.hitpoints *= 10;
    let found = 0;
    savegame.itemStats = [];
    const qtyMap = new Map();
    savegame.bank.forEach((bankItem)=>{
        qtyMap.set(bankItem.id, bankItem.qty);
    }
    );
    items.forEach((item,id)=>{
        var _a;
        found = (_a = qtyMap.get(id)) !== null && _a !== void 0 ? _a : 0;
        savegame.itemStats.push({
            itemID: id,
            stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
        savegame.itemStats[id].stats[Stats.TimesFound] += found;
    }
    );
    savegame.monsterStats = [];
    if (savegame.killCount !== undefined) {
        for (let i = 0; i < savegame.killCount.length; i++) {
            savegame.monsterStats.push({
                monsterID: i,
                stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            });
            savegame.monsterStats[i].stats[2] += savegame.killCount[i];
        }
    }
    savegame.accountGameVersion = 110;
}
function updateSavePre121(savegame) {
    if (savegame.equipmentSets === undefined)
        savegame.equipmentSets = [];
    if (savegame.equippedItems !== undefined && savegame.ammo !== undefined) {
        for (let i = savegame.equipmentSets.length; i < 3; i++) {
            if (i === 0)
                savegame.equipmentSets.push({
                    equipment: savegame.equippedItems,
                    ammo: savegame.ammo,
                    summonAmmo: [0, 0]
                });
            else
                savegame.equipmentSets.push({
                    equipment: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ammo: 0,
                    summonAmmo: [0, 0]
                });
        }
    }
    savegame.accountGameVersion = 121;
}
function cleanSaveGame(savegame) {
    var _a;
    if (savegame.equippedItems !== undefined) {
        for (let i = savegame.equippedItems.length; i < 14; i++)
            savegame.equippedItems.push(0);
    }
    if (savegame.equipmentSets !== undefined) {
        for (let i = 0; i < savegame.equipmentSets.length; i++) {
            if (savegame.equipmentSets[i].equipment.length < 14) {
                for (let j = savegame.equipmentSets[i].equipment.length; j < 14; j++)
                    savegame.equipmentSets[i].equipment.push(0);
            }
            if (savegame.equipmentSets[i].summonAmmo === undefined)
                savegame.equipmentSets[i].summonAmmo = [0, 0];
        }
    }
    if (Array.isArray(savegame.shopItemsPurchased)) {
        const oldPurchases = savegame.shopItemsPurchased;
        const shopMap = new Map();
        oldPurchases.forEach((upgrade)=>{
            const cat = upgrade[0];
            const id = upgrade[1];
            const key = `${cat}:${id}`;
            let owned = shopMap.get(key);
            if (owned === undefined) {
                owned = {
                    category: cat,
                    id: id,
                    quantity: 0,
                };
                shopMap.set(key, owned);
            }
            owned.quantity++;
        }
        );
        savegame.shopItemsPurchased = shopMap;
    }
    const addPurchase = (cat,id,qty=1)=>{
        const key = `${cat}:${id}`;
        let owned = savegame.shopItemsPurchased.get(key);
        if (owned === undefined) {
            owned = {
                category: cat,
                id: id,
                quantity: 0,
            };
            savegame.shopItemsPurchased.set(key, owned);
        }
        owned.quantity += qty;
    }
    ;
    if (savegame.autoSlayerUnlocked) {
        addPurchase("Slayer", 0);
    }
    if (savegame.bankMax !== undefined && savegame.bankMax > 0)
        addPurchase("General", 0, savegame.bankMax);
    if (savegame.currentAxe !== undefined) {
        for (let i = 0; i < savegame.currentAxe; i++) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Iron_Axe + i);
        }
    }
    if (savegame.currentRod !== undefined) {
        for (let i = 0; i < savegame.currentRod; i++) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Iron_Fishing_Rod + i);
        }
    }
    if (savegame.currentPickaxe !== undefined) {
        for (let i = 0; i < savegame.currentPickaxe; i++) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Iron_Pickaxe + i);
        }
    }
    if (savegame.currentCookingFire !== undefined) {
        for (let i = 0; i < savegame.currentCookingFire; i++) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Normal_Cooking_Fire + i);
        }
    }
    if (savegame.equipmentSetsPurchased !== undefined) {
        if (savegame.equipmentSetsPurchased[0]) {
            addPurchase("General", CONSTANTS.shop.general.Extra_Equipment_Set_I);
        }
        if (savegame.equipmentSetsPurchased[1]) {
            addPurchase("General", CONSTANTS.shop.general.Extra_Equipment_Set_II);
        }
    }
    if (savegame.godUpgrade !== undefined) {
        if (savegame.godUpgrade[0]) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Perpetual_Haste);
        }
        if (savegame.godUpgrade[1]) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Expanded_Knowledge);
        }
        if (savegame.godUpgrade[2]) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Master_of_Nature);
        }
        if (savegame.godUpgrade[3]) {
            addPurchase("SkillUpgrades", CONSTANTS.shop.skillUpgrades.Art_of_Control);
        }
    }
    if (savegame.equipmentSwapPurchased) {
        addPurchase("General", CONSTANTS.shop.general.Dungeon_Equipment_Swapping);
    }
    if (savegame.currentAutoEat !== undefined) {
        if (savegame.currentAutoEat >= 3) {
            addPurchase("General", CONSTANTS.shop.general.Auto_Eat_Tier_III);
        }
        if (savegame.currentAutoEat >= 2) {
            addPurchase("General", CONSTANTS.shop.general.Auto_Eat_Tier_II);
        }
        if (savegame.currentAutoEat >= 1) {
            addPurchase("General", CONSTANTS.shop.general.Auto_Eat_Tier_I);
        }
    }
    if (((_a = savegame.treeCutLimit) !== null && _a !== void 0 ? _a : 0) > 1) {
        addPurchase("General", CONSTANTS.shop.general.Multi_Tree);
    }
    if (Array.isArray(savegame.herbloreBonuses)) {
        savegame.herbloreBonuses = convertHerbloreBonusesFromArray(savegame.herbloreBonuses);
    } else {
        potionPages.forEach((page)=>{
            if (savegame.herbloreBonuses[page] === undefined) {
                savegame.herbloreBonuses[page] = {
                    itemID: 0,
                    bonus: [null, null],
                    charges: 0,
                };
            }
        }
        );
    }
    if (savegame.saveStateBeforeRaid !== undefined && savegame.saveStateBeforeRaid.length > 0) {
        if (savegame.combatData !== undefined)
            savegame.combatData.player.hitpoints = savegame.saveStateBeforeRaid[0];
        savegame.selectedEquipmentSet = savegame.saveStateBeforeRaid[1];
        savegame.currentCombatFood = savegame.saveStateBeforeRaid[2];
    }
}
function convertOldMastery(savegame) {
    const oldMastery = {};
    Object.entries(SKILLS).forEach(([skill,skillData])=>{
        const skillID = parseInt(skill);
        if (skillData.hasMastery && savegame.MASTERY[skillID] === undefined) {
            savegame.MASTERY[skillID] = {
                pool: 0,
                xp: []
            };
            oldMastery[skillID] = [];
        }
    }
    );
    if (savegame.fishMastery !== undefined)
        oldMastery[CONSTANTS.skill.Fishing] = savegame.fishMastery;
    if (savegame.logsMastery !== undefined)
        oldMastery[CONSTANTS.skill.Woodcutting] = savegame.logsMastery;
    if (savegame.cookingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Cooking] = savegame.cookingMastery;
    if (savegame.miningOreMastery !== undefined)
        oldMastery[CONSTANTS.skill.Mining] = savegame.miningOreMastery;
    if (savegame.smithingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Smithing] = savegame.smithingMastery;
    if (savegame.farmingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Farming] = savegame.farmingMastery;
    if (savegame.fletchingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Fletching] = savegame.fletchingMastery;
    if (savegame.craftingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Crafting] = savegame.craftingMastery;
    if (savegame.runecraftingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Runecrafting] = savegame.runecraftingMastery;
    if (savegame.herbloreMastery !== undefined)
        oldMastery[CONSTANTS.skill.Herblore] = savegame.herbloreMastery;
    if (savegame.treeMasteryData !== undefined)
        oldMastery[CONSTANTS.skill.Woodcutting] = savegame.treeMasteryData;
    if (savegame.thievingMastery !== undefined)
        oldMastery[CONSTANTS.skill.Thieving] = savegame.thievingMastery;
    const updateMastery = (skillID,masteryID)=>{
        if (savegame.MASTERY[skillID].xp[masteryID] === undefined) {
            savegame.MASTERY[skillID].xp[masteryID] = 0;
            let level = 1;
            if (oldMastery[skillID] !== undefined && oldMastery[skillID].length > masteryID) {
                level = oldMastery[skillID][masteryID].mastery + 1;
                level = Math.min(99, level);
                savegame.MASTERY[skillID].xp[masteryID] = exp.level_to_xp(level) + 1;
            }
        }
    }
    ;
    items.forEach((item)=>{
        if (item.masteryID !== undefined) {
            const [skillID,masteryID] = item.masteryID;
            updateMastery(skillID, masteryID);
        }
    }
    );
    for (let i = 0; i < trees.length; i++) {
        updateMastery(CONSTANTS.skill.Woodcutting, i);
    }
    for (let i = 0; i < thievingNPC.length; i++) {
        updateMastery(CONSTANTS.skill.Thieving, i);
    }
    for (let i = 0; i < agilityObstacles.length; i++) {
        if (!savegame.MASTERY[CONSTANTS.skill.Agility].xp[i])
            savegame.MASTERY[CONSTANTS.skill.Agility].xp[i] = 0;
    }
}
