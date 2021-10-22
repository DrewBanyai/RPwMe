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

const STYLE = require('../style')
const { Container } = require('../Components/ArcadiaJS')
const { HandwrittenNote } = require('../Components/HandwrittenNote')

const JournalEntryFull = {
  create: (options) => {
    const container = Container.create({ id: 'JournalEntryFull', style: STYLE.JOURNAL_ENTRY_FULL })

    Container.applyOptions(container, options)

    container.elements = { journalTitle: null, journalTextBox: null, journalCloseLabel: null }

    container.elements.journalTitle = HandwrittenNote.create({
      id: 'JournalTitle',
      style: STYLE.JOURNAL_ENTRY_FULL_TITLE,
      attributes: { value: options.title },
      writeDelay: 30,
      callback: () => { JournalEntryFull.addJournalText(container.elements.journalTextBox, options.contents, 0) }
    })
    container.appendChild(container.elements.journalTitle)

    container.elements.journalTextBox = Container.create({ id: 'JournalTextBox', style: STYLE.JOURNAL_ENTRY_FULL_TEXTBOX })
    container.appendChild(container.elements.journalTextBox)

    return container
  },
  addJournalText (journalTextBox, textContents, contentIndex) {
    if (textContents.length <= contentIndex) { return }

    const journalTextEntry = HandwrittenNote.create({
      id: 'JournalTextEntry',
      style: STYLE.JOURNAL_ENTRY_FULL_TEXT,
      attributes: { value: textContents[contentIndex] },
      writeDelay: 30,
      callback: () => { JournalEntryFull.addJournalText(journalTextBox, textContents, contentIndex + 1) }
    })
    journalTextBox.appendChild(journalTextEntry)
  }
}

//  Module Exports
module.exports = { JournalEntryFull }
