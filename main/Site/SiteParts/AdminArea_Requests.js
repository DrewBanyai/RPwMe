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
const { Container } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { adminMessages } = require('../Messaging/AdminMessages')

const AdminAreaRequests = {
  create () {
    const container = Container.create({
      id: 'AdminArea_Requests',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
        backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
        display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE
      }
    })

    container.elements = {}

    AdminAreaRequests.setupChatCommands()

    return container
  },

  setupChatCommands () {
    EventDispatch.AddEventHandler('!journal', (eventType, eventData) => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Journal' }) })
    EventDispatch.AddEventHandler('!map', (eventType, eventData) => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Map' }) })
    EventDispatch.AddEventHandler('!inventory', (eventType, eventData) => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Inventory' }) })
    EventDispatch.AddEventHandler('!combat', (eventType, eventData) => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Combat' }) })
  }
}

//  Module Exports
module.exports = { AdminAreaRequests }
