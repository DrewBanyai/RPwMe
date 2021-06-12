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

const { EventDispatch } = require('../Controllers/EventDispatch')
var { TwitchControl } = require('../Twitch/TwitchControl')
var { CampaignController } = require('../Data/CampaignController')
const CONFIG = require('../../config')

const CommandControl = {
    COMMAND_USER_TYPES: [ "viewer", "player", "gm", ],
    COMMANDS_LIST: {
        "!rpwme":           { effect: "Request for information about how to play", who: { viewer: true, player: true, gm: true }, args: { min: 0, max: 0 } },
        "!join":            { effect: "Request to join as a player", who: { viewer: true, player: false, gm: false }, args: { min: 0, max: 0 } },
        "!play":            { effect: "Request to join as a player", who: { viewer: true, player: false, gm: false }, args: { min: 0, max: 0 } },
    
        "!inventory":       { effect: "Request to open the given player's inventory", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
        "!items":           { effect: "Request to open the given player's inventory", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
        "!backpack":        { effect: "Request to open the given player's inventory", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
    
        "!name":            { effect: "Request to specify the given player's character name", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 10 } },
        "!race":            { effect: "Request to specify the given player's character race", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1 } },
        "!class":           { effect: "Request to specify the given player's character class", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1 } },
        "!reroll":          { effect: "Request to re-roll the given player's character stats", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
    
        "!investigate":     { effect: "Request to have the party investigate", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1000 } },
        "!look":            { effect: "Request to have a closer look at a specified target", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1000 } },
    
        "!push":            { effect: "Request to push a specified target", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1000 } },
        "!pull":            { effect: "Request to pull a specified target", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1000 } },
        
        "!camp":            { effect: "Request to have the party sleep in their current location", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
        "!sleep":           { effect: "Request to have the party sleep in their current location", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
        "!rest":            { effect: "Request to have the party sleep in their current location", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
    
        "!move":            { effect: "Request to move the given player to the specified position", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 1 } },
        "!attack":          { effect: "Request to attack a random or specified target", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 10 } },
    
        "!magic":           { effect: "Request to use a specified spell on a specified target", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 2 } },
        "!spell":           { effect: "Request to use a specified spell on a specified target", who: { viewer: false, player: true, gm: false }, args: { min: 1, max: 2 } },
    
        "!run":             { effect: "Request to have the party attempt to escape a situation", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
        "!escape":          { effect: "Request to have the party attempt to escape a situation", who: { viewer: false, player: true, gm: false }, args: { min: 0, max: 0 } },
    
        "!fates":           { effect: "Request to start a Fates vote on the included string", who: { viewer: true, player: false, gm: true }, args: { min: 1, max: 1000 } },
        "!fatesvote":       { effect: "Request to vote for the currently active Fates vote with 'yes' or 'no'", who: { viewer: true, player: false, gm: true }, args: { min: 1, max: 1 } },
        "!yes":             { effect: "Request to vote for the currently active Fates vote with 'yes'", who: { viewer: true, player: false, gm: true }, args: { min: 0, max: 0 } },
        "!no":              { effect: "Request to vote for the currently active Fates vote with 'no'", who: { viewer: true, player: false, gm: true }, args: { min: 0, max: 0 } },
    },

    GetCommandData: (commandName) => {
        if (!commandName) { return null; }
        let commandKeys = Object.keys(CommandControl.COMMANDS_LIST);
        if (!commandKeys.includes(commandName)) { return null; }
        return CommandControl.COMMANDS_LIST[commandName];
    },
    GetCommandStringParsed: (commandString) => {
        let commandParts = commandString.split(" ");
        let commandID = commandParts[0];
        commandParts.shift();
        
        return { id: commandID, args: commandParts };
    },
    CheckIsCommandValid: (commandString, userType) => {
        if (!commandString) { return { valid: false, reason: "Command string is empty" }; }
        if (!userType) { return { valid: false, reason: "User Type is empty" }; }
    
        let commandParsed = CommandControl.GetCommandStringParsed(commandString);
        let commandData = CommandControl.GetCommandData(commandParsed.id);
        if (!commandData) { return { valid: false, reason: "Command Data not found" }; }
        if (!CommandControl.COMMAND_USER_TYPES.includes(userType)) { return { valid: false, reason: "User Type not found" }; }
        if (!commandData.who[userType]) { return { valid: false, reason: "User Type is not allowed" }; }
        if ((commandParsed.args.length < commandData.args.min) || (commandParsed.args.length > commandData.args.max)) { return { valid: false, reason: "Incorrect number of arguments" }; }
    
        return { valid: true, reason: "" };
    },
    CommandRequest: (commandString, userType) => {
        let commandValid = CommandControl.CheckIsCommandValid(commandString, userType)
        if (!commandValid || !commandValid.valid) { 
            if (CONFIG.DEBUG) console.log("Command not valid: ", '"' + commandValid.reason + '"');
            return false;
        }

        let commandParsed = CommandControl.GetCommandStringParsed(commandString);
        let commandData = CommandControl.GetCommandData(commandParsed.id);
    
        if (CONFIG.DEBUG) console.log("Command event: ", commandParsed.id, { data: commandData, args: commandParsed.args });
        EventDispatch.SendEvent(commandParsed.id, { data: commandData, args: commandParsed.args });
        return true;
    },
    GetCommandEffect: (commandQuery) => {
        //  Argument example: "?attack"
    
        if (!commandQuery) { return null; }
        if (commandQuery[0] !== "?") { return null; }
    
        let commandParts = commandQuery.split(" ");
        if (commandParts > 1) { return null; }
    
        let commandID = "!" + commandParts[0].substring(1, commandParts[0].length - 1);
        if (commandID.length <= 0) { return null; }
    
        let commandData = CommandControl.GetCommandData(commandID);
        if (!commandData) { return null; }
        
        return commandData.effect;
    },
    InitCommandControl: () => {
        let commandIDs = Object.keys(CommandControl.COMMANDS_LIST);
        commandIDs.forEach(commandID => {
            TwitchControl.AddCommandCallback(commandID, (userstate, message) => {
                let userIsGM = (userstate.username == CampaignController.GetCampaignGameMaster());
                let userIsPlayer = (CampaignController.GetPlayerExists(userstate.username));
                let userType = (userIsGM ? "gm" : (userIsPlayer ? "player" : ("viewer")));
                CommandControl.CommandRequest(message, userType);
            });
        });
    },
}

//  Module Exports
module.exports = { CommandControl }