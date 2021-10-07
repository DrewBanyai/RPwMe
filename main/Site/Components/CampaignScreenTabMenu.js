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
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { Container } = require('../Components/ArcadiaJS')
const { HandwrittenNote } = require('../Components/HandwrittenNote')

const CampaignScreenTabMenu = {
	create: (options) => {
		let container = Container.create({
            id: "CampaignScreenTabMenu",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                position: "absolute",
            },
        });

        Container.applyOptions(container, options);

        container.elements = { journalTab: null, mapTab: null, inventoryTab: null, combatTab: null };

        CampaignScreenTabMenu.createScreenTab(container, "Journal", "!journal");
        CampaignScreenTabMenu.createScreenTab(container, "Map", "!map");
        CampaignScreenTabMenu.createScreenTab(container, "Inventory", "!inventory");
        CampaignScreenTabMenu.createScreenTab(container, "Combat", "!combat");

		return container;
	},

    createScreenTab(container, tabID, tabString) {
        let positionData = STYLE.SCREEN_TAB_POSITIONS[tabID];

        let tabContainer = Container.create({
            id: "ScreenTab_" + tabID,
            style: {
                position: "absolute",
                width: "120px",
                height: "38px",
                left: pxFromInt(positionData.x),
                top: pxFromInt(positionData.y),
                backgroundImage: "url(Images/ScreenTabBG.png)",
                zIndex: 1,
            },
        });
        container.appendChild(tabContainer);

        let tabLabel = HandwrittenNote.create({ id: "ScreenTabLabel_" + tabID, style: STYLE.SCREEN_TAB_LABEL, attributes: { value: tabString, }, writeDelay: 30, });
        tabContainer.appendChild(tabLabel);
    },
};

//  Module Exports
module.exports = { CampaignScreenTabMenu }