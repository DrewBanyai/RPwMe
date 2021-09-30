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

const { adminMessages } = require('./Messaging/AdminMessages')
const SETTINGS = require('./settings')
const CONFIG = require('../config')
var { TwitchControl } = require('./Twitch/TwitchControl')
var { AdminDisplay } = require('./SiteParts/AdminDisplay')
var { CampaignController } = require('./Data/CampaignController')
var { CommandControl } = require('./Controllers/CommandController')


window.addEventListener('DOMContentLoaded', () => {
    document.windowID = "ADMIN";

    LoadSiteContent();
    InitTwitchBot();
})

function LoadSiteContent() {
    //  Create the AdminDisplay and drop it into the AdminPage div
    var adminPage = document.querySelector('#AdminPage')
    if (adminPage) adminPage.appendChild(AdminDisplay.create());
}

function InitTwitchBot() {
    //  Get the username, token, and channel from the settings data, and attempt to initialize TwitchControl
    let username = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.USERNAME) ? SETTINGS.TWITCH_DATA.USERNAME : null
    let token = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.TOKEN) ? SETTINGS.TWITCH_DATA.TOKEN : null;
    let channel = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.CHANNEL) ? SETTINGS.TWITCH_DATA.CHANNEL : null;
    TwitchControl.InitializeTwitchControl(username, token, channel, CONFIG.DEBUG);
    
    //  Set up the game master's ID in the Campaign Controller
    CampaignController.SetCampaignGameMaster(TwitchControl.ConnectionData.Channel.toLowerCase());

    //  Set up gm, player, and viewer commands
    CommandControl.InitCommandControl();

    //  Example of how to use the AddCommandCallback system and then process command portions (remove once 0.0.1 is ready)
    TwitchControl.AddCommandCallback("!hello", (userstate, message) => {
        let messageParts = message.split(" ");
        let responseString = (messageParts.length > 1) ? messageParts.slice(1).join(" ") : "Hello there!";
        adminMessages.sendTestMessage(responseString);
        TwitchControl.SendChatMessage("!hello message received and processed.");
    });
}