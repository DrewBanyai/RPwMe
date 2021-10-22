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

const CONFIG = require('../../config')
const STYLE = require('../style')
const { Container, Label } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { HandwrittenNote } = require('../Components/HandwrittenNote')

const GameAreaWaitingToBegin = {
  create () {
    const container = Container.create({
      id: 'GameArea_WaitingToBegin',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT),
        backgroundColor: STYLE.GAME_WINDOW_AREA_COLOR,
        display: STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE,
        justifyContent: 'center',
        overflow: 'hidden'
      }
    })

    container.elements = { paper: null }

    container.elements.paper = Container.create({ id: 'LinedPaperBackground', style: STYLE.LINED_PAPER_BACKGROUND })
    container.appendChild(container.elements.paper)

    const programLogo = Label.create({
      id: 'ProgramLogo',
      style: {
        position: 'relative',
        fontFamily: 'FFF Tusj',
        fontSize: '132px',
        margin: '25px ​144px 0px 0px',
        color: 'rgb(1, 100, 150)',
        left: '217px',
        top: '50px'
      },
      attributes: {
        value: 'RPwMe'
      }
    })
    container.elements.paper.appendChild(programLogo)

    GameAreaWaitingToBegin.createProgramExplanation(container)

    return container
  },

  createProgramExplanation (container) {
    const programExplanation = HandwrittenNote.create({
      id: 'ProgramExplanation',
      style: {
        fontSize: '24px',
        width: '630px',
        position: 'absolute',
        left: '217px',
        top: '233px',
        lineHeight: '42px'
      },
      attributes: {
        value: 'RPwMe is a simulated Pen &amp; Paper Roleplaying system designed to allow Twitch viewers to play through a custom adventure.'
      },
      writeDelay: 30,
      callback: () => { setTimeout(() => { GameAreaWaitingToBegin.createWaitingExplanation(container) }, 500) }
    })
    container.elements.paper.appendChild(programExplanation)
  },

  createWaitingExplanation (container) {
    const waitingExplanation = HandwrittenNote.create({
      id: 'WaitingExplanation',
      style: {
        fontSize: '24px',
        width: '630px',
        position: 'absolute',
        left: '217px',
        top: '358px',
        lineHeight: '41px'
      },
      attributes: {
        value: 'The Game Master is currently setting up the world, so hold tight for a bit. If you want to read up on how the game is played, type !rpwme in the chat for an explanation.'
      },
      writeDelay: 30
    })
    container.elements.paper.appendChild(waitingExplanation)
  }
}

//  Module Exports
module.exports = { GameAreaWaitingToBegin }
