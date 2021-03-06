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

const { ipcRenderer } = require('electron')

const adminMessages = {
  /// ///////////////////////////
  //  Send Messages
  /// ///////////////////////////
  sendTestMessage (message) { ipcRenderer.send('send-test', message) },
  sendCampaignToGameScreen (campaignData) { ipcRenderer.send('campaign-update', campaignData) },
  sendPlayerJoinAllowedFlag () { ipcRenderer.send('player-join-allowed', null) },
  sendPlayerJoinedEvent (eventData) { ipcRenderer.send('player-joined', eventData) },
  sendPlayerLeftEvent (eventData) { ipcRenderer.send('player-left', eventData) },
  sendPlayerRaceSetEvent (eventData) { ipcRenderer.send('player-race-set', eventData) },
  sendPlayerClassSetEvent (eventData) { ipcRenderer.send('player-class-set', eventData) },
  sendPlayerNameSetEvent (eventData) { ipcRenderer.send('player-name-set', eventData) },
  sendCharacterReadyEvent (eventData) { ipcRenderer.send('character-ready', eventData) },
  sendCampaignBeginFlag (eventData) { ipcRenderer.send('campaign-begin', eventData) },
  sendShowCampaignScreenEvent (eventData) { ipcRenderer.send('show-campaign-screen', eventData) },
  sendJournalPageTurn (eventData) { ipcRenderer.send('journal-page-turn', eventData) },
  sendJournalReadEvent (eventData) { ipcRenderer.send('journal-read-event', eventData) },
  sendJournalCloseEvent (eventData) { ipcRenderer.send('journal-close-event', eventData) }
}

//  Module Exports
module.exports = { adminMessages }
