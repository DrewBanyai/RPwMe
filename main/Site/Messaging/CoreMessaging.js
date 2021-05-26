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

const ipcMain = require('electron').ipcMain
const windows = require('../../windows')

//  IPC messaging functions
function setupSendTestCallback() {
    ipcMain.on('send-test', sendTestTriggered)
}

function sendTestTriggered () {
    //  Find the GAME window and send a test message
    if (!Object.getOwnPropertyDescriptor(windows.windowMap, "GAME")) { return }
    const win = windows.windowMap["GAME"]
    win.webContents.send('hello', 'This is an IPC send test!')
}

//  Module Exports
module.exports = { setupSendTestCallback }