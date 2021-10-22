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

const { EventDispatch } = require('./EventDispatch');
const { RandIntBetween } = require('../HelperFunctions/Random');
const { PlayerCharacter } = require('../Data/PlayerCharacter')

let CAMPAIGN_DATA = {};

const CAMPAIGN_STATUS_LIST = [
    "Generating Campaign Data",
    "Waiting For Campaign Start",
    "Waiting For Players",
    "Active",
];

let CampaignObjectCount = 0;

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
            Players: { 0: null, 1: null, 2: null},
            GameMaster: "",
            MapID: null,
        };
        CampaignController.ResetMapData();
        
        CampaignController.ResetObjectIDs();
    
        CampaignController.SetCampaignStatus("Generating Campaign Data");
    },

    ResetMapData() { CAMPAIGN_DATA.MapData = CampaignController.GetEmptyMapEntry(); },

    GetEmptyMapEntry() {
        return {
            MapImage: null,
            MapLevel: 0,
            Locations: {
                Cities: {},
                Landmarks: {},
                Partitions: {},
            }
        }
    },

    GenerateNewObjectID() { return CampaignObjectCount++; },
    ResetObjectIDs() { CampaignObjectCount = 0; },

    PrintCampaignData() { console.log("Campaign Data:", CAMPAIGN_DATA); },

    AddCampaignCity(id, locationData) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("MapData")) { console.error("CAMPAIGN_DATA has no MapData entry!"); return; }
        if (!CAMPAIGN_DATA.MapData.hasOwnProperty("Locations")) { console.error("CAMPAIGN_DATA has no Locations entry!"); return; }
        if (!CAMPAIGN_DATA.MapData.Locations.hasOwnProperty("Cities")) { console.error("CAMPAIGN_DATA has no Cities Location entry!"); return; }
    
        CAMPAIGN_DATA.MapData.Locations.Cities[id] = locationData;
    },
    AddCampaignLandmark(id, locationData) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("MapData")) { console.error("CAMPAIGN_DATA has no MapData entry!"); return; }
        if (!CAMPAIGN_DATA.MapData.hasOwnProperty("Locations")) { console.error("CAMPAIGN_DATA has no Locations entry!"); return; }
        if (!CAMPAIGN_DATA.MapData.Locations.hasOwnProperty("Landmarks")) { console.error("CAMPAIGN_DATA has no Landmarks Location entry!"); return; }
    
        CAMPAIGN_DATA.MapData.Locations.Landmarks[id] = locationData;
    },
    SetCampaignMapID(mapID) { CAMPAIGN_DATA.MapID = mapID; },
    GetCampaignMapID() { return CAMPAIGN_DATA.MapID; },
    GetCampaignMapData() { return CAMPAIGN_DATA.MapData; },
    AddCampaignPlayer(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return false; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return false; }
        if (this.GetPlayerExists(playerUsername)) { console.error("Attempting to add player user that already exists in campaign."); return false; }
        if (this.GetPlayerCount() >= 3) { console.error("Attempting to add a player when the player list is full."); return false; }

        for (let i = 0; i < 3; ++i) {
            if (!CAMPAIGN_DATA.Players[i]) {
                CAMPAIGN_DATA.Players[i] = PlayerCharacter.CreateNewPlayer(playerUsername, i);
                EventDispatch.SendEvent("Player Added", { playerUsername: playerUsername, playerIndex: i });
                return true;
            }
        }
    },
    RemoveCampaignPlayer(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return false; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return false; }
        if (!this.GetPlayerExists(playerUsername)) { console.error("Attempting to remove player user that does not exist in campaign."); return false; }
    
        for (let i = 0; i < 3; ++i) {
            if (CAMPAIGN_DATA.Players[i] && CAMPAIGN_DATA.Players[i].playerUsername === playerUsername) {
                CAMPAIGN_DATA.Players[i] = null;
                EventDispatch.SendEvent("Player Removed", { playerUsername: playerUsername, playerIndex: i });
                return true;
            }
        }
    },
    GetPlayerCount() {
        let count = 0;
        for (let i = 0; i < 3; ++i) count += ((CAMPAIGN_DATA.Players[i]) ? 1 : 0);
        return count;
    },
    GetPlayersList() { return CAMPAIGN_DATA.Players; },
    GetPlayer(playerUsername) {
        if (!this.GetPlayerExists(playerUsername)) { return null; }

        for (let i = 0; i < 3; ++i)
            if (CAMPAIGN_DATA.Players[i] && CAMPAIGN_DATA.Players[i].playerUsername === playerUsername)
                return CAMPAIGN_DATA.Players[i];
    },
    GetPlayerExists(playerUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("Players")) { console.error("CAMPAIGN_DATA has no Players data!"); return; }
        if (!playerUsername || (typeof playerUsername !== 'string')) { console.error("Attempting to check if player exists with invalid data."); return; }

        for (let i = 0; i < 3; ++i)
            if (CAMPAIGN_DATA.Players[i] && CAMPAIGN_DATA.Players[i].playerUsername === playerUsername)
                return true;
        return false;
    },
    GetCampaignGameMaster() {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return null; }
        if (!CAMPAIGN_DATA.hasOwnProperty("GameMaster")) { console.error("CAMPAIGN_DATA has no GameMaster data!"); return null; }
        
        return CAMPAIGN_DATA.GameMaster;
    },
    SetCampaignGameMaster(gmUsername) {
        if (!CAMPAIGN_DATA) { console.error("CAMPAIGN_DATA is null or invalid!"); return; }
        if (!CAMPAIGN_DATA.hasOwnProperty("GameMaster")) { console.error("CAMPAIGN_DATA has no GameMaster data!"); return; }
        if (!gmUsername || (typeof gmUsername !== 'string')) { console.error("Attempting to set Game Master with invalid data."); return; }
    
        CAMPAIGN_DATA.GameMaster = gmUsername;
    },
    GetCampaignData() { return CAMPAIGN_DATA; },
    SetCampaignData(campaignData) { CAMPAIGN_DATA = campaignData; },
    SetCampaignMapData(mapData) { CAMPAIGN_DATA.MapData = mapData; },
    UpdateCampaignData(campaignData) {
        if (!campaignData) { console.error("Attempting to set new Campaign Data with null data entry!"); return; }
        CAMPAIGN_DATA = campaignData;
    }
}

CampaignController.ResetCampaignData();

//  Module Exports
module.exports = { CampaignController, CAMPAIGN_DATA }