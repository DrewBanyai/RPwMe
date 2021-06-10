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

const tmi = require('tmi.js')

var TwitchControl = {
    //  Variables
    ConnectionData: {
        Username: null,
        Channel: null,
        Token: null
    },
    Client: null,
    CommandCallbacks: {},

    //  External Functions
    InitializeTwitchControl: (username, token, channel, debug) => {
        //  Save off our connection options, then create client with them
        TwitchControl.ConnectionData = { Username: username, Channel: channel, Token: token };
        const options = TwitchControl.createConnectionOptions(username, token, channel, debug);
        TwitchControl.Client = new tmi.client(options);
    
        //  Register our event handlers (defined below)
        TwitchControl.Client.on('connected', TwitchControl.onConnectedHandler);
        TwitchControl.Client.on('message', TwitchControl.onMessageHandler);
        TwitchControl.Client.on('mods', TwitchControl.onModsReceived);
        TwitchControl.Client.on('vips', TwitchControl.onVIPsReceived);
    
        //  Connect to Twitch
        TwitchControl.Client.connect();
    },
    AddCommandCallback: (eventID, callback) => {
        TwitchControl.CommandCallbacks[eventID] = callback;
    },
    SendChatMessage: (message) => {
        if (TwitchControl.ConnectionData.Channel === null) { console.warn("Attempting to send a message while not connected!"); return; }
        TwitchControl.Client.say(TwitchControl.ConnectionData.Channel, message)
    },
    SendChatAction: (message) => {
        if (TwitchControl.ConnectionData.Channel === null) { console.warn("Attempting to send an action while not connected!"); return; }
        TwitchControl.Client.action(TwitchControl.ConnectionData.Channel, message)
    },

    //  Internal Functions
    createConnectionOptions: (twitchUsername, twitchToken, twitchChannel, debug) => {
        return {
            identity: {
                username: twitchUsername,
                password: twitchToken
            },
            channels: [
                twitchChannel,
            ],
            options: {
                debug: debug,
            }
        };
    },
    onConnectedHandler: (address, port) => {
        TwitchControl.Client.action(TwitchControl.ConnectionData.Channel, 'Bot initialized and connected!');
    },
    onMessageHandler: (channel, userstate, message, self) => {
        if (self) { return; }                   //  Ignore messages from the bot 
        if (message.length <= 0) { return; }    //  Ignore empty messages (if they're even possible?)

        //  Check that the message-type tag exists and is one of the three expected types (action, chat, whisper), otherwise ignore it
        if (!("message-type" in userstate) || (!["action", "chat", "whisper"].includes(userstate["message-type"]))) {
            console.warn("Message received with unknown userstate message-type tag:", userstate);
            return;
        }

        //  If the message is an attempt at a command, look for that command in our message callbacks
        if (message[0] === "!") {
            let messageParts = message.split(" ");
            messageParts[0] = messageParts[0].toLowerCase();

            if (TwitchControl.CommandCallbacks.hasOwnProperty(messageParts[0])) {
                TwitchControl.CommandCallbacks[messageParts[0]](userstate, message);
                return;
            }
        }
    },
    onModsReceived: (channel, mods) => {
        console.log("MODS:", mods);
    },
    onVIPsReceived: (channel, vips) => {
        console.log("VIPs:", vips);
    }
}

//  Module Exports
module.exports = { TwitchControl }