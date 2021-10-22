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

const { Random } = require('../HelperFunctions/Random')

const CITY_DATA = {
  GUILD_TYPES: [
    'Adventurer',
    'Arcane',
    'Criminal',
    'Government',
    'Laborer',
    'Mercantile',
    'Mercenary',
    'Performers',
    'Psionic',
    'Racial',
    'Religious',
    'Scholastic',
    'Slavers'
  ],

  IMPORTS_EXPORTS: [
    'Spices',
    'Grains',
    'Linens',
    'Paper',
    'Pearls',
    'Perfumes',
    'Precious Metals',
    'Iron',
    'Wines',
    'Oils',
    'Waxes',
    'Furs',
    'Wheat',
    'Arrows',
    'Weapons',
    'Armors',
    'Clothing',
    'Leathers',
    'Ales',
    'Livestock',
    'Books'
  ],

  SALE_TYPES: [
    'Clothing (basic)',
    'Clothing (fancy)',
    'Armor (basic)',
    'Armor (magic)',
    'Weapon (basic)',
    'Weapon (magic)',
    'Trinkets (basic)',
    'Trinkets (magic)',
    'Trinkets (holy)',
    'Adventure Supply (basic)',
    'Adventure Supply (magic)',
    'Healing',
    'Curse Removal',
    'Horses / Steeds',
    'Animals / Monsters',
    'Transport',
    'Loans / Banking',
    'Guild Services',
    'Food / Drink',
    'Smithing',
    'Room & Board',
    'Entertainment',
    'Books'
  ],

  BUSINESSES: [
    { Name: 'The Breaking Point', SaleTypes: ['Armor (basic)', 'Weapon (basic)', 'Trinkets (basic)', 'Adventure Supply (basic)'] },
    { Name: 'The Dwarven Beard', SaleTypes: ['Armor (basic)', 'Armor (magic)', 'Weapon (basic)', 'Weapon (magic)', 'Trinkets (basic)', 'Adventure Supply (basic)'] },
    { Name: 'The Aura Den', SaleTypes: ['Armor (magic)', 'Weapon (magic)', 'Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'The White Beard', SaleTypes: ['Food / Drink', 'Room & Board'] },
    { Name: 'The Belly of the Beast', SaleTypes: ['Food / Drink', 'Room & Board'] },
    { Name: 'The Sneaky Unicorn', SaleTypes: ['Armor (magic)', 'Weapon (magic)', 'Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'The Rare Phoenix', SaleTypes: ['Armor (magic)', 'Weapon (magic)', 'Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'The Elder Kraken', SaleTypes: ['Armor (basic)', 'Weapon (basic)', 'Armor (magic)', 'Weapon (magic)', 'Smithing'] },
    { Name: "The Dragon's Breath", SaleTypes: ['Food / Drink', 'Room & Board'] },
    { Name: 'Illuminations', SaleTypes: ['Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'The Night Mare', SaleTypes: ['Food / Drink', 'Entertainment'] },
    { Name: 'The Voodoo Hut', SaleTypes: ['Weapon (magic)', 'Armor (magic)', 'Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'The Winged Lion', SaleTypes: ['Food / Drink', 'Entertainment', 'Guild Services'] },
    { Name: "The Raven's Quill", SaleTypes: ['Trinkets (magic)', 'Adventure Supply (basic)', 'Adventure Supply (magic)'] },
    { Name: "Lucky Luke's", SaleTypes: ['Transport'] },
    { Name: "Dragon's Den Bank", SaleTypes: ['Loans / Banking'] },
    { Name: 'Four Hooves', SaleTypes: ['Horses / Steeds'] },
    { Name: 'Abracapothecary', SaleTypes: ['Trinkets (magic)', 'Adventure Supply (magic)', 'Trinkets (holy)', 'Healing', 'Curse Removal'] },
    { Name: 'The Evil Eye', SaleTypes: ['Weapon (magic)', 'Armor (magic)', 'Trinkets (magic)', 'Adventure Supply (magic)'] },
    { Name: 'Pharmagician', SaleTypes: ['Trinkets (magic)', 'Adventure Supply (magic)', 'Trinkets (holy)', 'Healing', 'Curse Removal'] },
    { Name: "Hobard's", SaleTypes: ['Clothing (fancy)', 'Trinkets (basic)'] },
    { Name: "Fendrik's Emporium", SaleTypes: ['Clothing (basic)', 'Clothing (fancy)', 'Trinkets (basic)'] },
    { Name: 'The Familiar', SaleTypes: ['Animals / Monsters'] },
    { Name: "Lightning Lenore's", SaleTypes: ['Horses / Steeds'] },
    { Name: "The Devil's Key", SaleTypes: ['Trinkets (magic)', 'Adventure Supply (magic)', 'Curse Removal'] },
    { Name: 'The Dreaming Amulet', SaleTypes: ['Entertainment'] },
    { Name: 'Grill and Swill', SaleTypes: ['Food / Drink'] },
    { Name: "Kartwright's Kitchen", SaleTypes: ['Food / Drink'] },
    { Name: 'The Hissing Shrub Pub', SaleTypes: ['Food / Drink'] },
    { Name: "The Crocodile's Tooth", SaleTypes: ['Food / Drink'] },
    { Name: 'The Dusty Tome', SaleTypes: ['Books'] },
    { Name: 'The Lost Scroll', SaleTypes: ['Books'] },
    { Name: 'The Lonely Stone', SaleTypes: ['Food / Drink', 'Room & Board'] }
  ]
}

const GetRandomBusinessOfType = (typeName) => {
  const filteredBusinessTypes = CITY_DATA.BUSINESSES.filter((entry) => entry.SaleTypes.includes(typeName))
  if (filteredBusinessTypes.length === 0) { return -1 }

  const business = filteredBusinessTypes[Math.floor(Random() * filteredBusinessTypes.length)]

  //  Specialized details - Guild Services
  if (business.SaleTypes.includes('Guild Services')) {
    business.GuildAssociation = CITY_DATA.GUILD_TYPES[Math.floor(Random() * CITY_DATA.GUILD_TYPES.length)]
    //  TODO: Generate more data
    //  - If it is a racial guild, select a race
    //  - If it is a slavers or criminal guild, determine how overt they are
    //  - If they are a mercenary guild, determine how they are considered by the locals, how large they are, etc
  }
  //  TODO: Generate the name of the guild

  return business
}

//  Module Exports
module.exports = { CITY_DATA, GetRandomBusinessOfType }
