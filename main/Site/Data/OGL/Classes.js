/*
    Copyright 2021 Drew Banyai

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

var { ABILITY_SCORES } = require('./AbilityScores')
var { CHARACTER } = require('./Character')
var { EQUIPMENT } = require('./Equipment')
var { SKILLS } = require('./Skills')

var { DiceRoller } = require('../../HelperFunctions/DiceRoller')
var { ChooseXFromList } = require('../../HelperFunctions/HelperFuncs')
var { RandIntBetween } = require('../../HelperFunctions/Random')

const CLASSES = {
    CharacterLevel: RandIntBetween(3, 8),
    Cleric: {
        DetermineAbilityScores() {
            const abilityScoreChoices = [
                ABILITY_SCORES.CreateAbilityScoreBlock(6, 15, 15, 17, 16, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(5, 15, 12, 10, 15, 11),
                ABILITY_SCORES.CreateAbilityScoreBlock(11, 10, 11, 14, 13, 12),
                ABILITY_SCORES.CreateAbilityScoreBlock(13, 16, 12, 10, 14, 11),
                ABILITY_SCORES.CreateAbilityScoreBlock(9, 18, 14, 10, 14, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(16, 8, 11, 15, 14, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(9, 12, 8, 13, 16, 17),
                ABILITY_SCORES.CreateAbilityScoreBlock(10, 9, 8, 17, 15, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(13, 13, 9, 16, 15, 15),
                ABILITY_SCORES.CreateAbilityScoreBlock(16, 12, 9, 17, 15, 13),
            ];
            return ChooseXFromList(1, abilityScoreChoices)[0];
        },
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["HISTORY", "INSIGHT", "MEDICINE", "PERSUASION", "RELIGION"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        GetClassTraits() {
            let clericSkills = CLASSES.Cleric.GetStartingSkillProficiencies();

            let clericWeaponProfs = EQUIPMENT.GetEquipmentTriggerList(["SIMPLE_MELEE"], []);
            let clericArmorProfs = EQUIPMENT.GetEquipmentTriggerList([], ["LIGHT_ARMOR", "HEAVY_ARMOR", "SHIELDS"]);

            return {
                HitDicePerLevel: "1d8",
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["WISDOM", "CHARISMA"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData(clericWeaponProfs),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData(clericArmorProfs),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies(clericSkills),
            };
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            let weapon = ["Mace", "Warhammer"][RandIntBetween(0, character.WeaponProficiencies["WARHAMMER"] ? 1 : 0)]
            equipment.push({ item: weapon, count: 1});

            let armor = ["Scale Mail", "Leather Armor", "Chain mail"][RandIntBetween(0, character.ArmorProficiencies["CHAINMAIL"] ? 2 : 1)];
            equipment.push({ item: armor, count: 1 });

            let extraWeapon = ["Light Crossbow", EQUIPMENT.WEAPONS.SIMPLE_MELEE[RandIntBetween(0, EQUIPMENT.WEAPONS.SIMPLE_MELEE.length - 1)].name][RandIntBetween(0, 1)];
            equipment.push({ item: extraWeapon, count: 1 });
            if (extraWeapon === "Light Crossbow") equipment.push({ item: "Bolt", count: 20 })

            let clericPack = ["Priest's Pack", "Explorer's Pack"][RandIntBetween(0, 1)];
            equipment.push({ item: clericPack, count: 1 });

            equipment.push({ item: "Shield", count: 1 });
            equipment.push({ item: "Holy Symbol", count: 1 });

            return equipment;
        },
    },
    Fighter: {
        DetermineAbilityScores() {
            const abilityScoreChoices = [
                ABILITY_SCORES.CreateAbilityScoreBlock(15, 11, 17, 15, 14, 14),
                ABILITY_SCORES.CreateAbilityScoreBlock(8, 15, 13, 12, 4, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 15, 7, 15, 16, 13),
                ABILITY_SCORES.CreateAbilityScoreBlock(14, 13, 3, 8, 9, 17),
                ABILITY_SCORES.CreateAbilityScoreBlock(15, 13, 17, 12, 7, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(8, 15, 14, 16, 11, 13),
                ABILITY_SCORES.CreateAbilityScoreBlock(14, 18, 10, 17, 15, 15),
                ABILITY_SCORES.CreateAbilityScoreBlock(15, 13, 14, 10, 12, 14),
                ABILITY_SCORES.CreateAbilityScoreBlock(13, 11, 16, 4, 14, 11),
                ABILITY_SCORES.CreateAbilityScoreBlock(13, 9, 10, 13, 13, 15),
            ];
            return ChooseXFromList(1, abilityScoreChoices)[0];
        },
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["ACROBATICS", "ANIMAL HANDLING", "ATHLETICS", "HISTORY", "INSIGHT", "INTIMIDATION", "PERCEPTION", "SURVIVAL"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 10 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d10").total + modifiers.Constitution; },
        GetClassTraits() {
            let fighterSkills = CLASSES.Fighter.GetStartingSkillProficiencies();

            let fighterWeaponProfs = EQUIPMENT.GetEquipmentTriggerList(["SIMPLE_MELEE", "SIMPLE_RANGED", "MARTIAL_MELEE", "MARTIAL_RANGED"], []);
            let fighterArmorProfs = EQUIPMENT.GetEquipmentTriggerList([], ["LIGHT_ARMOR", "MEDIUM_ARMOR", "HEAVY_ARMOR", "SHIELDS"]);

            let fightingStyles = [
                "You gain a +2 bonus to attack rolls you make with ranged weapons.",
                "While you are wearing armor, you gain a +1 bonus to AC.",
                "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
                "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if hte new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
                "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
                "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
            ];
            let fightingStyleNote = fightingStyles[RandIntBetween(0, fightingStyles.length - 1)];

            return {
                HitDicePerLevel: "1d10",
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["Strength", "Constitution"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData(fighterWeaponProfs),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData(fighterArmorProfs),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies(fighterSkills),
                Notes: [
                    fightingStyleNote,
                    "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your level. Must finish a short or long rest to use this ability again.",
                ]
            };
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            if (character.AbilityScores["Strength"] > character.AbilityScores["Dexterity"]) equipment.push({ item: "Chain Mail", count: 1 });
            else {
                equipment.push({ item: "Leather Armor", count: 1 });
                equipment.push({ item: "Longbow", count: 1 });
                equipment.push({ item: "Arrow", count: 20 });
            }

            let martialWeapons = EQUIPMENT.GetEquipmentNameList(["MARTIAL_MELEE"], []);
            if (RandIntBetween(0, 1) === 0) {
                equipment.push({ item: martialWeapons[RandIntBetween(0, martialWeapons.length - 1)], count: 1 });
                equipment.push({ item: "Shield", count: 1 });
            }
            else {
                let martialWeapon1 = martialWeapons[RandIntBetween(0, martialWeapons.length - 1)];
                let martialWeapon2 = martialWeapon1;
                while (martialWeapon1 === martialWeapon2) martialWeapon2 = martialWeapons[RandIntBetween(0, martialWeapons.length - 1)];
                equipment.push({ item: martialWeapon1, count: 1 });
                equipment.push({ item: martialWeapon2, count: 1 });
            }

            if (RandIntBetween(0, 1) === 0) {
                equipment.push({ item: "Light Crossbow", count: 1 });
                equipment.push({ item: "Bolt", count: 20 });
            }
            else equipment.push({ item: "Handaxe", count: 2 });

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Dungeoneer's Pack", count: 1 });
            else equipment.push({ item: "Explorer's Pack", count: 1 });

            return equipment;
        },
    },
    Rogue: {
        DetermineAbilityScores() {
            const abilityScoreChoices = [
                ABILITY_SCORES.CreateAbilityScoreBlock(17, 13, 12, 16, 9, 12),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 9, 12, 15, 12, 12),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 16, 9, 17, 16, 14),
                ABILITY_SCORES.CreateAbilityScoreBlock(10, 13, 15, 14, 10, 17),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 15, 17, 13, 14, 13),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 11, 13, 15, 16, 10),
                ABILITY_SCORES.CreateAbilityScoreBlock(12, 15, 14, 15, 8, 15),
                ABILITY_SCORES.CreateAbilityScoreBlock(6, 11, 13, 16, 12, 9),
                ABILITY_SCORES.CreateAbilityScoreBlock(14, 15, 8, 14, 11, 9),
                ABILITY_SCORES.CreateAbilityScoreBlock(15, 15, 14, 14, 17, 13),
            ];
            return ChooseXFromList(1, abilityScoreChoices)[0];
        },
        GetStartingSkillProficiencies() { return ChooseXFromList(4, ["ACROBATICS", "ATHLETICS", "DECEPTION", "INSIGHT", "INTIMIDATION", "INVESTIGATION", "PERCEPTION", "PERFORMANCE", "PERSUASION", "SLEIGHT OF HAND", "STEALTH"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        GetClassTraits() {
            let rogueSkills = CLASSES.Rogue.GetStartingSkillProficiencies();

            let rogueWeaponProfs = EQUIPMENT.GetEquipmentTriggerList(["SIMPLE_MELEE", "SIMPLE_RANGED"], []).concat(["CROSSBOW_HAND", "LONGSWORD", "RAPIER", "SHORTSWORD"]);
            let rogueArmorProfs = EQUIPMENT.GetEquipmentTriggerList([], ["LIGHT_ARMOR"]);

            return {
                HitDicePerLevel: "1d8",
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["DEXTERITY", "INTELLIGENCE"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData(rogueWeaponProfs),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData(rogueArmorProfs),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData("THIEVESTOOLS"),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies(rogueSkills),
                Notes: []
            };
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Rapier", count: 1 });
            else equipment.push({ item: "Shortsword", count: 1 });

            if (RandIntBetween(0, 1) === 0) {
                equipment.push({ item: "Shortbow", count: 1 });
                equipment.push({ item: "Arrow", count: 20 });
            }
            else equipment.push({ item: "Shortsword", count: 1 });

            let pack = ChooseXFromList(1, ["Burglar's Pack", "Dungeoneer's Pack", "Explorer's Pack"])[0];
            equipment.push({ item: pack, count: 1 });

            equipment.push({ item: "Leather Armor", count: 1 });
            equipment.push({ item: "Dagger", count: 2 });
            equipment.push({ item: "Thieve's Tools", count: 1 });

            return equipment;
        },
    },
    Wizard: {
        DetermineAbilityScores() {
            const abilityScoreChoices = [
                ABILITY_SCORES.CreateAbilityScoreBlock(5, 16, 10, 12, 15, 16),
                ABILITY_SCORES.CreateAbilityScoreBlock(9, 14, 14, 16, 11, 14),
                ABILITY_SCORES.CreateAbilityScoreBlock(18, 15, 12, 16, 13, 11),
                ABILITY_SCORES.CreateAbilityScoreBlock(17, 15, 15, 12, 13, 12),
                ABILITY_SCORES.CreateAbilityScoreBlock(17, 15, 12, 15, 10, 16),
                ABILITY_SCORES.CreateAbilityScoreBlock(10, 13, 12, 11, 8, 11),
                ABILITY_SCORES.CreateAbilityScoreBlock(14, 13, 13, 13, 11, 16),
                ABILITY_SCORES.CreateAbilityScoreBlock(10, 13, 15, 16, 14, 8),
                ABILITY_SCORES.CreateAbilityScoreBlock(15, 14, 14, 12, 9, 17),
                ABILITY_SCORES.CreateAbilityScoreBlock(10, 18, 14, 16, 13, 12),
            ];
            return ChooseXFromList(1, abilityScoreChoices)[0];
        },
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["ARCANA", "HISTORY", "INSIGHT", "INVESTIGATION", "MEDICINE", "RELIGION"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        GetClassTraits() {
            let wizardSkills = CLASSES.Wizard.GetStartingSkillProficiencies();

            return {
                HitDicePerLevel: "1d6",
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["INTELLIGENCE", "WISDOM"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData(["DAGGER", "DART", "SLING", "QUARTERSTAFF", "CROSSBOW_LIGHT"]),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData([]),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies(wizardSkills),
                Notes: []
            };
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Quarterstaff", count: 1 });
            else equipment.push({ item: "Dagger", count: 1 });

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Component Pouch", count: 1 });
            else equipment.push({ item: "Arcane Focus", count: 1 });

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Scholar's Pack", count: 1 });
            else equipment.push({ item: "Explorer's Pack", count: 1 });

            equipment.push({ item: "Spellbook", count: 1 });

            return equipment;
        },
    }
}

//  Module Exports
module.exports = { CLASSES }