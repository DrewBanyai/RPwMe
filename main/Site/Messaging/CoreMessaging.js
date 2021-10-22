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

const { ipcMain } = require('electron')
const windows = require('../../windows')

function passToGameWindow (messageID, event, arg) {
  //  Find the GAME window and send the message through
  if (!Object.getOwnPropertyDescriptor(windows.windowMap, 'GAME')) { return }
  const win = windows.windowMap.GAME
  win.webContents.send(messageID, arg)
}

//  IPC messaging functions
function setupMessageCallbacks () {
  ipcMain.on('send-test', (event, arg) => { passToGameWindow('change-window-id', event, arg) })
  ipcMain.on('campaign-update', (event, arg) => { passToGameWindow('campaign-update', event, arg) })
  ipcMain.on('player-join-allowed', (event, arg) => { passToGameWindow('player-join-allowed', event, arg) })
  ipcMain.on('player-joined', (event, arg) => { passToGameWindow('player-joined', event, arg) })
  ipcMain.on('player-left', (event, arg) => { passToGameWindow('player-left', event, arg) })
  ipcMain.on('player-race-set', (event, arg) => { passToGameWindow('player-race-set', event, arg) })
  ipcMain.on('player-class-set', (event, arg) => { passToGameWindow('player-class-set', event, arg) })
  ipcMain.on('player-name-set', (event, arg) => { passToGameWindow('player-name-set', event, arg) })
  ipcMain.on('character-ready', (event, arg) => { passToGameWindow('character-ready', event, arg) })
  ipcMain.on('campaign-begin', (event, arg) => { passToGameWindow('campaign-begin', event, arg) })
  ipcMain.on('show-campaign-screen', (event, arg) => { passToGameWindow('show-campaign-screen', event, arg) })
  ipcMain.on('journal-page-turn', (event, arg) => { passToGameWindow('journal-page-turn', event, arg) })
  ipcMain.on('journal-read-event', (event, arg) => { passToGameWindow('journal-read-event', event, arg) })
  ipcMain.on('journal-close-event', (event, arg) => { passToGameWindow('journal-close-event', event, arg) })
}

//  Module Exports
module.exports = { setupMessageCallbacks }
