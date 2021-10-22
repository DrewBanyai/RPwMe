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
const GetLocationName = (locationType, unused = true) => {
  if (!LOCATION_NAMES.hasOwnProperty(locationType)) { console.warn('Attempting to find location name for unknown type ' + locationType); return 'NO NAME' }
  if (usedLocationNames.length >= LOCATION_NAMES[locationType].length) { unused = false }
  let locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)]
  if (unused) { while (usedLocationNames.includes(locationName)) { locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)] } }
  usedLocationNames.push(locationName)
  return locationName
}

const GetLocationPosition = (mapData, locationType, usedPositions, unused = true) => {
  const positionList = mapData.Positions.filter(pos => pos.TypeAllowed.includes(locationType))
  if (unused && (usedPositions.length >= positionList.length)) { console.warn('Ran out of unused locations of type ' + locationType); unused = false }
  let positionIndex = Math.floor(Random() * positionList.length)
  if (unused) { while (usedPositions.includes(positionIndex)) { positionIndex = Math.floor(Random() * positionList.length) } }
  usedPositions.push(positionIndex)
  return positionList[positionIndex]
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
