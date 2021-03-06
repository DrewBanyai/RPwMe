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
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { adminMessages } = require('../Messaging/AdminMessages')
const { EventDispatch } = require('../Controllers/EventDispatch')

const AdminAreaJournal = {
  create () {
    const container = Container.create({
      id: 'AdminArea_Journal',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
        backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
        display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE
      }
    })

    container.elements = { showJournalButton: null }

    if (CONFIG.DEBUG.includes('SCREEN BUTTONS')) {
      container.elements.showJournalButton = BasicButton.create({ id: 'ShowJournalButton', style: STYLE.ADMIN_SCREEN_DEBUG_BUTTON, attributes: { value: 'Show Journal' } })
      container.appendChild(container.elements.showJournalButton)
      BasicButton.setOnClick(container.elements.showJournalButton, () => { adminMessages.sendShowCampaignScreenEvent({ screenID: 'Journal' }) })
    }

    AdminAreaJournal.setupCommandEvents()

    return container
  },

  setupCommandEvents () {
    EventDispatch.AddEventHandler('!back', (eventType, eventData) => { adminMessages.sendJournalPageTurn({ pageTurn: 'back' }) })
    EventDispatch.AddEventHandler('!forward', (eventType, eventData) => { adminMessages.sendJournalPageTurn({ pageTurn: 'forward' }) })
    EventDispatch.AddEventHandler('!read', (eventType, eventData) => { adminMessages.sendJournalReadEvent(eventData) })
    EventDispatch.AddEventHandler('!close', (eventType, eventData) => { adminMessages.sendJournalCloseEvent(eventData) })
  }
}

//  Module Exports
module.exports = { AdminAreaJournal }
