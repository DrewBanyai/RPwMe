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
const { GetRandomMapObjectOfType } = require('../Data/LocationTypes')
const { Container } = require('../Components/ArcadiaJS')
const { WORLD_MAP_TEMPLATES } = require('../Data/WorldMapTemplates')
const { CampaignController } = require('../Controllers/CampaignController')
const { InteractiveMap } = require('../Components/InteractiveMap')
const { GenerateObjectLocation } = require('../Data/CityTemplates')

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
    const mapKeyList = Object.keys(WORLD_MAP_TEMPLATES)
    CampaignController.SetCampaignMapID(mapKeyList[Math.floor(Random() * mapKeyList.length)])

    let mapData = CampaignController.GetCampaignMapData()
    mapData = WorldController.generateMapEntry(0, WORLD_MAP_TEMPLATES[CampaignController.GetCampaignMapID()])

    CampaignController.SetCampaignMapData(mapData)
    container.elements.interactiveMap = InteractiveMap.create({ topLevelMapData: mapData })
  },

  generateMapEntry (mapLevel, locationData) {
    if (!locationData) return

    const mapEntry = CampaignController.GetEmptyMapEntry()
    mapEntry.MapImage = locationData.MapImageFile
    mapEntry.MapLevel = mapLevel

    //  Generate all cities that populate the map within this entry
    const cityArray = WorldController.generateObjectArray(locationData, 'City')
    cityArray.forEach(c => {
      if (c.Location) c.mapEntry = WorldController.generateMapEntry(mapLevel + 1, c.Location)
      mapEntry.Locations.Cities[c.ObjectID] = c
    })

    //  Generate all landmarks that populate the map within this entry
    const landmarkArray = WorldController.generateObjectArray(locationData, 'Landmark')
    landmarkArray.forEach(l => {
      if (l.Location) l.mapEntry = WorldController.generateMapEntry(mapLevel + 1, l.Location)
      mapEntry.Locations.Landmarks[l.ObjectID] = l
    })

    // Shift all partitions into the map entry
    const partitionArray = WorldController.generatePartitionArray(locationData)
    partitionArray.forEach(p => {
      p.MapEntry = WorldController.generateMapEntry(mapLevel + 1, p.LocationData)
      delete p.LocationData
      mapEntry.Locations.Partitions[p.ObjectID] = p
    })

    return mapEntry
  },

  generateObjectArray (locationData, objectType) {
    //  Create the number of landmarks randomly by generating them on the fly
    const objectArray = []
    const objectCount = RandIntBetween(locationData.SubObjectCounts[objectType].Min, locationData.SubObjectCounts[objectType].Max)
    const usedPositions = []
    for (let i = 0; i < objectCount; ++i) {
      //  Select a landmark type and create the new landmark, then push it into the landmark array
      const position = GetLocationPosition(locationData, objectType, usedPositions)
      const objectTypeData = GetRandomMapObjectOfType(objectType)
      const objectStats = objectTypeData.GenerateStats()
      const objecIconPos = { x: position.X, y: position.Y }
      const objectLocation = GenerateObjectLocation(objectStats)

      const newLocation = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        Type: objectTypeData.LocationType,
        Name: objectStats.Name,
        Icon: objectTypeData.Icon,
        Position: objecIconPos,
        Properties: position.Properties,
        Population: objectStats.Population,
        Businesses: objectStats.Businesses,
        Location: objectLocation
      }
      objectArray.push(newLocation)
    }

    return objectArray
  },

  generatePartitionArray (locationData) {
    const objectArray = []
    locationData.PartitionsArray.forEach(p => {
      const newPart = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        Type: p.LocationData.LocationType,
        Name: GetLocationName(p.LocationData.LocationType, true),
        NamePosition: p.NamePosition,
        Points: p.PointsArray,
        LocationData: p.LocationData
      }
      objectArray.push(newPart)
    })
    return objectArray
  }
}

//  Module Exports
module.exports = { WorldController }
