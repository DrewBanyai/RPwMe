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

const { SeedRandom, RandIntBetween, Random } = require('../HelperFunctions/Random')
const { ClearUsedLocationNames, GetLocationPosition, GetLocationName } = require('../HelperFunctions/HelperFuncs')
const { GetRandomCityType, GetRandomLandmarkType } = require('../Data/LocationTypes')
const { Container } = require('../Components/ArcadiaJS')
const { LOCATION_DATA } = require('../Data/LocationData')
const { CampaignController } = require('../Controllers/CampaignController')
const { InteractiveMap } = require('../Components/InteractiveMap')

const WorldController = {
  create (worldSeed) {
    const container = Container.create({ id: 'WorldController' })
    container.elements = { interactiveMap: null }

    WorldController.GenerateRandomWorld(container, worldSeed)

    return container
  },

  GenerateRandomWorld (container, worldSeed) {
    ClearUsedLocationNames()
    CampaignController.ResetMapData()

    //  Seed the world generation
    SeedRandom(worldSeed)

    //  Choose a random map identifier
    const mapKeyList = Object.keys(LOCATION_DATA)
    CampaignController.SetCampaignMapID(mapKeyList[Math.floor(Random() * mapKeyList.length)])

    let mapData = CampaignController.GetCampaignMapData()
    mapData = WorldController.generateMapEntry(0, LOCATION_DATA[CampaignController.GetCampaignMapID()])

    CampaignController.SetCampaignMapData(mapData)
    container.elements.interactiveMap = InteractiveMap.create({ topLevelMapData: mapData })
  },

  generateMapEntry (mapLevel, locationData) {
    const mapEntry = CampaignController.GetEmptyMapEntry()
    mapEntry.MapImage = locationData.MapImageFile
    mapEntry.MapLevel = mapLevel

    //  Generate all cities that populate the map within this entry
    const cityArray = WorldController.generateCityArray(locationData)
    cityArray.forEach(c => { mapEntry.Locations.Cities[c.ObjectID] = c })

    //  Generate all landmarks that populate the map within this entry
    const landmarkArray = WorldController.generateLandmarkArray(locationData)
    landmarkArray.forEach(l => { mapEntry.Locations.Landmarks[l.ObjectID] = l })

    const partitionArray = WorldController.generatePartitionArray(locationData)
    partitionArray.forEach(p => {
      p.MapEntry = WorldController.generateMapEntry(mapLevel + 1, p.LocationData)
      delete p.LocationData
      mapEntry.Locations.Partitions[p.ObjectID] = p
    })

    return mapEntry
  },

  generateCityArray (locationData) {
    //  Create the number of cities randomly by generating them on the fly
    const objectArray = []
    const objectCount = RandIntBetween(locationData.CityCounts.Min, locationData.CityCounts.Max)
    const usedPositions = []
    for (let i = 0; i < objectCount; ++i) {
      //  Select a city type and create the new city, then push it into the city array
      const position = GetLocationPosition(locationData, 'City', usedPositions)
      const cityType = GetRandomCityType()
      const cityData = cityType.GenerateData()
      const cityPos = { x: position.x, y: position.y }
      const newLocation = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        Type: cityType.LocationType,
        Name: cityData.Name,
        Icon: cityType.Icon,
        Position: cityPos,
        Properties: position.Properties,
        Population: cityData.Population,
        Businesses: cityData.Businesses
      }
      objectArray.push(newLocation)
    }

    return objectArray
  },

  generateLandmarkArray (locationData) {
    //  Create the number of landmarks randomly by generating them on the fly
    const objectArray = []
    const objectCount = RandIntBetween(locationData.LandmarkCounts.Min, locationData.LandmarkCounts.Max)
    const usedPositions = []
    for (let i = 0; i < objectCount; ++i) {
      //  Select a landmark type and create the new landmark, then push it into the landmark array
      const position = GetLocationPosition(locationData, 'Landmark', usedPositions)
      const landmarkType = GetRandomLandmarkType()
      const landmarkPos = { x: position.x, y: position.y }
      const landmarkData = landmarkType.GenerateData()

      const newLocation = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        Type: landmarkType.LocationType,
        Name: landmarkData.Name,
        Icon: landmarkType.Icon,
        Position: landmarkPos,
        Properties: position.Properties,
        Population: landmarkData.Population
      }
      if (landmarkData.Businesses) { newLocation.Businesses = landmarkData.Businesses }
      objectArray.push(newLocation)
    }

    return objectArray
  },

  generatePartitionArray (locationData) {
    const objectArray = []
    locationData.Partitions.forEach(p => {
      const newPart = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        NamePosition: p.NamePosition,
        Points: p.Points,
        Name: GetLocationName(p.LocationData.LocationType, true),
        LocationData: p.LocationData
      }
      objectArray.push(newPart)
    })
    return objectArray
  }
}

//  Module Exports
module.exports = { WorldController }
