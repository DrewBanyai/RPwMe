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
var { LANGUAGES } = require('./Languages')
var { SKILLS } = require('./Skills')

var { RandIntBetween } = require('../../HelperFunctions/Random')

const RACES = {
    Dwarf: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 0, 2, 0, 0, 0); },
        GetRacialTraits() {
            let toolProficiency = ["SMITHSTOOLS", "BREWERSSUPPLIES", "MASONSTOOLS"][RandIntBetween(0, 2)];

            return {
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["POISON"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData(["BATTLEAXE", "HANDAXE", "LIGHTHAMMER", "WARHAMMER"]),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData([]),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([toolProficiency]),
                Languages: LANGUAGES.CreateCharacterLanguages(["COMMON", "DWARVISH"]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies([]),
                Age: RandIntBetween(50, 200),
                Alignment: "Neutral",
                Size: "Medium",
                Speed: 25,
                Attributes: CHARACTER.CreateCharacterAttributesData(60),
                Notes: [
                    "Intelligence (History) checks related to the origin of stonework grant proficiency with double proficiency bonus."
                ]
            };
        },
    },
    Elf: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 2, 0, 0, 0, 0); },
        GetRacialTraits() {
            return {
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["CHARM"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData([]),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData([]),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                Languages: LANGUAGES.CreateCharacterLanguages(["COMMON", "ELVISH"]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies(["PERCEPTION"]),
                Age: RandIntBetween(100, 500),
                Alignment: "Neutral",
                Size: "Medium",
                Speed: 30,
                Attributes: CHARACTER.CreateCharacterAttributesData(60),
                Notes: [
                    "Due to Fey ancestry, cannot be put to sleep by magic.",
                    "Meditates for 4 hours a day instead of sleeping, remaining semiconscious. Gives long rest benefits."
                ]
            };
        },
    },
    Halfling: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 2, 0, 0, 0, 0); },
        GetRacialTraits() {
            return {
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap(["FRIGHT"]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData([]),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData([]),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                Languages: LANGUAGES.CreateCharacterLanguages(["COMMON", "HALFLING"]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies([]),
                Age: RandIntBetween(20, 150),
                Alignment: "Neutral",
                Size: "Small",
                Speed: 25,
                Attributes: CHARACTER.CreateCharacterAttributesData(0),
                Notes: [
                    "When a 1 is rolled on a d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll",
                    "Can move through the space of any creature that is of a size larger than yours."
                ]
            };
        },
    },
    Human: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(1, 1, 1, 1, 1, 1); },
        GetRacialTraits() {
            return {
                SavingThrowAdvantages: CHARACTER.CreateSavingThrowAdvantageMap([]),
                WeaponProficiencies: CHARACTER.CreateWeaponProficiencyData([]),
                ArmorProficiencies: CHARACTER.CreateArmorProficiencyData([]),
                ToolProficiencies: CHARACTER.CreateToolProficiencyData([]),
                Languages: LANGUAGES.CreateCharacterLanguages(["COMMON"]),
                SkillProficiencies: CHARACTER.CreateCharacterSkillProficiencies([]),
                Age: RandIntBetween(20, 50),
                Alignment: "Neutral",
                Size: "Medium",
                Speed: 30,
                Attributes: CHARACTER.CreateCharacterAttributesData(0),
                Notes: [
                    "Can pick 1 language of the players choice to learn aside from Common."
                ]
            };
        },
    }
}

//  Module Exports
module.exports = { RACES }