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

const CONFIG = require('../../config')
const STYLE = require('../style')
const SETTINGS = require('../settings')
const { Container, Label, BasicButton } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { CampaignController } = require('../Controllers/CampaignController')
const { PlayerJoinRequest } = require('../Components/PlayerJoinRequest')
const { ActivePlayerEntry } = require('../Components/ActivePlayerEntry')
const { adminMessages } = require('../Messaging/AdminMessages')
const { PlayerCharacter } = require('../Data/PlayerCharacter')

"use strict"

const playerRaceFromCommands = { "!dwarf": "Dwarf", "!elf": "Elf", "!halfling": "Halfling", "!human": "Human" };
const playerClassFromCommands = { "!cleric": "Cleric", "!fighter": "Fighter", "!wizard": "Wizard", "!rogue": "Rogue" };

let AdminArea_Players = {
    create() {
        let container = Container.create({
            id: "AdminArea_Players",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
                display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE,
            }
        });

        container.elements = { startPlayerJoinMenu: null, playerDataDisplay: null, playerListMenu: null, activePlayerList: null, playerRequestList: null, beginGameButton: null };
        container.requestUsers = [];
        container.selectedPlayer = "";

        AdminArea_Players.createStartPlayerJoinMenu(container);
        AdminArea_Players.createPlayerDataDisplay(container);

        AdminArea_Players.SetupEventHandlers(container);

        return container;
    },

    createStartPlayerJoinMenu(container) {
        container.elements.startPlayerJoinMenu = Container.create({
            id: "StartPlayerJoinMenu",
            style: {
                width: "100%",
                height: "100%",
                display: "block",
                textAlign: "center",
            }
        });
        container.appendChild(container.elements.startPlayerJoinMenu);
        container.elements.startPlayerJoinMenu.show = (visible) => { container.elements.startPlayerJoinMenu.style.display = (visible ? "block" : "none"); }

        let startPlayerJoinLabel1 = Label.create({
            id: "StartPlayerJoinLabel",
            style: {
                fontFamily: "Vesper Libre",
                fontSize: "36px",
                color: "rgb(200, 200, 200)",
                margin: "100px 100px 0px 0px",
            },
            attributes: { value: "The game is currently in Campaign Edit Mode.", },
        });
        container.elements.startPlayerJoinMenu.appendChild(startPlayerJoinLabel1);

        let startPlayerJoinLabel2 = Label.create({
            id: "StartPlayerJoinLabel",
            style: {
                fontFamily: "Vesper Libre",
                fontSize: "36px",
                color: "rgb(200, 200, 200)",
                margin: "0px 100px 0px 0px",
            },
            attributes: { value: "Press the button below to move into the Player Join Mode.", },
        });
        container.elements.startPlayerJoinMenu.appendChild(startPlayerJoinLabel2);

        let startPlayerJoinButton = BasicButton.create({
            id: "StartPlayerJoinButton",
            style: {
                fontFamily: "Vesper Libre",
                fontSize: "18px",
                margin: "0px 100px 0px 0px",
                display: "inline-flex",
            },
            attributes: { value: "Allow Players To Join", },
        });
        BasicButton.setOnClick(startPlayerJoinButton, () => { EventDispatch.SendEvent("Start Player Join Mode", {}); });
        container.elements.startPlayerJoinMenu.appendChild(startPlayerJoinButton);

        if (SETTINGS.ADMIN_SETTINGS.AutoAllowPlayersToJoin) { setTimeout(() => { EventDispatch.SendEvent("Start Player Join Mode", {}); }, 500); }
    },

    createPlayerDataDisplay(container) {
        container.elements.playerDataDisplay = Container.create({
            id: "PlayerDataDisplay",
            style: {
                width: "100%",
                height: "100%",
                display: "none",
            }
        });
        container.appendChild(container.elements.playerDataDisplay);
        container.elements.playerDataDisplay.show = (visible) => { container.elements.playerDataDisplay.style.display = (visible ? "block" : "none"); }

        AdminArea_Players.AddPlayerListUI(container);
    },

    AddPlayerListUI(container) {
        container.elements.playerListMenu = Container.create({
            id: "PlayerListMenu",
            style: {
                width: "20%",
                height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                display: "block",
                backgroundColor: "rgb(255, 0, 255, 0.3)",
            }
        });
        container.elements.playerDataDisplay.appendChild(container.elements.playerListMenu);

        //  Active Player List
        let activePlayerListBox = Container.create({
            id: "ActivePlayerListBox",
            style: {
                width: "100%",
                height: "139px",
                display: "table",
                backgroundColor: "rgb(40, 40, 40)",
            }
        });
        container.elements.playerListMenu.appendChild(activePlayerListBox);

        let activePlayerListTitle = Label.create({
            id: "ActivePlayerListTitle",
            style: {
                fontFamily: "Vesper Libre",
                fontSize: "20px",
                color: "rgb(200, 200, 200)",
                fontWeight: "bold",
                margin: "0px auto 0px auto",
                height: "28px",
                textAlign: "center",
                userSelect: "none",
            },
            attributes: { value: "Active Players", },
        });
        activePlayerListBox.appendChild(activePlayerListTitle);

        container.elements.activePlayerList = Container.create({
            id: "ActivePlayerListContainer",
            style: {
                width: "228px",
                height: "80px",
                borderRadius: "6px",
                backgroundColor: "rgb(20, 20, 20)",
                margin: "4px 4px 4px 4px",
                padding: "9px",
                overflow: "hidden",
                border: "1px solid rgb(255, 255, 255)",
            }
        });
        activePlayerListBox.appendChild(container.elements.activePlayerList);

        //  Player Request List
        let playerRequestListBox = Container.create({
            id: "PlayerRequestListBox",
            style: {
                width: "100%",
                height: "324px",
                display: "table",
                backgroundColor: "rgb(40, 40, 40)",
            }
        });
        container.elements.playerListMenu.appendChild(playerRequestListBox);

        let joinRequestListTitle = Label.create({
            id: "JoinRequestListTitle",
            style: {
                fontFamily: "Vesper Libre",
                fontSize: "20px",
                color: "rgb(200, 200, 200)",
                fontWeight: "bold",
                margin: "0px auto 0px auto",
                height: "28px",
                textAlign: "center",
                userSelect: "none",
            },
            attributes: { value: "Join Requests", },
        });
        playerRequestListBox.appendChild(joinRequestListTitle);

        container.elements.playerRequestList = Container.create({
            id: "JoinRequestListContainer",
            style: {
                width: "228px",
                height: "264px",
                borderRadius: "6px",
                backgroundColor: "rgb(20, 20, 20)",
                margin: "4px 4px 4px 4px",
                padding: "9px",
                overflow: "hidden",
                border: "1px solid rgb(255, 255, 255)",
            }
        });
        playerRequestListBox.appendChild(container.elements.playerRequestList);

        //  Begin Game Option box
        let beginGameOptionBox = Container.create({
            id: "BeginGameOptionBox",
            style: {
                width: "100%",
                height: "184px",
                display: "table",
                backgroundColor: "rgb(40, 40, 40)",
                textAlign: "center",
            }
        });
        container.elements.playerListMenu.appendChild(beginGameOptionBox);

        container.elements.beginGameButton = BasicButton.create({
            id: "BeginGameButton",
            style: {
                width: "120px",
                height: "24px",
                position: "relative",
                top: "3px",
                margin: "0px 4px 0px 0px",
                fontFamily: "Open Sans Condensed",
                fontWeight: "bold",
                fontSize: "14px",
                display: "none",
            },
            attributes: { value: "Begin Game" },
        });
        BasicButton.setOnClick(container.elements.beginGameButton, () => { EventDispatch.SendEvent("Begin Campaign", {}); });
        beginGameOptionBox.appendChild(container.elements.beginGameButton);

        if (CONFIG.DEBUG.includes("SCREEN BUTTONS")) {
            container.elements.showInventoryButton = BasicButton.create({
                id: "ShowInventoryButton",
                style: {
                    fontFamily: "Vesper Libre",
                    fontSize: "18px",
                    margin: "0px 100px 0px 0px",
                    display: "inline-flex",
                },
                attributes: { value: "Show Inventory", },
            });
            container.appendChild(container.elements.showInventoryButton);
            BasicButton.setOnClick(container.elements.showInventoryButton, () => { adminMessages.sendShowCampaignScreenEvent({ screenID: "Inventory", }); });
        }

        //  Add event dispatchers for joining, leaving, selecting race, selecting class, selecting name, and approving character
        EventDispatch.AddEventHandler("!join", (eventType, eventData) => { AdminArea_Players.AddPlayerJoinRequest(container, eventData); });
        EventDispatch.AddEventHandler("!leave", (eventType, eventData) => { AdminArea_Players.RemovePlayer(container, eventData); });

        EventDispatch.AddEventHandler("!dwarf", (eventType, eventData) => { AdminArea_Players.SetPlayerRace(container, eventData); });
        EventDispatch.AddEventHandler("!elf", (eventType, eventData) => { AdminArea_Players.SetPlayerRace(container, eventData); });
        EventDispatch.AddEventHandler("!halfling", (eventType, eventData) => { AdminArea_Players.SetPlayerRace(container, eventData); });
        EventDispatch.AddEventHandler("!human", (eventType, eventData) => { AdminArea_Players.SetPlayerRace(container, eventData); });

        EventDispatch.AddEventHandler("!cleric", (eventType, eventData) => { AdminArea_Players.SetPlayerClass(container, eventData); });
        EventDispatch.AddEventHandler("!fighter", (eventType, eventData) => { AdminArea_Players.SetPlayerClass(container, eventData); });
        EventDispatch.AddEventHandler("!wizard", (eventType, eventData) => { AdminArea_Players.SetPlayerClass(container, eventData); });
        EventDispatch.AddEventHandler("!rogue", (eventType, eventData) => { AdminArea_Players.SetPlayerClass(container, eventData); });

        EventDispatch.AddEventHandler("!name", (eventType, eventData) => { AdminArea_Players.SetPlayerName(container, eventData); });

        EventDispatch.AddEventHandler("!reroll", (eventType, eventData) => { AdminArea_Players.RerollCharacter(container, eventData); });
        EventDispatch.AddEventHandler("!ready", (eventType, eventData) => { AdminArea_Players.ReadyCharacter(container, eventData); });
    },

    SetupEventHandlers(container) {
        //  When we move into Player Join Mode, show the player data menu and then update all data
        EventDispatch.AddEventHandler("Start Player Join Mode", (eventType, eventData) => {
            container.elements.startPlayerJoinMenu.show(false);
            container.elements.playerDataDisplay.show(true);
            AdminArea_Players.UpdatePlayerData(container);

            adminMessages.sendCampaignToGameScreen(CampaignController.GetCampaignData());
            adminMessages.sendPlayerJoinAllowedFlag();
            CampaignController.SetCampaignStatus("Waiting For Players");
        });

        EventDispatch.AddEventHandler("Begin Campaign", (eventType, eventData) => {
            adminMessages.sendCampaignToGameScreen(CampaignController.GetCampaignData());
            adminMessages.sendCampaignBeginFlag();
            CampaignController.SetCampaignStatus("Active");
        });

        EventDispatch.AddEventHandler("Player Added", (eventType, eventData) => { adminMessages.sendPlayerJoinedEvent(eventData); });
        EventDispatch.AddEventHandler("Player Removed", (eventType, eventData) => { adminMessages.sendPlayerLeftEvent(eventData); });
        EventDispatch.AddEventHandler("Player Race Set", (eventType, eventData) => { adminMessages.sendPlayerRaceSetEvent(eventData); });
        EventDispatch.AddEventHandler("Player Class Set", (eventType, eventData) => { adminMessages.sendPlayerClassSetEvent(eventData); })

        EventDispatch.AddEventHandler("Player Name Set", (eventType, eventData) => {
            PlayerCharacter.DefineCharacter(eventData.character);
            adminMessages.sendPlayerNameSetEvent(eventData);
        });

        EventDispatch.AddEventHandler("Player Character Ready", (eventType, eventData) => {
            eventData.character._READY = true;
            EventDispatch.SendEvent("Player Ready Status Updated", eventData);
            adminMessages.sendCharacterReadyEvent(eventData);
        });

        EventDispatch.AddEventHandler("Player Ready Status Updated", (eventType, eventData) => {
            let playersReady = 0;
            let playersList = CampaignController.GetPlayersList();
            let playersListKeys = Object.keys(playersList);
            playersListKeys.forEach(k => playersReady += ((playersList[k] && playersList[k].character._READY) ? 1 : 0));
            
            if (playersReady >= SETTINGS.ADMIN_SETTINGS.PLAYERS_REQUIRED_TO_BEGIN) container.elements.beginGameButton.style.display = "inline-flex";
            else container.elements.beginGameButton.style.display = "none";
        });
    },

    AddActivePlayerEntry(container, eventData) {
        let player = ActivePlayerEntry.create({
            name: eventData.user,
            selectCallback: () => {
                console.log(eventData.user, " selected!");
            },
        });
        ActivePlayerEntry.setRemoveCallback(player, () => {
            //  Remove the user from the campaign
            CampaignController.RemoveCampaignPlayer(eventData.user);
            EventDispatch.SendEvent("Player Ready Status Updated", eventData);

            //  Remove the player join request entry from the UI
            container.elements.activePlayerList.removeChild(player);
        });
        container.elements.activePlayerList.appendChild(player);
    },

    AddPlayerJoinRequest(container, eventData) {
        if (CampaignController.GetPlayerExists(eventData.user) || container.requestUsers.includes(eventData.user)) { return false; }

        let player = PlayerJoinRequest.create({ name: eventData.user });
        PlayerJoinRequest.setApproveCallback(player, () => { AdminArea_Players.ApprovePlayerJoinRequest(container, eventData, player); });
        PlayerJoinRequest.setDenyCallback(player, () => { AdminArea_Players.DenyPlayerJoinRequest(container, eventData, player); });
        container.elements.playerRequestList.appendChild(player);
        container.requestUsers.push(eventData.user);

        if (SETTINGS.ADMIN_SETTINGS.AutoApproveJoinRequests) { AdminArea_Players.ApprovePlayerJoinRequest(container, eventData, player); }
    },

    RemovePlayer(container, eventData) {
        if (container.requestUsers.includes(eventData.user)) {
            container.requestUsers = container.requestUsers.filter((entry) => { return entry !== eventData.user });

            let playerEntry = null;
            for (let i = 0; i < container.elements.playerRequestList.children.length; ++i)
                if (container.elements.playerRequestList.children[i].username == eventData.user)
                    playerEntry = container.elements.playerRequestList.children[i];
            if (playerEntry) container.elements.playerRequestList.removeChild(playerEntry);
            
            return true;
        }

        if (CampaignController.GetPlayerExists(eventData.user)) {
            CampaignController.RemoveCampaignPlayer(eventData.user);
            EventDispatch.SendEvent("Player Ready Status Updated", eventData);

            let playerEntry = null;
            for (let i = 0; i < container.elements.activePlayerList.children.length; ++i)
                if (container.elements.activePlayerList.children[i].username == eventData.user)
                    playerEntry = container.elements.activePlayerList.children[i];
            if (playerEntry) container.elements.activePlayerList.removeChild(playerEntry);
            
            return true;
        }

        return false;
    },

    SetPlayerRace(container, eventData) {
        if (!CampaignController.GetPlayerExists(eventData.user)) { console.warn("Attempting to set race of a user that is not a campaign player."); return false; }
        if (!["!dwarf", "!elf", "!halfling", "!human"].includes(eventData.command)) { console.error("Setting player race with an incompatible command."); return false; }
        
        let player = CampaignController.GetPlayer(eventData.user);
        if (player.character.Race !== null) { console.warn("Player attempting to change their race once it is already set."); return false; }

        player.character.Race = playerRaceFromCommands[eventData.command];
        EventDispatch.SendEvent("Player Race Set", { playerUsername: eventData.user, playerIndex: player.playerIndex, character: player.character });
    },

    SetPlayerClass(container, eventData) {
        if (!CampaignController.GetPlayerExists(eventData.user)) { console.warn("Attempting to set class of a user that is not a campaign player."); return false; }
        if (!["!cleric", "!fighter", "!wizard", "!rogue"].includes(eventData.command)) { console.error("Setting player class with an incompatible command."); return false; }
        
        let player = CampaignController.GetPlayer(eventData.user);
        if (player.character.Race === null) { console.warn("Player attempting to change their class without setting their race."); return false; }
        if (player.character.Class !== null) { console.warn("Player attempting to change their class once it is already set."); return false; }

        player.character.Class = playerClassFromCommands[eventData.command];
        EventDispatch.SendEvent("Player Class Set", { playerUsername: eventData.user, playerIndex: player.playerIndex, character: player.character });
    },

    SetPlayerName(container, eventData) {
        if (!CampaignController.GetPlayerExists(eventData.user)) { console.warn("Attempting to set name of a user that is not a campaign player."); return false; }
        if (!["!name"].includes(eventData.command)) { console.error("Setting player name with an incompatible command."); return false; }

        let player = CampaignController.GetPlayer(eventData.user);
        if (player.character.Race === null) { console.warn("Player attempting to change their name without setting their race."); return false; }
        if (player.character.Class === null) { console.warn("Player attempting to change their name without setting their class."); return false; }
        if (player.character.Name !== null) { console.warn("Player attempting to change their name once it is already set."); return false; }

        player.character.Name = eventData.args.join(" ");
        EventDispatch.SendEvent("Player Name Set", { playerUsername: eventData.user, playerIndex: player.playerIndex, character: player.character });
    },

    RerollCharacter(container, eventData) {
        if (!CampaignController.GetPlayerExists(eventData.user)) { console.warn("Attempting to reroll character of a user that is not a campaign player."); return false; }
        if (!["!reroll"].includes(eventData.command)) { console.error("Rerolling character with an incompatible command."); return false; }

        let player = CampaignController.GetPlayer(eventData.user);
        if (player.character.Race === null) { console.warn("Player attempting to reroll without setting their race."); return false; }
        if (player.character.Class === null) { console.warn("Player attempting to reroll without setting their class."); return false; }
        if (player.character.Name === null) { console.warn("Player attempting to reroll without setting their name."); return false; }
        if (player.character._READY === true) { console.warn("Player attempting to reroll after marking as ready."); return false; }

        EventDispatch.SendEvent("Player Name Set", { playerUsername: eventData.user, playerIndex: player.playerIndex, character: player.character });
    },

    ReadyCharacter(container, eventData) {
        if (!CampaignController.GetPlayerExists(eventData.user)) { console.warn("Attempting to ready character of a user that is not a campaign player."); return false; }
        if (!["!ready"].includes(eventData.command)) { console.error("Readying character with an incompatible command."); return false; }

        let player = CampaignController.GetPlayer(eventData.user);
        if (player.character.Race === null) { console.warn("Player attempting to ready without setting their race."); return false; }
        if (player.character.Class === null) { console.warn("Player attempting to ready without setting their class."); return false; }
        if (player.character.Name === null) { console.warn("Player attempting to ready without setting their name."); return false; }
        if (player.character._READY === true) { console.warn("Player attempting to ready after marking as ready."); return false; }

        EventDispatch.SendEvent("Player Character Ready", { playerUsername: eventData.user, playerIndex: player.playerIndex, character: player.character });
    },

    ApprovePlayerJoinRequest(container, eventData, joinRequest) {
        //  Remove the request user from the hidden array
        container.requestUsers = container.requestUsers.filter((user) => user != eventData.user);

        //  Remove the player join request entry from the UI
        container.elements.playerRequestList.removeChild(joinRequest);

        //  Add the user as an approved campaign player
        CampaignController.AddCampaignPlayer(eventData.user);

        //  Update the player data display if needed
        AdminArea_Players.AddActivePlayerEntry(container, eventData);
        AdminArea_Players.UpdatePlayerData(container);
    },

    DenyPlayerJoinRequest(container, eventData, joinRequest) {
        //  Remove the request user from the hidden array
        container.requestUsers = container.requestUsers.filter((user) => user != eventData.user);
        
        //  Remove the player join request entry from the UI
        container.elements.playerRequestList.removeChild(joinRequest);
    },

    UpdatePlayerData(container) {
        //  If we haven't selected a player, and there is one in the list, select it now
        let playersList = CampaignController.GetPlayersList();
        if (container.selectedPlayer !== "" && !playersList.includes(container.selectedPlayer)) { container.selectedPlayer = ""; }
        if (container.selectedPlayer === "" && playersList.length > 0) { container.selectedPlayer = playersList[0]; }

        //  TODO: Grab latest player data from CAMPAIGN_DATA and update the display UI
        let playerDataDisplay = container.elements.playerDataDisplay;

        return;
    }
};

//  Module Exports
module.exports = { AdminArea_Players }