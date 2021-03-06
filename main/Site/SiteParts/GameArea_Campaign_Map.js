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
const { InteractiveMap } = require('../Components/InteractiveMap')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { CampaignController } = require('../Controllers/CampaignController')

const GameAreaCampaignMap = {
  create () {
    const container = Container.create({ id: 'GameArea_Campaign_Map', style: STYLE.GAME_AREA_CAMPAIGN_SUBMENU })
    container.style.width = pxFromInt(CONFIG.WINDOW_WIDTH)
    container.style.height = pxFromInt(CONFIG.WINDOW_HEIGHT)

    container.elements = { paper: null, screenTitle: null, tabMenu: null, worldMap: null }

    container.elements.paper = Container.create({ id: 'LinedPaperBackground', style: STYLE.LINED_PAPER_BACKGROUND })
    container.appendChild(container.elements.paper)

    container.elements.screenTitle = Label.create({ id: 'ScreenTitle', style: STYLE.GAME_SCREEN_TITLE, attributes: { value: 'Map' } })
    container.appendChild(container.elements.screenTitle)

    container.elements.tabMenu = Container.create({ id: 'CampaignMapTabs', style: STYLE.CAMPAIGN_MAP_TABS })
    container.appendChild(container.elements.tabMenu)

    EventDispatch.AddEventHandler('Campaign Updated', (eventType, eventData) => {
      CampaignController.SetCampaignData(eventData)
      GameAreaCampaignMap.createWorldMapTab(container)
      container.show()
    })

    container.show = () => {

    }
    container.hide = () => {

    }

    return container
  },

  createWorldMapTab (container) {
    if (container.elements.worldMap) {
      container.removeChild(container.elements.worldMap)
      container.elements.worldMap = null
    }

    //  Create the visual represenation of this map
    const mapData = CampaignController.GetCampaignMapData()
    container.elements.worldMap = InteractiveMap.create({ topLevelMapData: mapData })
    container.elements.worldMap.style.position = 'absolute'
    container.elements.worldMap.style.left = '234px'
    container.elements.worldMap.style.top = '108px'
    container.appendChild(container.elements.worldMap)
  }
}

//  Module Exports
module.exports = { GameAreaCampaignMap }
