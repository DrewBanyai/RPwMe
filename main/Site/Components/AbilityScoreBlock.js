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

const { HandwrittenNote } = require('../Components/HandwrittenNote')
const STYLE = require('../style')
const { Container } = require('../Components/ArcadiaJS')

const AbilityScoreBlock = {
  create: (options) => {
    const container = Container.create({
      id: 'AbilityScoreBlock',
      style: {
        width: '150px',
        height: '90px',
        display: 'inline-flex'
      }
    })

    Container.applyOptions(container, options)

    container.elements = {
      ScoreTypes: { Strength: null, Constitution: null, Dexterity: null, Intelligence: null, Wisdom: null, Charisma: null },
      ScoreValues: { Strength: null, Constitution: null, Dexterity: null, Intelligence: null, Wisdom: null, Charisma: null },
      Divider: null,
      ScoreMods: { Strength: null, Constitution: null, Dexterity: null, Intelligence: null, Wisdom: null, Charisma: null }
    }

    const ScoreHeight = { Strength: '0px', Constitution: '14px', Dexterity: '28px', Intelligence: '42px', Wisdom: '56px', Charisma: '70px' }

    for (const i in container.elements.ScoreTypes) {
      container.elements.ScoreTypes[i] = HandwrittenNote.create({ id: 'TypeLabel_' + i, style: STYLE.PLAYER_JOIN_CHARACTER_ABILITY_SCORE, writeDelay: 30 })
      Object.assign(container.elements.ScoreTypes[i].style, { top: ScoreHeight[i], left: '0px' })
      container.elements.ScoreTypes[i].setValue(i)
      container.appendChild(container.elements.ScoreTypes[i])
    }

    for (const i in container.elements.ScoreValues) {
      container.elements.ScoreValues[i] = HandwrittenNote.create({ id: 'ValuesLabel_' + i, style: STYLE.PLAYER_JOIN_CHARACTER_ABILITY_SCORE, writeDelay: 30 })
      Object.assign(container.elements.ScoreValues[i].style, { top: ScoreHeight[i], left: '92px' })
      container.elements.ScoreValues[i].setValue('8')
      container.appendChild(container.elements.ScoreValues[i])
    }

    container.elements.Divider = Container.create({ style: { height: '86px', borderRight: '2px solid ' + STYLE.GAME_WINDOW_PEN_WRITING_COLOR, position: 'absolute', left: '116px', top: '11px' } })
    container.appendChild(container.elements.Divider)

    for (const i in container.elements.ScoreMods) {
      container.elements.ScoreMods[i] = HandwrittenNote.create({ id: 'ModsLabel_' + i, style: STYLE.PLAYER_JOIN_CHARACTER_ABILITY_SCORE, writeDelay: 30 })
      Object.assign(container.elements.ScoreMods[i].style, { top: ScoreHeight[i], left: '126px' })
      container.elements.ScoreMods[i].setValue('+1')
      container.appendChild(container.elements.ScoreMods[i])
    }

    return container
  },

  setAbilityScores (container, abilityScores, abilityScoreMods) {
    for (const i in container.elements.ScoreValues) { container.elements.ScoreValues[i].setValue(abilityScores[i].toString()) }

    for (const i in container.elements.ScoreMods) { container.elements.ScoreMods[i].setValue(((abilityScoreMods[i] > 0) ? '+' : '') + abilityScoreMods[i].toString()) }
  }
}

//  Module Exports
module.exports = { AbilityScoreBlock }
