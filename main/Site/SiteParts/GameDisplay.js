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
const { Container } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { GameArea_WaitingToBegin } = require('./GameArea_WaitingToBegin')

let GameDisplay = {
    create: () => {
        let container = Container.create({
            id: "GameDisplay",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                backgroundColor: STYLE.WINDOW_BACKGROUND_COLOR.GAME,
            }
        });

        //  Create the elements list for later use
        container.elements = { mainArea: null, menuScreens: {} };
        
        //  Create the individual sub-menus of the display
        GameDisplay.createMainArea(container);

        //  Fill in the main admin areas as well as the buttons in the top button strip
        GameDisplay.addMainAreaEntries(container);
        GameDisplay.showMenuScreen(container, "WaitingToBegin");

        return container;
    },

    createMainArea: (container) => {
        container.elements.mainArea = Container.create({ id: "AdminMenuMainArea" });
        container.appendChild(container.elements.mainArea);
    },

    addMainAreaEntries: (container) => {
        let addMainEntry = (areaType, areaStruct) => {
            container.elements.mainArea.appendChild(areaStruct);
            container.elements.menuScreens[areaType] = areaStruct;
        };

        addMainEntry("WaitingToBegin", GameArea_WaitingToBegin.create());
        
    },

    showMenuScreen: (container, menuID) => {
        let areaKeys = Object.keys(container.elements.menuScreens);
        areaKeys.forEach((mID) => { container.elements.menuScreens[mID].style.display = "none"; });

        if (!container.elements.menuScreens.hasOwnProperty(menuID)) { console.warn("Attempting to show nonexistent menu '" + menuID + "'"); return; }
        container.elements.menuScreens[menuID].style.display = STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE;
    },
};

//  Module Exports
module.exports = { GameDisplay }