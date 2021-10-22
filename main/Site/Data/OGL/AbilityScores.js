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

const ABILITY_SCORES = {
  //  Helper Functions
  CreateAbilityScoreBlock (str, dex, con, int, wis, cha) { return { Strength: str, Dexterity: dex, Constitution: con, Intelligence: int, Wisdom: wis, Charisma: cha } },
  GetModifier (score) {
    switch (score) {
      case 1: return -5
      case 2:
      case 3: return -4
      case 4:
      case 5: return -3
      case 6:
      case 7: return -2
      case 8:
      case 9: return -1
      case 10:
      case 11: return 0
      case 12:
      case 13: return 1
      case 14:
      case 15: return 2
      case 16:
      case 17: return 3
      case 18:
      case 19: return 4
      case 20:
      case 21: return 5
      case 22:
      case 23: return 6
      case 24:
      case 25: return 7
      case 26:
      case 27: return 8
      case 28:
      case 29: return 9
      case 30: return 10
    }
  },
  GetModifierBlock (abilityScores) {
    const data = {}
    for (const score in abilityScores) { data[score] = this.GetModifier(abilityScores[score]) }
    return data
  },
  AdjustScores (characterScores, adjustment) { for (const score in characterScores) characterScores[score] += adjustment[score] }
}

//  Module Exports
module.exports = { ABILITY_SCORES }
