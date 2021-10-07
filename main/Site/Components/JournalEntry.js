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
const { HandwrittenNote } = require('../Components/HandwrittenNote')


const JournalEntry = {
	create: (options) => {
		let container = Container.create({ id: "JournalEntry", style: STYLE.JOURNAL_ENTRY });

        Container.applyOptions(container, options);

        container.elements = { journalID: null, journalTitle: null, journalPopup: null, journalText: null };

        container.elements.journalID = HandwrittenNote.create({id: "JournalID_" + options.index, style: STYLE.JOURNAL_ID, attributes: { value: options.index }, writeDelay: 30, });
        container.appendChild(container.elements.journalID);

        container.elements.journalTitle = HandwrittenNote.create({id: "JournalTitle_" + options.index, style: STYLE.JOURNAL_TITLE, attributes: { value: options.title }, writeDelay: 30, });
        container.appendChild(container.elements.journalTitle);

		return container;
	},
};

//  Module Exports
module.exports = { JournalEntry }