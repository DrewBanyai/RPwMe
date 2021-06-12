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
const { WorldController } = require('../Controllers/WorldController')
const { InteractiveMap } = require('../Components/InteractiveMap')
const { EventDispatch } = require('../Controllers/EventDispatch')
const pxFromInt = require('../HelperFunctions/pxFromInt').pxFromInt

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

        container.elements = { worldContainer: null, worldDisplay: null, infoBoxWorld: null };

        AdminArea_World.createWorldDisplay(container, Date.now());
        AdminArea_World.createWorldInfoBox(container);

        EventDispatch.AddEventHandler("Map Create", (eventType, eventData) => { AdminArea_World.createWorldDisplay(container, eventData.seed); });

        container.onShow = () => AdminArea_World.reloadMapDisplay(container);

        return container;
    },

    reloadMapDisplay(container) {
        setTimeout(() => { InteractiveMap.LoadMapObjects(container.elements.worldDisplay.elements.interactiveMap); }, 10); //  TODO: Swap this out with a DOM content loaded callback?
    },

    createWorldDisplay(container, seed) {
        if (container.elements.worldDisplay !== null) {
            container.elements.worldContainer.innerHTML = "";
            container.elements.worldDisplay = null;
        }

        let paddingLeft = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_LEFT);
        let paddingRight = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_RIGHT);

        if (!container.elements.worldContainer) {
            container.elements.worldContainer = Container.create({ id: "World Container", style: { padding: "2px " + paddingLeft + " 2px " + paddingRight, }, });
            container.appendChild(container.elements.worldContainer);
        }

        container.elements.worldDisplay = WorldController.create(seed);
        container.elements.worldContainer.innerHTML = "";
        container.elements.worldContainer.appendChild(container.elements.worldDisplay.elements.interactiveMap);
    },

    createWorldInfoBox(container) {
        //container.elements.infoBoxWorld = new InfoBox_World({});
        //container.elements.infoBoxWorld.setVisible(false);
        //container.appendChild(container.elements.infoBoxWorld);
    }
};

//  Module Exports
module.exports = { AdminArea_World }