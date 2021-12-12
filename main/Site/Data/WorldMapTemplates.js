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

const { InteractiveMapLocation, InteractiveMapPosition, InteractiveMapPartition } = require('./Maps/InteractiveMapData')

const WORLD_MAP_TEMPLATES = {
  '001': new InteractiveMapLocation(
    'Images/Locations/Level_1/01.png',
    'World',
    { City: { Min: 0, Max: 0 }, Landmark: { Min: 0, Max: 0 } },
    [],
    [
      new InteractiveMapPartition( //  South West Islands
        { x: 596, y: 968 },
        'Region',
        [
          { x: 124, y: 806 },
          { x: 308, y: 1273 },
          { x: 692, y: 1280 },
          { x: 835, y: 1387 },
          { x: 1157, y: 1379 },
          { x: 1113, y: 1089 },
          { x: 826, y: 775 },
          { x: 579, y: 334 }
        ],
        new InteractiveMapLocation(
          'Images/Locations/Level_2/01_A.png',
          'Region',
          { City: { Min: 0, Max: 0 }, Landmark: { Min: 0, Max: 0 } },
          [],
          [
            new InteractiveMapPartition( //  North side of South West Islands mainland
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 511, y: 161 },
                { x: 372, y: 290 },
                { x: 430, y: 493 },
                { x: 750, y: 528 },
                { x: 815, y: 566 },
                { x: 889, y: 469 },
                { x: 823, y: 355 },
                { x: 731, y: 254 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_A_01.png',
                'SubRegion',
                { City: { Min: 1, Max: 3 }, Landmark: { Min: 3, Max: 8 } },
                [
                  new InteractiveMapPosition(449, 354, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(380, 483, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(581, 449, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(735, 431, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),

                  new InteractiveMapPosition(118, 387, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(167, 388, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(291, 259, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(397, 140, ['Landmark'], ['Infertile', 'Desolate', 'Swampy', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(582, 241, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(407, 408, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(636, 348, ['Landmark'], ['Fertile', 'Island', 'Near Ocean']),
                  new InteractiveMapPosition(723, 372, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Near Forest']),
                  new InteractiveMapPosition(370, 546, ['Landmark'], ['Frozen', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(493, 490, ['Landmark'], ['Frozen', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(659, 429, ['Landmark'], ['Fertile', 'Near Mountains'])
                ],
                []
              )
            ),
            new InteractiveMapPartition( //  South side of South West Islands mainland
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 430, y: 493 },
                { x: 340, y: 529 },
                { x: 345, y: 654 },
                { x: 425, y: 806 },
                { x: 743, y: 830 },
                { x: 806, y: 682 },
                { x: 750, y: 528 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_A_02.png',
                'SubRegion',
                { City: { Min: 0, Max: 1 }, Landmark: { Min: 3, Max: 7 } },
                [
                  new InteractiveMapPosition(214, 140, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(443, 76, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(521, 176, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(383, 228, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(238, 272, ['Landmark'], ['Infertile', 'Desolate', 'Swampy', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(311, 335, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(485, 336, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(146, 322, ['Landmark'], ['Fertile', 'Island', 'Near Ocean']),
                  new InteractiveMapPosition(730, 190, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Near Forest']),
                  new InteractiveMapPosition(693, 317, ['Landmark'], ['Frozen', 'Near Mountains', 'Near Ocean'])
                ],
                []
              )
            ),
            new InteractiveMapPartition( //  Eastern island cluster in South West Islands
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 806, y: 682 },
                { x: 814, y: 565 },
                { x: 888, y: 469 },
                { x: 977, y: 497 },
                { x: 1084, y: 641 },
                { x: 1090, y: 896 },
                { x: 963, y: 942 },
                { x: 844, y: 864 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_A_03.png',
                'SubRegion',
                { City: { Min: 0, Max: 1 }, Landmark: { Min: 3, Max: 6 } },
                [
                  new InteractiveMapPosition(340, 82, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(274, 197, ['City'], ['Temperate', 'Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(326, 124, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(441, 167, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(392, 247, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(489, 250, ['Landmark'], ['Infertile', 'Desolate', 'Swampy', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(287, 342, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(426, 476, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated'])
                ],
                []
              )
            )
          ]
        )
      ),
      new InteractiveMapPartition( //  North East Islands
        { x: 1159, y: 772 },
        'Region',
        [
          { x: 721, y: 461 },
          { x: 833, y: 775 },
          { x: 1116, y: 1068 },
          { x: 1142, y: 1193 },
          { x: 1281, y: 1322 },
          { x: 1600, y: 1280 },
          { x: 1786, y: 930 },
          { x: 1675, y: 489 },
          { x: 1517, y: 323 },
          { x: 1138, y: 317 }
        ],
        new InteractiveMapLocation(
          'Images/Locations/Level_2/01_B.png',
          'Region',
          { City: { Min: 0, Max: 0 }, Landmark: { Min: 0, Max: 0 } },
          [],
          [
            new InteractiveMapPartition( //  North side of East Islands mainland
              { x: 1159, y: 772 },
              'Region',
              [
                { x: 344, y: 547 },
                { x: 758, y: 510 },
                { x: 793, y: 445 },
                { x: 809, y: 342 },
                { x: 728, y: 277 },
                { x: 572, y: 213 },
                { x: 457, y: 108 },
                { x: 117, y: 93 },
                { x: 152, y: 285 },
                { x: 245, y: 467 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_B_01.png',
                'SubRegion',
                { City: { Min: 2, Max: 5 }, Landmark: { Min: 3, Max: 7 } },
                [
                  new InteractiveMapPosition(112, 109, ['City'], ['Temperate', 'Infertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(165, 251, ['City'], ['Temperate', 'Infertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(517, 269, ['City'], ['Temperate', 'Infertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(654, 282, ['City'], ['Temperate', 'Infertile', 'Near Mountains', 'Near Ocean', 'Near Forest']),
                  new InteractiveMapPosition(257, 446, ['City'], ['Temperate', 'Fertile', 'Near Ocean', 'Near Forest']),
                  new InteractiveMapPosition(126, 157, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(209, 115, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(308, 205, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(321, 326, ['Landmark'], ['Infertile', 'Desolate', 'Swampy', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(454, 348, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(637, 426, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(520, 502, ['Landmark'], ['Fertile', 'Island', 'Near Ocean'])
                ],
                []
              )
            ),
            new InteractiveMapPartition( //  South side of East Islands mainland
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 344, y: 547 },
                { x: 758, y: 510 },
                { x: 760, y: 688 },
                { x: 863, y: 790 },
                { x: 917, y: 855 },
                { x: 859, y: 953 },
                { x: 697, y: 952 },
                { x: 586, y: 938 },
                { x: 500, y: 806 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_B_02.png',
                'SubRegion',
                { City: { Min: 1, Max: 3 }, Landmark: { Min: 2, Max: 5 } },
                [
                  new InteractiveMapPosition(473, 28, ['City'], ['Temperate', 'Fertile', 'Near Ocean']),
                  new InteractiveMapPosition(324, 256, ['City'], ['Temperate', 'Fertile', 'Near Ocean']),
                  new InteractiveMapPosition(513, 265, ['City'], ['Temperate', 'Fertile', 'Near Ocean', 'Isolated', 'Island']),
                  new InteractiveMapPosition(463, 83, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(334, 60, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(272, 203, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(507, 178, ['Landmark'], ['Fertile', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(455, 420, ['Landmark'], ['Fertile', 'Near Forest', 'Isolated'])
                ],
                []
              )
            ),
            new InteractiveMapPartition( //  East tip of East Islands mainland
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 758, y: 510 },
                { x: 760, y: 688 },
                { x: 863, y: 790 },
                { x: 1084, y: 750 },
                { x: 1123, y: 552 },
                { x: 965, y: 418 },
                { x: 794, y: 445 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_B_03.png',
                'SubRegion',
                { City: { Min: 1, Max: 3 }, Landmark: { Min: 2, Max: 5 } },
                [
                  new InteractiveMapPosition(236, 459, ['City'], ['Temperate', 'Fertile', 'Near Ocean']),
                  new InteractiveMapPosition(517, 462, ['City'], ['Temperate', 'Fertile', 'Near Ocean']),
                  new InteractiveMapPosition(392, 151, ['City'], ['Temperate', 'Fertile', 'Near Ocean', 'Isolated', 'Island']),
                  new InteractiveMapPosition(299, 195, ['Landmark'], ['Infertile', 'Desolate']),
                  new InteractiveMapPosition(193, 384, ['Landmark'], ['Infertile', 'Desolate', 'Near Mountains']),
                  new InteractiveMapPosition(387, 501, ['Landmark'], ['Fertile', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(391, 301, ['Landmark'], ['Infertile', 'Desolate', 'Swampy', 'Near Ocean', 'Isolated']),
                  new InteractiveMapPosition(565, 240, ['Landmark'], ['Fertile', 'Island', 'Near Ocean', 'Isolated'])
                ],
                []
              )
            ),
            new InteractiveMapPartition( //  North island of East Islands group
              { x: 1159, y: 772 },
              'SubRegion',
              [
                { x: 809, y: 342 },
                { x: 728, y: 277 },
                { x: 572, y: 213 },
                { x: 457, y: 108 },
                { x: 483, y: 8 },
                { x: 694, y: 13 },
                { x: 917, y: 19 },
                { x: 1010, y: 124 },
                { x: 993, y: 304 }
              ],
              new InteractiveMapLocation(
                'Images/Locations/Level_3/01_B_04.png',
                'SubRegion',
                { City: { Min: 0, Max: 0 }, Landmark: { Min: 1, Max: 4 } },
                [
                  new InteractiveMapPosition(175, 206, ['Landmark'], ['Infertile', 'Frozen', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(347, 220, ['Landmark'], ['Infertile', 'Frozen', 'Near Mountains', 'Near Ocean']),
                  new InteractiveMapPosition(547, 148, ['Landmark'], ['Infertile', 'Cold', 'Near Ocean']),
                  new InteractiveMapPosition(679, 421, ['Landmark'], ['Infertile', 'Frozen', 'Near Ocean', 'Isolated'])
                ],
                []
              )
            )
          ]
        )
      )
    ]
  )
  /*
    "02": {
        MapImageFile: "Images/Locations/Level_1/02.png",
        CityCounts: { Min: 8, Max: 12 },
        LandmarkCounts: { Min: 8, Max: 13 },
        Positions: {
            Cities: [
                { X: 209, Y: 287, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 83, Y: 163, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 347, Y: 243, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 524, Y: 509, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near River", "Near Forest" ] },
                { X: 1031, Y: 519, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near River" ] },
                { X: 1005, Y: 635, Properties: [ "Temperate", "Fertile", "Near River" ] },
                { X: 870, Y: 873, Properties: [ "Temperate", "Fertile", "Near River" ] },
                { X: 191, Y: 703, Properties: [ "Hot", "Infertile", "Near River" ] },
                { X: 399, Y: 999, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Forest" ] },
                { X: 659, Y: 1019, Properties: [ "Temperate", "Fertile", "Near River", "Near Forest" ] },
                { X: 867, Y: 1165, Properties: [ "Temperate", "Fertile", "Near Hills", "Near Forest" ] },
                { X: 1561, Y: 630, Properties: [ "Cold", "Infertile", "Near Mountains", "Near Forest", "Near Ocean" ] },
                { X: 1100, Y: 870, Properties: [ "Fertile", "Near River", "Near Hills" ] },
            ],
            Landmarks: [
                { X: 225, Y: 535, Properties: [ "Infertile", "Desolate", "Near Ocean" ] },
                { X: 777, Y: 667, Properties: [ "Infertile", "Desolate", "Near River" ] },
                { X: 154, Y: 440, Properties: [ "Infertile", "Desolate", "Near Ocean", "Near Mountains" ] },
                { X: 674, Y: 447, Properties: [ "Fertile", ] },
                { X: 890, Y: 446, Properties: [ "Fertile", ] },
                { X: 304, Y: 726, Properties: [ "Infertile", "Near Ocean", "Desolate" ] },
                { X: 632, Y: 1187, Properties: [ "Fertile", "Near Forest", "Near River" ] },
                { X: 752, Y: 1149, Properties: [ "Fertile", "Near Forest", "Near River" ] },
                { X: 1112, Y: 1092, Properties: [ "Fertile", "Near Hills" ] },
                { X: 1494, Y: 1254, Properties: [ "Fertile", "Near Hills", "Near Forest", "Near River" ] },
                { X: 1621, Y: 1374, Properties: [ "Fertile", "Near Forest", "Near River" ] },
                { X: 1670, Y: 1087, Properties: [ "Fertile", "Near Forest", "Near River" ] },
                { X: 1885, Y: 732, Properties: [ "Fertile", "Near Forest", "Near River" ] },
                { X: 1385, Y: 481, Properties: [ "Infertile", "Desolate", "Near Mountains", "Near River" ] },
                { X: 1008, Y: 243, Properties: [ "Infertile", "Desolate", "Near Mountains", "Near Ocean" ] },
                { X: 234, Y: 1050, Properties: [ "Infertile", "Desolate", "Near Swamp", "Near Ocean" ] },
                { X: 171, Y: 1354, Properties: [ "Infertile", "Desolate", "Near Swamp", "Near Ocean" ] },
                { X: 453, Y: 1432, Properties: [ "Infertile", "Desolate", "Near Swamp", "Near Ocean" ] },
            ]
        }
    },
    "03": {
        MapImageFile: "Images/Locations/Level_1/03.png",
        CityCounts: { Min: 4, Max: 7 },
        LandmarkCounts: { Min: 5, Max: 8 },
        Positions: {
            Cities: [
                { X: 709, Y: 142, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1132, Y: 103, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1280, Y: 288, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1053, Y: 379, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 781, Y: 600, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1177, Y: 763, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1385, Y: 789, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1295, Y: 991, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 917, Y: 1059, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 573, Y: 921, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 567, Y: 1101, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 767, Y: 807, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1223, Y: 523, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
            ],
            Landmarks: [
                { X: 623, Y: 323, Properties: [ "Fertile", "Desolate", "Near Ocean", "Near Mountains", "Near Hills", "Isolated" ] },
                { X: 743, Y: 665, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1367, Y: 737, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1265, Y: 1163, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 929, Y: 1169, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1095, Y: 897, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1095, Y: 647, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 995, Y: 137, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 785, Y: 485, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 921, Y: 739, Properties: [ "Fertile", "Near Ocean" ] },
            ]
        }
    },
    "04": {
        MapImageFile: "Images/Locations/Level_1/04.png",
        CityCounts: { Min: 6, Max: 8 },
        LandmarkCounts: { Min: 9, Max: 14 },
        Positions: {
            Cities: [
                { X: 609, Y: 513, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Mountains" ] },
                { X: 829, Y: 617, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near River", "Near Forest" ] },
                { X: 1047, Y: 477, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near River", "Near Forest" ] },
                { X: 1491, Y: 447, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near River" ] },
                { X: 1969, Y: 409, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 1863, Y: 683, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Forest" ] },
                { X: 1355, Y: 839, Properties: [ "Temperate", "Fertile", "Near River", "Near Forest", "Near Mountains" ] },
                { X: 923, Y: 803, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 635, Y: 1053, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean", "Isolated" ] },
                { X: 1455, Y: 975, Properties: [ "Temperate", "Fertile", "Near Forest", "Near River", "Near Mountains" ] },
                { X: 867, Y: 1223, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean", "Near Mountains" ] },
                { X: 1095, Y: 1345, Properties: [ "Temperate", "Fertile", "Near Forest", "Near River", "Near Mountains" ] },
            ],
            Landmarks: [
                { X: 379, Y: 215, Properties: [ "Frozen", "Infertile", "Desolate", "Near Ocean", "Near Mountains", "Isolated" ] },
                { X: 695, Y: 441, Properties: [ "Temperate", "Infertile", "Desolate", "Near Ocean", "Near Mountains", "Near River" ] },
                { X: 711, Y: 547, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near River", "Near Forest" ] },
                { X: 1183, Y: 503, Properties: [ "Temperate", "Fertile", "Near River", "Near Mountains" ] },
                { X: 1540, Y: 691, Properties: [ "Temperate", "Fertile", "Near River" ] },
                { X: 1789, Y: 589, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Mountains", "Near Forest" ] },
                { X: 1677, Y: 579, Properties: [ "Temperate", "Fertile", "Near River", "Near Mountains", "Near Forest" ] },
                { X: 1689, Y: 957, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Mountains" ] },
                { X: 1493, Y: 1327, Properties: [ "Hot", "Infertile", "Desert", "Near Ocean" ] },
                { X: 1261, Y: 1411, Properties: [ "Temperate", "Fertile", "Near Forest", "Near River", "Near Mountains", "Near Ocean" ] },
                { X: 941, Y: 1329, Properties: [ "Temperate", "Fertile", "Near Forest", "Near River", "Near Mountains", "Near Ocean" ] },
                { X: 601, Y: 1287, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Hills", "Near Mountains", "Near Ocean" ] },
                { X: 557, Y: 1105, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Mountains", "Near Ocean" ] },
                { X: 1347, Y: 963, Properties: [ "Temperate", "Fertile", "Near River", "Near Ocean" ] },
                { X: 1055, Y: 973, Properties: [ "Temperate", "Fertile", "Near Lake", "Near Ocean", "Near Forest" ] },
                { X: 919, Y: 511, Properties: [ "Temperate", "Fertile", "Near River", "Near Ocean", "Near Forest" ] },
                { X: 1171, Y: 711, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near River", "Near Forest" ] },
                { X: 873, Y: 1393, Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 1313, Y: 1195, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
            ]
        }
    }
    */
}

//  Module Exports
module.exports = { WORLD_MAP_TEMPLATES }
