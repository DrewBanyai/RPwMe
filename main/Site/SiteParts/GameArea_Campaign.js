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

let GameArea_Campaign = {
    create() {
        let container = Container.create({
            id: "GameArea_Campaign",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                backgroundColor: STYLE.GAME_WINDOW_AREA_COLOR,
                display: STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE,
                justifyContent: "center",
                overflow: "hidden",
            }
        });

        container.elements = { paper: null }

        container.elements.paper = Container.create({ id: "LinedPaperBackground", style: STYLE.LINED_PAPER_BACKGROUND, });
        container.appendChild(container.elements.paper);

        let programLogo = Label.create({
            id: "ProgramLogo",
            style: {
                position: "relative",
                fontFamily: "FFF Tusj",
                fontSize: "132px",
                margin: "25px ​144px 0px 0px",
                color: "rgb(1, 100, 150)",
                position: "relative",
                left: "217px",
                top: "50px",
            },
            attributes: {
                value: "RPwMe"
            }
        });
        container.elements.paper.appendChild(programLogo);

        GameArea_Campaign.createCampaignExplanation(container);

        return container;
    },

    createCampaignExplanation(container) {
        let campaignExplanation = HandwrittenNote.create({
            id: "CampaignExplanation",
            style: {
                fontSize: "24px",
                width: "630px",
                position: "absolute",
                left: "217px",
                top: "233px",
                lineHeight: "42px",
            },
            attributes: {
                value: "You've struck out on your own to find a grand adventure and hopefully some gold for your trouble. Along the way, you've met a few companions that have traveled with you for a bit, and are looking to make some money and a name for themselves as well. You find yourself in a tavern in the small village of Rofhaven, drinking and eating with your new friends.",
            },
            writeDelay: 30,
            callback: () => { setTimeout(() => { GameArea_Campaign.createWaitingExplanation(container); }, 500); }
        });
        container.elements.paper.appendChild(campaignExplanation);
    },

    createWaitingExplanation(container) {
        let commandExplanation = HandwrittenNote.create({
            id: "WaitingExplanation",
            style: {
                fontSize: "24px",
                width: "630px",
                position: "absolute",
                left: "217px",
                top: "520px",
                lineHeight: "41px",
            },
            attributes: {
                value: "You are in control now. Type !commands for a link to all player commands. If you don't know the command to use for what you want to do, just use !request SPECIFICS and the Game Master will do their best to help you complete the action.",
            },
            writeDelay: 30,
        });
        container.elements.paper.appendChild(commandExplanation);
    }
};

//  Module Exports
module.exports = { GameArea_Campaign }