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
const { Container, Label, BasicButton } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { EventDispatch } = require('../Controllers/EventDispatch')

"use strict"

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

        container.elements = { startPlayerJoinMenu: null, playerDataDisplay: null };

        AdminArea_Players.createStartPlayerJoinMenu(container);
        AdminArea_Players.createPlayerDataDisplay(container);

        EventDispatch.AddEventHandler("Start Player Join Mode", (eventType, eventData) => {
            container.elements.startPlayerJoinMenu.show(false);
            container.elements.playerDataDisplay.show(true);
            AdminArea_Players.UpdatePlayerData(container);
        });

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
    },

    UpdatePlayerData(container) {
        let playerDataDisplay = container.elements.playerDataDisplay;
        return;
        //  TODO: Grab latest player data from CAMPAIGN_DATA and update the display UI
    }
};

//  Module Exports
module.exports = { AdminArea_Players }