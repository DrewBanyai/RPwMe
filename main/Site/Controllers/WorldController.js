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

var { SeedRandom, RandIntBetween, Random } = require('../HelperFunctions/Random')
var { ClearUsedLocationNames, ClearUsedPositions, GetLocationPosition } = require('../HelperFunctions/HelperFuncs')
var { GetRandomCityType, GetRandomLandmarkType } = require('../Data/LocationTypes')
const { Container } = require('../Components/ArcadiaJS')
const { LOCATION_DATA } = require('../Data/LocationData')
var { CampaignController } = require('../Data/CampaignController')
const { InteractiveMap } = require('../Components/InteractiveMap')

const WorldController = {
    create(worldSeed) {
        let container = Container.create({ id: "WorldController", });
        container.elements = { interactiveMap: null };
        container.mapIdentifier = null;
        container.mapObjects = { cities: [], landmarks: [], npcs: [], };

        WorldController.GenerateRandomWorld(container, worldSeed);

        return container;
    },

    GenerateRandomWorld: (container, worldSeed) => {
        ClearUsedLocationNames();
        ClearUsedPositions();
        CampaignController.ResetCampaignData();

        //  Seed the world generation=
        SeedRandom(worldSeed);

        //  Choose a random map identifier
        const mapList = Object.keys(LOCATION_DATA);
        container.mapIdentifier = mapList[Math.floor(Random() * mapList.length)];
        let mapImageFile = LOCATION_DATA[container.mapIdentifier].MapImageFile;

        //  Generate all cities and landmarks that will populate the map
        let cityArray = WorldController.generateCityArray(LOCATION_DATA[container.mapIdentifier]);
        let landmarkArray = WorldController.generateLandmarkArray(LOCATION_DATA[container.mapIdentifier]);

        //  Save off the map objects into an array for later use
        cityArray.forEach((city) => { container.mapObjects.cities.push(city); });
        landmarkArray.forEach((landmark) => { container.mapObjects.landmarks.push(landmark); });
        CampaignController.SetCampaignStatus("Waiting For Campaign Start");
        CampaignController.PrintCampaignData();

        //  Create the visual represenation of this map
        container.elements.interactiveMap = InteractiveMap.create({
            mapSelection: container.mapIdentifier,
            mapImageFile: mapImageFile,
            mapSizeX: "930px",
            mapSizeY: "555px",
            cities: cityArray,
            landmarks: landmarkArray
        });
    },

    generateCityArray: (mapData) => {
        //  Create the number of cities randomly by generating them on the fly
        let objectArray = [];
        let objectCount = RandIntBetween(mapData.CityCounts.Min, mapData.CityCounts.Max);
        for (let i = 0; i < objectCount; ++i) {
            //  Select a city type and create the new city, then push it into the city array
            let position = GetLocationPosition(mapData, "Cities");
            let cityType = GetRandomCityType();
            let cityData = cityType.GenerateData();
            let cityPos = { X: position.X, Y: position.Y };
            let newLocation = {
                ObjectID: CampaignController.GenerateNewObjectID(),
                Type: cityType.LocationType,
                Name: cityData.Name,
                Icon: cityType.Icon,
                Position: cityPos,
                Properties: position.Properties,
                Population: cityData.Population,
                Businesses: cityData.Businesses
            }
            CampaignController.AddCampaignCity(newLocation.ObjectID, newLocation);
            objectArray.push(newLocation);
        }

        return objectArray;
    },

    generateLandmarkArray: (mapData) => {
        //  Create the number of landmarks randomly by generating them on the fly
        let objectArray = [];
        let objectCount = RandIntBetween(mapData.LandmarkCounts.Min, mapData.LandmarkCounts.Max);
        for (let i = 0; i < objectCount; ++i) {
            //  Select a landmark type and create the new landmark, then push it into the landmark array
            let position = GetLocationPosition(mapData, "Landmarks");
            let landmarkType = GetRandomLandmarkType();
            let landmarkPos = { X: position.X, Y: position.Y };
            let landmarkData = landmarkType.GenerateData();

            let newLocation = {
                ObjectID: CampaignController.GenerateNewObjectID(),
                Type: landmarkType.LocationType,
                Name: landmarkData.Name,
                Icon: landmarkType.Icon,
                Position: landmarkPos,
                Properties: position.Properties,
                Population: landmarkData.Population
            }
            if (landmarkData.Businesses) { newLocation.Businesses = landmarkData.Businesses; }
            CampaignController.AddCampaignLandmark(newLocation.ObjectID, newLocation);
            objectArray.push(newLocation);

        }

        return objectArray;
    }
};

//  Module Exports
module.exports = { WorldController }