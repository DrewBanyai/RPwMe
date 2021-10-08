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
const { Container, Label } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { JournalList } = require('../Components/JournalList')

let GameArea_Campaign_Journal = {
    create() {
        let container = Container.create({ id: "GameArea_Campaign_Journal", style: STYLE.GAME_AREA_CAMPAIGN_SUBMENU, });
        container.style.width = pxFromInt(CONFIG.WINDOW_WIDTH);
        container.style.height = pxFromInt(CONFIG.WINDOW_HEIGHT);

        container.elements = { paper: null, screenTitle: null, journalList: null }

        container.elements.paper = Container.create({ id: "LinedPaperBackground", style: STYLE.LINED_PAPER_BACKGROUND, });
        container.appendChild(container.elements.paper);

        container.elements.screenTitle = Label.create({ id: "ScreenTitle", style: STYLE.JOURNAL_SCREEN_TITLE, attributes: { value: "Journal" } });
        container.appendChild(container.elements.screenTitle);

        container.elements.journalList = JournalList.create({});
        container.appendChild(container.elements.journalList);

        return container;
    },
};

//  Module Exports
module.exports = { GameArea_Campaign_Journal }