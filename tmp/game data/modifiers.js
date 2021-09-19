"use strict";
class CombatModifiers {
    constructor() {
        this.increasedGlobalAccuracy = 0;
        this.decreasedGlobalAccuracy = 0;
        this.increasedMeleeAccuracyBonus = 0;
        this.decreasedMeleeAccuracyBonus = 0;
        this.increasedMeleeMaxHit = 0;
        this.decreasedMeleeMaxHit = 0;
        this.increasedMeleeEvasion = 0;
        this.decreasedMeleeEvasion = 0;
        this.increasedRangedAccuracyBonus = 0;
        this.decreasedRangedAccuracyBonus = 0;
        this.increasedRangedMaxHit = 0;
        this.decreasedRangedMaxHit = 0;
        this.increasedRangedEvasion = 0;
        this.decreasedRangedEvasion = 0;
        this.increasedMagicAccuracyBonus = 0;
        this.decreasedMagicAccuracyBonus = 0;
        this.increasedMagicMaxHit = 0;
        this.decreasedMagicMaxHit = 0;
        this.increasedMagicEvasion = 0;
        this.decreasedMagicEvasion = 0;
        this.increasedMaxHitFlat = 0;
        this.decreasedMaxHitFlat = 0;
        this.increasedMaxHitPercent = 0;
        this.decreasedMaxHitPercent = 0;
        this.increasedDamageReduction = 0;
        this.decreasedDamageReduction = 0;
        this.increasedHPRegenFlat = 0;
        this.decreasedHPRegenFlat = 0;
        this.decreasedAttackInterval = 0;
        this.increasedAttackInterval = 0;
        this.decreasedAttackIntervalPercent = 0;
        this.increasedAttackIntervalPercent = 0;
        this.increasedMaxHitpoints = 0;
        this.decreasedMaxHitpoints = 0;
        this.increasedFlatMaxHitpoints = 0;
        this.decreasedFlatMaxHitpoints = 0;
        this.increasedReflectDamage = 0;
        this.decreasedReflectDamage = 0;
        this.increasedFlatReflectDamage = 0;
        this.decreasedFlatReflectDamage = 0;
        this.increasedRolledReflectDamage = 0;
        this.decreasedRolledReflectDamage = 0;
        this.increasedLifesteal = 0;
        this.decreasedLifesteal = 0;
        this.increasedMeleeLifesteal = 0;
        this.increasedRangedLifesteal = 0;
        this.increasedMagicLifesteal = 0;
        this.increasedBleedLifesteal = 0;
        this.increasedBurnLifesteal = 0;
        this.increasedPoisonLifesteal = 0;
        this.decreasedMeleeLifesteal = 0;
        this.decreasedRangedLifesteal = 0;
        this.decreasedMagicLifesteal = 0;
        this.decreasedBleedLifesteal = 0;
        this.decreasedBurnLifesteal = 0;
        this.decreasedPoisonLifesteal = 0;
        this.increasedMeleeCritChance = 0;
        this.increasedMeleeCritMult = 0;
        this.decreasedMeleeCritChance = 0;
        this.decreasedMeleeCritMult = 0;
        this.increasedRangedCritChance = 0;
        this.increasedRangedCritMult = 0;
        this.decreasedRangedCritChance = 0;
        this.decreasedRangedCritMult = 0;
        this.increasedMagicCritChance = 0;
        this.increasedMagicCritMult = 0;
        this.decreasedMagicCritChance = 0;
        this.decreasedMagicCritMult = 0;
        this.increasedHitpointRegeneration = 0;
        this.decreasedHitpointRegeneration = 0;
        this.increasedMinHitBasedOnMaxHit = 0;
        this.decreasedMinHitBasedOnMaxHit = 0;
        this.increasedAttackRolls = 0;
        this.decreasedAttackRolls = 0;
        this.increasedFlatMinHit = 0;
        this.decreasedFlatMinHit = 0;
        this.increasedDamageTaken = 0;
        this.decreasedDamageTaken = 0;
        this.increasedConfusion = 0;
        this.increasedDecay = 0;
        this.increasedGlobalEvasion = 0;
        this.decreasedGlobalEvasion = 0;
        this.increasedMinAirSpellDmg = 0;
        this.decreasedMinAirSpellDmg = 0;
        this.increasedMinWaterSpellDmg = 0;
        this.decreasedMinWaterSpellDmg = 0;
        this.increasedMinEarthSpellDmg = 0;
        this.decreasedMinEarthSpellDmg = 0;
        this.increasedMinFireSpellDmg = 0;
        this.decreasedMinFireSpellDmg = 0;
        this.increasedMaxAirSpellDmg = 0;
        this.decreasedMaxAirSpellDmg = 0;
        this.increasedMaxWaterSpellDmg = 0;
        this.decreasedMaxWaterSpellDmg = 0;
        this.increasedMaxEarthSpellDmg = 0;
        this.decreasedMaxEarthSpellDmg = 0;
        this.increasedMaxFireSpellDmg = 0;
        this.decreasedMaxFireSpellDmg = 0;
        this.meleeProtection = 0;
        this.rangedProtection = 0;
        this.magicProtection = 0;
        this.curseImmunity = 0;
        this.increasedDamageReductionPercent = 0;
        this.decreasedDamageReductionPercent = 0;
        this.stunImmunity = 0;
        this.sleepImmunity = 0;
        this.burnImmunity = 0;
        this.poisonImmunity = 0;
        this.bleedImmunity = 0;
        this.debuffImmunity = 0;
        this.increasedRebirthChance = 0;
        this.increasedChanceToApplyBurn = 0;
        this.decreasedChanceToApplyBurn = 0;
        this.decreasedDragonBreathDamage = 0;
        this.increasedMeleeStunThreshold = 0;
    }
    reset() {
        Object.entries(this).forEach((entry)=>{
            this[entry[0]] = 0;
        }
        );
    }
    addModifiers(modData, negMult=1, posMult=1) {
        Object.entries(modData).forEach((entry)=>{
            let value = 0;
            if (modifierData[entry[0]].isNegative) {
                value = entry[1] * negMult;
            } else {
                value = entry[1] * posMult;
            }
            this[entry[0]] += value;
        }
        );
    }
    subModifiers(modData, negMult=1, posMult=1) {
        this.addModifiers(modData, -negMult, -posMult);
    }
    getDOTLifesteal(type) {
        let value = 0;
        switch (type) {
        case 'Bleed':
            value += this.increasedBleedLifesteal - this.decreasedBleedLifesteal;
            break;
        case 'Burn':
            value += this.increasedBurnLifesteal - this.decreasedBurnLifesteal;
            break;
        case 'Poison':
            value += this.increasedPoisonLifesteal - this.decreasedPoisonLifesteal;
            break;
        }
        return value;
    }
    getAccuracyModifier(type) {
        let totalBonus = this.increasedGlobalAccuracy - this.decreasedGlobalAccuracy;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeAccuracyBonus;
            totalBonus -= this.decreasedMeleeAccuracyBonus;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedAccuracyBonus;
            totalBonus -= this.decreasedRangedAccuracyBonus;
            break;
        case 'magic':
            totalBonus += this.increasedMagicAccuracyBonus;
            totalBonus -= this.decreasedMagicAccuracyBonus;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while modifying accuracy.`);
        }
        return totalBonus;
    }
    getEvasionModifier(type) {
        let totalBonus = this.increasedGlobalEvasion - this.decreasedGlobalEvasion;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeEvasion;
            totalBonus -= this.decreasedMeleeEvasion;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedEvasion;
            totalBonus -= this.decreasedRangedEvasion;
            break;
        case 'magic':
            totalBonus += this.increasedMagicEvasion;
            totalBonus -= this.decreasedMagicEvasion;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while modifying evasion.`);
        }
        return totalBonus;
    }
    getMaxHitModifier(type) {
        let totalBonus = this.increasedMaxHitPercent - this.decreasedMaxHitPercent;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeMaxHit;
            totalBonus -= this.decreasedMeleeMaxHit;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedMaxHit;
            totalBonus -= this.decreasedRangedMaxHit;
            break;
        case 'magic':
            totalBonus += this.increasedMagicMaxHit;
            totalBonus -= this.decreasedMagicMaxHit;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while modifying evasion.`);
        }
        return totalBonus;
    }
    getCritChance(type) {
        let totalBonus = 0;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeCritChance;
            totalBonus -= this.decreasedMeleeCritChance;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedCritChance;
            totalBonus -= this.decreasedRangedCritChance;
            break;
        case 'magic':
            totalBonus += this.increasedMagicCritChance;
            totalBonus -= this.decreasedMagicCritChance;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while calculating crit chance.`);
        }
        return totalBonus;
    }
    getCritMult(type) {
        let totalBonus = 0;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeCritMult;
            totalBonus -= this.decreasedMeleeCritMult;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedCritMult;
            totalBonus -= this.decreasedRangedCritMult;
            break;
        case 'magic':
            totalBonus += this.increasedMagicCritMult;
            totalBonus -= this.decreasedMagicCritMult;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while calculating crit mult.`);
        }
        return totalBonus;
    }
    getLifesteal(type) {
        let totalBonus = this.increasedLifesteal - this.decreasedLifesteal;
        switch (type) {
        case 'melee':
            totalBonus += this.increasedMeleeLifesteal;
            totalBonus -= this.decreasedMeleeLifesteal;
            break;
        case 'ranged':
            totalBonus += this.increasedRangedLifesteal;
            totalBonus -= this.decreasedRangedLifesteal;
            break;
        case 'magic':
            totalBonus += this.increasedMagicLifesteal;
            totalBonus -= this.decreasedMagicLifesteal;
            break;
        default:
            throw new Error(`Invalid attack type: ${type} while calculating crit mult.`);
        }
        return totalBonus;
    }
    getMaxHitFlatModifier() {
        return this.increasedMaxHitFlat - this.decreasedMaxHitFlat;
    }
    getMinHitFromMaxHitModifier() {
        return this.increasedMinHitBasedOnMaxHit - this.decreasedMinHitBasedOnMaxHit;
    }
    getFlatMinHitModifier() {
        return this.increasedFlatMinHit - this.decreasedFlatMinHit;
    }
    getSpellMinHitModifier(spellType) {
        switch (spellType) {
        case CONSTANTS.spellType.Air:
            return this.increasedMinAirSpellDmg - this.decreasedMinAirSpellDmg;
        case CONSTANTS.spellType.Water:
            return this.increasedMinWaterSpellDmg - this.decreasedMinWaterSpellDmg;
        case CONSTANTS.spellType.Earth:
            return this.increasedMinEarthSpellDmg - this.decreasedMinEarthSpellDmg;
        case CONSTANTS.spellType.Fire:
            return this.increasedMinFireSpellDmg - this.decreasedMinFireSpellDmg;
        default:
            throw new Error(`Invalid Spelltype: ${spellType}`);
        }
    }
    getSpellMaxHitModifier(spellType) {
        switch (spellType) {
        case CONSTANTS.spellType.Air:
            return this.increasedMaxAirSpellDmg - this.decreasedMaxAirSpellDmg;
        case CONSTANTS.spellType.Water:
            return this.increasedMaxWaterSpellDmg - this.decreasedMaxWaterSpellDmg;
        case CONSTANTS.spellType.Earth:
            return this.increasedMaxEarthSpellDmg - this.decreasedMaxEarthSpellDmg;
        case CONSTANTS.spellType.Fire:
            return this.increasedMaxFireSpellDmg - this.decreasedMaxFireSpellDmg;
        default:
            throw new Error(`Invalid Spelltype: ${spellType}`);
        }
    }
    getMaxHPPercentModifier() {
        return this.increasedMaxHitpoints - this.decreasedMaxHitpoints;
    }
    getMaxHPFlatModifier() {
        return this.increasedFlatMaxHitpoints - this.decreasedFlatMaxHitpoints;
    }
    getAttackIntervalModifier() {
        return this.increasedAttackIntervalPercent - this.decreasedAttackIntervalPercent;
    }
    getFlatAttackIntervalModifier() {
        return this.increasedAttackInterval - this.decreasedAttackInterval;
    }
    getFlatDamageReductionModifier() {
        return this.increasedDamageReduction - this.decreasedDamageReduction;
    }
    getProtectionValue(type) {
        switch (type) {
        case 'melee':
            return this.meleeProtection;
        case 'ranged':
            return this.rangedProtection;
        case 'magic':
            return this.magicProtection;
        }
    }
    getFlatReflectDamage() {
        const value = this.increasedFlatReflectDamage - this.decreasedFlatReflectDamage;
        return Math.max(0, value);
    }
    getRolledReflectDamage() {
        const value = this.increasedRolledReflectDamage - this.decreasedRolledReflectDamage;
        return Math.max(0, value);
    }
    getReflectPercent() {
        const value = this.increasedReflectDamage - this.decreasedReflectDamage;
        return Math.max(0, value);
    }
}
class PlayerModifiers extends CombatModifiers {
    constructor() {
        super();
        this.increasedRuneProvision = 0;
        this.increasedChanceToDoubleLootCombat = 0;
        this.decreasedChanceToDoubleLootCombat = 0;
        this.increasedSlayerCoins = 0;
        this.decreasedSlayerCoins = 0;
        this.increasedGPGlobal = 0;
        this.decreasedGPGlobal = 0;
        this.increasedGPFromMonsters = 0;
        this.decreasedGPFromMonsters = 0;
        this.increasedGPFromMonstersFlat = 0;
        this.decreasedGPFromMonstersFlat = 0;
        this.increasedGPFromThieving = 0;
        this.decreasedGPFromThieving = 0;
        this.increasedGPFromThievingFlat = 0;
        this.decreasedGPFromThievingFlat = 0;
        this.increasedDamageToBosses = 0;
        this.decreasedDamageToBosses = 0;
        this.increasedDamageToSlayerTasks = 0;
        this.decreasedDamageToSlayerTasks = 0;
        this.increasedDamageToSlayerAreaMonsters = 0;
        this.decreasedDamageToSlayerAreaMonsters = 0;
        this.increasedDamageToCombatAreaMonsters = 0;
        this.decreasedDamageToCombatAreaMonsters = 0;
        this.increasedDamageToDungeonMonsters = 0;
        this.decreasedDamageToDungeonMonsters = 0;
        this.increasedDamageToAllMonsters = 0;
        this.decreasedDamageToAllMonsters = 0;
        this.increasedAutoEatEfficiency = 0;
        this.decreasedAutoEatEfficiency = 0;
        this.increasedAutoEatThreshold = 0;
        this.decreasedAutoEatThreshold = 0;
        this.increasedAutoEatHPLimit = 0;
        this.decreasedAutoEatHPLimit = 0;
        this.increasedFoodHealingValue = 0;
        this.decreasedFoodHealingValue = 0;
        this.increasedChanceToPreservePrayerPoints = 0;
        this.decreasedChanceToPreservePrayerPoints = 0;
        this.increasedFlatPrayerCostReduction = 0;
        this.decreasedFlatPrayerCostReduction = 0;
        this.increasedAmmoPreservation = 0;
        this.decreasedAmmoPreservation = 0;
        this.increasedRunePreservation = 0;
        this.decreasedRunePreservation = 0;
        this.increasedSlayerAreaEffectNegationFlat = 0;
        this.decreasedSlayerAreaEffectNegationFlat = 0;
        this.decreasedMonsterRespawnTimer = 0;
        this.increasedMonsterRespawnTimer = 0;
        this.increasedGPFromSales = 0;
        this.decreasedGPFromSales = 0;
        this.increasedBankSpace = 0;
        this.decreasedBankSpace = 0;
        this.increasedBankSpaceShop = 0;
        this.decreasedBankSpaceShop = 0;
        this.increasedChanceToPreservePotionCharge = 0;
        this.decreasedChanceToPreservePotionCharge = 0;
        this.increasedChanceToDoubleLootThieving = 0;
        this.decreasedChanceToDoubleLootThieving = 0;
        this.increasedGlobalPreservationChance = 0;
        this.decreasedGlobalPreservationChance = 0;
        this.increasedStaminaPreservationChance = 0;
        this.decreasedStaminaPreservationChance = 0;
        this.increasedGlobalMasteryXP = 0;
        this.decreasedGlobalMasteryXP = 0;
        this.increasedGlobalSkillXP = 0;
        this.decreasedGlobalSkillXP = 0;
        this.increasedMaxStamina = 0;
        this.decreasedMaxStamina = 0;
        this.increasedMiningNodeHP = 0;
        this.decreasedMiningNodeHP = 0;
        this.dungeonEquipmentSwapping = 0;
        this.increasedEquipmentSets = 0;
        this.autoSlayerUnlocked = 0;
        this.increasedTreeCutLimit = 0;
        this.increasedChanceToDoubleItemsGlobal = 0;
        this.decreasedChanceToDoubleItemsGlobal = 0;
        this.increasedFarmingYield = 0;
        this.decreasedFarmingYield = 0;
        this.increasedStaminaPerObstacle = 0;
        this.decreasedStaminaPerObstacle = 0;
        this.increasedSlayerTaskLength = 0;
        this.decreasedSlayerTaskLength = 0;
        this.increasedStaminaCost = 0;
        this.decreasedStaminaCost = 0;
        this.increasedGPFromAgility = 0;
        this.decreasedGPFromAgility = 0;
        this.increasedChanceToDoubleOres = 0;
        this.decreasedChanceToDoubleOres = 0;
        this.golbinRaidWaveSkipCostReduction = 0;
        this.golbinRaidIncreasedMinimumFood = 0;
        this.golbinRaidIncreasedMaximumAmmo = 0;
        this.golbinRaidIncreasedMaximumRunes = 0;
        this.golbinRaidPrayerUnlocked = 0;
        this.golbinRaidIncreasedPrayerLevel = 0;
        this.golbinRaidIncreasedPrayerPointsStart = 0;
        this.golbinRaidIncreasedPrayerPointsWave = 0;
        this.golbinRaidPassiveSlotUnlocked = 0;
        this.golbinRaidIncreasedStartingRuneCount = 0;
        this.golbinRaidStartingWeapon = 0;
        this.increasedPotionChargesFlat = 0;
        this.decreasedPotionChargesFlat = 0;
        this.increasedBirdNestDropRate = 0;
        this.decreasedBirdNestDropRate = 0;
        this.increasedChanceNoDamageMining = 0;
        this.decreasedChanceNoDamageMining = 0;
        this.increasedSeeingGoldChance = 0;
        this.decreasedSeeingGoldChance = 0;
        this.increasedChanceDoubleHarvest = 0;
        this.decreasedChanceDoubleHarvest = 0;
        this.increasedChanceForElementalRune = 0;
        this.decreasedChanceForElementalRune = 0;
        this.increasedElementalRuneGain = 0;
        this.decreasedElementalRuneGain = 0;
        this.increasedChanceRandomPotionHerblore = 0;
        this.decreasedChanceRandomPotionHerblore = 0;
        this.freeBonfires = 0;
        this.increasedAltMagicSkillXP = 0;
        this.decreasedAltMagicSkillXP = 0;
        this.aprilFoolsIncreasedMovementSpeed = 0;
        this.aprilFoolsDecreasedMovementSpeed = 0;
        this.aprilFoolsIncreasedTeleportCost = 0;
        this.aprilFoolsDecreasedTeleportCost = 0;
        this.aprilFoolsIncreasedUpdateDelay = 0;
        this.aprilFoolsDecreasedUpdateDelay = 0;
        this.aprilFoolsIncreasedLemonGang = 0;
        this.aprilFoolsDecreasedLemonGang = 0;
        this.aprilFoolsIncreasedCarrotGang = 0;
        this.aprilFoolsDecreasedCarrotGang = 0;
        this.increasedGPOnEnemyHit = 0;
        this.decreasedGPOnEnemyHit = 0;
        this.increasedAdditionalRunecraftCountRunes = 0;
        this.decreasedAdditionalRunecraftCountRunes = 0;
        this.summoningSynergy_0_1 = 0;
        this.summoningSynergy_0_6 = 0;
        this.summoningSynergy_0_7 = 0;
        this.summoningSynergy_0_8 = 0;
        this.summoningSynergy_0_12 = 0;
        this.summoningSynergy_0_13 = 0;
        this.summoningSynergy_0_14 = 0;
        this.summoningSynergy_0_15 = 0;
        this.summoningSynergy_1_2 = 0;
        this.summoningSynergy_1_8 = 0;
        this.summoningSynergy_1_12 = 0;
        this.summoningSynergy_1_13 = 0;
        this.summoningSynergy_1_14 = 0;
        this.summoningSynergy_1_15 = 0;
        this.summoningSynergy_2_12 = 0;
        this.summoningSynergy_2_13 = 0;
        this.summoningSynergy_2_15 = 0;
        this.summoningSynergy_3_4 = 0;
        this.summoningSynergy_3_5 = 0;
        this.summoningSynergy_3_9 = 0;
        this.summoningSynergy_3_10 = 0;
        this.summoningSynergy_3_11 = 0;
        this.summoningSynergy_3_16 = 0;
        this.summoningSynergy_3_17 = 0;
        this.summoningSynergy_3_18 = 0;
        this.summoningSynergy_3_19 = 0;
        this.summoningSynergy_4_5 = 0;
        this.summoningSynergy_4_9 = 0;
        this.summoningSynergy_4_10 = 0;
        this.summoningSynergy_4_11 = 0;
        this.summoningSynergy_4_16 = 0;
        this.summoningSynergy_4_17 = 0;
        this.summoningSynergy_4_18 = 0;
        this.summoningSynergy_4_19 = 0;
        this.summoningSynergy_5_9 = 0;
        this.summoningSynergy_5_10 = 0;
        this.summoningSynergy_5_11 = 0;
        this.summoningSynergy_5_16 = 0;
        this.summoningSynergy_5_17 = 0;
        this.summoningSynergy_5_18 = 0;
        this.summoningSynergy_6_7 = 0;
        this.summoningSynergy_6_8 = 0;
        this.summoningSynergy_6_12 = 0;
        this.summoningSynergy_6_13 = 0;
        this.summoningSynergy_6_14 = 0;
        this.summoningSynergy_6_15 = 0;
        this.summoningSynergy_7_8 = 0;
        this.summoningSynergy_7_12 = 0;
        this.summoningSynergy_7_13 = 0;
        this.summoningSynergy_7_14 = 0;
        this.summoningSynergy_7_15 = 0;
        this.summoningSynergy_8_12 = 0;
        this.summoningSynergy_8_13 = 0;
        this.summoningSynergy_8_14 = 0;
        this.summoningSynergy_9_10 = 0;
        this.summoningSynergy_9_11 = 0;
        this.summoningSynergy_9_16 = 0;
        this.summoningSynergy_9_17 = 0;
        this.summoningSynergy_9_18 = 0;
        this.summoningSynergy_9_19 = 0;
        this.summoningSynergy_10_11 = 0;
        this.summoningSynergy_10_16 = 0;
        this.summoningSynergy_10_17 = 0;
        this.summoningSynergy_10_18 = 0;
        this.summoningSynergy_10_19 = 0;
        this.summoningSynergy_11_16 = 0;
        this.summoningSynergy_11_17 = 0;
        this.summoningSynergy_11_18 = 0;
        this.summoningSynergy_11_19 = 0;
        this.summoningSynergy_12_13 = 0;
        this.summoningSynergy_12_14 = 0;
        this.summoningSynergy_13_14 = 0;
        this.summoningSynergy_16_17 = 0;
        this.summoningSynergy_16_18 = 0;
        this.summoningSynergy_16_19 = 0;
        this.summoningSynergy_17_18 = 0;
        this.summoningSynergy_17_19 = 0;
        this.summoningSynergy_18_19 = 0;
        this.increasedChanceToConvertSeedDrops = 0;
        this.increasedMeleeStrengthBonus = 0;
        this.decreasedMeleeStrengthBonus = 0;
        this.increasedRangedStrengthBonus = 0;
        this.decreasedRangedStrengthBonus = 0;
        this.increasedMagicDamageBonus = 0;
        this.decreasedMagicDamageBonus = 0;
        this.increasedAgilityObstacleCost = 0;
        this.decreasedAgilityObstacleCost = 0;
        this.decreasedFoodBurnChance = 0;
        this.decreasedSecondaryFoodBurnChance = 0;
        this.freeCompost = 0;
        this.increasedCompostPreservationChance = 0;
        this.increasedOffItemChance = 0;
        this.increasedFiremakingCoalChance = 0;
        this.increasedMiningGemChance = 0;
        this.doubleOresMining = 0;
        this.increasedBonusCoalMining = 0;
        this.decreasedSmithingCoalCost = 0;
        this.increasedThievingSuccessRate = 0;
        this.increasedThievingSuccessCap = 0;
        this.allowSignetDrops = 0;
        this.bonusCoalOnDungeonCompletion = 0;
        this.increasedMasteryPoolProgress = 0;
        this.bypassSlayerItems = 0;
        this.itemProtection = 0;
        this.increasedRedemptionPercent = 0;
        this.increasedRedemptionThreshold = 0;
        this.autoLooting = 0;
        this.autoBurying = 0;
        this.increasedCombatStoppingThreshold = 0;
        this.decreasedSummoningShardCost = 0;
        this.increasedSummoningShardCost = 0;
        this.increasedSummoningCreationCharges = 0;
        this.decreasedSummoningCreationCharges = 0;
        this.increasedSummoningChargePreservation = 0;
        this.decreasedSummoningChargePreservation = 0;
        this.decreasedPrayerCost = 0;
        this.increasedPrayerCost = 0;
        this.increasedGPMultiplierPer1MGP = 0;
        this.increasedGPMultiplierCap = 0;
        this.increasedGPMultiplierMin = 0;
        this.allowAttackAugmentingMagic = 0;
        this.skillModifiers = new Map();
    }
    get combatLootDoubleChance() {
        return this.increasedChanceToDoubleItemsGlobal - this.decreasedChanceToDoubleItemsGlobal + this.increasedChanceToDoubleLootCombat - this.decreasedChanceToDoubleLootCombat;
    }
    get increasedCombatGP() {
        return this.increasedGPFromMonsters - this.decreasedGPFromMonsters + this.increasedGPGlobal - this.decreasedGPGlobal;
    }
    get runePreservationChance() {
        const chance = this.increasedRunePreservation - this.decreasedRunePreservation;
        return Math.min(chance, 80);
    }
    get ammoPreservationChance() {
        const chance = this.increasedAmmoPreservation - this.decreasedAmmoPreservation;
        return Math.min(chance, 80);
    }
    addModifiers(modifiers, negMult=1, posMult=1) {
        Object.entries(modifiers).forEach((entry)=>{
            var _a;
            if (isSkillEntry(entry)) {
                const skillMap = (_a = this.skillModifiers.get(entry[0])) !== null && _a !== void 0 ? _a : new Map();
                entry[1].forEach((skillTuple)=>{
                    var _a;
                    let value = 0;
                    if (modifierData[entry[0]].isNegative) {
                        value = skillTuple[1] * negMult;
                    } else {
                        value = skillTuple[1] * posMult;
                    }
                    skillMap.set(skillTuple[0], ((_a = skillMap.get(skillTuple[0])) !== null && _a !== void 0 ? _a : 0) + value);
                }
                );
                this.skillModifiers.set(entry[0], skillMap);
            } else {
                if (modifierData[entry[0]].isNegative) {
                    this[entry[0]] += entry[1] * negMult;
                } else {
                    this[entry[0]] += entry[1] * posMult;
                }
            }
        }
        );
    }
    reset() {
        Object.entries(modifierData).forEach((entry)=>{
            if (!isSkillEntry(entry)) {
                this[entry[0]] = 0;
            }
        }
        );
        this.skillModifiers.clear();
    }
    getSkillModifierValue(key, skill) {
        var _a;
        const skillMap = this.skillModifiers.get(key);
        if (skillMap === undefined)
            return 0;
        else
            return (_a = skillMap.get(skill)) !== null && _a !== void 0 ? _a : 0;
    }
    getGPForDamageMultiplier(attackType) {
        let totalMod = 0;
        switch (attackType) {
        case 'melee':
            totalMod += this.summoningSynergy_0_6;
            break;
        case 'ranged':
            totalMod += this.summoningSynergy_0_7;
            break;
        case 'magic':
            totalMod += this.summoningSynergy_0_8;
            break;
        }
        return totalMod;
    }
    get meleeStrengthBonusModifier() {
        return this.increasedMeleeStrengthBonus - this.decreasedMeleeStrengthBonus;
    }
    get rangedStrengthBonusModifier() {
        return this.increasedRangedStrengthBonus - this.decreasedRangedStrengthBonus;
    }
    get magicDamageModifier() {
        return this.increasedMagicDamageBonus - this.decreasedMagicDamageBonus;
    }
    getHiddenSkillLevels(skill) {
        return this.getSkillModifierValue('increasedHiddenSkillLevel', skill) - this.getSkillModifierValue('decreasedHiddenSkillLevel', skill);
    }
    getActiveModifierDescriptions() {
        const descriptions = [];
        Object.entries(modifierData).forEach((entry)=>{
            if (!isSkillEntry(entry) && this[entry[0]] !== 0)
                descriptions.push(printPlayerModifier(entry[0], this[entry[0]]));
        }
        );
        this.skillModifiers.forEach((skillMap,key)=>{
            skillMap.forEach((value,skill)=>{
                descriptions.push(printPlayerModifier(key, [skill, value]));
            }
            );
        }
        );
        return descriptions;
    }
}
class AgilityModifiers {
    constructor() {
        this.skillModifiers = new Map();
        this.standardModifiers = new Map();
    }
    addModifiers(modifiers, negMult=1, posMult=1) {
        Object.entries(modifiers).forEach((entry)=>{
            var _a, _b;
            if (isSkillEntry(entry)) {
                const skillMap = (_a = this.skillModifiers.get(entry[0])) !== null && _a !== void 0 ? _a : new Map();
                entry[1].forEach((skillTuple)=>{
                    var _a;
                    let value = 0;
                    if (modifierData[entry[0]].isNegative) {
                        value = skillTuple[1] * negMult;
                    } else {
                        value = skillTuple[1] * posMult;
                    }
                    skillMap.set(skillTuple[0], ((_a = skillMap.get(skillTuple[0])) !== null && _a !== void 0 ? _a : 0) + value);
                }
                );
                this.skillModifiers.set(entry[0], skillMap);
            } else {
                const value = entry[1] * (modifierData[entry[0]].isNegative ? negMult : posMult);
                this.standardModifiers.set(entry[0], value + ((_b = this.standardModifiers.get(entry[0])) !== null && _b !== void 0 ? _b : 0));
            }
        }
        );
    }
    reset() {
        this.standardModifiers.clear();
        this.skillModifiers.clear();
    }
    getActiveModifierDescriptions() {
        const descriptions = [];
        this.standardModifiers.forEach((value,key)=>{
            descriptions.push(printPlayerModifier(key, value));
        }
        );
        this.skillModifiers.forEach((skillMap,key)=>{
            skillMap.forEach((value,skill)=>{
                descriptions.push(printPlayerModifier(key, [skill, value]));
            }
            );
        }
        );
        return descriptions;
    }
}
class TargetModifiers {
    constructor() {
        this.modifiers = new Map();
    }
    addModifiers(modifiers, negMult=1, posMult=1) {
        Object.entries(modifiers).forEach((entry)=>{
            var _a;
            const value = entry[1] * (modifierData[entry[0]].isNegative ? negMult : posMult);
            this.modifiers.set(entry[0], value + ((_a = this.modifiers.get(entry[0])) !== null && _a !== void 0 ? _a : 0));
        }
        );
    }
    addToCombatModifiers(combatModifiers) {
        this.modifiers.forEach((value,key)=>{
            combatModifiers[key] += value;
        }
        );
    }
    reset() {
        this.modifiers.clear();
    }
}
function printPlayerModifier(key, value) {
    const text = modifierData[key].format(value);
    const textClass = modifierData[key].isNegative ? 'font-w700 text-danger' : 'text-success';
    return [text, textClass];
}
function isSkillEntry(entry) {
    return modifierData[entry[0]].isSkill;
}
const conditionalModifierData = [{
    itemID: CONSTANTS.item.Crown_of_Rhaelyx,
    modifiers: {
        increasedGlobalPreservationChance: 15,
    },
    active: false,
    type: 'BankItem',
    bankItemID: CONSTANTS.item.Charge_Stone_of_Rhaelyx,
}, {
    itemID: CONSTANTS.item.Guardian_Amulet,
    modifiers: {
        increasedDamageReduction: 5,
        increasedAttackIntervalPercent: 10,
    },
    active: false,
    type: 'Hitpoints',
    percent: 50
}, {
    itemID: CONSTANTS.item.Cooking_Gloves,
    modifiers: {
        decreasedFoodBurnChance: 100,
        decreasedSecondaryFoodBurnChance: 1,
    },
    active: false,
    type: 'GloveCharges',
    gloveID: CONSTANTS.shop.gloves.Cooking
}, {
    itemID: CONSTANTS.item.Gem_Gloves,
    modifiers: {
        increasedMiningGemChance: 100,
    },
    active: false,
    type: 'GloveCharges',
    gloveID: CONSTANTS.shop.gloves.Gem
}, {
    itemID: CONSTANTS.item.Mining_Gloves,
    modifiers: {
        doubleOresMining: 1,
    },
    active: false,
    type: 'GloveCharges',
    gloveID: CONSTANTS.shop.gloves.Mining
}, {
    itemID: CONSTANTS.item.Smithing_Gloves,
    modifiers: {
        increasedSkillXP: [[CONSTANTS.skill.Smithing, 60]],
    },
    active: false,
    type: 'GloveCharges',
    gloveID: CONSTANTS.shop.gloves.Smithing
}, {
    itemID: CONSTANTS.item.Thieving_Gloves,
    modifiers: {
        increasedThievingSuccessCap: 5,
        increasedThievingSuccessRate: 10
    },
    active: false,
    type: 'GloveCharges',
    gloveID: CONSTANTS.shop.gloves.Thieving
}];
function checkGloveCondition(condition) {
    return glovesTracker[condition.gloveID].remainingActions > 0;
}
const conditionalModifiers = new Map();
conditionalModifierData.forEach((data)=>{
    conditionalModifiers.set(data.itemID, data);
}
);
function describeModifierData(modifiers) {
    const modSpans = getModifierDataSpans(modifiers);
    return joinAsList(modSpans);
}
function getModifierDataSpans(modifiers, negMult=1, posMult=1) {
    const modSpans = [];
    Object.entries(modifiers).forEach((entry)=>{
        const isNeg = modifierData[entry[0]].isNegative;
        const mult = isNeg ? negMult : posMult;
        if (isSkillEntry(entry)) {
            entry[1].forEach((data)=>{
                const tempVal = [data[0], data[1] * mult];
                const [desc,format] = printPlayerModifier(entry[0], tempVal);
                if (SETTINGS.general.enableNeutralSpecModifiers)
                    modSpans.push(`<span class="font-w700 text-warning">${desc}</span>`);
                else
                    modSpans.push(`<span class="${format}">${desc}</span>`);
            }
            );
        } else {
            const [desc,format] = printPlayerModifier(entry[0], entry[1] * mult);
            if (SETTINGS.general.enableNeutralSpecModifiers)
                modSpans.push(`<span class="font-w700 text-warning">${desc}</span>`);
            else
                modSpans.push(`<span class="${format}">${desc}</span>`);
        }
    }
    );
    return modSpans;
}
