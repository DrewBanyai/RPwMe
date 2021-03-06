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
const { JournalEntry } = require('../Components/JournalEntry')
const { HandwrittenNote } = require('../Components/HandwrittenNote')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { JournalEntryFull } = require('./JournalEntryFull')

const JournalList = {
  create: (options) => {
    const container = Container.create({ id: 'JournalList', style: STYLE.JOURNAL_LIST })

    Container.applyOptions(container, options)

    container.elements = { pageIndex: 0, journalsPerPage: 10, journalList: [], journalListBox: null, journalDisplay: null, backLabel: null, pageLabel: null, forwardLabel: null }

    container.elements.journalListBox = Container.create({ id: 'JournalListBox', style: {} })
    container.appendChild(container.elements.journalListBox)

    JournalList.createBackForwardPageSection(container)

    EventDispatch.AddEventHandler('Add Journal', (eventType, eventData) => { JournalList.addJournalEntry(container, eventData.title, eventData.contents) })
    EventDispatch.AddEventHandler('Read Journal', (eventType, eventData) => { JournalList.showJournalEntry(container, parseInt(eventData.args[0])) })
    EventDispatch.AddEventHandler('Close Journal', (eventType, eventData) => { JournalList.hideJournalEntry(container) })

    container.attemptPageTurn = JournalList.attemptPageTurn

    return container
  },

  createBackForwardPageSection (container) {
    const backForwardPageSection = Container.create({ id: 'JournalBackForwardPageSection', style: STYLE.JOURNAL_BACK_FORWARD_PAGE_SECTION })
    container.appendChild(backForwardPageSection)

    container.elements.backLabel = HandwrittenNote.create({ id: 'Journal_BackLabel', style: STYLE.JOURNAL_BACK_FORWARD_PAGE_LABELS, writeDelay: 30 })
    Object.assign(container.elements.backLabel.style, { color: 'rgb(100, 100, 255)', textAlign: 'left' })
    container.elements.backLabel.setValue('!back')
    backForwardPageSection.appendChild(container.elements.backLabel)

    container.elements.pageLabel = HandwrittenNote.create({ id: 'Journal_PageLabel', style: STYLE.JOURNAL_BACK_FORWARD_PAGE_LABELS, writeDelay: 30 })
    Object.assign(container.elements.pageLabel.style, { color: 'rgb(255, 100, 100)', textAlign: 'center' })
    container.elements.pageLabel.setValue('page 1')
    backForwardPageSection.appendChild(container.elements.pageLabel)

    container.elements.forwardLabel = HandwrittenNote.create({ id: 'Journal_ForwardLabel', style: STYLE.JOURNAL_BACK_FORWARD_PAGE_LABELS, writeDelay: 30 })
    Object.assign(container.elements.forwardLabel.style, { color: 'rgb(100, 100, 255)', textAlign: 'right' })
    container.elements.forwardLabel.setValue('!forward')
    backForwardPageSection.appendChild(container.elements.forwardLabel)
  },

  addJournalEntry (container, journalTitle, journalContents) {
    const journalEntryIndex = container.elements.journalList.length + 1
    const journalEntryIndexStr = '!read ' + journalEntryIndex.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })

    const journalEntry = JournalEntry.create({ id: 'JournalEntry_' + journalEntryIndexStr, style: STYLE.JOURNAL_ENTRY, index: journalEntryIndexStr, title: journalTitle, contents: journalContents })
    container.elements.journalList.push(journalEntry)

    JournalList.updateJournalDisplay(container)
  },

  updateJournalDisplay (container) {
    let firstJournalDisplayed = container.elements.pageIndex * container.elements.journalsPerPage
    while (firstJournalDisplayed >= container.elements.journalList.length) {
      firstJournalDisplayed -= container.elements.journalsPerPage
      container.elements.pageIndex = firstJournalDisplayed / container.elements.journalsPerPage
    }

    //  Remove all journal entries from the Journal List Box
    while (container.elements.journalListBox.firstChild) { container.elements.journalListBox.removeChild(container.elements.journalListBox.firstChild) }

    //  Add up to the max amount of journals for the page we're on
    for (let i = 0; i < container.elements.journalsPerPage; ++i) {
      if (container.elements.journalList.length <= firstJournalDisplayed + i) break
      container.elements.journalListBox.appendChild(container.elements.journalList[firstJournalDisplayed + i])
    }

    //  Update the back, page, and forward labels
    container.elements.backLabel.style.visibility = (container.elements.pageIndex > 0) ? 'visible' : 'hidden'
    container.elements.pageLabel.setValue('page ' + (container.elements.pageIndex + 1).toString())
    container.elements.forwardLabel.style.visibility = (container.elements.pageIndex < Math.floor(container.elements.journalList.length / container.elements.journalsPerPage)) ? 'visible' : 'hidden'
  },

  attemptPageTurn (container, pageTurn) {
    switch (pageTurn) {
      case 'begin':
        if (container.elements.pageIndex === 0) { return }
        container.elements.pageIndex = 0
        JournalList.updateJournalDisplay(container)
        break

      case 'back':
        if (container.elements.pageIndex === 0) { return }
        container.elements.pageIndex -= 1
        JournalList.updateJournalDisplay(container)
        break

      case 'forward':
        if (container.elements.pageIndex + 1 >= (container.elements.journalList.length / container.elements.journalsPerPage)) { return }
        container.elements.pageIndex += 1
        JournalList.updateJournalDisplay(container)
        break
    }
  },

  showJournalEntry (container, journalID) {
    if (container.elements.journalList.length < journalID) { console.warn('Attempting to read journal entry ' + journalID + " which doesn't exist!"); return }

    JournalList.hideJournalEntry(container)

    const journalData = container.elements.journalList[journalID - 1]
    container.elements.journalDisplay = JournalEntryFull.create({ title: journalData.getTitle(), contents: journalData.getContents() })
    container.appendChild(container.elements.journalDisplay)
  },

  hideJournalEntry (container) {
    if (container.elements.journalDisplay != null) {
      container.removeChild(container.elements.journalDisplay)
      container.elements.journalDisplay = null
    }
  }
}

//  Module Exports
module.exports = { JournalList }
