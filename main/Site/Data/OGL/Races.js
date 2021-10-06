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
const { ChooseXFromList } = require('../../HelperFunctions/HelperFuncs')

const RACES = {
    Dwarf: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 0, 2, 0, 0, 0); },
        AssignRacialTraits(character) {
            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Poison"]));

            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData(["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"]));

            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData([]));

            let toolProficiency = ["Smith's Tools", "Brewer's Supplies", "Mason's Tools"][RandIntBetween(0, 2)];
            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([toolProficiency]));

            if (!character.Languages) character.Languages = {};
            Object.assign(character.Languages, LANGUAGES.CreateCharacterLanguages(["Common", "Dwarvish"]));

            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies([]));

            if (!character.Attributes) character.Attributes = {};
            Object.assign(character.Attributes, CHARACTER.CreateCharacterAttributesData(["Darkvision (60)"]));

            character.Age = RandIntBetween(50, 200);
            character.Alignment = "Neutral";
            character.Size = "Medium";
            character.Speed = 25;
            
            if (!character.Notes) character.Notes = [];
            character.Notes.concat([
                "Intelligence (History) checks related to the origin of stonework grant proficiency with double proficiency bonus."
            ]);
        },
    },
    Elf: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 2, 0, 0, 0, 0); },
        AssignRacialTraits(character) {
            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Charm"]));

            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData([]));

            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData([]));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            if (!character.Languages) character.Languages = {};
            Object.assign(character.Languages, LANGUAGES.CreateCharacterLanguages(["Common", "Elvish"]));

            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies(["Perception"]));

            if (!character.Attributes) character.Attributes = {};
            Object.assign(character.Attributes, CHARACTER.CreateCharacterAttributesData(["Darkvision (60)"]));

            character.Age = RandIntBetween(100, 500);
            character.Alignment = "Neutral";
            character.Size = "Medium";
            character.Speed = 30;

            if (!character.Notes) character.Notes = [];
            character.Notes.concat([
                "Due to Fey ancestry, cannot be put to sleep by magic.",
                "Meditates for 4 hours a day instead of sleeping, remaining semiconscious. Gives long rest benefits."
            ]);
        },
    },
    Halfling: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(0, 2, 0, 0, 0, 0); },
        AssignRacialTraits(character) {
            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap(["Fright"]));

            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData([]));

            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData([]));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            if (!character.Languages) character.Languages = {};
            Object.assign(character.Languages, LANGUAGES.CreateCharacterLanguages(["Common", "Halfling"]));

            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies([]));

            if (!character.Attributes) character.Attributes = {};
            Object.assign(character.Attributes, CHARACTER.CreateCharacterAttributesData([]));

            character.Age = RandIntBetween(20, 150);
            character.Alignment = "Neutral";
            character.Size = "Small";
            character.Speed = 25;
            
            if (!character.Notes) character.Notes = [];
            character.Notes.concat([
                "When a 1 is rolled on a d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll",
                "Can move through the space of any creature that is of a size larger than yours."
            ]);
        },
    },
    Human: {
        GetAbilityScoreChanges() { return ABILITY_SCORES.CreateAbilityScoreBlock(1, 1, 1, 1, 1, 1); },
        AssignRacialTraits(character) {
            if (!character.SavingThrowAdvantages) character.SavingThrowAdvantages = {};
            Object.assign(character.SavingThrowAdvantages, CHARACTER.CreateSavingThrowAdvantageMap([]));

            if (!character.WeaponProficiencies) character.WeaponProficiencies = {};
            Object.assign(character.WeaponProficiencies, CHARACTER.CreateWeaponProficiencyData([]));

            if (!character.ArmorProficiencies) character.ArmorProficiencies = {};
            Object.assign(character.ArmorProficiencies, CHARACTER.CreateArmorProficiencyData([]));

            if (!character.ToolProficiencies) character.ToolProficiencies = {};
            Object.assign(character.ToolProficiencies, CHARACTER.CreateToolProficiencyData([]));

            let languageList = LANGUAGES.GetLanguageNameList();
            languageList = languageList.filter((l) => { return l !== "Common" });
            if (!character.Languages) character.Languages = {};
            Object.assign(character.Languages, LANGUAGES.CreateCharacterLanguages(["Common", ChooseXFromList(1, languageList)[0]]));

            if (!character.SkillProficiencies) character.SkillProficiencies = {};
            Object.assign(character.SkillProficiencies, CHARACTER.CreateCharacterSkillProficiencies([]));

            if (!character.Attributes) character.Attributes = {};
            Object.assign(character.Attributes, CHARACTER.CreateCharacterAttributesData([]));

            character.Age = RandIntBetween(20, 50);
            character.Alignment = "Neutral";
            character.Size = "Medium";
            character.Speed = 30;

            if (!character.Notes) character.Notes = [];
            character.Notes.concat([])
        },
    }
}

//  Module Exports
module.exports = { RACES }