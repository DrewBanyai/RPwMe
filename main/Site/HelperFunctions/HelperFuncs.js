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

const { LOCATION_NAMES } = require('../Data/LocationNames')
const { CITY_DATA, GetRandomBusinessOfType } = require('../Data/CityData')
const { Random, RandIntBetween } = require('../HelperFunctions/Random')

let usedLocationNames = []
const ClearUsedLocationNames = () => { usedLocationNames = [] }
const GetLocationName = (locationType, onlyUnused = true) => {
  //  If there is no LOCATION_NAMES entry for the given location type, send out a warning and return no name
  if (!LOCATION_NAMES[locationType]) { console.warn('Attempting to find location name for unknown type ' + locationType); return 'NO NAME' }

  if (usedLocationNames.length >= LOCATION_NAMES[locationType].length) { onlyUnused = false }
  let locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)]
  if (onlyUnused) { while (usedLocationNames.includes(locationName)) { locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)] } }
  usedLocationNames.push(locationName)
  return locationName
}

const GetLocationPosition = (locationData, locationType, usedPositions, onlyUnused = true) => {
  //  Get the array of positions which allow a location of this type
  let positionList = locationData.PositionsArray.filter(pos => pos.TypesAllowed.includes(locationType))

  //  Determine if any of the filtered positions are unused
  let anyUnused = false
  positionList.forEach(p => { anyUnused |= !usedPositions.includes(p) })

  //  If there are no unused positions, send out a warning and switch to allow unused
  if (onlyUnused && !anyUnused) { console.warn('Ran out of unused locations of type ' + locationType); onlyUnused = false }

  //  If we're still allowing only unused positions at this point, filter the list to only unused positions
  if (onlyUnused) positionList = positionList.filter(p => !usedPositions.includes(p))

  //  Grab a random position from the remaining list, add it to the used list if necessary, and return the position
  const position = positionList[Math.floor(Random() * positionList.length)]
  if (!usedPositions.includes(position)) usedPositions.push(position)
  return position
}

const GenerateBusinesses = (businessTypes) => {
  const businessList = []

  const salesTypes = CITY_DATA.SALE_TYPES
  salesTypes.forEach((saleType) => {
    if (businessTypes.hasOwnProperty(saleType)) { businessList.push(GetRandomBusinessOfType(saleType)) }
  })

  return businessList
}

const ChooseXFromList = (count, list) => {
  if (count <= 0) { console.error('Attempting to user ChooseXFromList to create an empty or negative size set!'); return [] }
  if (count >= list.length) { console.error('Attempting to use ChooseXFromList to grab an entire list, or a set larger that the list!'); return [] }

  const returnList = []
  for (let i = 0; i < count; ++i) {
    let itemIndex = RandIntBetween(0, list.length - 1)
    while (returnList.includes(list[itemIndex])) itemIndex = RandIntBetween(0, list.length - 1)
    returnList.push(list[itemIndex])
  }
  return returnList
}

//  Module Exports
module.exports = { ClearUsedLocationNames, GetLocationName, GetLocationPosition, GenerateBusinesses, ChooseXFromList }
