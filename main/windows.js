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

const CONFIG = require('./config')
const path = require('path')

var windowMap = {}

function initialize () {
    var windowWidth = CONFIG.WINDOW_WIDTH + (CONFIG.DEBUG.includes("CONSOLE") ? 600 : 0);
    createWindow("ADMIN", `${CONFIG.APP_NAME} - Admin Window`, windowWidth, CONFIG.WINDOW_HEIGHT, CONFIG.DEBUG.includes("CONSOLE"), false);
    createWindow("GAME", `${CONFIG.APP_NAME} - Game Window`, windowWidth, CONFIG.WINDOW_HEIGHT, CONFIG.DEBUG.includes("CONSOLE"), false);
}

function createWindow(windowID, title, width, height, devTools, menu) {
    const newWindow = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname , '/Site/Images/Icon_' + windowID + '.png'),
        useContentSize: true,
        resizable: false,
        autoHideMenuBar: true,
        acceptFirstMouse: true,
        webPreferences: {
            preload: path.join(__dirname , CONFIG.PRELOAD[windowID])
        }
    })
    newWindow.setContentSize(width, height)
    windowMap[windowID] = newWindow

    //  Hide the default Electron BrowserWindow menu bar
    if (!menu) newWindow.setMenuBarVisibility(false);

    //  If the program is in debug mode, show the dev tools menu
    if (CONFIG.DEBUG.includes("CONSOLE")) newWindow.webContents.openDevTools()

    //  Load in the HTML file for this window
    newWindow.loadFile(CONFIG.INDEX[windowID])

    //  Once the window contents load, send a message that will get accepted by the Admin menu
    //newWindow.webContents.on('did-finish-load', function () {
        //newWindow.webContents.send('window-id-send', windowID)
    //})

    //  If the window ever closes, run destroy() to remove links to it
    newWindow.on('closed', function () {
        destroy(windowID)
    })
    
	newWindow.on('close', function () { newWindow.destroy(); closeAllWindows(); });
}

let closeAllWindows = () => {
    var windowKeys = Object.keys(windowMap);
    for (var key in windowKeys) destroy(windowKeys[key])
}

function destroy (windowID) {
    //  If the Window Map has a key of this window ID, destroy the window if it still exists, and get rid of the key in this map
    if (!Object.getOwnPropertyDescriptor(windowMap, windowID)) { return }
    if (windowMap[windowID]) { windowMap[windowID].destroy() }
    delete windowMap[windowID]
}

//  Module Exports
module.exports = { windowMap, initialize }