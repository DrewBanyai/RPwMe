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

const { AdminWindowTopButtons } = require('./AdminWindowTopButtons')
const { AdminAreaWorld } = require('./AdminArea_World')
const { AdminAreaArea } = require('./AdminArea_Area')
const { AdminAreaLocation } = require('./AdminArea_Location')
const { AdminAreaPlayers } = require('./AdminArea_Players')
const { AdminAreaNPCs } = require('./AdminArea_NPCs')
const { AdminAreaJournal } = require('./AdminArea_Journal')
const { AdminAreaCombat } = require('./AdminArea_Combat')
const { AdminAreaRequests } = require('./AdminArea_Requests')
const { AdminAreaStreamChat } = require('./AdminArea_StreamChat')
const { AdminAreaSettings } = require('./AdminArea_Settings')

const AdminDisplay = {
  create: () => {
    const container = Container.create({
      id: 'AdminDisplay',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT),
        backgroundColor: STYLE.WINDOW_BACKGROUND_COLOR.ADMIN
      }
    })

    //  Create the elements list for later use
    container.elements = { adminTopButtons: null, mainArea: null, menuScreens: {} }
    container.requestCount = 0

    //  Create the locations for the top button strip and the individual sub-menus of the display
    AdminDisplay.createAdminTopButtons(container)
    AdminDisplay.createMainArea(container)

    //  Fill in the main admin areas as well as the buttons in the top button strip
    AdminDisplay.addMainAreaEntries(container)
    AdminDisplay.addAdminButtonStripEntries(container, container.elements.adminTopButtons)

    return container
  },

  createAdminTopButtons: (container) => {
    container.elements.adminTopButtons = AdminWindowTopButtons.create({})
    container.appendChild(container.elements.adminTopButtons)
  },

  createMainArea: (container) => {
    container.elements.mainArea = Container.create({ id: 'AdminScreenMainArea' })
    container.appendChild(container.elements.mainArea)
  },

  addMainAreaEntries: (container) => {
    const addMainEntry = (areaType, areaStruct) => {
      container.elements.mainArea.appendChild(areaStruct)
      container.elements.menuScreens[areaType] = areaStruct
    }

    addMainEntry('World', AdminAreaWorld.create())
    addMainEntry('Area', AdminAreaArea.create({}))
    addMainEntry('Location', AdminAreaLocation.create({}))
    addMainEntry('Players', AdminAreaPlayers.create({}))
    addMainEntry('NPCs', AdminAreaNPCs.create({}))
    addMainEntry('Journal', AdminAreaJournal.create({}))
    addMainEntry('Combat', AdminAreaCombat.create({}))
    addMainEntry('Requests', AdminAreaRequests.create({}))
    addMainEntry('Stream Chat', AdminAreaStreamChat.create({}))
    addMainEntry('Settings', AdminAreaSettings.create({}))
  },

  addAdminButtonStripEntries: (container, buttonStrip) => {
    const makeButton = (className, buttonType) => {
      return { iconClass: className, fontSize: '36px', name: buttonType, callback: () => { AdminDisplay.showMenuScreen(container, buttonType) } }
    }

    AdminWindowTopButtons.setButtonsList(container.elements.adminTopButtons, [
      makeButton('fas fa-globe', 'World'),
      makeButton('fas fa-map-marked-alt', 'Area'),
      makeButton('fas fa-map-marker-alt', 'Location'),
      makeButton('fas fa-users', 'Players'),
      makeButton('fas fa-user-tag', 'NPCs'),
      makeButton('fas fa-book', 'Journal'),
      makeButton('fas fa-shield-alt', 'Combat'),
      makeButton('fas fa-exclamation-circle', 'Requests'),
      makeButton('fas fa-comments', 'Stream Chat'),
      makeButton('fas fa-cogs', 'Settings')
    ])
  },

  showMenuScreen: (container, menuID) => {
    const menuScreens = container.elements.menuScreens
    const areaKeys = Object.keys(menuScreens)
    areaKeys.forEach((key) => { menuScreens[key].style.display = 'none' })

    if (!menuScreens.hasOwnProperty(menuID)) { console.warn("Attempting to show nonexistent menu '" + menuID + "'"); return }
    menuScreens[menuID].style.display = STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE
    if (menuScreens[menuID].onShow) menuScreens[menuID].onShow()
  },

  setupPlayerRequestMenu: (container) => {
    //  Handle a player request coming in
    /*
    EventDispatch.AddEventHandler('Player Request', (eventType, eventData) => {
      const requestID = ++container.requestCount
      const requestUI = PlayerRequest.create({
        requestID: requestID,
        playerID: eventData.message.username,
        requestString: eventData.message.message.substr(9, eventData.message.message.length - 9),
        approveCallback: () => {
          console.log('APPROVED')
          EventDispatch.SendEvent('Request Removed', { requestID: requestID })
        }
      })
      container.menuScreens.Requests.appendChild(requestUI.content)
    })
    */

    EventDispatch.AddEventHandler('Request Removed', (eventType, eventData) => { AdminDisplay.removePlayerRequest(container, eventData.requestID) })
  },

  removePlayerRequest: (container, requestID) => {
    for (let i = 0; i < container.elements.menuScreens.Requests.children.length; ++i) {
      if (container.elements.menuScreens.Requests.children[i].getRequestID() === requestID) {
        container.elements.menuScreens.Requests.removeChild(container.elements.menuScreens.Requests.children[i])
        return
      }
    }
  }
}

//  Module Exports
module.exports = { AdminDisplay }
