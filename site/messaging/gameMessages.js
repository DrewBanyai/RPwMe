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

const ipcRenderer = require('electron').ipcRenderer

//////////////////////////////
//  Send Messages
//////////////////////////////


//////////////////////////////
//  Receive Messages
//////////////////////////////
function receiveWindowID(event, ...args) {
    const windowID = args[0]

    var idLabel = document.querySelector('#win-id')
    if (idLabel) idLabel.innerHTML = windowID
}

function receiveTestMessage(event, ...args) {
    const message = args[0]

    var idLabel = document.querySelector('#win-id')
    if (idLabel) idLabel.innerHTML = message
}

//////////////////////////////
//  Callback Definitions
//////////////////////////////
ipcRenderer.on('window-id-send', receiveWindowID)
ipcRenderer.on('hello', receiveTestMessage)

//  Module Exports
module.exports = { }
