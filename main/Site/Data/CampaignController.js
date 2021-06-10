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

let CAMPAIGN_DATA = {};

const CAMPAIGN_STATUS_LIST = [
    "Generating Campaign Data",
    "Waiting For Campaign Start"
];

const CampaignController = {
    GetCampaignStatus() {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return null; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Status")) { console.error("CAMPAIGN_DATA has no Status data!"); return null; }
        
        return CAMPAIGN_DATA.Status;
    },
    SetCampaignStatus(newStatus) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Status")) { console.error("CAMPAIGN_DATA has no Status data!"); return; }
        if (!CAMPAIGN_STATUS_LIST.includes(newStatus)) { console.error("Attempting to set campaign status to unknown string"); return; }
    
        CAMPAIGN_DATA.Status = newStatus;
    },
    ResetCampaignData() {
        CAMPAIGN_DATA = {
            Status: "",
            Players: [],
            GameMaster: "",
            Locations: {
                Cities: {},
                Landmarks: {}
            },
        };
    
        CampaignController.SetCampaignStatus("Generating Campaign Data");
    },
    PrintCampaignData () {
        console.log("Campaign Data:", CAMPAIGN_DATA);
    },
    AddCampaignCity(id, locationData) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Locations")) { console.error("CAMPAIGN_DATA has no Locations data!"); return; }
        if (!CAMPAIGN_DATA.Locations.hasOwnProperty("Cities")) { console.error("CAMPAIGN_DATA has no Cities Location data!"); return; }
    
        CAMPAIGN_DATA.Locations.Cities[id] = locationData;
    },
    AddCampaignLandmark(id, locationData) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Locations")) { console.error("CAMPAIGN_DATA has no Locations data!"); return; }
        if (!CAMPAIGN_DATA.Locations.hasOwnProperty("Landmarks")) { console.error("CAMPAIGN_DATA has no Landmarks Location data!"); return; }
    
        CAMPAIGN_DATA.Locations.Landmarks[id] = locationData;
    },
    AddCampaignPlayer(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return; }
        if (CAMPAIGN_DATA.Players.includes(playerUsername)) { console.error("Attempting to add player user that already exists in campaign."); return; }
    
        CAMPAIGN_DATA.Players.push(playerUsername);
    },
    RemoveCampaignPlayer(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return; }
        if (!CAMPAIGN_DATA.Players.includes(playerUsername)) { console.error("Attempting to remove player user that does not exist in campaign."); return; }
    
        CAMPAIGN_DATA.Players = CAMPAIGN_DATA.Players.filter(entry => (entry == playerUsername));
    },
    GetPlayerExists(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return; }
        if (!playerUsername || (typeof playerUsername !== 'string')) { console.error("Attempting to check if player exists with invalid data."); return; }

        return CAMPAIGN_DATA.Players.includes(playerUsername);
    },
    GetCampaignGameMaster() {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return null; }
        if (!CAMPAIGN_DATA.hasOwnProperty("GameMaster")) { console.error("CAMPAIGN_DATA has no GameMaster data!"); return null; }
        
        return CAMPAIGN_DATA.GameMaster;
    },
    SetCampaignGameMaster (gmUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("GameMaster")) { console.error("CAMPAIGN_DATA has no GameMaster data!"); return; }
        if (!gmUsername || (typeof gmUsername !== 'string')) { console.error("Attempting to set Game Master with invalid data."); return; }
    
        CAMPAIGN_DATA.GameMaster = gmUsername;
    }
}

CampaignController.ResetCampaignData();

//  Module Exports
module.exports = { CampaignController }