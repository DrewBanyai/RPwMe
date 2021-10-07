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

        container.elements = { tabs: {} };

        for (let tabInfo in options.tabs) CampaignScreenTabMenu.createScreenTab(container, options.tabs[tabInfo].tab, options.tabs[tabInfo].command);
        CampaignScreenTabMenu.selectTab(container, options.startingTab);

		return container;
	},

    createScreenTab(container, tabID, tabString) {
        let positionData = STYLE.SCREEN_TAB_POSITIONS[tabID];

        container.elements.tabs[tabID] = Container.create({ id: "ScreenTab_" + tabID, style: STYLE.SCREEN_TAB, });
        container.elements.tabs[tabID].style.left = pxFromInt(positionData.x),
        container.elements.tabs[tabID].style.top = pxFromInt(positionData.y),
        container.appendChild(container.elements.tabs[tabID]);

        let tabLabel = HandwrittenNote.create({ id: "ScreenTabLabel_" + tabID, style: STYLE.SCREEN_TAB_LABEL, attributes: { value: tabString, }, writeDelay: 30, });
        container.elements.tabs[tabID].appendChild(tabLabel);
    },

    selectTab(container, tabID) {
        if (!container.elements.tabs.hasOwnProperty(tabID)) { console.warning("Attempted to select a non-existant screen tab."); return; }

        let tabsKeys = Object.keys(container.elements.tabs);
        for (let key in tabsKeys) container.elements.tabs[tabsKeys[key]].style.backgroundImage = "url(Images/ScreenTabBG.png)";
        container.elements.tabs[tabID].style.backgroundImage = "url(Images/ScreenTabSelectedBG.png)";
    }
};

//  Module Exports
module.exports = { CampaignScreenTabMenu }