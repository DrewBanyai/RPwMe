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
const { Container, Fontawesome, Label } = require('../Components/ArcadiaJS')
const pxFromInt = require('../HelperFunctions/pxFromInt').pxFromInt

"use strict"

let AdminWindowTopButtons = {
    create: () => {
        //  Create the main container that will hold the button strip and the bottom divider (block)
        let container = Container.create({
            id: "AdminWindowTopButtons",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_HEIGHT + 1),
            }
        });

        container.elements = { buttonStrip: null, buttons: [] }
        container.selectedButton = null;

        //  Create the button strip which will contain buttons and dividers (inline)
        container.elements.buttonStrip = Container.create({
            id: "AdminButtonStrip",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                backgroundColor: STYLE.ADMIN_WINDOW_BUTTONS_BACKGROUND_COLOR,
                display: "flex",
            }
        });
        container.appendChild(container.elements.buttonStrip);

        return container;
    },

    setButtonsList: (topButtons, buttonsList) => {
        if (!topButtons) { return; }

        //  Loop through the button data passed into the options and create each button in the strip
        if (buttonsList) {
            for(let i = 0; i < buttonsList.length; ++i) {
                AdminWindowTopButtons.createAdminWindowTopDivider(topButtons.elements.buttonStrip);
                AdminWindowTopButtons.createAdminWindowTopButton(topButtons, buttonsList[i]);
            }
            AdminWindowTopButtons.createAdminWindowTopDivider(topButtons.elements.buttonStrip);
        }

        //  Create one more divider to go under the button strip
        AdminWindowTopButtons.createAdminWindowButtonStripBottomDivider(topButtons);
    },

    createAdminWindowTopButton: (topButtons, buttonData) => {
        //  Sanity check on the buttonData
        if (!buttonData.iconClass) { console.warn("No iconClass specified in AdminWindowTopButton Button entry"); return; }
        if (!buttonData.fontSize) { console.warn("No fontSize specified in AdminWindowTopButton Button entry"); return; }
        if (!buttonData.callback) { console.warn("No callback specified in AdminWindowTopButton Button entry"); return; }

        let buttonContainer = Container.create({
            id: "ButtonContainer",
            style: {
                width: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_WIDTH),
                height: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }
        });

        let button = Fontawesome.create({
            id: "AdminWindowTopButton",
            style: {
                fontSize: buttonData.fontSize,
                color: STYLE.ADMIN_WINDOW_BUTTON_COLOR_NORMAL,
                cursor: "pointer",
            },
            attributes: {
                className: buttonData.iconClass
            },
        });

        //  Set the mouse highlight color
        button.onmouseover = () => {
            let selected = (topButtons.selectedButton === button);
            button.style.color = selected ? STYLE.ADMIN_WINDOW_BUTTON_COLOR_SELECTED : STYLE.ADMIN_WINDOW_BUTTON_COLOR_HIGHLIGHT;
        }
        button.onmouseout = () => {
            let selected = (topButtons.selectedButton === button);
            button.style.color = selected ? STYLE.ADMIN_WINDOW_BUTTON_COLOR_SELECTED : STYLE.ADMIN_WINDOW_BUTTON_COLOR_NORMAL;
        }

        topButtons.elements.buttons.push(button);

        //  Create label for mouseover to get the button name
        button.nameLabel = Label.create({
            id: "AdminButtonNameLabel",
            attributes: {
                value: buttonData.name
            },
            style: {
                pointerEvents: "none",
                fontFamily: "Vesper Libre",
                fontSize: "12px",
                fontWeight: "normal",
                position: "absolute",
                width: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_WIDTH),
                textAlign: "center",
                top: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_HEIGHT - 18),
                color: STYLE.ADMIN_WINDOW_BUTTON_COLOR_NORMAL,
                display: "none",
            }
        });
        button.onmouseover = () => { button.nameLabel.style.display = ""; }
        button.onmouseout = () => { button.nameLabel.style.display = "none"; }
        buttonContainer.appendChild(button.nameLabel);

        //  Set the callback
        button.onclick = () => {
            if (topButtons.selectedButton === button) { return; }
            topButtons.selectedButton = button;
            AdminWindowTopButtons.setButtonHighlights(topButtons);
            buttonData.callback();
        }

        //  If we don't have a button selected, select it now
        if (!topButtons.selectedButton) { button.onclick(); }


        buttonContainer.appendChild(button);
        topButtons.elements.buttonStrip.appendChild(buttonContainer);
    },

    createAdminWindowTopDivider: (buttonStrip) => {
        let divider = Container.create({
            id: "TopDivider",
            style: {
                width: "1px",
                height: pxFromInt(STYLE.ADMIN_WINDOW_BUTTON_HEIGHT),
                backgroundColor: STYLE.ADMIN_WINDOW_BUTTON_DIVIDER_COLOR
            },
        });
        buttonStrip.appendChild(divider);
    },

    createAdminWindowButtonStripBottomDivider: (topButtons) => {
        let divider = Container.create({
            id: "BottomDivider",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: "1px",
                backgroundColor: STYLE.ADMIN_WINDOW_BUTTON_DIVIDER_COLOR
            },
        });
        topButtons.appendChild(divider);
    },

    setButtonHighlights: (topButtons) => {
        topButtons.elements.buttons.forEach((button) => {
            let selected = (topButtons.selectedButton === button);
            button.style.color = selected ? STYLE.ADMIN_WINDOW_BUTTON_COLOR_SELECTED : STYLE.ADMIN_WINDOW_BUTTON_COLOR_NORMAL;
            button.nameLabel.style.color = selected ? STYLE.ADMIN_WINDOW_BUTTON_COLOR_SELECTED : STYLE.ADMIN_WINDOW_BUTTON_COLOR_NORMAL;
        })
    }
}

//  Module Exports
module.exports = { AdminWindowTopButtons }