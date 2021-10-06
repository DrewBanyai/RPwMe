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
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["History", "Insight", "Medicine", "Persuasion", "Religion"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        AssignClassTraits(character) {
            character.HitDicePerLevel = "1d8";

            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Wisdom", "Charisma"]));

            let clericWeaponProfs = EQUIPMENT.GetEquipmentNameList(["Simple Melee", "Simple Ranged"], []);
            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData(clericWeaponProfs));

            let clericArmorProfs = EQUIPMENT.GetEquipmentNameList([], ["Light Armor", "Heavy Armor", "Shield"]);
            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData(clericArmorProfs));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            let clericSkills = CLASSES.Cleric.GetStartingSkillProficiencies();
            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies(clericSkills));
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            let testArray = [];
            for (let i = 0; i < 10; ++i) testArray[i] = RandIntBetween(0, character.WeaponProficiencies["Warhammer"] ? 1 : 0);
            console.log(testArray);

            let weapon = ["Mace", "Warhammer"][RandIntBetween(0, character.WeaponProficiencies["Warhammer"] ? 1 : 0)]
            equipment.push({ item: weapon, count: 1});

            let armor = ["Scale Mail Armor", "Leather Armor", "Chain Mail Armor"][RandIntBetween(0, character.ArmorProficiencies["Chain Mail Armor"] ? 2 : 1)];
            equipment.push({ item: armor, count: 1 });

            let extraWeapon = ["Crossbow, light", EQUIPMENT.WEAPONS["Simple Melee"][RandIntBetween(0, EQUIPMENT.WEAPONS["Simple Melee"].length - 1)].name][RandIntBetween(0, 1)];
            equipment.push({ item: extraWeapon, count: 1 });
            if (extraWeapon === "Crossbow, light") equipment.push({ item: "Bolt", count: 20 })

            let clericPack = ["Priest's Pack", "Explorer's Pack"][RandIntBetween(0, 1)];
            equipment.push({ item: clericPack, count: 1 });

            equipment.push({ item: "Shield", count: 1 });
            equipment.push({ item: "Holy Symbol", count: 1 });

            return equipment;
        },
        DetermineWeaponOfChoice(character) {
            let allWeapons = EQUIPMENT.GetAllWeaponsInOneList();
            let inventory = character.Inventory;

            let ownedWeapons = [];
            for (let itemIndex in inventory) {
                let equipmentItem = allWeapons.find((w) => w.name === inventory[itemIndex].item);
                if (equipmentItem) { ownedWeapons.push(equipmentItem); }
            }
            if (ownedWeapons.length === 0) { return "None"; }

            //  Cleric Preference 1: Mace
            let mace = ownedWeapons.find((w) => w.name.toLowerCase().includes("mace"));
            if (mace) {
                let shield = !mace.properties.includes("two-handed") && inventory.find((i) => i.item === "Shield");
                if (shield) {
                    //  TODO: Equip items
                    return mace.name + " and Shield";
                }
                else {
                    //  TODO: Equip items
                    return mace.name;
                }
            }

            //  Cleric Preference 1: Hammer
            let hammer = ownedWeapons.find((w) => w.name.toLowerCase().includes("hammer"));
            if (hammer) {
                let shield = !hammer.properties.includes("two-handed") && inventory.find((i) => i.item === "Shield");
                if (shield) {
                    //  TODO: Equip items
                    return hammer.name + " and Shield";
                }
                else {
                    //  TODO: Equip items
                    return hammer.name;
                }
            }

            //  Cleric Preference 2: Bow
            let bow = ownedWeapons.find((w) => w.name.toLowerCase().includes("bow"));
            if (bow) {
                //  TODO: Equip items
                return bow.name;
            }

            //  TODO: Equip items
            return ownedWeapons[0].name;
        },
        DetermineStartingMoneyByLevel(startingLevel) {
            //  NOTE: Currently starting level will always be between 3 and 8
            switch (true) {
                case [1, 2, 3, 4].includes(startingLevel):
                    return (DiceRoller.RollString("5d4").total * 10) * 100;
                case [5, 6, 7, 8, 9, 10].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 25 + 500) * 100;
                case [11, 12, 13, 14, 15, 16].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 250 + 500) * 100;
                case [17, 18, 19, 20]:
                    return (DiceRoller.RollString("1d10").total * 250 + 20000) * 100;
            }
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
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 10 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d10").total + modifiers.Constitution; },
        AssignClassTraits(character) {
            character.HitDicePerLevel = "1d10";

            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Strength", "Constitution"]));

            let fighterWeaponProfs = EQUIPMENT.GetEquipmentNameList(["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"], []);
            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData(fighterWeaponProfs));

            let fighterArmorProfs = EQUIPMENT.GetEquipmentNameList([], ["Light Armor", "Medium Armor", "Heavy Armor", "Shield"]);
            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData(fighterArmorProfs));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            let fighterSkills = CLASSES.Fighter.GetStartingSkillProficiencies();
            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies(fighterSkills));

            let fightingStyles = [
                "You gain a +2 bonus to attack rolls you make with ranged weapons.",
                "While you are wearing armor, you gain a +1 bonus to AC.",
                "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
                "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if hte new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
                "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
                "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
            ];
            let fightingStyleNote = fightingStyles[RandIntBetween(0, fightingStyles.length - 1)];
            character.Notes = [
                fightingStyleNote,
                "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your level. Must finish a short or long rest to use this ability again.",
            ];
        },
        GetClassStartingEquipment(character) {
            let equipment = [];

            if (character.AbilityScores["Strength"] >= character.AbilityScores["Dexterity"]) equipment.push({ item: "Chain Mail Armor", count: 1 });
            else {
                equipment.push({ item: "Leather Armor", count: 1 });
                equipment.push({ item: "Longbow", count: 1 });
                equipment.push({ item: "Arrow", count: 20 });
            }

            let martialWeapons = EQUIPMENT.GetEquipmentNameList(["Martial Melee"], []);
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
                equipment.push({ item: "Crossbow, light", count: 1 });
                equipment.push({ item: "Bolt", count: 20 });
            }
            else equipment.push({ item: "Handaxe", count: 2 });

            if (RandIntBetween(0, 1) === 0) equipment.push({ item: "Dungeoneer's Pack", count: 1 });
            else equipment.push({ item: "Explorer's Pack", count: 1 });

            return equipment;
        },
        DetermineWeaponOfChoice(character) {
            let allWeapons = EQUIPMENT.GetAllWeaponsInOneList();
            let inventory = character.Inventory;

            let ownedWeapons = [];
            for (let itemIndex in inventory) {
                let equipmentItem = allWeapons.find((w) => w.name === inventory[itemIndex].item);
                if (equipmentItem) { ownedWeapons.push(equipmentItem); }
            }
            if (ownedWeapons.length === 0) { return "None"; }

            //  Fighter Preference 1: Martial Melee
            let martialM = ownedWeapons.find((w) => ["Martial Melee", "Martial Ranged"].includes(w.subtype));
            if (martialM) {
                let shield = !martialM.properties.includes("two-handed") && inventory.find((i) => i.item === "Shield");
                if (shield) {
                    //  TODO: Equip items
                    return martialM.name + " and Shield";
                }
                else {
                    let inventoryEntry = inventory.filter((i) => i.item == martialM.name);
                    //  TODO: Equip items
                    return ((inventoryEntry.count > 1) ? "Dual Wield " : "") + martialM.name;
                }
            }

            //  Fighter Preference 2: Martial Ranged
            let martialR = ownedWeapons.find((w) => ["Martial Ranged"].includes(w.subtype));
            if (martialR) {
                let shield = !martialR.properties.includes("two-handed") && inventory.find((i) => i.item === "Shield");
                if (shield) {
                    //  TODO: Equip items
                    return martialR.name + " and Shield";
                }
                else {
                    let inventoryEntry = inventory.filter((i) => i.item == martialR.name);
                    //  TODO: Equip items
                    return ((inventoryEntry.count > 1) ? "Dual Wield " : "") + martialR.name;
                }
            }

            //  TODO: Equip items
            return ownedWeapons[0].name;
        },
        DetermineStartingMoneyByLevel(startingLevel) {
            //  NOTE: Currently starting level will always be between 3 and 8
            switch (true) {
                case [1, 2, 3, 4].includes(startingLevel):
                    return (DiceRoller.RollString("5d4").total * 10) * 100;
                case [5, 6, 7, 8, 9, 10].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 25 + 500) * 100;
                case [11, 12, 13, 14, 15, 16].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 250 + 500) * 100;
                case [17, 18, 19, 20]:
                    return (DiceRoller.RollString("1d10").total * 250 + 20000) * 100;
            }
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
        GetStartingSkillProficiencies() { return ChooseXFromList(4, ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        AssignClassTraits(character) {
            character.HitDicePerLevel = "1d8";

            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Dexterity", "Intelligence"]));

            let rogueWeaponProfs = EQUIPMENT.GetEquipmentNameList(["Simple Melee", "Simple Ranged"], []).concat(["Crossbow, hand", "Longsword", "Rapier", "Shortsword"]);
            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData(rogueWeaponProfs));

            let rogueArmorProfs = EQUIPMENT.GetEquipmentNameList([], ["Light Armor"]);
            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData(rogueArmorProfs));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData(["Thieve's Tools"]));

            let rogueSkills = CLASSES.Rogue.GetStartingSkillProficiencies();
            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies(rogueSkills));

            if (!character.Notes) character.Notes = [];
            character.Notes.concat([]);
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
        DetermineWeaponOfChoice(character) {
            let allWeapons = EQUIPMENT.GetAllWeaponsInOneList();
            let inventory = character.Inventory;

            let ownedWeapons = [];
            for (let itemIndex in inventory) {
                let equipmentItem = allWeapons.find((w) => w.name === inventory[itemIndex].item);
                if (equipmentItem) { ownedWeapons.push(equipmentItem); }
            }
            if (ownedWeapons.length === 0) { return "None"; }

            //  Rogue Preference 1: Rapier or Shortsword
            let sword = ownedWeapons.find((w) => ["Rapier", "Shortsword"].includes(w.name));
            if (sword) {
                let shield = !sword.properties.includes("two-handed") && inventory.find((i) => i.item === "Shield");
                if (shield) {
                    //  TODO: Equip items
                    return sword.name + " and Shield";
                }
                else {
                    //  TODO: Equip items
                    return sword.name;
                }
            }

            //  Rogue Preference 2: Bow
            let bow = ownedWeapons.find((w) => w.name.toLowerCase().includes("bow"));
            if (bow) {
                //  TODO: Equip items
                return bow.name;
            }

            //  TODO: Equip items
            return ownedWeapons[0].name;
        },
        DetermineStartingMoneyByLevel(startingLevel) {
            //  NOTE: Currently starting level will always be between 3 and 8
            switch (true) {
                case [1, 2, 3, 4].includes(startingLevel):
                    return (DiceRoller.RollString("4d4").total * 10) * 100;
                case [5, 6, 7, 8, 9, 10].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 25 + 500) * 100;
                case [11, 12, 13, 14, 15, 16].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 250 + 500) * 100;
                case [17, 18, 19, 20]:
                    return (DiceRoller.RollString("1d10").total * 250 + 20000) * 100;
            }
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
        GetStartingSkillProficiencies() { return ChooseXFromList(2, ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]); },
        GetClassHitPointsAtFirstLevel(modifiers) { return 8 + modifiers.Constitution; },
        GetClassHitPointsAfterFirstLevel(modifiers) { return DiceRoller.RollString("1d8").total + modifiers.Constitution; },
        AssignClassTraits(character) {
            character.HitDicePerLevel = "1d6";

            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Intelligence", "Wisdom"]));

            let wizardWeaponProfs = CHARACTER.CreateWeaponProficiencyData(["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, light"]);
            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData(wizardWeaponProfs));

            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData([]));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            let wizardSkills = CLASSES.Wizard.GetStartingSkillProficiencies();
            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies(wizardSkills));

            if (!character.Notes) character.Notes = [];
            character.Notes.concat([]);
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
        DetermineWeaponOfChoice(character) {
            let allWeapons = EQUIPMENT.GetAllWeaponsInOneList();
            let inventory = character.Inventory;

            let ownedWeapons = [];
            for (let itemIndex in inventory) {
                let equipmentItem = allWeapons.find((w) => w.name === inventory[itemIndex].item);
                if (equipmentItem) { ownedWeapons.push(equipmentItem); }
            }
            if (ownedWeapons.length === 0) { return "None"; }

            //  Wizard Preference 1: Staff
            let staff = ownedWeapons.find((w) => w.name.toLowerCase().includes("staff"));
            if (staff) {
                //  TODO: Equip items
                return staff.name;
            }

            //  Wizard Preference 2: Dagger
            let dagger = ownedWeapons.find((w) => w.name.toLowerCase().includes("dagger"));
            if (dagger) {
                //  TODO: Equip items
                return dagger.name;
            }

            //  TODO: Equip items
            return ownedWeapons[0].name;
        },
        DetermineStartingMoneyByLevel(startingLevel) {
            //  NOTE: Currently starting level will always be between 3 and 8
            switch (true) {
                case [1, 2, 3, 4].includes(startingLevel):
                    return (DiceRoller.RollString("4d4").total * 10) * 100;
                case [5, 6, 7, 8, 9, 10].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 25 + 500) * 100;
                case [11, 12, 13, 14, 15, 16].includes(startingLevel):
                    return (DiceRoller.RollString("1d10").total * 250 + 500) * 100;
                case [17, 18, 19, 20]:
                    return (DiceRoller.RollString("1d10").total * 250 + 20000) * 100;
            }
        },
    }
}

//  Module Exports
module.exports = { CLASSES }