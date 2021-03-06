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
const { MapEntry } = require('../Data/Maps/MapEntry')
const { InteractiveMap } = require('../Components/InteractiveMap')
const { GetObjectLocationOfType } = require('../Data/LocationTemplates')

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

    const mapEntry = new MapEntry()
    mapEntry.setValues(locationData.MapImageFile, mapLevel, [], [])

    //  Generate all map location objects that populate the map within this entry
    let objectArray = []
    let usedPositions = []
    usedPositions = [] //  We just do this so that it doesn't think usedPosiitons must be const
    for (const objType in locationData.SubObjectCounts) {
      const objCount = RandIntBetween(locationData.SubObjectCounts[objType].Min, locationData.SubObjectCounts[objType].Max)
      objectArray = objectArray.concat(WorldController.generateObjectsOfType(locationData, objType, objCount, usedPositions))
    }

    //  For each map object, generate it's own map entry and set it into the current map entry as a location
    objectArray.forEach(obj => {
      if (obj.Location) {
        obj.MapEntry = WorldController.generateMapEntry(mapLevel + 1, obj.Location)
        CampaignController.AddCampaignLocation(obj.Location.ObjectID, obj.Location)
      }
      mapEntry.MapLinks.Locations.push(obj)
    })

    // Shift all partitions into the map entry
    const partitionArray = WorldController.generatePartitionArray(locationData)
    partitionArray.forEach(p => {
      p.MapEntry = WorldController.generateMapEntry(mapLevel + 1, p.LocationData)
      delete p.LocationData
      mapEntry.MapLinks.Partitions.push(p)
    })

    return mapEntry
  },

  generateObjectsOfType (locationData, objType, objCount, usedPositions) {
    //  If the location has no sub object count for the given type, return an empty array
    if (!locationData.SubObjectCounts[objType]) return []
    if (objCount <= 0) return []

    //  Create the number of map objects randomly by generating them on the fly
    const objectArray = []
    for (let i = 0; i < objCount; ++i) {
      //  Select a position and then attempt to create an object of the given type, then push it into the map object array
      const objectTypeData = GetRandomMapObjectOfType(objType)
      if (!objectTypeData) { console.warn('No Map Object of Type ' + objType); continue }

      const objectLocation = GetObjectLocationOfType(objType)
      if (objectLocation === null) console.warn('Could not generate an object location of type ' + objType)
      const objectStats = objectTypeData.GenerateLocationData(objectLocation)

      //  Generate the position last, since we don't want to use up a position if the location data doesn't come back
      const position = GetLocationPosition(locationData, objType, usedPositions)
      if (position === null) console.log('GetLocationPosition failed on type ' + objType)

      const newLocation = {
        ObjectID: CampaignController.GenerateNewObjectID(),
        Type: objectTypeData.LocationType,
        Name: objectStats.Name,
        Icon: objectTypeData.Icon,
        Position: position,
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
    locationData.PartitionTemplates.forEach(p => {
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
