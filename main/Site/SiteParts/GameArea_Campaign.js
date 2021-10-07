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
const { CampaignScreenTabMenu } = require('../Components/CampaignScreenTabMenu')
const { GameArea_Campaign_Journal } = require('../SiteParts/GameArea_Campaign_Journal')
const { EventDispatch } = require('../Controllers/EventDispatch')

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

        container.elements = { paper: null, screenTabMenu: null, journalScreen: null }

        container.elements.paper = Container.create({ id: "LinedPaperBackground", style: STYLE.LINED_PAPER_BACKGROUND, });
        container.appendChild(container.elements.paper);

        container.elements.screenTabMenu = CampaignScreenTabMenu.create({});
        container.appendChild(container.elements.screenTabMenu);

        container.elements.journalScreen = GameArea_Campaign_Journal.create({});
        container.appendChild(container.elements.journalScreen);

        setTimeout(() => { EventDispatch.SendEvent("Add Journal", { title: "A new adventure begins today. We seek glory, treasure, and honor.", contents: "You've struck out on your own to find a grand adventure and hopefully some gold for your trouble. Along the way, you've met a few companions that have traveled with you for a bit, and are looking to make some money and a name for themselves as well. You find yourself in a tavern in the small village of Rofhaven, drinking and eating with your new friends." }); }, 100);
        setTimeout(() => { EventDispatch.SendEvent("Add Journal", { title: "You are in control. Decide what actions you and your teammates should take.", contents: "You are in control now. Type !commands for a link to all player commands. If you don't know the command to use for what you want to do, just use !request SPECIFICS and the Game Master will do their best to help you complete the action." }); }, 200);

        return container;
    },
};

//  Module Exports
module.exports = { GameArea_Campaign }