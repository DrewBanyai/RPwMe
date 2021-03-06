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
const { Container, BasicButton } = require('../Components/ArcadiaJS')
const { WorldController } = require('../Controllers/WorldController')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { adminMessages } = require('../Messaging/AdminMessages')
const { CampaignController } = require('../Controllers/CampaignController')

const AdminAreaWorld = {
  create () {
    const container = Container.create({
      id: 'AdminArea_World',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
        backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
        display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE
      }
    })

    container.elements = { worldContainer: null, worldDisplay: null, infoBoxWorld: null, showMapButton: null }

    AdminAreaWorld.createWorldDisplay(container, Date.now())
    AdminAreaWorld.createWorldInfoBox(container)

    const debugButtonBox = Container.create({
      id: 'DebugButtonBox',
      style: {

      }
    })
    container.appendChild(debugButtonBox)

    if (CONFIG.DEBUG.includes('SCREEN BUTTONS')) {
      container.elements.showMapButton = BasicButton.create({ id: 'ShowMapButton', style: STYLE.ADMIN_SCREEN_DEBUG_BUTTON, attributes: { value: 'Show Map' } })
      debugButtonBox.appendChild(container.elements.showMapButton)
      BasicButton.setOnClick(container.elements.showMapButton, () => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Map' }) })
    }

    container.elements.returnToWorldViewButton = BasicButton.create({ id: 'ReturnToWorldViewButton', style: STYLE.ADMIN_SCREEN_DEBUG_BUTTON, attributes: { value: 'Return To World View' } })
    debugButtonBox.appendChild(container.elements.returnToWorldViewButton)
    BasicButton.setOnClick(container.elements.returnToWorldViewButton, () => { EventDispatch.SendEvent('Return To World View', {}) })

    EventDispatch.AddEventHandler('Map Create', (eventType, eventData) => { AdminAreaWorld.createWorldDisplay(container, eventData.seed) })

    container.onShow = () => {

    }

    return container
  },

  createWorldDisplay (container, seed) {
    if (container.elements.worldDisplay !== null) {
      container.elements.worldContainer.innerHTML = ''
      container.elements.worldDisplay = null
    }

    const paddingLeft = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_LEFT)
    const paddingRight = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_RIGHT)

    if (!container.elements.worldContainer) {
      container.elements.worldContainer = Container.create({ id: 'World Container', style: { padding: '2px ' + paddingLeft + ' 2px ' + paddingRight } })
      container.appendChild(container.elements.worldContainer)
    }

    CampaignController.ResetCampaignData()
    container.elements.worldDisplay = WorldController.create(seed)
    container.elements.worldContainer.innerHTML = ''
    container.elements.worldContainer.appendChild(container.elements.worldDisplay.elements.interactiveMap)
    CampaignController.SetCampaignStatus('Waiting For Campaign Start')
    CampaignController.PrintCampaignData()
  },

  createWorldInfoBox (container) {
    // container.elements.infoBoxWorld = new InfoBox_World({});
    // container.elements.infoBoxWorld.setVisible(false);
    // container.appendChild(container.elements.infoBoxWorld);
  }
}

//  Module Exports
module.exports = { AdminAreaWorld }
