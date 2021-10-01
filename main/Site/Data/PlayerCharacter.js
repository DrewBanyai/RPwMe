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

var { RandIntBetween } = require('../HelperFunctions/Random')
var { DiceRoller } = require('../HelperFunctions/DiceRoller')
var { EQUIPMENT, GetEquipmentTriggerList } = require('../Data/OGL_Equipment')
var { LANGUAGES } = require('../Data/OGL_Languages')

const PlayerCharacter = 
{
    CreateNewCharacter(username, index) {
        return {
            playerUsername: username,
            playerIndex: index,
            character: {
                Race: null,
                Class: null,
                Name: null,
                Inventory: []
            }
        }
    },
    CreateAbilityScoreData(str, dex, con, int, wis, cha) {
        return {
            STRENGTH: str,
            DEXTERITY: dex,
            CONSTITUTION: con,
            INTELLIGENCE: int,
            WISDOM: wis,
            CHARISMA: cha
        };
    },
    CreateSavingThrowAdvantageData(savingThrowList) {
        let data = {
            STRENGTH: false,
            DEXTERITY: false,
            CONSTITUTION: false,
            INTELLIGENCE: false,
            WISDOM: false,
            CHARISMA: false,
            FORTITUDE: false,
            REFLEX: false,
            WILL: false,
            POISON: false,
            CHARM: false,
            FRIGHT: false
        };
        for (let i = 0; i < savingThrowList.length; ++i) data[savingThrowList[i]] = true;
        return data;
    },
    CreateWeaponProficiencyData(proficienyList) {
        //  Create a struct with all weapon triggers as keys, set to false
        let data = {};
        for (let weapon in EQUIPMENT.WEAPONS.SIMPLE_MELEE) { data[EQUIPMENT.WEAPONS.SIMPLE_MELEE[weapon].trigger] = false; }
        for (let weapon in EQUIPMENT.WEAPONS.SIMPLE_RANGED) { data[EQUIPMENT.WEAPONS.SIMPLE_RANGED[weapon].trigger] = false; }
        for (let weapon in EQUIPMENT.WEAPONS.MARTIAL_MELEE) { data[EQUIPMENT.WEAPONS.MARTIAL_MELEE[weapon].trigger] = false; }
        for (let weapon in EQUIPMENT.WEAPONS.MARTIAL_RANGED) { data[EQUIPMENT.WEAPONS.MARTIAL_RANGED[weapon].trigger] = false; }

        //  Fill in the given keys as true
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateArmorProficiencyData(proficienyList) {
        //  Create a struct with all armor triggers as keys, set to false
        let data = {};
        for (let armor in EQUIPMENT.ARMOR.LIGHT_ARMOR) { data[EQUIPMENT.ARMOR.LIGHT_ARMOR[armor].trigger] = false; }
        for (let armor in EQUIPMENT.ARMOR.MEDIUM_ARMOR) { data[EQUIPMENT.ARMOR.MEDIUM_ARMOR[armor].trigger] = false; }
        for (let armor in EQUIPMENT.ARMOR.HEAVY_ARMOR) { data[EQUIPMENT.ARMOR.HEAVY_ARMOR[armor].trigger] = false; }
    
        //  Fill in the given keys as true
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateToolProficiencyData(proficienyList) {
        //  Create a struct with all armor triggers as keys, set to false
        let data = {};
        for (let tool in EQUIPMENT.TOOLS) { data[EQUIPMENT.TOOLS[tool].trigger] = false; }

        //  Fill in the given keys as true
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateCharacterAttributesData(darkvision) {
        return { DARKVISION: darkvision };
    },
    CreateCharacterLanguages(languageList) {
        //  Create a struct with all language triggers as keys, set to false
        let data = {};
        for (let language in LANGUAGES) { data[LANGUAGES[language].trigger] = false; }
        
        //  Fill in the given keys as true
        for (let i = 0; i < languageList.length; ++i) data[languageList[i]] = true;
        return data;
    },
    CreateSkillProficiencies(proficienyList) {
        let data = {
            ATHLETICS: false,
            ACROBATICS: false,
            SLEIGHTOFHAND: false,
            STEALTH: false,
            ARCANA: false,
            HISTORY: false,
            INVESTIGATION: false,
            NATURE: false,
            RELIGION: false,
            ANIMALHANDLING: false,
            INSIGHT: false,
            MEDICINE: false,
            PERCEPTION: false,
            SURVIVAL: false,
            DECEPTION: false,
            INTIMIDATE: false,
            PERFORMANCE: false,
            PERSUASION: false
        };
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    GetRaceTraits(charRace) {
        switch (charRace) {
            case "Dwarf":
                let toolProficiency = ["SMITHSTOOLS", "BREWERSSUPPLIES", "MASONSTOOLS"][RandIntBetween(0, 2)];

                return {
                    AbilityScoreChanges: this.CreateAbilityScoreData(0, 0, 2, 0, 0, 0),
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["POISON"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(["BATTLEAXE", "HANDAXE", "LIGHTHAMMER", "WARHAMMER"]),
                    ArmorProficiencies: this.CreateArmorProficiencyData([]),
                    ToolProficiencies: this.CreateToolProficiencyData([toolProficiency]),
                    Languages: this.CreateCharacterLanguages(["COMMON", "DWARVISH"]),
                    SkillProficiencies: this.CreateSkillProficiencies([]),
                    Age: RandIntBetween(50, 200),
                    Alignment: "Neutral",
                    Size: "Medium",
                    Speed: 25,
                    Attributes: this.CreateCharacterAttributesData(60),
                    Notes: [
                        "Intelligence (History) checks related to the origin of stonework grant proficiency with double proficiency bonus."
                    ]
                };

            case "Elf":
                return {
                    AbilityScoreChanges: this.CreateAbilityScoreData(0, 2, 0, 0, 0, 0),
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["CHARM"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData([]),
                    ArmorProficiencies: this.CreateArmorProficiencyData([]),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    Languages: this.CreateCharacterLanguages(["COMMON", "ELVISH"]),
                    SkillProficiencies: this.CreateSkillProficiencies(["PERCEPTION"]),
                    Age: RandIntBetween(100, 500),
                    Alignment: "Neutral",
                    Size: "Medium",
                    Speed: 30,
                    Attributes: this.CreateCharacterAttributesData(60),
                    Notes: [
                        "Due to Fey ancestry, cannot be put to sleep by magic.",
                        "Meditates for 4 hours a day instead of sleeping, remaining semiconscious. Gives long rest benefits."
                    ]
                };
            
            case "Halfling":
                return {
                    AbilityScoreChanges: this.CreateAbilityScoreData(0, 2, 0, 0, 0, 0),
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["FRIGHT"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData([]),
                    ArmorProficiencies: this.CreateArmorProficiencyData([]),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    Languages: this.CreateCharacterLanguages(["COMMON", "HALFLING"]),
                    SkillProficiencies: this.CreateSkillProficiencies([]),
                    Age: RandIntBetween(20, 150),
                    Alignment: "Neutral",
                    Size: "Small",
                    Speed: 25,
                    Attributes: this.CreateCharacterAttributesData(0),
                    Notes: [
                        "When a 1 is rolled on a d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll",
                        "Can move through the space of any creature that is of a size larger than yours."
                    ]
                };
            
            case "Human":
                return {
                    AbilityScoreChanges: this.CreateAbilityScoreData(1, 1, 1, 1, 1, 1),
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData([]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData([]),
                    ArmorProficiencies: this.CreateArmorProficiencyData([]),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    Languages: this.CreateCharacterLanguages(["COMMON"]),
                    SkillProficiencies: this.CreateSkillProficiencies([]),
                    Age: RandIntBetween(20, 50),
                    Alignment: "Neutral",
                    Size: "Medium",
                    Speed: 30,
                    Attributes: this.CreateCharacterAttributesData(0),
                    Notes: [
                        "Can pick 1 language of the players choice to learn aside from Common."
                    ]
                };
        }
    },
    GetClassTraits(charClass) {
        switch (charClass) {
            case "Cleric":
                let clericSkill1 = ["HISTORY", "INSIGHT", "MEDICINE", "PERSUASION", "RELIGION"][RandIntBetween(0, 4)];
                let clericSkill2 = clericSkill1;
                while (clericSkill1 === clericSkill2) clericSkill2 = ["HISTORY", "INSIGHT", "MEDICINE", "PERSUASION", "RELIGION"][RandIntBetween(0, 4)];

                let clericWeaponProfs = GetEquipmentTriggerList(["SIMPLE_MELEE"], []);
                let clericArmorProfs = GetEquipmentTriggerList([], ["LIGHT_ARMOR", "HEAVY_ARMOR", "SHIELDS"]);

                return {
                    HitDicePerLevel: "1d8",
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["WISDOM", "CHARISMA"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(clericWeaponProfs),
                    ArmorProficiencies: this.CreateArmorProficiencyData(clericArmorProfs),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    SkillProficiencies: this.CreateSkillProficiencies([clericSkill1, clericSkill2]),
                };

            case "Fighter":
                let skillsPickTwo = ["ACROBATICS", "ANIMAL HANDLING", "ATHLETICS", "HISTORY", "INSIGHT", "INTIMIDATION", "PERCEPTION", "SURVIVAL"];
                let fighterSkill1 = skillsPickTwo[RandIntBetween(0, skillsPickTwo.length - 1)];
                let fighterSkill2 = fighterSkill1;
                while (fighterSkill1 === fighterSkill2) fighterSkill2 = skillsPickTwo[RandIntBetween(0, skillsPickTwo.length - 1)];

                let fighterWeaponProfs = GetEquipmentTriggerList(["SIMPLE_MELEE", "SIMPLE_RANGED", "MARTIAL_MELEE", "MARTIAL_RANGED"], []);
                let fighterArmorProfs = GetEquipmentTriggerList([], ["LIGHT_ARMOR", "MEDIUM_ARMOR", "HEAVY_ARMOR", "SHIELDS"]);

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
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["STRENGTH", "CONSTITUTION"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(fighterWeaponProfs),
                    ArmorProficiencies: this.CreateArmorProficiencyData(fighterArmorProfs),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    SkillProficiencies: this.CreateSkillProficiencies([fighterSkill1, fighterSkill2]),
                    Notes: [
                        fightingStyleNote,
                        "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your level. Must finish a short or long rest to use this ability again.",
                    ]
                };

            case "Wizard":
                return {

                };
            
            case "Rogue":
                return {

                };
        }
    },
    GetClassHitPointsAtFirstLevel(charClass) {
        switch (charClass) {
            case "Cleric": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
            case "Fighter": return (modifiers) => { return 10 + modifiers.CONSTITUTION; }

            case "Wizard": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
            case "Rogue": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
        }
    },
    GetClassHitPointsAfterFirstLevel(charClass) {
        switch (charClass) {
            case "Cleric": return (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
            case "Fighter": return (modifiers) => { return DiceRoller.RollString("1d10").total + modifiers.CONSTITUTION; }

            case "Wizard": return (modifiers) => (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
            case "Rogue": return (modifiers) => (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
        }
    },
    GetClassStartingEquipmentFunc(charClass) {
        switch (charClass) {
            case "Cleric":
                return (character) => {
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
                };
            
            case "Fighter":
                return (character) => {
                    let equipment = [];

                    let choice1 = RandIntBetween(0, 1);
                    if (choice1 === 0) equipment.push({ item: "Chain Mail", count: 1 });
                    else {
                        equipment.push({ item: "Leather Armor", count: 1 });
                        equipment.push({ item: "Longbow", count: 1 });
                        equipment.push({ item: "Arrow", count: 20 });
                    }

                    let martialWeapons = GetEquipmentTriggerList(["MARTIAL_MELEE"], []);
                    let choice2 = RandIntBetween(0, 1);
                    if (choice2 === 0) {
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

                    let choice3 = RandIntBetween(0, 1);
                    if (choice3 === 0) {
                        equipment.push({ item: "Light Crossbow", count: 1 });
                        equipment.push({ item: "Bolt", count: 20 });
                    }
                    else equipment.push({ item: "Handaxe", count: 2 });

                    let choice4 = RandIntBetween(0, 1);
                    if (choice4 === 0) equipment.push({ item: "Dungeoneer's Pack", count: 1 });
                    else equipment.push({ item: "Explorer's Pack", count: 1 });

                    return equipment;
                }
            
            case "Wizard":
                return (character) => {
                    let equipment = [];
                    return equipment;
                }
            
            case "Rogue":
                return (character) => {
                    let equipment = [];
                    return equipment;
                }
        }
    },
}

//  Module Exports
module.exports = { PlayerCharacter }