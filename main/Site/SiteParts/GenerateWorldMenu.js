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
const { WorldController } = require('../Controllers/WorldController')
const { InteractiveMap } = require('../Components/InteractiveMap')

const GenerateWorldMenu = {
    create() {
        let container = Container.create({
            id: "GenerateWorldMenu",
            style: {
                width: pxFromInt(STYLE.WORLD_MAP_WIDTH),
                height: pxFromInt(CONFIG.SITE_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
            }
        });

        container.elements = { menuButtons: null, mapDisplay: null, worldSeedInput: null, worldContainer: null, worldControl: null };
        
        GenerateWorldMenu.createGenerateWorldMenu(container);
        GenerateWorldMenu.createWorldControllerMenu(container);
        
        GenerateWorldMenu.onCreateWorldClick(container);

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

    createWorldControllerMenu(container) {
        let paddingLeft = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_LEFT);
        let paddingRight = pxFromInt(STYLE.INTERACTIVE_MAP_PADDING_RIGHT);
        container.elements.worldContainer = Container.create({
            id: "World Container",
            style: {
                padding: "2px " + paddingLeft + " 2px " + paddingRight,
            },
        });
        container.appendChild(container.elements.worldContainer);
    },

    onLoadWorldClick() {
        console.log("TEST 1");
    },

    onCreateWorldClick(container) {
        if (container.elements.worldControl !== null) {
            container.elements.worldContainer.innerHTML = "";
            container.elements.worldControl = null;
        }

        let seed = TextInput.getValue(container.elements.worldSeedInput);
        if (!seed) { seed = Date.now(); }

        container.elements.worldControl = WorldController.create(seed);
        container.elements.worldContainer.innerHTML = "";
        container.elements.worldContainer.appendChild(container.elements.worldControl.elements.mapImage);
        setTimeout(() => { InteractiveMap.LoadMapObjects(container.elements.worldControl.elements.mapImage); }, 10); //  TODO: Swap this out with a DOM content loaded callback?
    }
}

//  Module Exports
module.exports = { GenerateWorldMenu }