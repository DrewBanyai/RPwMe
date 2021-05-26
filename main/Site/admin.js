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

const adminMessages = require('./Messaging/AdminMessages')
const STYLE = require('./style')
const SETTINGS = require('./settings')
const CONFIG = require('../config')
const TwitchControl = require('./Twitch/TwitchControl').TwitchControl


window.addEventListener('DOMContentLoaded', () => {
    LoadSiteContent();
    InitTwitchBot();
})

function LoadSiteContent() {
    //  Change the main div's background to the style setting
    document.body.style.backgroundColor = STYLE.WINDOW_BACKGROUND_COLOR.ADMIN
}

function InitTwitchBot() {
    let username = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.USERNAME) ? SETTINGS.TWITCH_DATA.USERNAME : null
    let token = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.TOKEN) ? SETTINGS.TWITCH_DATA.TOKEN : null;
    let channel = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.CHANNEL) ? SETTINGS.TWITCH_DATA.CHANNEL : null;
    TwitchControl.InitializeTwitchControl(username, token, channel, CONFIG.DEBUG);

    //  Example of how to use the AddCommandCallback system and then process command portions
    TwitchControl.AddCommandCallback("!hello", (commandParts) => {
        let commandMessage = (commandParts.length > 1) ? commandParts.slice(1).join(" ") : "Hello there!";
        adminMessages.sendTestMessage(commandMessage);
        TwitchControl.SendChatMessage("!hello message received and processed.");
    });
}