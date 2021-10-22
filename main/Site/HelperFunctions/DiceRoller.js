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

const DiceRoller = {
  MaxDiceToRoll: 10000,
  MaxDiceSideCount: 1000000,

  diceRollReturn: (total, rolls, note) => { return { total: total, rolls: rolls, note: note } },

  /*
    Roll(diceCount, diceType)
        - diceCount: The number of dice you are rolling
        - diceType: The number of sides each dice has

    Example Call - Roll(3, 6)
    :: Function rolls a number of dice of the size specified and returns the results of each roll as well as the total
    */
  Roll: (diceCount, diceType) => {
    //  Sanity Checks
    if (diceCount <= 0) { return DiceRoller.diceRollReturn(null, null, 'Can not have a dice count below or equal to 0') }
    if (diceCount > 10000) { return DiceRoller.diceRollReturn(null, null, 'Can not have a dice count above ' + parseInt(DiceRoller.MaxDiceToRoll)) }
    if (diceType <= 1) { return DiceRoller.diceRollReturn(null, null, 'Can not have a dice type below or equal to 1') }
    if (diceType > DiceRoller.MaxDiceSideCount) { return DiceRoller.diceRollReturn(null, null, 'Can not have a dice type above ' + parseInt(DiceRoller.MaxDiceSideCount)) }

    const diceRolls = []
    let totalValue = 0
    for (let i = 0; i < diceCount; ++i) { diceRolls.push(Math.floor(Math.random() * diceType + 1)); totalValue += diceRolls[diceRolls.length - 1] }
    return DiceRoller.diceRollReturn(totalValue, diceRolls, 'success')
  },

  /*
    RollString(diceString)
        - diceString: The string representing the dice count and type

    Example Call - RollString("2d20")
    :: Function rolls a number of dice of the size specified and returns the results of each roll as well as the total
    */
  RollString: (diceString) => {
    const dPosition = diceString.indexOf('d')
    if (dPosition === -1) { return DiceRoller.diceRollReturn(null, null, "Attempted to roll dice with string '" + diceString + "' which is improperly formatted!") }

    //  Helper Function isAllNumbers
    const isAllNumbers = (str) => {
      for (let i = 0; i < str.length; ++i) { if (str[i] < '0' || str[i] > '9') { return false } }
      return true
    }

    //  Find the count of dice in the string (i.e. '2d6' would be 2 dice)
    let diceCount = 1
    if (dPosition !== 0) {
      //  Grab the string representing the count and make sure it is entirely composed of numbers
      const diceCountString = diceString.substr(0, dPosition)
      if (!isAllNumbers(diceCountString)) { return DiceRoller.diceRollReturn(null, null, 'Non-number used in count section of dice roll string. Could not translate dice rolls.') }
      diceCount = parseInt(diceCountString)
      if (diceCount > DiceRoller.MaxDiceToRoll) { return DiceRoller.diceRollReturn(null, null, 'Can not have a dice count above ' + parseInt(DiceRoller.MaxDiceToRoll)) }
    }

    const diceTypeString = diceString.substr(dPosition + 1, diceString.length - (dPosition + 1))
    if (diceTypeString.length === 0) { return DiceRoller.diceRollReturn(null, null, 'No dice type given in dice roll string. Could not calculate dice rolls.') }
    if (!isAllNumbers(diceTypeString)) { return DiceRoller.diceRollReturn(null, null, 'Non-number used in dice type section of dice roll string. Could not translate dice rolls.') }
    const diceType = parseInt(diceTypeString)

    return DiceRoller.Roll(diceCount, diceType)
  },

  /*
    RollStats(statReqs)
        - statReqs: An object describing the stat requirements for a character

    NOTE: This function is based on the Basic Fantasy stat block generation, and is not a generic function
    Example Call - RollStats({ strength: { min:9, max: 16 }, wisdom: { min:10, max: 14 } ... })
    :: Function rolls a 3d6 for each stat and ensures the stats are within the required range provided, returning the stat block
    */
  RollStats: (statReqs) => {
    //  Loop through each stat type and roll a random value for it
    const stats = {}
    for (const key in statReqs) {
      //  Roll a random value for this stat. If our random roll doesn't fit within the stat requirements, re-roll until it does
      let rollVal = DiceRoller.Roll(3, 6)
      while ((rollVal.total < statReqs[key].min) || (rollVal.total > statReqs[key].max)) { rollVal = DiceRoller.Roll(3, 6) }
      stats[key] = rollVal
    }
    return stats
  }
}

//  Module Exports
module.exports = { DiceRoller }
