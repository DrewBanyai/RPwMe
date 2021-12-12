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
    LocationType: 'Metropolis',
    Classification: 'City',
    Icon: 'City',
    GenerateStats: () => {
      const locationName = GetLocationName('City')
      const population = RandIntBetween(100000, 1000000)
      const businesses = GenerateBusinesses({
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

      return {
        Name: locationName,
        Population: population,
        Businesses: businesses
      }
    }
  },
  {
    LocationType: 'City',
    Classification: 'City',
    Icon: 'City',
    GenerateStats: () => {
      const locationName = GetLocationName('City')
      const population = RandIntBetween(5001, 100000)
      const businesses = GenerateBusinesses({
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

      return {
        Name: locationName,
        Population: population,
        Businesses: businesses
      }
    }
  },
  {
    LocationType: 'Town',
    Classification: 'City',
    Icon: 'City',
    GenerateStats: () => {
      const locationName = GetLocationName('City')
      const population = RandIntBetween(2001, 5000)
      const businesses = GenerateBusinesses({
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

      return {
        Name: locationName,
        Population: population,
        Businesses: businesses
      }
    }
  },
  {
    LocationType: 'Village',
    Classification: 'City',
    Icon: 'City',
    GenerateStats: () => {
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
    LocationType: 'Hamlet',
    Classification: 'Landmark',
    Icon: 'Hamlet',
    GenerateStats: () => {
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
    LocationType: 'Homestead',
    Classification: 'Landmark',
    Icon: 'Hamlet',
    GenerateStats: () => {
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
    LocationType: 'Farm',
    Classification: 'Landmark',
    Icon: 'Farm',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Farm'),
        Population: RandIntBetween(1, 10),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Fortress',
    Classification: 'Landmark',
    Icon: 'Fortress',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Fortress'),
        Population: RandIntBetween(120, 1000),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Citadel',
    Classification: 'Landmark',
    Icon: 'Citadel',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Fortress'),
        Population: RandIntBetween(120, 1000),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Ruins',
    Classification: 'Landmark',
    Icon: 'Ruins',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Ruins'),
        Population: RandIntBetween(10, 100),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Tower',
    Classification: 'Landmark',
    Icon: 'Tower',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Tower'),
        Population: RandIntBetween(1, 10),
        Businesses: GenerateBusinesses({})
      }
    }
  },
  {
    LocationType: 'Mine',
    Classification: 'Landmark',
    Icon: 'Mine',
    GenerateStats: () => {
      return {
        Name: GetLocationName('Mine'),
        Population: RandIntBetween(6, 200),
        Businesses: GenerateBusinesses({
          Smithing: 0.5
        })
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
