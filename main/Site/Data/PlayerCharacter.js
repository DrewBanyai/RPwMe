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

const { RACES } = require('./OGL/Races')
const { CLASSES } = require('./OGL/Classes')
const { EQUIPMENT } = require('./OGL/Equipment')
const { ABILITY_SCORES } = require('./OGL/AbilityScores')

const PlayerCharacter =
{
  CreateNewCharacter (charRace = null, charClass = null, charName = null) {
    return {
      _READY: false,
      Race: charRace,
      Class: charClass,
      Name: charName,
      Level: 0,
      Inventory: [],
      Health: {
        maximum: -1,
        current: -1,
        temporary: -1
      }
    }
  },
  CreateNewPlayer (username, index) {
    return {
      playerUsername: username,
      playerIndex: index,
      character: this.CreateNewCharacter()
    }
  },
  DefineCharacter (character) {
    //  Create a clean character in case this is a reroll definition
    for (const index in character) { if (!['Race', 'Class', 'Name'].includes(index)) delete character[index] }
    Object.assign(character, this.CreateNewCharacter(character.Race, character.Class, character.Name))

    //  Assign the character race and class traits
    Object.assign(character, RACES[character.Race].AssignRacialTraits(character))
    Object.assign(character, CLASSES[character.Class].AssignClassTraits(character))

    //  Determine the character Ability Score based on requirements of the class, and implement race adjustments
    character.AbilityScores = CLASSES[character.Class].DetermineAbilityScores()
    ABILITY_SCORES.AdjustScores(character.AbilityScores, RACES[character.Race].GetAbilityScoreChanges())

    //  Note: Assign inventory AFTER Ability Scores, so that items can be decided based on score (dexterity fighter vs strength fighter, for example)
    character.Inventory = []
    Object.assign(character.Inventory, CLASSES[character.Class].GetClassStartingEquipment(character))

    //  Assign the player's level, then their health based on class and level
    character.Level = CLASSES.CharacterLevel
    character.AbilityScoreModifiers = ABILITY_SCORES.GetModifierBlock(character.AbilityScores)
    let health = CLASSES[character.Class].GetClassHitPointsAtFirstLevel(character.AbilityScoreModifiers)
    for (let i = 1; i < character.Level; ++i) health += CLASSES[character.Class].GetClassHitPointsAfterFirstLevel(character.AbilityScoreModifiers)
    character.Health = { maximum: health, current: health, temporary: 0 }

    character.Money = CLASSES[character.Class].DetermineStartingMoneyByLevel(character.Level)

    character.ArmorClass = EQUIPMENT.GetCharacterArmorClass(character)
  }
}

//  Module Exports
module.exports = { PlayerCharacter }
