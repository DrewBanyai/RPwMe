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
const { Container, BasicButton } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { adminMessages } = require('../Messaging/AdminMessages')

"use strict"

let AdminArea_Combat = {
    create() {
        let container = Container.create({
            id: "AdminArea_Combat",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT - 1 - STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_AREA_COLOR,
                display: STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE,
            }
        });

        container.elements = { showCombatButton: null, };

        if (CONFIG.DEBUG.includes("SCREEN BUTTONS")) {
            container.elements.showCombatButton = BasicButton.create({
                id: "ShowCombatButton",
                style: {
                    fontFamily: "Vesper Libre",
                    fontSize: "18px",
                    margin: "0px 100px 0px 0px",
                    display: "inline-flex",
                },
                attributes: { value: "Show Combat", },
            });
            container.appendChild(container.elements.showCombatButton);
            BasicButton.setOnClick(container.elements.showCombatButton, () => { adminMessages.sendShowCampaignScreenEvent({ screenID: "Combat", }); });
        }

        return container;
    },
};

//  Module Exports
module.exports = { AdminArea_Combat }