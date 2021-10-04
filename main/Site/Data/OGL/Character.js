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

var { EQUIPMENT } = require('./Equipment')
var { SKILLS } = require('./Skills')

const CHARACTER = {
    CreateSavingThrowAdvantageMap(savingThrowList) {
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
    CreateCharacterSkillProficiencies(knownList) {
        //  Create a struct with all skill triggers as keys, set to false
        let data = {};
        for (let skill in SKILLS.List) { data[SKILLS.List[skill].trigger] = false; }
        
        //  Fill in the given keys as true
        for (let i = 0; i < knownList.length; ++i) data[knownList[i]] = true;
        return data;
    }
};

//  Module Exports
module.exports = { CHARACTER }