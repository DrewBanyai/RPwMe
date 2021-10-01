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
        let data = {
            CLUB: false,
            DAGGER: false,
            GREATCLUB: false,
            HANDAXE: false,
            JAVELIN: false,
            LIGHTHAMMER: false,
            MACE: false,
            QUARTERSTAFF: false,
            SICKLE: false,
            SPEAR: false,
            CROSSBOW_LIGHT: false,
            DART: false,
            SHORTBOW: false,
            SLING: false,
            BATTLEAXE: false,
            FLAIL: false,
            GLAIVE: false,
            GREATAXE: false,
            GREATSWORD: false,
            HALBERD: false,
            LANCE: false,
            LONGSWORD: false,
            MAUL: false,
            MORNINGSTAR: false,
            PIKE: false,
            RAPIER: false,
            SCIMITAR: false,
            SHORTSWORD: false,
            TRIDENT: false,
            WARPICK: false,
            WARHAMMER: false,
            WHIP: false,
            BLOWGUN: false,
            CROSSBOW_HAND: false,
            CROSSBOW_HEAVY: false,
            LONGBOW: false,
            NET: false
        };
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateArmorProficiencyData(proficienyList) {
        let data = {
            PADDED: false,
            LEATHER: false,
            STUDDED: false,
            HIDE: false,
            CHAIN: false,
            SCALE: false,
            BREASTPLATE: false,
            HALFPLATE: false,
            RING: false,
            CHAIN: false,
            SPLINT: false,
            PLATE: false,
            SHIELDS: false
        };
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateToolProficiencyData(proficienyList) {
        let data = {
            SMITHSTOOLS: false,
            BREWERSSUPPLIES: false,
            MASONSTOOLS: false,
        };
        for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true;
        return data;
    },
    CreateCharacterAttributesData(darkvision) {
        return { DARKVISION: darkvision };
    },
    CreateCharacterLanguages(languageList) {
        let data = {
            COMMON: false,
            DWARVISH: false,
            ELVISH: false,
            GIANT: false,
            GNOMISH: false,
            GOBLIN: false,
            HALFLING: false,
            ORC: false,
            ABYSSAL: false,
            CELESTIAL: false,
            DRACONIC: false,
            DEEPSPEECH: false,
            INFERNAL: false,
            PRIMORDIAL: false,
            SYLVAN: false,
            UNDERCOMMON: false
        };
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
                let skill1 = ["HISTORY", "INSIGHT", "MEDICINE", "PERSUASION", "RELIGION"][RandIntBetween(0, 4)];
                let skill2 = skill1;
                while (skill1 === skill2) skill2 = ["HISTORY", "INSIGHT", "MEDICINE", "PERSUASION", "RELIGION"][RandIntBetween(0, 4)];

                return {
                    HitDicePerLevel: "1d8",
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(["WISDOM", "CHARISMA"]),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(["CLUB", "DAGGER", "GREATCLUB", "HANDAXE", "JAVELIN", "LIGHTHAMMER", "MACE", "QUARTERSTAFF", "SICKLE", "SPEAR"]),
                    ArmorProficiencies: this.CreateArmorProficiencyData(["PADDED", "LEATHER", "STUDDED", "HIDE", "CHAIN", "SCALE", "BREASTPLATE", "HALFPLATE", "SHIELDS"]),
                    ToolProficiencies: this.CreateToolProficiencyData([]),
                    SkillProficiencies: this.CreateSkillProficiencies([skill1, skill2]),
                };

            case "Fighter":
                return {

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
            case "Fighter": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
            case "Wizard": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
            case "Rogue": return (modifiers) => { return 8 + modifiers.CONSTITUTION; }
        }
    },
    GetClassHitPointsAfterFirstLevel(charClass) {
        switch (charClass) {
            case "Cleric": return (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
            case "Fighter": return (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
            case "Wizard": return (modifiers) => (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
            case "Rogue": return (modifiers) => (modifiers) => { return DiceRoller.RollString("1d8").total + modifiers.CONSTITUTION; }
        }
    },
    GetClassStartingEquipmentFunc(charClass) {
        switch (charClass) {
            case "Cleric":
                return (character) => {
                    let equipment = [];

                    let weapons = ["Mace", "Warhammer"]
                    equipment.push({ item: weapons[RandIntBetween(0, character.WeaponProficiencies["WARHAMMER"] ? 1 : 0)], count: 1});

                    let armors = ["Scale Mail", "Leather Armor", "Chain mail"];
                    equipment.push({ item: armors[RandIntBetween(0, character.ArmorProficiencies["CHAIN"] ? 2 : 1)], count: 1 });

                    let simpleWeapons = ["Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light Hammer", "Mace", "Quarterstaff", "Sickle", "Spear"];
                    let extraWeapons = ["Light Crossbow", simpleWeapons[RandIntBetween(0, 9)]];
                    let extraWeapon = extraWeapons[RandIntBetween(0, 1)];
                    equipment.push({ item: extraWeapon, count: 1 });
                    if (extraWeapon === "Light Crossbow") equipment.push({ item: "Bolt", count: 20 })

                    let packs = ["Priest's Pack", "Explorer's Pack"];
                    equipment.push({ item: packs[RandIntBetween(0, 1)], count: 1 });

                    equipment.push({ item: "Shield", count: 1 });
                    equipment.push({ item: "Holy Symbol", count: 1 });

                    return equipment;
                };
            
            case "Fighter":
                return (character) => {
                    let equipment = [];
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