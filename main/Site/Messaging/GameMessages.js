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

const { ipcRenderer } = require('electron')

const { EventDispatch } = require('../Controllers/EventDispatch')
const { CampaignController } = require('../Data/CampaignController')

const gameMessages = {
    //////////////////////////////
    //  Send Messages
    //////////////////////////////

    //////////////////////////////
    //  Receive Messages
    //////////////////////////////
    changeWindowID(event, ...args) {
        const message = args[0];
    
        var idLabel = document.querySelector('#ProgramLogo');
        console.log("TEST", message);
        if (idLabel) idLabel.innerHTML = message;
    },

    campaignUpdate(event, ...args) {
        CampaignController.UpdateCampaignData(args[0]);
        EventDispatch.SendEvent("Campaign Updated", CampaignController.GetCampaignData());
    },

    playerJoinAllowed(event, ...args) {
        EventDispatch.SendEvent("Player Join Allowed", null);
    },

    playerJoined(event, ...args) {
        EventDispatch.SendEvent("Player Joined", args[0]);
    },

    playerLeft(event, ...args) {
        EventDispatch.SendEvent("Player Left", args[0]);
    },

    playerRaceSet(event, ...args) {
        EventDispatch.SendEvent("Player Race Set", args[0]);
    },

    playerClassSet(event, ...args) {
        EventDispatch.SendEvent("Player Class Set", args[0]);
    },

    playerNameSet(event, ...args) {
        EventDispatch.SendEvent("Player Name Set", args[0]);
    },

    characterReady(event, ...args) {
        EventDispatch.SendEvent("Character Ready", args[0]);
    },

    Initialize() {
        ipcRenderer.on('change-window-id', gameMessages.changeWindowID);
        ipcRenderer.on('campaign-update', gameMessages.campaignUpdate);
        ipcRenderer.on('player-join-allowed', gameMessages.playerJoinAllowed);
        ipcRenderer.on('player-joined', gameMessages.playerJoined);
        ipcRenderer.on('player-left', gameMessages.playerLeft);
        ipcRenderer.on('player-race-set', gameMessages.playerRaceSet);
        ipcRenderer.on('player-class-set', gameMessages.playerClassSet);
        ipcRenderer.on('player-name-set', gameMessages.playerNameSet);
        ipcRenderer.on('character-ready', gameMessages.characterReady);
    }

    //////////////////////////////
    //  Callback Definitions
    //////////////////////////////
}

//  Module Exports
module.exports = { gameMessages }
