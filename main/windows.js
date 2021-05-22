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

const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const config = require('./config')

var windowMap = {}

function createWindows () {
  var windowWidth = 1280 + (config.DEBUG ? 600 : 0);
  createWindow("ADMIN", `${config.APP_NAME} - Admin Window`, windowWidth, 720, config.DEBUG, false);
  createWindow("GAME", `${config.APP_NAME} - Game Window`, windowWidth, 720, config.DEBUG, false);
}

function createWindow(windowID, title, width, height, devTools, menu) {
  //  Create the basic BrowserWindow instance and save it to the Window Map
  const newWindow = new BrowserWindow({
    title: title,
    width: width,
    height: height,
    acceptFirstMouse: true
  })
  windowMap[windowID] = newWindow

  //  Hide the default Electron BrowserWindow menu bar
  if (!menu) newWindow.setMenuBarVisibility(false);

  //  If the program is in debug mode, show the dev tools menu
  if (config.DEBUG) newWindow.webContents.openDevTools()

  //  Load in the HTML file for this window
  newWindow.loadURL(config.INDEX[windowID])

  //  Once the window contents load, send a message that will get accepted by the Admin menu
  newWindow.webContents.on('did-finish-load', function () {
    newWindow.webContents.send('window-id-send', "Admin")
  })

  //  If the window ever closes, run destroy() to remove links to it
  newWindow.on('closed', function () {
    destroy(windowID)
  })
}

function destroy (windowID) {
  //  If the Window Map has a key of this window ID, destroy the window if it still exists, and get rid of the key in this map
  if (!Object.getOwnPropertyDescriptor(windowMap, windowID)) { return }
  if (windowMap[windowID]) { windowMap[windowID].destroy() }
  delete windowMap[windowID]
}

//  IPC messaging functions
ipcMain.on('send-test', sendTestTriggered)

function sendTestTriggered () {
  //  Find the ADMIN window and send a test message
  if (!Object.getOwnPropertyDescriptor(windowMap, "ADMIN")) { return }
  const win = windowMap["ADMIN"]
  win.webContents.send('hello', 'This is an IPC send test!')
}


//  Module Exports
module.exports = { windowMap, createWindows, destroy }
