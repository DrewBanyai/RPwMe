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
const { Container, Label } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { HandwrittenNote } = require('../Components/HandwrittenNote')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { AbilityScoreBlock } = require('../Components/AbilityScoreBlock')

const playerJoinCardPos = {
    0: { x: 226, y: 240 },
    1: { x: 576, y: 240 }, 
    2: { x: 926, y: 240 }
};

const playerJoinCardModes = [ "WaitingForJoin", "ChooseYourRace", "ChooseYourClass", "ChooseYourName", "CharacterOverview" ];

let GameArea_PlayerJoin = {
    create() {
        let container = Container.create({
            id: "GameArea_PlayerJoin",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                backgroundColor: STYLE.GAME_WINDOW_AREA_COLOR,
                display: STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE,
                justifyContent: "center",
                overflow: "hidden",
            }
        });

        container.elements = { paper: null, playerJoinCards: { 0: null, 1: null, 2: null } }

        container.elements.paper = Container.create({ id: "LinedPaperBackground", style: STYLE.LINED_PAPER_BACKGROUND, });
        container.appendChild(container.elements.paper);

        //  Create the three player join cards
        GameArea_PlayerJoin.createPlayerJoinCard(container, 0);
        GameArea_PlayerJoin.createPlayerJoinCard(container, 1);
        GameArea_PlayerJoin.createPlayerJoinCard(container, 2);

        //  Set up event callbacks
        EventDispatch.AddEventHandler("Player Joined", (eventType, eventData) => { this.playerJoinedCallback(eventData, container); });
        EventDispatch.AddEventHandler("Player Left", (eventType, eventData) => { this.playerLeftCallback(eventData, container); });
        EventDispatch.AddEventHandler("Player Race Set", (eventType, eventData) => { this.playerRaceSetCallback(eventData, container); });
        EventDispatch.AddEventHandler("Player Class Set", (eventType, eventData) => { this.playerClassSetCallback(eventData, container); });
        EventDispatch.AddEventHandler("Player Name Set", (eventType, eventData) => { this.playerNameSetCallback(eventData, container); });

        return container;
    },

    createPlayerJoinCard(container, playerIndex) {
        let playerJoinCard = container.elements.playerJoinCards[playerIndex] = Container.create({
            id: "PlayerJoinCard_" + playerIndex.toString(),
            style: {
                width: "300px",
                height: "400px",
                position: "absolute",
                left: playerJoinCardPos[playerIndex].x.toString() + "px",
                top: playerJoinCardPos[playerIndex].y.toString() + "px",
                backgroundImage: "url(Images/PlayerJoinCardBG.png)",
                backgroundSize: "100%",
            }
        })
        container.appendChild(playerJoinCard);

        playerJoinCard.elements = { nameTagBox: null, remainingCard: null, };

        //  Create name tag node
        playerJoinCard.elements.nameTagBox = Container.create({
            id: "NameTagBox_" + playerIndex.toString(),
            style: {
                width: "100%",
                height: "46px",
                borderBottom: "5px dashed rgb(130, 130, 130)"
            }
        });
        playerJoinCard.appendChild(playerJoinCard.elements.nameTagBox);

        //  Create remaining card node
        playerJoinCard.elements.remainingCard = Container.create({
            id: "RemainingCard_" + playerIndex.toString(),
            style: {
                width: "100%",
                height: "354px",
            }
        });
        playerJoinCard.appendChild(playerJoinCard.elements.remainingCard);

        //  Create different mode element roots
        for (var modeIndex in playerJoinCardModes) {
            let mode = playerJoinCardModes[modeIndex];
            playerJoinCard.elements.remainingCard.appendChild(playerJoinCard[mode] = Container.create({ id: mode + "_" + playerIndex.toString(), style: { display: "none" } }));
        }

        playerJoinCard.NameTag = HandwrittenNote.create({
            id: "PlayerJoinCardNameTag_" + playerIndex.toString(),
            style: STYLE.PLAYER_JOIN_CARD_NAME_TAG,
            attributes: { value: "Type '!join' to play", },
            writeDelay: 30,
        });
        playerJoinCard.elements.nameTagBox.appendChild(playerJoinCard.NameTag);

        //  Create the elements for the different card modes
        this.createCardModeElements_ChooseYourRace(playerJoinCard);
        this.createCardModeElements_ChooseYourClass(playerJoinCard);
        this.createCardModeElements_ChooseYourName(playerJoinCard);
        this.createCardModeElements_CharacterOverview(playerJoinCard);

        this.setPlayerJoinCardMode(playerJoinCard, "WaitingForJoin");
    },

    createCardModeElements_ChooseYourRace(card) {
        let container = card["ChooseYourRace"];

        let modeTitleLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "Choose Your Race" }, writeDelay: 30, });
        modeTitleLabel.style.top = "56px";
        container.appendChild(modeTitleLabel);

        let dwarfLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!dwarf" }, writeDelay: 30, });
        dwarfLabel.style.top = "140px";
        container.appendChild(dwarfLabel);

        let elfLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!elf" }, writeDelay: 30, });
        elfLabel.style.top = "180px";
        container.appendChild(elfLabel);

        let halflingLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!halfling" }, writeDelay: 30, });
        halflingLabel.style.top = "220px";
        container.appendChild(halflingLabel);

        let humanLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!human" }, writeDelay: 30, });
        humanLabel.style.top = "260px";
        container.appendChild(humanLabel);

        let randomLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_RANDOM, attributes: { value: "!random to leave it in the hands of fate" }, writeDelay: 30, });
        randomLabel.style.top = "360px";
        container.appendChild(randomLabel);
    },

    createCardModeElements_ChooseYourClass(card) {
        let container = card["ChooseYourClass"];

        let modeTitleLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "Choose Your Class" }, writeDelay: 30, });
        modeTitleLabel.style.top = "56px";
        container.appendChild(modeTitleLabel);

        let clericLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!cleric" }, writeDelay: 30, });
        clericLabel.style.top = "140px";
        container.appendChild(clericLabel);

        let fighterLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!fighter" }, writeDelay: 30, });
        fighterLabel.style.top = "180px";
        container.appendChild(fighterLabel);

        let wizardLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!wizard" }, writeDelay: 30, });
        wizardLabel.style.top = "220px";
        container.appendChild(wizardLabel);

        let rogueLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!rogue" }, writeDelay: 30, });
        rogueLabel.style.top = "260px";
        container.appendChild(rogueLabel);

        let randomLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_RANDOM, attributes: { value: "!random to leave it in the hands of fate" }, writeDelay: 30, });
        randomLabel.style.top = "360px";
        container.appendChild(randomLabel);
    },

    createCardModeElements_ChooseYourName(card) {
        let container = card["ChooseYourName"];

        let modeTitleLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "Choose Your Name" }, writeDelay: 30, });
        modeTitleLabel.style.top = "56px";
        container.appendChild(modeTitleLabel);

        let nameLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_CHOICE, attributes: { value: "!name Your Name" }, writeDelay: 30, });
        nameLabel.style.top = "180px";
        container.appendChild(nameLabel);

        let randomLabel = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CARD_RANDOM, attributes: { value: "!random to leave it in the hands of fate" }, writeDelay: 30, });
        randomLabel.style.top = "360px";
        container.appendChild(randomLabel);
    },

    createCardModeElements_CharacterOverview(card) {
        let container = card["CharacterOverview"];

        container.elements = { charNameTag: null, charStatBlock: null };

        container.elements.charNameTag = HandwrittenNote.create({ style: STYLE.PLAYER_JOIN_CHARACTER_NAMETAG, attributes: { value: "UNDEFINED" }, writeDelay: 30, });
        container.appendChild(container.elements.charNameTag);

        container.elements.charStatBlock = AbilityScoreBlock.create({
            style: {
                position: "absolute",
                left: "134px",
                top: "80px",
            }
        });
        container.appendChild(container.elements.charStatBlock);
    },

    setPlayerJoinCardMode(card, mode) {
        for (var modeIndex in playerJoinCardModes) {
            let modeName = playerJoinCardModes[modeIndex];
            card[modeName].style.display = "none";
        }
        card[mode].style.display = "block";
    },

    setPlayerCharacterData(card, charData) {
        //  DEBUG
        console.log("CHARACTER:", charData);
        //  DEBUG

        card["CharacterOverview"].elements.charNameTag.setValue(charData.Name + ", " + charData.Race + " " + charData.Class + " (level " + charData.Level.toString() + ")");
        AbilityScoreBlock.setAbilityScores(card["CharacterOverview"].elements.charStatBlock, charData.AbilityScores, charData.AbilityScoreModifiers);
    },

    playerJoinedCallback(eventData, container) {
        if (!eventData) { console.error("Player Joined with null data. Something went wrong."); return false; }
        if (!eventData.playerUsername || (typeof eventData.playerUsername !== 'string')) { console.error("Player Joined with improper name format."); return false; }
        if (![0, 1, 2].includes(eventData.playerIndex)) { console.error("Player Joined with improper index."); return false; }

        let playerJoinCard = container.elements.playerJoinCards[eventData.playerIndex];
        playerJoinCard.NameTag.setValue(eventData.playerUsername);
        this.setPlayerJoinCardMode(playerJoinCard, "ChooseYourRace");
    },

    playerLeftCallback(eventData, container) {
        if (!eventData) { console.error("Player Left with null data. Something went wrong."); return false; }
        if (!eventData.playerUsername || (typeof eventData.playerUsername !== 'string')) { console.error("Player Left with improper name format."); return false; }
        if (![0, 1, 2].includes(eventData.playerIndex)) { console.error("Player Left with improper index."); return false; }

        let playerJoinCard = container.elements.playerJoinCards[eventData.playerIndex];
        playerJoinCard.NameTag.setValue("Type '!join' to play");
        this.setPlayerJoinCardMode(playerJoinCard, "WaitingForJoin");
    },

    playerRaceSetCallback(eventData, container) {
        if (!eventData) { console.error("Player Race Set with null data. Something went wrong."); return false; }
        if (!eventData.playerUsername || (typeof eventData.playerUsername !== 'string')) { console.error("Player Race Set with improper name format."); return false; }
        if (!["Dwarf", "Elf", "Halfling", "Human"].includes(eventData.character.Race)) { console.error("Player Set Race with improper type."); return false; }

        let playerJoinCard = container.elements.playerJoinCards[eventData.playerIndex];
        this.setPlayerJoinCardMode(playerJoinCard, "ChooseYourClass");
    },

    playerClassSetCallback(eventData, container) {
        if (!eventData) { console.error("Player Class Set with null data. Something went wrong."); return false; }
        if (!eventData.playerUsername || (typeof eventData.playerUsername !== 'string')) { console.error("Player Class Set with improper name format."); return false; }
        if (!["Cleric", "Fighter", "Wizard", "Rogue"].includes(eventData.character.Class)) { console.error("Player Set Class with improper type."); return false; }

        let playerJoinCard = container.elements.playerJoinCards[eventData.playerIndex];
        this.setPlayerJoinCardMode(playerJoinCard, "ChooseYourName");
    },

    playerNameSetCallback(eventData, container) {
        if (!eventData) { console.error("Player Name Set with null data. Something went wrong."); return false; }
        if (!eventData.playerUsername || (typeof eventData.playerUsername !== 'string')) { console.error("Player Name Set with improper name format."); return false; }
        if (!eventData.character.Name) { console.error("Player Set Name with improper type."); return false; }

        let playerJoinCard = container.elements.playerJoinCards[eventData.playerIndex];
        this.setPlayerCharacterData(playerJoinCard, eventData.character);
        this.setPlayerJoinCardMode(playerJoinCard, "CharacterOverview");
    },
};

//  Module Exports
module.exports = { GameArea_PlayerJoin }