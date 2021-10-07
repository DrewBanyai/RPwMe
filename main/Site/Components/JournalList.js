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
const { JournalEntry } = require('../Components/JournalEntry')
const { EventDispatch } = require('../Controllers/EventDispatch')


const JournalList = {
	create: (options) => {
		let container = Container.create({
            id: "JournalList",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                position: "absolute",
                left: "234px",
                top: "244px",
            },
        });

        Container.applyOptions(container, options);

        container.elements = { pageIndex: 0, journalsPerPage: 10, journalList: [], journalListBox: null, backArrow: null, forwardArrow: null, }

        container.elements.journalListBox = Container.create({id: "JournalListBox", style: {}, });
        container.appendChild(container.elements.journalListBox)

        EventDispatch.AddEventHandler("Add Journal", (eventType, eventData) => { JournalList.addJournalEntry(container, eventData.title, eventData.contents); });

		return container;
	},

    addJournalEntry(container, journalTitle, journalContents) {
        let journalEntryIndex = container.elements.journalList.length + 1;
        let journalEntryIndexStr = journalEntryIndex.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false });

        let journalEntry = JournalEntry.create({id: "JournalEntry_" + journalEntryIndexStr, style: STYLE.JOURNAL_ENTRY, index: journalEntryIndexStr, title: journalTitle, contents: journalContents });
        container.elements.journalList.push(journalEntry);

        JournalList.updateJournalDisplay(container);
    },

    updateJournalDisplay(container) {
        let firstJournalDisplayed = container.elements.pageIndex * container.elements.journalsPerPage;
        while (firstJournalDisplayed > container.elements.journalList.length) { firstJournalDisplayed -= container.elements.journalsPerPage; }

        //  Remove all journal entries from the Journal List Box
        while (container.elements.journalListBox.firstChild)
            container.elements.journalListBox.removeChild(container.elements.journalListBox.firstChild);

        //  Add up to the max amount of journals for the page we're on
        for (let i = 0; i < container.elements.journalsPerPage; ++i) {
            if (container.elements.journalList.length <= firstJournalDisplayed + i) break;
            container.elements.journalListBox.appendChild(container.elements.journalList[firstJournalDisplayed + i]);
        }
    }
};

//  Module Exports
module.exports = { JournalList }