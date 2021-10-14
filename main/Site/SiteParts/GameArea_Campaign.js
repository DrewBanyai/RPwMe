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
const { CampaignScreenTabMenu } = require('../Components/CampaignScreenTabMenu')
const { EventDispatch } = require('../Controllers/EventDispatch')

const { GameArea_Campaign_Journal } = require('../SiteParts/GameArea_Campaign_Journal')
const { GameArea_Campaign_Map } = require('../SiteParts/GameArea_Campaign_Map')
const { GameArea_Campaign_Inventory } = require('../SiteParts/GameArea_Campaign_Inventory')
const { GameArea_Campaign_Combat } = require('../SiteParts/GameArea_Campaign_Combat')

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

        container.elements = { screenTabMenu: null, screens: {}, }

        let screenTabs = [ { tab: "Journal", command: "!journal" }, { tab: "Map", command: "!map" }, { tab: "Inventory", command: "!inventory" }, { tab: "Combat", command: "!combat" }, ];
        container.elements.screenTabMenu = CampaignScreenTabMenu.create({ tabs: screenTabs });
        container.appendChild(container.elements.screenTabMenu);

        container.elements.screens["Journal"] = GameArea_Campaign_Journal.create({ style: { display: STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE }});
        container.appendChild(container.elements.screens["Journal"]);

        container.elements.screens["Map"] = GameArea_Campaign_Map.create({});
        container.appendChild(container.elements.screens["Map"]);

        container.elements.screens["Inventory"] = GameArea_Campaign_Inventory.create({});
        container.appendChild(container.elements.screens["Inventory"]);

        container.elements.screens["Combat"] = GameArea_Campaign_Combat.create({});
        container.appendChild(container.elements.screens["Combat"]);

        setTimeout(() => { EventDispatch.SendEvent("Add Journal", { title: "A new adventure begins today. We seek glory, treasure, and honor.", contents: [ "You've struck out on your own to find a grand adventure and hopefully some gold for your trouble. Along the way, you've met a few companions that have traveled with you for a bit, and are looking to make some money and a name for themselves as well. You find yourself in a tavern in the small village of Rofhaven, drinking and eating with your new friends." ] }); }, 100);
        setTimeout(() => { EventDispatch.SendEvent("Add Journal", { title: "You are in control. Decide what actions you and your teammates should take.", contents: [ "You are in control now.", "Type !commands for a link to all player commands. If you don't know the command to use for what you want to do, just use !request SPECIFICS and the Game Master will do their best to help you complete the action." ] }); }, 200);

        EventDispatch.AddEventHandler("Show Campaign Screen", (eventType, eventData) => {
            container.elements.screenTabMenu.highlightTab(eventData.screenID);
            GameArea_Campaign.showSubscreen(container, eventData.screenID);
        });

        return container;
    },

    showSubscreen(container, screenID) {
        if (!container.elements.screens.hasOwnProperty(screenID)) { console.warning("Attempted to show a non-existant sub-screen."); return; }

        let keys = Object.keys(container.elements.screens);
        for (let k in keys) {
            if (container.elements.screens[keys[k]].hide) { container.elements.screens[keys[k]].hide(); }
            container.elements.screens[keys[k]].style.display = "none";
        }
        if (container.elements.screens[screenID].show) { container.elements.screens[screenID].show(); }
        container.elements.screens[screenID].style.display = "flex";
    }
};

//  Module Exports
module.exports = { GameArea_Campaign }