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
const { CampaignController } = require('../Controllers/CampaignController')
const { TwitchControl } = require('../Twitch/TwitchControl')

const AdminAreaStreamChat = {
  chatMarginSize: { x: 10, y: 10 },
  chatBufferSize: { t: 4, b: 4 },
  chatEntryMarginSize: { t: 4, r: 6, b: 0, l: 6 },
  chatTextMarginSize: { t: 2, r: 6, b: 6, l: 6 },
  chatEntryMinHeight: 24,
  currentChatHeight: 0,

  create () {
    const container = Container.create({
      id: 'AdminArea_StreamChat',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
        backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
        display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE
      }
    })

    container.elements = { chatBox: null, chatTopSpacer: null, chatBottomSpacer: null, chatBoxEntries: null }

    AdminAreaStreamChat.CreateChatBox(container)

    TwitchControl.AddChatCallback((userstate, message) => { AdminAreaStreamChat.AddChatLine(container, userstate, message) })

    container.onShow = () => AdminAreaStreamChat.ResizeTopSpacer(container, false)

    return container
  },

  CreateChatBox (container) {
    const chatBoxMargin = AdminAreaStreamChat.chatMarginSize
    const chatBufferMargin = AdminAreaStreamChat.chatBufferSize

    container.elements.chatBox = Container.create({
      id: 'ChatBox',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH - (chatBoxMargin.x * 2)),
        height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT - (chatBoxMargin.y * 2)),
        backgroundColor: STYLE.CHAT_BOX_BACKGROUND_COLOR,
        borderRadius: '8px',
        position: 'relative',
        left: pxFromInt(chatBoxMargin.x),
        top: pxFromInt(chatBoxMargin.y)
      }
    })
    container.appendChild(container.elements.chatBox)

    container.elements.chatTopSpacer = Container.create({ id: 'ChatBoxTopSpacer', style: { width: '100%', height: pxFromInt(chatBufferMargin.t) } })
    container.elements.chatBox.appendChild(container.elements.chatTopSpacer)

    container.elements.chatBoxEntries = Container.create({ id: 'ChatBoxEntries' })
    container.elements.chatBox.appendChild(container.elements.chatBoxEntries)

    container.elements.chatBottomSpacer = Container.create({ id: 'ChatBoxBottomSpacer', style: { width: '100%', height: pxFromInt(chatBufferMargin.b) } })
    container.elements.chatBox.appendChild(container.elements.chatBottomSpacer)
  },
  CreateChatLine (chatUsername, chatString) {
    const outerMargin = AdminAreaStreamChat.chatMarginSize
    const innerMargin = AdminAreaStreamChat.chatEntryMarginSize
    const textMargin = AdminAreaStreamChat.chatTextMarginSize

    // Determine the background color and name color of the entry based on if the user is the Game Master or one of the Players
    const userIsGM = (chatUsername === CampaignController.GetCampaignGameMaster())
    const userIsPlayer = (CampaignController.GetPlayerExists(chatUsername))
    const entryBackgroundColor = (userIsGM ? STYLE.CHAT_ENTRY_BG_GAMEMASTER : (userIsPlayer ? STYLE.CHAT_ENTRY_BG_PLAYER : (STYLE.CHAT_ENTRY_BG_DEFAULT)))
    const entryNameColor = (userIsGM ? STYLE.CHAT_ENTRY_NAME_GAMEMASTER : (userIsPlayer ? STYLE.CHAT_ENTRY_NAME_PLAYER : (STYLE.CHAT_ENTRY_NAME_DEFAULT)))

    //  Determine the chat text color based on if it is a command or not
    const entryStringColor = STYLE.CHAT_ENTRY_STRING_COLOR

    const chatEntry = Container.create({
      id: 'ChatEntry',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH - (outerMargin.x * 2) - (innerMargin.l + innerMargin.r)),
        minHeight: pxFromInt(AdminAreaStreamChat.chatEntryMinHeight + (innerMargin.t + innerMargin.b))
      }
    })

    const chatEntryTopSpacer = Container.create({
      id: 'ChatEntryTopSpacer',
      style: {
        width: '100%',
        height: pxFromInt(innerMargin.t)
      }
    })
    chatEntry.appendChild(chatEntryTopSpacer)

    const chatEntryBox = Container.create({
      id: 'ChatEntryBox',
      style: {
        width: pxFromInt(CONFIG.WINDOW_WIDTH - (outerMargin.x * 2) - (innerMargin.l + innerMargin.r)),
        minHeight: pxFromInt(AdminAreaStreamChat.chatEntryMinHeight),
        borderRadius: '4px',
        backgroundColor: entryBackgroundColor,
        position: 'relative',
        left: pxFromInt(innerMargin.l)
      }
    })
    chatEntry.appendChild(chatEntryBox)

    const chatEntryBottomSpacer = Container.create({
      id: 'ChatEntryBottomSpacer',
      style: {
        width: '100%',
        height: pxFromInt(innerMargin.b)
      }
    })
    chatEntry.appendChild(chatEntryBottomSpacer)

    const chatEntryText = Container.create({
      id: 'ChatEntryText',
      style: {
        display: 'flex',
        position: 'relative',
        left: pxFromInt(textMargin.l),
        top: pxFromInt(textMargin.t),
        padding: `${pxFromInt(textMargin.t)} ${pxFromInt(textMargin.r)} ${pxFromInt(textMargin.b)} ${pxFromInt(textMargin.l)}`
      }
    })
    chatEntryBox.appendChild(chatEntryText)

    chatEntryText.innerHTML = `<div style="color: ${entryNameColor}">${chatUsername}:&nbsp;&nbsp;</div><div style="color: ${entryStringColor}">${chatString}</div>`

    return chatEntry
  },
  AddChatLine (container, userstate, message) {
    //  Create the chat line entry node and insert it, then return the top spacer to default size (we'll resize it again after)
    const chatEntry = AdminAreaStreamChat.CreateChatLine(userstate.username, message)
    container.elements.chatBoxEntries.appendChild(chatEntry)
    AdminAreaStreamChat.ResizeTopSpacer(container, true)

    //  If our chat entries are taking more than the space allotted for the chat box, destroy the earliest message entry box
    while (AdminAreaStreamChat.GetChatHeight(container) > container.elements.chatBox.offsetHeight) {
      container.elements.chatBoxEntries.removeChild(container.elements.chatBoxEntries.firstChild)
    }

    //  Resize the top spacer to take up as much height as is remaining, to push all chat to the bottom
    AdminAreaStreamChat.ResizeTopSpacer(container, false)
  },
  ResizeTopSpacer (container, pre) {
    if (pre) container.elements.chatTopSpacer.style.height = pxFromInt(AdminAreaStreamChat.chatBufferSize.t)
    else {
      const chatSizeRemainder = (container.elements.chatBox.offsetHeight - AdminAreaStreamChat.GetChatHeight(container))
      container.elements.chatTopSpacer.style.height = pxFromInt(AdminAreaStreamChat.chatBufferSize.t + chatSizeRemainder)
    }
  },
  GetChatHeight (container) {
    let chatHeight = 0
    chatHeight += container.elements.chatTopSpacer.clientHeight
    for (let i = 0; i < container.elements.chatBoxEntries.children.length; ++i) {
      chatHeight += container.elements.chatBoxEntries.children[i].clientHeight
    }
    chatHeight += container.elements.chatBottomSpacer.clientHeight
    return chatHeight
  }
}

//  Module Exports
module.exports = { AdminAreaStreamChat }
