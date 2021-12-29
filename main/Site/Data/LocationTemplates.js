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

const { InteractiveMapPosition, InteractiveMapLocation } = require('./Maps/InteractiveMapData')
const { Random } = require('../HelperFunctions/Random')

const LOCATION_TEMPLATES = [
  new InteractiveMapLocation(
    'Images/Locations/Level_4/City_01.png',
    'Metropolis',
    {
      Blacksmith: { Min: 1, Max: 2 },
      TownSquare: { Min: 0, Max: 1 },
      Dock: { Min: 1, Max: 2 },
      Castle: { Min: 1, Max: 1 },
      Shrine: { Min: 0, Max: 1 },
      Cemetary: { Min: 0, Max: 1 },
      Bridge: { Min: 2, Max: 2 },
      Temple: { Min: 1, Max: 1 },
      Monument: { Min: 0, Max: 1 }
    },
    [
      new InteractiveMapPosition(950, 606, ['Blacksmith'], ['Stone', 'Two-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(736, 659, ['Blacksmith'], ['Wood', 'Two-Story', 'Rustic', 'Center Of Town']),
      new InteractiveMapPosition(541, 659, ['Building'], ['Wood', 'One-Story', 'Long', 'Street Corner', 'Business', 'Center Of Town', 'Front Courtyard']),
      new InteractiveMapPosition(591, 711, ['Building'], ['Stone', 'Wood', 'Two-Story', 'Street Corner', 'Business', 'Center Of Town', 'Back Courtyard']),
      new InteractiveMapPosition(675, 1015, ['Building'], ['Wood', 'One-Story', 'Street Corner']),
      new InteractiveMapPosition(313, 994, ['Building'], ['Wood', 'Two-Story', 'Farm House', 'Field Adjacent', 'Edge Of Town']),
      new InteractiveMapPosition(481, 1159, ['Castle'], ['Luxurious', 'Front Courtyard', 'Stone', 'Field Adjacent', 'Walled', 'Edge Of Town']),
      new InteractiveMapPosition(630, 1353, ['Building'], ['Wood', 'Two-Story', 'Farm House', 'Field Adjacent', 'Water Adjacent', 'Edge Of Town']),
      new InteractiveMapPosition(730, 1318, ['Building'], ['Stone', 'Wood', 'One-Story', 'Dock Building', 'Water Adjacent']),
      new InteractiveMapPosition(569, 784, ['TownSquare'], ['Fountain', 'Bazaar', 'Cobblestone', 'Circular', 'Center Of Town']),
      new InteractiveMapPosition(1074, 852, ['Building'], ['Two-Story', 'Stone', 'Luxurious', 'Manor', 'Walled', 'Above Cliffs']),
      new InteractiveMapPosition(890, 903, ['Building'], ['Two-Story', 'Stone', 'Luxurious', 'Manor', 'Walled']),
      new InteractiveMapPosition(886, 463, ['Building'], ['Street Corner', 'Two-Story', 'Wood']),
      new InteractiveMapPosition(1068, 678, ['Building'], ['Two-Story', 'Disrepair', 'Manor']),
      new InteractiveMapPosition(837, 1239, ['Dock'], ['Wood']),
      new InteractiveMapPosition(1876, 1175, ['Temple'], ['Stone', 'Water Adjacent']),
      new InteractiveMapPosition(1288, 778, ['Bridge'], ['Stone', 'Water Adjacent', 'Ruins']),
      new InteractiveMapPosition(1484, 834, ['Bridge'], ['Stone', 'Water Adjacent', 'Ruins']),
      new InteractiveMapPosition(889, 100, ['Cemetary'], ['Walled']),
      new InteractiveMapPosition(1728, 100, ['Shrine'], ['Stone']),
      new InteractiveMapPosition(370, 743, ['Building'], ['Wood', 'Disrepair', 'Two-Story', 'Home', 'Street Corner']),
      new InteractiveMapPosition(671, 863, ['Building'], ['Luxurious', 'Two-Story', 'Street Corner', 'Center Of Town']),
      new InteractiveMapPosition(660, 513, ['Building'], ['Home', 'One-Story', 'Center Of Town', 'Rustic']),
      new InteractiveMapPosition(818, 280, ['GuardPost'], ['Stone', 'Two-Story', 'Edge Of Town']),
      new InteractiveMapPosition(398, 658, ['Building'], ['Stone', 'Wood', 'One-Story']),
      new InteractiveMapPosition(582, 560, ['Building'], ['Stone', 'Wood', 'One-Story']),
      new InteractiveMapPosition(1507, 988, ['Dock'], ['Wood']),
      new InteractiveMapPosition(1578, 1416, ['Building'], ['Two-Story', 'Stone', 'Wood', 'Luxurious', 'Manor', 'Water Adjacent', 'Field Adjacent', 'Above Cliffs']),
      new InteractiveMapPosition(1364, 428, ['Temple'], ['Stone', 'Ruins', 'Edge Of Town']),
      new InteractiveMapPosition(1100, 364, ['Building'], ['Two-Story', 'Wood', 'Ruins', 'Manor', 'Below Cliffs']),
      new InteractiveMapPosition(790, 1105, ['Building'], ['One-Story', 'Wood', 'Rustic']),
      new InteractiveMapPosition(388, 888, ['Building'], ['One-Story', 'Wood', 'Home']),
      new InteractiveMapPosition(786, 497, ['Building'], ['One-Story', 'Wood']),
      new InteractiveMapPosition(652, 779, ['Building'], ['One-Story', 'Stone', 'Street Corner']),
      new InteractiveMapPosition(932, 730, ['Building'], ['One-Story', 'Wood', 'Stone', 'Off-Street']),
      new InteractiveMapPosition(1640, 1010, ['Building'], ['One-Story', 'Stone', 'Ruins']),
      new InteractiveMapPosition(1508, 1324, ['Dock'], ['Wood']),
      new InteractiveMapPosition(730, 369, ['Building'], ['One-Story', 'Wood', 'Off-Street']),
      new InteractiveMapPosition(1030, 247, ['Monument'], ['Ruins', 'Above Cliffs'])
    ],
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_4/City_01.png',
    'City',
    {
      Blacksmith: { Min: 1, Max: 2 },
      TownSquare: { Min: 0, Max: 1 },
      Dock: { Min: 1, Max: 2 },
      Castle: { Min: 1, Max: 1 },
      Shrine: { Min: 0, Max: 1 },
      Cemetary: { Min: 0, Max: 1 },
      Bridge: { Min: 2, Max: 2 },
      Temple: { Min: 1, Max: 1 },
      Monument: { Min: 0, Max: 1 }
    },
    [
      new InteractiveMapPosition(950, 606, ['Blacksmith'], ['Stone', 'Two-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(736, 659, ['Blacksmith'], ['Wood', 'Two-Story', 'Rustic', 'Center Of Town']),
      new InteractiveMapPosition(541, 659, ['Building'], ['Wood', 'One-Story', 'Long', 'Street Corner', 'Business', 'Center Of Town', 'Front Courtyard']),
      new InteractiveMapPosition(591, 711, ['Building'], ['Stone', 'Wood', 'Two-Story', 'Street Corner', 'Business', 'Center Of Town', 'Back Courtyard']),
      new InteractiveMapPosition(675, 1015, ['Building'], ['Wood', 'One-Story', 'Street Corner']),
      new InteractiveMapPosition(313, 994, ['Building'], ['Wood', 'Two-Story', 'Farm House', 'Field Adjacent', 'Edge Of Town']),
      new InteractiveMapPosition(481, 1159, ['Castle'], ['Luxurious', 'Front Courtyard', 'Stone', 'Field Adjacent', 'Walled', 'Edge Of Town']),
      new InteractiveMapPosition(630, 1353, ['Building'], ['Wood', 'Two-Story', 'Farm House', 'Field Adjacent', 'Water Adjacent', 'Edge Of Town']),
      new InteractiveMapPosition(730, 1318, ['Building'], ['Stone', 'Wood', 'One-Story', 'Dock Building', 'Water Adjacent']),
      new InteractiveMapPosition(569, 784, ['TownSquare'], ['Fountain', 'Bazaar', 'Cobblestone', 'Circular', 'Center Of Town']),
      new InteractiveMapPosition(1074, 852, ['Building'], ['Two-Story', 'Stone', 'Luxurious', 'Manor', 'Walled', 'Above Cliffs']),
      new InteractiveMapPosition(890, 903, ['Building'], ['Two-Story', 'Stone', 'Luxurious', 'Manor', 'Walled']),
      new InteractiveMapPosition(886, 463, ['Building'], ['Street Corner', 'Two-Story', 'Wood']),
      new InteractiveMapPosition(1068, 678, ['Building'], ['Two-Story', 'Disrepair', 'Manor']),
      new InteractiveMapPosition(837, 1239, ['Dock'], ['Wood']),
      new InteractiveMapPosition(1876, 1175, ['Temple'], ['Stone', 'Water Adjacent']),
      new InteractiveMapPosition(1288, 778, ['Bridge'], ['Stone', 'Water Adjacent', 'Ruins']),
      new InteractiveMapPosition(1484, 834, ['Bridge'], ['Stone', 'Water Adjacent', 'Ruins']),
      new InteractiveMapPosition(889, 100, ['Cemetary'], ['Walled']),
      new InteractiveMapPosition(1728, 100, ['Shrine'], ['Stone']),
      new InteractiveMapPosition(370, 743, ['Building'], ['Wood', 'Disrepair', 'Two-Story', 'Home', 'Street Corner']),
      new InteractiveMapPosition(671, 863, ['Building'], ['Luxurious', 'Two-Story', 'Street Corner', 'Center Of Town']),
      new InteractiveMapPosition(660, 513, ['Building'], ['Home', 'One-Story', 'Center Of Town', 'Rustic']),
      new InteractiveMapPosition(818, 280, ['GuardPost'], ['Stone', 'Two-Story', 'Edge Of Town']),
      new InteractiveMapPosition(398, 658, ['Building'], ['Stone', 'Wood', 'One-Story']),
      new InteractiveMapPosition(582, 560, ['Building'], ['Stone', 'Wood', 'One-Story']),
      new InteractiveMapPosition(1507, 988, ['Dock'], ['Wood']),
      new InteractiveMapPosition(1578, 1416, ['Building'], ['Two-Story', 'Stone', 'Wood', 'Luxurious', 'Manor', 'Water Adjacent', 'Field Adjacent', 'Above Cliffs']),
      new InteractiveMapPosition(1364, 428, ['Temple'], ['Stone', 'Ruins', 'Edge Of Town']),
      new InteractiveMapPosition(1100, 364, ['Building'], ['Two-Story', 'Wood', 'Ruins', 'Manor', 'Below Cliffs']),
      new InteractiveMapPosition(790, 1105, ['Building'], ['One-Story', 'Wood', 'Rustic']),
      new InteractiveMapPosition(388, 888, ['Building'], ['One-Story', 'Wood', 'Home']),
      new InteractiveMapPosition(786, 497, ['Building'], ['One-Story', 'Wood']),
      new InteractiveMapPosition(652, 779, ['Building'], ['One-Story', 'Stone', 'Street Corner']),
      new InteractiveMapPosition(932, 730, ['Building'], ['One-Story', 'Wood', 'Stone', 'Off-Street']),
      new InteractiveMapPosition(1640, 1010, ['Building'], ['One-Story', 'Stone', 'Ruins']),
      new InteractiveMapPosition(1508, 1324, ['Dock'], ['Wood']),
      new InteractiveMapPosition(730, 369, ['Building'], ['One-Story', 'Wood', 'Off-Street']),
      new InteractiveMapPosition(1030, 247, ['Monument'], ['Ruins', 'Above Cliffs'])
    ],
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_4/Town_01.png',
    'Town',
    {
      Blacksmith: { Min: 1, Max: 1 },
      TownSquare: { Min: 0, Max: 0 },
      Dock: { Min: 0, Max: 0 },
      Castle: { Min: 0, Max: 0 },
      Shrine: { Min: 1, Max: 1 },
      Cemetary: { Min: 0, Max: 0 },
      Bridge: { Min: 0, Max: 0 },
      Temple: { Min: 1, Max: 1 },
      Monument: { Min: 0, Max: 0 }
    },
    [
      new InteractiveMapPosition(922, 518, ['Blacksmith'], ['Wood', 'One-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(1560, 410, ['Shrine'], ['Wood', 'Two-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(1560, 1230, ['Temple'], ['Wood', 'One-Story', 'Rustic', 'Edge Of Town'])
    ],
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_4/Town_01.png',
    'Village',
    {
      Blacksmith: { Min: 1, Max: 1 },
      TownSquare: { Min: 0, Max: 0 },
      Dock: { Min: 0, Max: 0 },
      Castle: { Min: 0, Max: 0 },
      Shrine: { Min: 1, Max: 1 },
      Cemetary: { Min: 0, Max: 0 },
      Bridge: { Min: 0, Max: 0 },
      Temple: { Min: 1, Max: 1 },
      Monument: { Min: 0, Max: 0 }
    },
    [
      new InteractiveMapPosition(922, 518, ['Blacksmith'], ['Wood', 'One-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(1560, 410, ['Shrine'], ['Wood', 'Two-Story', 'Square', 'Edge Of Town']),
      new InteractiveMapPosition(1560, 1230, ['Temple'], ['Wood', 'One-Story', 'Rustic', 'Edge Of Town'])
    ],
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Blacksmith_01.png',
    'Blacksmith',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Dock_01.png',
    'Dock',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Fortress_01.png',
    'Fortress',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Mine_01.png',
    'Mine',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Shrine_01.png',
    'Shrine',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Tower_01.png',
    'Tower',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Hamlet_01.png',
    'Hamlet',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Citadel_01.png',
    'Citadel',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Ruins_01.png',
    'Ruins',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Castle_01.png',
    'Castle',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Bridge_01.png',
    'Bridge',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Farm_01.png',
    'Farm',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Farm_01.png',
    'TownSquare',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Cemetary_01.png',
    'Cemetary',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Temple_01.png',
    'Temple',
    {},
    []
  ),
  new InteractiveMapLocation(
    'Images/Locations/Level_5/Monument_01.png',
    'Monument',
    {},
    []
  )
]

//  List of City Position Properties (by type)
//    - Construction Materials, can list multiple to allow random ["Wood", "Stone", "Cobblestone"]
//    - Number of Stories ["One-Story", "Two-Story"]
//    - Condition or Design ["Luxurious", "Rustic", "Disrepair", "Ruins"]
//    - Relative Location ["Edge Of Town", "Center Of Town", "Street Corner", "Off-Street"]
//    - Nearby Elements ["Field Adjacent", "Water Adjacent", "Below Cliffs", "Above Cliffs"]
//    - Required Type ["Business", "Home", "Dock Building", "Farm House"]
//    - Relative Shape ["Square", "Long", "Circular"]
//    - Included Elements ["Front Courtyard", "Back Courtyard", "Fountain", "Walled", "Bazaar"]

const GetObjectLocationOfType = (objType) => {
  const validLocationTemplateList = LOCATION_TEMPLATES.filter(template => template.LocationType === objType)
  return (validLocationTemplateList.length === 0) ? null : validLocationTemplateList[Math.floor(Random() * validLocationTemplateList.length)]
}

//  Module Exports
module.exports = { GetObjectLocationOfType }
