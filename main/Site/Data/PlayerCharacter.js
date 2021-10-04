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

var { RACES } = require('./OGL/Races')
var { CLASSES } = require('./OGL/Classes')

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
    DefineCharacter(character) {
        //  Assign race and class traits, then determine the character Ability Score based on requirements of the class
        Object.assign(character, RACES[character.Race].GetRacialTraits());
        Object.assign(character, CLASSES[character.Class].GetClassTraits());
        character.AbilityScores = CLASSES[character.Class].DetermineAbilityScores();

        //  Note: Assign inventory AFTER Ability Scores, so that items can be decided based on score (dexterity fighter vs strength fighter, for example)
        Object.assign(character.Inventory, CLASSES[character.Class].GetClassStartingEquipment(character));
    },
}

//  Module Exports
module.exports = { PlayerCharacter }