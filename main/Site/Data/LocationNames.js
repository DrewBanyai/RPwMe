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

const LOCATION_NAMES = {
  Region: [
    'Region A',
    'Region B',
    'Region C',
    'Region D',
    'Region E',
    'Region F',
    'Region G',
    'Region H',
    'Region I',
    'Region J',
    'Region K',
    'Region L',
    'Region M',
    'Region N',
    'Region O',
    'Region P',
    'Region Q',
    'Region R',
    'Region S',
    'Region T',
    'Region U',
    'Region V',
    'Region W',
    'Region X',
    'Region Y',
    'Region Z'
  ],
  SubRegion: [
    'Sub-Region A',
    'Sub-Region B',
    'Sub-Region C',
    'Sub-Region D',
    'Sub-Region E',
    'Sub-Region F',
    'Sub-Region G',
    'Sub-Region H',
    'Sub-Region I',
    'Sub-Region J',
    'Sub-Region K',
    'Sub-Region L',
    'Sub-Region M',
    'Sub-Region N',
    'Sub-Region O',
    'Sub-Region P',
    'Sub-Region Q',
    'Sub-Region R',
    'Sub-Region S',
    'Sub-Region T',
    'Sub-Region U',
    'Sub-Region V',
    'Sub-Region W',
    'Sub-Region X',
    'Sub-Region Y',
    'Sub-Region Z'
  ],
  City: [
    'Phisbridge',
    'Kloshire',
    'Ivosey',
    'Stuwell',
    'Postead',
    'Clence',
    'Iamond',
    'Oklas',
    'Goctin',
    'Cleechester',
    'Modville',
    'Shagate',
    'Yohrough',
    'Broln',
    'Trerton',
    'Fonio',
    'Idodale',
    'Oremond',
    'Zhaecester',
    'Ribus',
    'Druphia',
    'Sladiff',
    'Oslard',
    'Zlaso',
    'Osaburgh',
    'Olisstead'
  ],
  Village: [
    'Stanmore',
    'Wakefield',
    'Yellowseed',
    'Shepshed',
    'Pinnella Pass',
    'Norwich',
    'Penshaw',
    'Satbury',
    'Gilramore',
    'Torrine',
    'Barmwich',
    'Tenby',
    'Sharnwick',
    'Windermere',
    "Squall's End",
    'Goldcrest',
    'Astrakhan',
    'Dalhurst'
  ],
  Farm: [
    'Ramshire Ranch',
    'Birch Wood Farm',
    'Magnolia Ranch',
    'Whispering Pines',
    'Cedar Tree Hollow',
    'Hickory Homestead',
    'Elm Tree Farm',
    'Oakdale Ranch',
    'Willow Way Farms'
  ],
  Fortress: [
    'Pyrestorm Refuge',
    'Dreamrock Point',
    'Browndust Haven',
    'Rivergrip Retreat',
    'Pyremore Enclave',
    'Falcon Wall',
    'Pinnacle Base',
    'Solitude Terminal',
    'Tempest Enclave',
    'Falcon Sanctuary',
    'Southwing Bastille',
    'Summershire Point',
    'Southvault Enclave',
    'Dawnsong Fortress',
    'Dunespear Terminal',
    'Bone Harborage',
    'Ember Sanctuary',
    'Victor Redoubt',
    'Pinnacle Encampment',
    'Vortex Redoubt'
  ],
  Ruins: [
    'Town of the Fallen',
    'River of Waste',
    'Forest of Pieces',
    'Lands of Darkness',
    'Fields of Onyx',
    'The Spirit Cove',
    'The Inferno Cove',
    'The Extinct Forest',
    'The Perished Village',
    'The Erased River',
    'Vault of Isolation',
    'River of Graves',
    'Temple of Desertion',
    'Village of Charcoal',
    'City of Necrosis',
    'The Waste Village',
    'The Erased Fields',
    'The Grave Farms',
    'The Obliterated Town',
    'The Rusted Labyrinth'
  ],
  Tower: [
    'Prestige Pillar',
    'Reunion Tower',
    'Bravery Tower',
    'Honor Tower',
    'Revelation Lookout',
    'Forsaken Peak Tower',
    'Grand Peak Spire',
    'Iron Thicket Pillar',
    'Forbidden Stream Tower',
    'Crest Copse Tower',
    'Prophecy Tower',
    'Onyx Lookout',
    'Melody Obelisk',
    'Reverence Tower',
    'Synthesis Tower',
    'Bear Strand Pillar',
    'Mithril Morass Obelisk',
    'Monster Forest Lookout',
    'South Meadow Tower',
    'Barbarian Copse Tower'
  ],
  Mine: [
    'Rocky Road Mines',
    'Mineral Pit Mining',
    'Twin Creek Mines',
    'Eager Extracts Mineshaft',
    'Fracture Hill Mineshaft',
    'Sediment Vale Mining',
    'Wealth Well Mining',
    'Boulderfist Mines',
    'Depth Delvers Mining Group',
    'Grand Measures Mines',
    'Mineral Grove Company',
    'Diamond Depths Mining Group',
    'Twin Creek Company',
    'Breakwater Mineshaft'
  ],
  Landmark: [
    'Ancient Statue',
    'Lost Ruins',
    'Ghoul Cavern',
    'Temple of Doom',
    'Arcane Artifact',
    'Dark Fortress',
    'Ancient Clock',
    'Burial Structure',
    'War Memorial',
    'Dank Cave',
    'Red Altar',
    'Arcane Well',
    'Leyline Spring',
    'Arcane Lodestone',
    'Bone Structure'
  ],
  Blacksmith: [
    'Melvins Metalworks',
    'Grabthars Hammer',
    'Steel and Fire',
    'Weapon Weaver'
  ],
  TownSquare: [
    'Central Park',
    'The Square',
    'Stone Center'
  ],
  Dock: [
    'Eastwinds Port',
    'The Foaming Mouth',
    'Travelers Trade Dock'
  ],
  Castle: [
    'Dunwich Castle',
    'Highrock Castle',
    'Stonewall Castle'
  ],
  Bridge: [
    'Breckens Pass',
    'Old Mill Bridge',
    'Soldiers Arch'
  ],
  Temple: [
    'The Stone Hallow',
    'The Howling Hall',
    'Patrons Parlor'
  ],
  Shrine: [
    'Ark of Blessing',
    'Patron Stone',
    'The Beggars Boon'
  ],
  Cemetary: [
    'Remembrance Hill',
    'The Silent Stones',
    'Memory Lane'
  ],
  Statue: [
    'Stone Soldier',
    'Holy Visage',
    'Divine Discovery'
  ]
}

//  Module Exports
module.exports = { LOCATION_NAMES }
