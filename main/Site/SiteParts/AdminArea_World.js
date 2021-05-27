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
const Container = require('../Components/ArcadiaJS').Container
const pxFromInt = require('../HelperFunctions/pxFromInt').pxFromInt

"use strict"

let AdminArea_World = {
    create() {
        let container = Container.create({
            id: "AdminArea_World",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
                display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE,
            }
        });

        container.elements = { generateWorldMenu: null, infoBoxWorld: null };

        AdminArea_World.createGenerateWorldMenu(container);
        AdminArea_World.createInfoBoxWorldMenu(container);

        return container;
    },

    createGenerateWorldMenu(container) {
        //container.elements.generateWorldMenu = GenerateWorldMenu.create({});
        //container.appendChild(container.elements.generateWorldMenu);
    },

    createInfoBoxWorldMenu(container) {
        //container.elements.infoBoxWorld = new InfoBox_World({});
        //container.elements.infoBoxWorld.setVisible(false);
        //container.appendChild(container.elements.infoBoxWorld);
    }
};

//  Module Exports
module.exports = { AdminArea_World }