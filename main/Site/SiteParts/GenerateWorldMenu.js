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
const pxFromInt = require('../HelperFunctions/pxFromInt').pxFromInt
const { Container, Label, TextInput, BasicButton } = require('../Components/ArcadiaJS')
const { EventDispatch } = require('../Controllers/EventDispatch')

const GenerateWorldMenu = {
    create() {
        let container = Container.create({
            id: "GenerateWorldMenu",
            style: {
                width: pxFromInt(STYLE.WORLD_MAP_SIZE[document.windowID].x),
                height: pxFromInt(CONFIG.SITE_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
            }
        });

        container.elements = { menuButtons: null, worldSeedInput: null };
        
        GenerateWorldMenu.createGenerateWorldMenu(container);

        return container;
    },

    createGenerateWorldMenu(container) {
        container.elements.menuButtons = Container.create({
            id: "MenuButtons",
            style: {
                width: "100%",
                height: "32px",
                display: "inline-flex",
                padding: "4px",
            }
        });
        container.appendChild(container.elements.menuButtons);

        let loadWorldButton = BasicButton.create({
            id: "LoadWorldButton",
            style: {
                width: "120px",
                height: "24px",
                position: "relative",
                top: "3px",
                margin: "0px 4px 0px 0px",
                fontFamily: "Open Sans Condensed",
                fontWeight: "bold",
                fontSize: "14px",
            }
        });
        BasicButton.setValue(loadWorldButton, "Load World");
        BasicButton.setOnClick(loadWorldButton, () => { GenerateWorldMenu.onLoadWorldClick(); });
        container.elements.menuButtons.appendChild(loadWorldButton);

        let createWorldButton = BasicButton.create({
            id: "CreateWorldButton",
            style: {
                width: "120px",
                height: "24px",
                position: "relative",
                top: "3px",
                margin: "0px 4px 0px 0px",
                fontFamily: "Open Sans Condensed",
                fontWeight: "bold",
                fontSize: "14px",
            }
        });
        BasicButton.setValue(createWorldButton, "Create World");
        BasicButton.setOnClick(createWorldButton, () => { GenerateWorldMenu.onCreateWorldClick(container) });
        container.elements.menuButtons.appendChild(createWorldButton);

        let worldSeedLabel = Label.create({
            id: "WorldSeedLabel",
            attributes: { value: "World Seed:" },
            style: {
                fontFamily: "Open Sans Condensed",
                fontSize: "14px",
                color: "rgb(255, 255, 255)",
                padding: "6px 4px 0px 4px",
            },
        });
        container.elements.menuButtons.appendChild(worldSeedLabel);

        container.elements.worldSeedInput = TextInput.create({
            id: "WorldSeedTextInput",
            style: {
                fontFamily: "Open Sans Condensed",
                fontSize: "14px",
            },
        });
        container.elements.menuButtons.appendChild(container.elements.worldSeedInput);
    },

    onLoadWorldClick() {
        console.log("TEST 1");
    },

    onCreateWorldClick(container) {
        let seed = TextInput.getValue(container.elements.worldSeedInput);
        if (!seed) { seed = Date.now(); }

        EventDispatch.SendEvent("Map Create", { seed: seed });
    }
}

//  Module Exports
module.exports = { GenerateWorldMenu }