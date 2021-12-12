class InteractiveMapLocation {
  constructor (mapImageFile, locationType, subObjectCounts, positionsArray, partitionsArray) {
    this.MapImageFile = mapImageFile
    this.LocationType = locationType

    this.SubObjectCounts = {}
    for (const objType in subObjectCounts) this.SubObjectCounts[objType] = subObjectCounts[objType]

    this.PositionsArray = []
    for (const index in positionsArray) this.PositionsArray.push(positionsArray[index])

    this.PartitionsArray = []
    for (const index in partitionsArray) this.PartitionsArray.push(partitionsArray[index])

    this.LocationIcons = []
  }
}

class InteractiveMapPosition {
  constructor (x, y, typesAllowedArray, propertiesArray) {
    this.X = x
    this.Y = y

    this.TypesAllowed = []
    for (const index in typesAllowedArray) this.TypesAllowed.push(typesAllowedArray[index])

    this.Properties = []
    for (const index in propertiesArray) this.Properties.push(propertiesArray[index])
  }
}

class InteractiveMapPartition {
  constructor (namePosition, nameType, pointsArray, locationData) {
    this.NamePosition = { X: namePosition.x, Y: namePosition.y }
    this.NameType = nameType

    this.PointsArray = []
    for (const index in pointsArray) this.PointsArray.push(pointsArray[index])

    this.LocationData = locationData
  }
}

//  Module Exports
module.exports = { InteractiveMapLocation, InteractiveMapPosition, InteractiveMapPartition }
