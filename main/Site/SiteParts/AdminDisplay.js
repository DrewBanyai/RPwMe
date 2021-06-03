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
const { EventDispatch } = require('../Controllers/EventDispatch')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')

const AdminWindowTopButtons = require('./AdminWindowTopButtons').AdminWindowTopButtons
const AdminArea_World = require('./AdminArea_World').AdminArea_World
const AdminArea_Area = require('./AdminArea_Area').AdminArea_Area
const AdminArea_Location = require('./AdminArea_Location').AdminArea_Location
const AdminArea_Players = require('./AdminArea_Players').AdminArea_Players
const AdminArea_NPCs = require('./AdminArea_NPCs').AdminArea_NPCs
const AdminArea_Journal = require('./AdminArea_Journal').AdminArea_Journal
const AdminArea_Requests = require('./AdminArea_Requests').AdminArea_Requests
const AdminArea_StreamChat = require('./AdminArea_StreamChat').AdminArea_StreamChat
const AdminArea_Settings = require('./AdminArea_Settings').AdminArea_Settings

"use strict"

let AdminDisplay = {
    create: () => {
        let container = Container.create({
            id:"AdminDisplay",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                backgroundColor: STYLE.WINDOW_BACKGROUND_COLOR.ADMIN,
            }
        });

        //  Create the elements list for later use
        container.elements = { adminTopButtons: null, adminMainArea: null, adminMenus: {} };
        container.requestCount = 0;
        
        //  Create the locations for the top button strip and the individual sub-menus of the Admin menu
        AdminDisplay.createAdminTopButtons(container);
        AdminDisplay.createAdminMainArea(container);

        //  Fill in the main admin areas as well as the buttons in the top button strip
        AdminDisplay.addAdminMainAreaEntries(container);
        AdminDisplay.addAdminButtonStripEntries(container, container.elements.adminTopButtons);

        return container;
    },
    
    createAdminTopButtons: (container) => {
        container.elements.adminTopButtons = AdminWindowTopButtons.create({});
        container.appendChild(container.elements.adminTopButtons);
    },

    createAdminMainArea: (container) => {
        container.elements.adminMainArea = Container.create({ id: "AdminMenuMainArea" });
        container.appendChild(container.elements.adminMainArea);
    },

    addAdminMainAreaEntries: (container) => {
        let addMainEntry = (areaType, areaStruct) => {
            container.elements.adminMainArea.appendChild(areaStruct);
            container.elements.adminMenus[areaType] = areaStruct;
        };

        addMainEntry("World", AdminArea_World.create());
        addMainEntry("Area", AdminArea_Area.create({}));
        addMainEntry("Location", AdminArea_Location.create({}));
        addMainEntry("Players", AdminArea_Players.create({}));
        addMainEntry("NPCs", AdminArea_NPCs.create({}));
        addMainEntry("Journal", AdminArea_Journal.create({}));
        addMainEntry("Requests", AdminArea_Requests.create({}));
        addMainEntry("Stream Chat", AdminArea_StreamChat.create({}));
        addMainEntry("Settings", AdminArea_Settings.create({}));
    },

    addAdminButtonStripEntries: (container, buttonStrip) => {
        let makeButton = (className, buttonType) => {
            return { iconClass: className, fontSize: "36px", name: buttonType, callback: () => { AdminDisplay.showAdminArea(container, buttonType); } };
        };

        AdminWindowTopButtons.setButtonsList(container.elements.adminTopButtons, [
            makeButton("fas fa-globe", "World"),
            makeButton("fas fa-map-marked-alt", "Area"),
            makeButton("fas fa-map-marker-alt", "Location"),
            makeButton("fas fa-users", "Players"),
            makeButton("fas fa-user-tag", "NPCs"),
            makeButton("fas fa-book", "Journal"),
            makeButton("fas fa-exclamation-circle", "Requests"),
            makeButton("fas fa-comments", "Stream Chat"),
            makeButton("fas fa-cogs", "Settings"),
        ]);
    },

    showAdminArea: (container, menuID) => {
        let areaKeys = Object.keys(container.elements.adminMenus);
        areaKeys.forEach((key) => { container.elements.adminMenus[key].style.display = "none"; });

        if (!container.elements.adminMenus.hasOwnProperty(menuID)) { console.warn("Attempting to show nonexistent menu '" + menuID + "'"); return; }
        container.elements.adminMenus[menuID].style.display = STYLE.ADMIN_WINDOW_MENU_DISPLAY_TYPE;
    },

    setupPlayerRequestMenu: (container) => {
        //  Handle a player request coming in
        EventDispatch.AddEventHandler("Player Request", (eventType, eventData) => {
            let requestID = ++container.requestCount;
            let requestUI = PlayerRequest.create({
                requestID: requestID,
                playerID: eventData.message.username,
                requestString: eventData.message.message.substr(9, eventData.message.message.length - 9),
                approveCallback: () => {
                    console.log("APPROVED");
                    EventDispatch.SendEvent("Request Removed", { requestID: requestID });
                },
            });
            container.adminMenus["Requests"].appendChild(requestUI.content);
        });

        EventDispatch.AddEventHandler("Request Removed", (eventType, eventData) => { AdminDisplay.removePlayerRequest(container, eventData.requestID); });
    },

    removePlayerRequest: (container, requestID) => {
        for (let i = 0; i < container.elements.adminMenus["Requests"].children.length; ++i) {
            if (container.elements.adminMenus["Requests"].children[i].getRequestID() === requestID) {
                container.elements.adminMenus["Requests"].removeChild(container.elements.adminMenus["Requests"].children[i]);
                return;
            }
        }
    }
};

//  Module Exports
module.exports = { AdminDisplay }