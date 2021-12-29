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

const { GetLocationName } = require('../HelperFunctions/HelperFuncs')
const { RandIntBetween, Random } = require('../HelperFunctions/Random')
const { GenerateBusinesses } = require('../HelperFunctions/HelperFuncs')

const LocationTypes = [
  {
    LocationType: 'City',
    Classification: 'Metropolis',
    Icon: 'City',
    GenerateLocationData: (location) => {
      return {
        Name: GetLocationName('City'),
        Population: RandIntBetween(100000, 1000000),
        Businesses: GenerateBusinesses({
          'Clothing (basic)': 1.0,
          'Clothing (fancy)': 1.0,
          'Armor (basic)': 1.0,
          'Weapon (basic)': 1.0,
          'Trinkets (basic)': 1.0,
          'Trinkets (magic)': 1.0,
          'Trinkets (holy)': 1.0,
          'Adventure Supply (basic)': 1.0,
          'Adventure Supply (magic)': 1.0,
          Healing: 1.0,
          'Curse Removal': 1.0,
          'Horses / Steeds': 1.0,
          'Animals / Monsters': 1.0,
          Transport: 1.0,
          'Loans / Banking': 1.0,
          'Guild Services': 1.0,
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0,
          Entertainment: 1.0,
          Books: 1.0
        })
      }
    }
  },
  {
    LocationType: 'City',
    Classification: 'City',
    Icon: 'City',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('City'),
        Population: RandIntBetween(5001, 100000),
        Businesses: GenerateBusinesses({
          'Clothing (basic)': 1.0,
          'Clothing (fancy)': 1.0,
          'Armor (basic)': 1.0,
          'Armor (magic)': 1.0,
          'Weapon (basic)': 1.0,
          'Weapon (magic)': 1.0,
          'Trinkets (basic)': 1.0,
          'Trinkets (magic)': 1.0,
          'Trinkets (holy)': 1.0,
          'Adventure Supply (basic)': 1.0,
          'Adventure Supply (magic)': 1.0,
          Healing: 1.0,
          'Curse Removal': 1.0,
          'Horses / Steeds': 1.0,
          'Animals / Monsters': 1.0,
          Transport: 1.0,
          'Loans / Banking': 1.0,
          'Guild Services': 1.0,
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0,
          Entertainment: 1.0,
          Books: 1.0
        })
      }
    }
  },
  {
    LocationType: 'City',
    Classification: 'Town',
    Icon: 'City',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('City'),
        Population: RandIntBetween(2001, 5000),
        Businesses: GenerateBusinesses({
          'Clothing (basic)': 1.0,
          'Armor (basic)': 1.0,
          'Weapon (basic)': 1.0,
          'Trinkets (basic)': 1.0,
          'Adventure Supply (basic)': 1.0,
          'Adventure Supply (magic)': 1.0,
          Healing: 1.0,
          'Horses / Steeds': 1.0,
          Transport: 1.0,
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0,
          Entertainment: 1.0,
          Books: 1.0
        })
      }
    }
  },
  {
    LocationType: 'City',
    Classification: 'Village',
    Icon: 'City',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Village'),
        Population: RandIntBetween(101, 2000),
        Businesses: GenerateBusinesses({
          'Clothing (basic)': 1.0,
          'Armor (basic)': 1.0,
          'Weapon (basic)': 1.0,
          'Adventure Supply (basic)': 1.0,
          'Adventure Supply (magic)': 1.0,
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0
        })
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Hamlet',
    Icon: 'Hamlet',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Village'),
        Population: RandIntBetween(11, 100),
        Businesses: GenerateBusinesses({
          'Clothing (basic)': 1.0,
          'Armor (basic)': 1.0,
          'Weapon (basic)': 1.0,
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0
        })
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Homestead',
    Icon: 'Hamlet',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Village'),
        Population: RandIntBetween(1, 10),
        Businesses: GenerateBusinesses({
          'Food / Drink': 1.0,
          Smithing: 1.0,
          'Room & Board': 1.0
        })
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Farm',
    Icon: 'Farm',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Farm'),
        Population: RandIntBetween(1, 10),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Fortress',
    Icon: 'Fortress',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Fortress'),
        Population: RandIntBetween(120, 1000),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Citadel',
    Icon: 'Citadel',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Fortress'),
        Population: RandIntBetween(120, 1000),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Ruins',
    Icon: 'Ruins',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Ruins'),
        Population: RandIntBetween(10, 100),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Tower',
    Icon: 'Tower',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Tower'),
        Population: RandIntBetween(1, 10),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Landmark',
    Classification: 'Mine',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Mine'),
        Population: RandIntBetween(6, 200),
        Businesses: GenerateBusinesses({
          Smithing: 0.5
        })
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Blacksmith',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Blacksmith'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Dock',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Dock'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Castle',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Castle'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Shrine',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Shrine'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Bridge',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Bridge'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Cemetary',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Cemetary'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Temple',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Temple'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'Monument',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('Monument'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Building',
    Classification: 'TownSquare',
    Icon: 'Mine',
    GenerateLocationData: () => {
      return {
        Name: GetLocationName('TownSquare'),
        Population: RandIntBetween(0, 0),
        Businesses: GenerateBusinesses({})
      }
    }
  }
]

const GetRandomMapObjectOfType = (type) => {
  const locationTypes = LocationTypes.filter((entry) => { return entry.Classification === type })
  return locationTypes[Math.floor(Random() * locationTypes.length)]
}

//  Module Exports
module.exports = { GetRandomMapObjectOfType }
