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

"use strict"

let TwitchControl = {
    //  Variables
    Client: null,
    MessageCallbacks: null,

    //  Functions
    CreateConnectionOptions: (twitchUsername, twitchToken, twitchChannel, debug) => {
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
        //Client.action(channel, 'Hello Lonermoan, lame bot here');
    },
    onChatHandler: (target, context, msg, self) => {
        if (self) { return; } // Ignore messages from the bot
    
        // Remove whitespace from chat message
        const commandName = msg.trim();
    },
    onMessageHandler: (channel, userstate, message, self) => {
        if (self) return;
        //if (userstate.username === BOT_USERNAME) return;
        if (message.toLowerCase() === '!hello') {
            Client.say(channel, `@${userstate.username}, hello!`);
        }
    },
    InitializeTwitchControl: (username, token, channel, debug) => {
        //  Create a client with our options
        const options = TwitchControl.CreateConnectionOptions(username, token, channel, debug);
        console.log(options);
        Client = new tmi.client(options);
    
        //  Register our event handlers (defined below)
        Client.on('connected', TwitchControl.onConnectedHandler);
        Client.on('chat', TwitchControl.onChatHandler);
        Client.on('message', TwitchControl.onMessageHandler);
    
        //  Connect to Twitch
        Client.connect();
    }
}

//  Module Exports
module.exports = { TwitchControl }