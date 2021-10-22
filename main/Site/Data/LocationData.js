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

const LOCATION_DATA = {
    "001": {
        MapImageFile: "Images/Locations/Level_1/01.png",
        LocationType: "World",
        CityCounts: { Min: 0, Max: 0, },
        LandmarkCounts: { Min: 0, Max: 0, },
        Positions: [],
        Partitions: [
            {
                //  South West Islands
                NamePosition: { x: 596, y: 968, },
                NameType: "Region",
                Points: [
                    {   x: 124,   y: 806,     },
                    {   x: 308,   y: 1273,    },
                    {   x: 692,   y: 1280,    },
                    {   x: 835,   y: 1387,    },
                    {   x: 1157,  y: 1379,    },
                    {   x: 1113,  y: 1089,    },
                    {   x: 826,   y: 775,     },
                    {   x: 579,   y: 334,     },
                ],
                LocationData: {
                    MapImageFile: "Images/Locations/Level_2/01_A.png",
                    LocationType: "Region",
                    CityCounts: { Min: 0, Max: 0, },
                    LandmarkCounts: { Min: 0, Max: 0, },
                    Positions: [],
                    Partitions: [
                        {
                            //  North side of West Islands mainland
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 511,     y: 161,     },
                                {   x: 372,     y: 290,     },
                                {   x: 430,     y: 493,     },
                                {   x: 750,     y: 528,     },
                                {   x: 815,     y: 566,     },
                                {   x: 889,     y: 469,     },
                                {   x: 823,     y: 355,     },
                                {   x: 731,     y: 254,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_A_01.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 1, Max: 3, },
                                LandmarkCounts: { Min: 3, Max: 8, },
                                Positions: [
                                    {   x: 449,     y: 354,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 380,     y: 483,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 581,     y: 449,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 735,     y: 431,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },

                                    {   x: 118,     y: 387,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 167,     y: 388,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 291,     y: 259,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 397,     y: 140,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                                    {   x: 582,     y: 241,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 407,     y: 408,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 636,     y: 348,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", ] },
                                    {   x: 723,     y: 372,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Near Forest" ] },
                                    {   x: 370,     y: 546,     TypeAllowed: [ "Landmark" ],        Properties: [ "Frozen", "Near Mountains", "Near Ocean" ] },
                                    {   x: 493,     y: 490,     TypeAllowed: [ "Landmark" ],        Properties: [ "Frozen", "Near Mountains", "Near Ocean" ] },
                                    {   x: 659,     y: 429,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains" ] },
                                ],
                                Partitions: [],
                            }
                        },
                        {
                            //  South side of West Islands mainland
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 430,     y: 493,     },
                                {   x: 340,     y: 529,     },
                                {   x: 345,     y: 654,     },
                                {   x: 425,     y: 806,     },
                                {   x: 743,     y: 830,     },
                                {   x: 806,     y: 682,     },
                                {   x: 750,     y: 528,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_A_02.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 0, Max: 1, },
                                LandmarkCounts: { Min: 3, Max: 7, },
                                Positions: [
                                    {   x: 214,     y: 140,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 443,     y: 76,      TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 521,     y: 176,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 383,     y: 228,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 238,     y: 272,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                                    {   x: 311,     y: 335,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 485,     y: 336,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 146,     y: 322,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", ] },
                                    {   x: 730,     y: 190,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Near Forest" ] },
                                    {   x: 693,     y: 317,     TypeAllowed: [ "Landmark" ],        Properties: [ "Frozen", "Near Mountains", "Near Ocean" ] },
                                ],
                                Partitions: [],
                            }
                        },
                        {
                            //  Eastern island cluster in West Islands
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 806,     y: 682,     },
                                {   x: 814,     y: 565,     },
                                {   x: 888,     y: 469,     },
                                {   x: 977,     y: 497,     },
                                {   x: 1084,    y: 641,     },
                                {   x: 1090,    y: 896,     },
                                {   x: 963,     y: 942,     },
                                {   x: 844,     y: 864,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_A_03.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 0, Max: 1, },
                                LandmarkCounts: { Min: 3, Max: 6, },
                                Positions: [
                                    {   x: 340,     y: 82,      TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 274,     y: 197,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 326,     y: 124,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 441,     y: 167,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 392,     y: 247,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 489,     y: 250,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                                    {   x: 287,     y: 342,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 426,     y: 476,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                ],
                                Partitions: [],
                            }
                        }
                    ],
                },
            },
            {
                //  North East Islands
                NamePosition: { x: 1159, y: 772, },
                Points: [
                    {   x: 721,     y: 461,    },
                    {   x: 833,     y: 775,    },
                    {   x: 1116,    y: 1068,    },
                    {   x: 1142,    y: 1193,    },
                    {   x: 1281,    y: 1322,    },
                    {   x: 1600,    y: 1280,    },
                    {   x: 1786,    y: 930,    },
                    {   x: 1675,    y: 489,    },
                    {   x: 1517,    y: 323,    },
                    {   x: 1138,    y: 317,    },
                ],
                LocationData: {
                    MapImageFile: "Images/Locations/Level_2/01_B.png",
                    LocationType: "Region",
                    CityCounts: { Min: 0, Max: 0, },
                    LandmarkCounts: { Min: 0, Max: 0, },
                    Positions: [],
                    Partitions: [
                        {
                            //  North side of East Islands mainland
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 344,     y: 547,     },
                                {   x: 758,     y: 510,     },
                                {   x: 793,     y: 445,     },
                                {   x: 809,     y: 342,     },
                                {   x: 728,     y: 277,     },
                                {   x: 572,     y: 213,     },
                                {   x: 457,     y: 108,     },
                                {   x: 117,     y: 93,      },
                                {   x: 152,     y: 285,     },
                                {   x: 245,     y: 467,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_B_01.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 2, Max: 5, },
                                LandmarkCounts: { Min: 3, Max: 7, },
                                Positions: [
                                    {   x: 112,     y: 109,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 165,     y: 251,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 517,     y: 269,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean"  ] },
                                    {   x: 654,     y: 282,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                                    {   x: 257,     y: 446,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Forest" ] },
                                    {   x: 126,     y: 157,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 209,     y: 115,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 308,     y: 205,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 321,     y: 326,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                                    {   x: 454,     y: 348,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 637,     y: 426,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                    {   x: 520,     y: 502,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", ] },
                                ],
                                Partitions: [],
                            }
                        },
                        {
                            //  South side of East Islands mainland
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 344,     y: 547,     },
                                {   x: 758,     y: 510,     },
                                {   x: 760,     y: 688,     },
                                {   x: 863,     y: 790,     },
                                {   x: 917,     y: 855,     },
                                {   x: 859,     y: 953,     },
                                {   x: 697,     y: 952,     },
                                {   x: 586,     y: 938,     },
                                {   x: 500,     y: 806,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_B_02.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 1, Max: 3, },
                                LandmarkCounts: { Min: 2, Max: 5, },
                                Positions: [
                                    {   x: 473,     y: 28,      TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                                    {   x: 324,     y: 256,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                                    {   x: 513,     y: 265,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean", "Isolated", "Island" ] },
                                    {   x: 463,     y: 83,      TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 334,     y: 60,      TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 272,     y: 203,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 507,     y: 178,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Ocean", "Isolated" ] },
                                    {   x: 455,     y: 420,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Forest", "Isolated" ] },
                                ],
                                Partitions: [],
                            }
                        },
                        {
                            //  East tip of East Islands mainland
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 758,     y: 510,     },
                                {   x: 760,     y: 688,     },
                                {   x: 863,     y: 790,     },
                                {   x: 1084,    y: 750,     },
                                {   x: 1123,    y: 552,     },
                                {   x: 965,     y: 418,     },
                                {   x: 794,     y: 445,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_B_03.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 1, Max: 3, },
                                LandmarkCounts: { Min: 2, Max: 5, },
                                Positions: [
                                    {   x: 236,     y: 459,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                                    {   x: 517,     y: 462,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                                    {   x: 392,     y: 151,     TypeAllowed: [ "City" ],            Properties: [ "Temperate", "Fertile", "Near Ocean", "Isolated", "Island" ] },
                                    {   x: 299,     y: 195,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate" ] },
                                    {   x: 193,     y: 384,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                                    {   x: 387,     y: 501,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                                    {   x: 391,     y: 301,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                                    {   x: 565,     y: 240,     TypeAllowed: [ "Landmark" ],        Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                                ],
                                Partitions: [],
                            }
                        },
                        {
                            //  North island of East Islands group
                            NamePosition: { x: 1159, y: 772, },
                            Points: [
                                {   x: 809,     y: 342,     },
                                {   x: 728,     y: 277,     },
                                {   x: 572,     y: 213,     },
                                {   x: 457,     y: 108,     },
                                {   x: 483,     y: 8,       },
                                {   x: 694,     y: 13,      },
                                {   x: 917,     y: 19,      },
                                {   x: 1010,    y: 124,     },
                                {   x: 993,     y: 304,     },
                            ],
                            LocationData: {
                                MapImageFile: "Images/Locations/Level_3/01_B_04.png",
                                LocationType: "SubRegion",
                                CityCounts: { Min: 0, Max: 0, },
                                LandmarkCounts: { Min: 1, Max: 4, },
                                Positions: [
                                    {   x: 175,     y: 206,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Frozen", "Near Mountains", "Near Ocean" ] },
                                    {   x: 347,     y: 220,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Frozen", "Near Mountains", "Near Ocean" ] },
                                    {   x: 547,     y: 148,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Cold", "Near Ocean" ] },
                                    {   x: 679,     y: 421,     TypeAllowed: [ "Landmark" ],        Properties: [ "Infertile", "Frozen", "Near Ocean", "Isolated" ] },
                                ],
                                Partitions: [],
                            }
                        },
                    ],
                }
            }
        ],
    },
    /*
    "01": {
        MapImageFile: "Images/Locations/Level_1/01.png",
        CityCounts: { Min: 4, Max: 8 },
        LandmarkCounts: { Min: 10, Max: 20 },
        Positions: {
            Cities: [
                { X: 523, Y: 1085, Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean" ] },
                { X: 607, Y: 1187, Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean" ] },
                { X: 599, Y: 1123, Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean"  ] },
                { X: 738, Y: 846, Properties: [ "Temperate", "Infertile", "Near Mountains", "Near Ocean", "Near Forest" ] },
                { X: 812, Y: 918, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Forest" ] },
                { X: 871, Y: 534, Properties: [ "Frozen", "Near Ocean", "Isolated", ] },
                { X: 1434, Y: 582, Properties: [ "Cold", "Near Ocean", "Near Mountains" ] },
                { X: 1547, Y: 597, Properties: [ "Cold", "Near Ocean" ] },
                { X: 1569, Y: 525, Properties: [ "Cold", "Near Ocean" ] },
                { X: 902, Y: 644, Properties: [ "Cold", "Near Ocean", "Near Mountains" ] },
                { X: 981, Y: 786, Properties: [ "Temperate", "Fertile", "Near Ocean", "Near Mountains" ] },
                { X: 1294, Y: 673, Properties: [ "Cold", "Fertile", "Near Ocean", "Near Mountains" ] },
                { X: 1346, Y: 780, Properties: [ "Temperate", "Infertile", "Near Ocean", "Near Mountains" ] },
                { X: 1200, Y: 1033, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean", "Near Mountains" ] },
                { X: 1333, Y: 1037, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean", "Near Mountains" ] },
                { X: 1488, Y: 1011, Properties: [ "Temperate", "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 1513, Y: 899, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1653, Y: 887, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 1639, Y: 1020, Properties: [ "Temperate", "Fertile", "Near Ocean" ] },
                { X: 916, Y: 1000, Properties: [ "Temperate", "Fertile", "Near Ocean", "Isolated", "Island" ] },
            ],
            Landmarks: [
                { X: 520, Y: 1160, Properties: [ "Infertile", "Desolate" ] },
                { X: 604, Y: 950, Properties: [ "Infertile", "Desolate", "Near Mountains" ] },
                { X: 747, Y: 892, Properties: [ "Fertile", "Near Mountains", "Near Ocean" ] },
                { X: 616, Y: 802, Properties: [ "Infertile", "Desolate", "Swampy", "Near Ocean", "Isolated" ] },
                { X: 294, Y: 874, Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                { X: 715, Y: 1163, Properties: [ "Fertile", "Island", "Near Ocean", "Isolated" ] },
                { X: 874, Y: 1074, Properties: [ "Fertile", "Island", "Near Ocean", ] },
                { X: 1000, Y: 1292, Properties: [ "Fertile", "Island", "Near Ocean", "Near Forest" ] },
                { X: 955, Y: 517, Properties: [ "Frozen", "Near Mountains", "Near Ocean" ] },
                { X: 1109, Y: 558, Properties: [ "Frozen", "Near Mountains", "Near Ocean" ] },
                { X: 1051, Y: 684, Properties: [ "Fertile", "Near Mountains" ] },
                { X: 1116, Y: 724, Properties: [ "Fertile", "Near Mountains" ] },
                { X: 1248, Y: 720, Properties: [ "Infertile", "Near Mountains", "Near Ocean" ] },
                { X: 1310, Y: 819, Properties: [ "Infertile", "Near Mountains", "Near Ocean" ] },
                { X: 1270, Y: 1039, Properties: [ "Fertile", "Near Mountains", "Near Forest", "Near Ocean" ] },
                { X: 1233, Y: 1121, Properties: [ "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 1277, Y: 1190, Properties: [ "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 1384, Y: 1221, Properties: [ "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 1424, Y: 1148, Properties: [ "Fertile", "Near Forest", "Near Ocean" ] },
                { X: 1560, Y: 940, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1625, Y: 960, Properties: [ "Fertile", "Near Ocean" ] },
                { X: 1230, Y: 480, Properties: [ "Infertile", "Frozen", "Near Mountains", "Near Ocean" ] },
                { X: 1320, Y: 470, Properties: [ "Infertile", "Frozen", "Near Mountains", "Near Ocean" ] },
                { X: 1510, Y: 560, Properties: [ "Infertile", "Cold", "Near Ocean" ] },
                { X: 1477, Y: 424, Properties: [ "Infertile", "Frozen", "Near Ocean", "Isolated" ] },
            ]
        }
    },
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
module.exports = { LOCATION_DATA }