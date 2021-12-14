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

class MapLinks {
  constructor () {
    this.Locations = {}
    this.Partitions = {}
  }

  setValues (locations, partitions) {
    this.Locations = locations
    this.Partitions = partitions
  }
}

class MapEntry {
  constructor () {
    this.MapImage = null
    this.MapLevel = 0
    this.MapLinks = new MapLinks()
  }

  setValues (mapImage, mapLevel, locations, partitions) {
    this.MapImage = mapImage
    this.MapLevel = mapLevel
    this.MapLinks = new MapLinks()
    this.MapLinks.setValues(locations, partitions)
  }
}

//  Module Exports
module.exports = { MapLinks, MapEntry }
