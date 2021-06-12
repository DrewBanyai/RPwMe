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

var { LOCATION_NAMES } = require('../Data/LocationNames')
var { CITY_DATA, GetRandomBusinessOfType } = require('../Data/CityData')
var { Random } = require('../HelperFunctions/Random')

let usedLocationNames = [];
const ClearUsedLocationNames = () => { usedLocationNames = []; }
const GetLocationName = (locationType, unused = true) => {
    if (usedLocationNames.length >= LOCATION_NAMES[locationType].length) { unused = false; }
    let locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)];
    if (unused) { while (usedLocationNames.includes(locationName)) { locationName = LOCATION_NAMES[locationType][Math.floor(Random() * LOCATION_NAMES[locationType].length)]; } }
    usedLocationNames.push(locationName);
    return locationName;
}


let usedPositions = [];
const ClearUsedPositions = () => { usedPositions = []; }
const GetLocationPosition = (mapData, locationType, unused = true) => {
    if (usedPositions.length >= mapData.Positions[locationType].length) { unused = false; }
    let positionIndex = Math.floor(Random() * mapData.Positions[locationType].length);
    if (unused) { while (usedPositions.includes(positionIndex)) { positionIndex = Math.floor(Random() * mapData.Positions[locationType].length); } }
    usedPositions.push(positionIndex);
    return mapData.Positions[locationType][positionIndex];
}


const GenerateBusinesses = (businessTypes) => {
    let businessList = [];

    const salesTypes = CITY_DATA.SALE_TYPES;
    salesTypes.forEach((saleType) => {
        if (businessTypes.hasOwnProperty(saleType))
            businessList.push(GetRandomBusinessOfType(saleType));
    });

    return businessList;
}

//  Module Exports
module.exports = { ClearUsedLocationNames, GetLocationName, ClearUsedPositions, GetLocationPosition, GenerateBusinesses }