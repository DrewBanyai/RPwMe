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

const PlayerCharacter = 
{
    CreateNewCharacter(username, index) {
        return {
            playerUsername: username,
            playerIndex: index,
            character: {
                race: null,
                class: null,
                name: null
            }
        }
    },
    CreateAbilityScoreData(str, dex, con, int, wis, cha) {
        return { STRENGTH: str, DEXTERITY: dex, CONSTITUTION: con, INTELLIGENCE: int, WISDOM: wis, CHARISMA: cha };
    },
    CreateSavingThrowAdvantageData(fortitude, reflex, will, poison, charm, fright) {
        return { FORTITUDE: fortitude, REFLEX: reflex, WILL: will, POISON: poison, CHARM: charm, FRIGHT: fright };
    },
    CreateWeaponProficiencyData(battleaxe, handaxe, lightHammer, warhammer) {
        return { BATTLEAXE: battleaxe, HANDAXE: handaxe, LIGHTHAMMER: lightHammer, WARHAMMER: warhammer };
    },
    CreateCharacterAttributesData(darkvision) {
        return { DARKVISION: darkvision };
    },
    CreateCharacterLanguages(common, dwarvish, elvish, giant, gnomish, goblin, halfling, orc, abyssal, celestial, draconic, deepSpeech, infernal, primordial, sylvan, undercommon) {
        return {
            COMMON: common,
            DWARVISH: dwarvish,
            ELVISH: elvish,
            GIANT: giant,
            GNOMISH: gnomish,
            GOBLIN: goblin,
            HALFLING: halfling,
            ORC: orc,
            ABYSSAL: abyssal,
            CELESTIAL: celestial,
            DRACONIC: draconic,
            DEEPSPEECH: deepSpeech,
            INFERNAL: infernal,
            PRIMORDIAL: primordial,
            SYLVAN: sylvan,
            UNDERCOMMON: undercommon
        };
    },
    CreateSkillProficiencies(athl, acro, sleight, stealth, arcana, history, invest, nat, rel, anim, insight, med, percep, surv, dec, intim, perfor, persuade) {
        return {
            ATHLETICS: athl,
            ACROBATICS: acro,
            SLEIGHTOFHAND: sleight,
            STEALTH: stealth,
            ARCANA: arcana,
            HISTORY: history,
            INVESTIGATION: invest,
            NATURE: nat,
            RELIGION: rel,
            ANIMALHANDLING: anim,
            INSIGHT: insight,
            MEDICINE: med,
            PERCEPTION: percep,
            SURVIVAL: surv,
            DECEPTION: dec,
            INTIMIDATE: intim,
            PERFORMANCE: perfor,
            PERSUASION: persuade
        };
    },
    GetRaceTraits(race) {
        switch (race) {
            case "Dwarf":
                return {
                    AbilityScoreChanges: this.CreateAbilityScoreData(0, 0, 2, 0, 0, 0),
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(false, false, false, true, false, false),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(true, true, true, true),
                    Languages: this.CreateCharacterLanguages(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
                    SkillProficiencies: this.CreateSkillProficiencies(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
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
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(false, false, false, false, true, false),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(false, false, false, false),
                    Languages: this.CreateCharacterLanguages(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
                    SkillProficiencies: this.CreateSkillProficiencies(false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false),
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
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(false, false, false, false, false, true),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(false, false, false, false),
                    Languages: this.CreateCharacterLanguages(true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false),
                    SkillProficiencies: this.CreateSkillProficiencies(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
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
                    SavingThrowAdvantages: this.CreateSavingThrowAdvantageData(false, false, false, false, false, false),
                    WeaponProficiencies: this.CreateWeaponProficiencyData(false, false, false, false),
                    Languages: this.CreateCharacterLanguages(true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
                    SkillProficiencies: this.CreateSkillProficiencies(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
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
    }
}

//  Module Exports
module.exports = { PlayerCharacter }