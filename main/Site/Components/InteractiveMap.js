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

const STYLE = require('../style')
const { Container, Image } = require('../Components/ArcadiaJS')
const { MapObject } = require('../Components/MapObject')
const { DrawnLine } = require('../HelperFunctions/DrawnLine')
const { PointInPolygon } = require('../HelperFunctions/PointInPolygon')
const { EventDispatch } = require('../Controllers/EventDispatch')

const InteractiveMap = {
  create: (options) => {
    const container = Container.create({
      id: 'InteractiveMap',
      style: {
        width: InteractiveMap.GetGivenSize().x + 'px',
        height: InteractiveMap.GetGivenSize().y + 'px',
        overflow: 'hidden'
      }
    })

    InteractiveMap.LoadMapEntry(container, options.topLevelMapData)

    EventDispatch.AddEventHandler('Return To World View', (eventType, eventData) => {
      InteractiveMap.LoadMapEntry(container, options.topLevelMapData)
    })

    EventDispatch.AddEventHandler('Select World Map Object', (eventType, eventData) => {
      InteractiveMap.LoadMapEntry(container, eventData.mapLevelData)
    })

    return container
  },

  LoadMapEntry (container, mapData) {
    //  If we have no map data, return out
    if (!mapData) {
      console.warn('Attempting to Load Map Entry but no map data was found!')
      return
    }

    //  Empty out the map container
    container.innerHTML = ''

    //  Create a new entry and append it to the container
    const mapLevel = Container.create({ id: 'MapLevel', style: STYLE.MAP_PAPER_BACKGROUND })
    container.appendChild(mapLevel)

    mapLevel.elements = { mapImage: null, partitions: {}, shapeContainer: null, objectContainer: null, partitionSelected: null }

    mapLevel.elements.partitions = mapData.Locations.Partitions

    //  The MapContainer div will actually display the map (but is unable to determine image dimensions alone, so load an <img>)
    mapLevel.elements.mapImage = Container.create({ id: 'MapContainer', style: STYLE.MAP_CONTAINER })
    mapLevel.elements.mapImage.style.backgroundImage = 'url(' + mapData.MapImage + ')'
    mapLevel.appendChild(mapLevel.elements.mapImage)

    mapLevel.elements.shapeContainer = Container.create({ id: 'ShapeContainer', style: STYLE.MAP_PARTITION_SHAPE_CONTAINER })
    mapLevel.appendChild(mapLevel.elements.shapeContainer)

    mapLevel.elements.objectContainer = Container.create({ id: 'ObjectContainer', style: STYLE.MAP_OBJECT_CONTAINER })
    mapLevel.appendChild(mapLevel.elements.objectContainer)

    //  We can't use a Container background image to find an image file's size, so create an invisible map image and fire a callback on load
    let imageLoadCallback = null
    imageLoadCallback = (mapImageInvisible) => {
      //  If the window is minimized or hidden, this will fail, so try again every half second until we succeed
      if (mapImageInvisible.clientWidth === 0 || mapImageInvisible.clientHeight === 0) {
        setTimeout(() => imageLoadCallback(mapImageInvisible), 500)
        return
      }

      mapLevel.properties.actualSize = { x: mapImageInvisible.clientWidth, y: mapImageInvisible.clientHeight }

      InteractiveMap.LoadPartitionShapes(mapLevel, mapData.Locations.Partitions)
      InteractiveMap.LoadMapObjects(mapLevel, mapData.Locations.Locations)
    }
    InteractiveMap.LoadMapImage(mapLevel, mapData.MapImage, imageLoadCallback)

    mapLevel.onmousemove = (event) => {
      const levelRect = mapLevel.getBoundingClientRect()
      const mousePos = { x: event.clientX - levelRect.left, y: event.clientY - levelRect.top }
      let mouseInPartition = false
      mapLevel.elements.shapeContainer.childNodes.forEach((node) => {
        if (PointInPolygon(mousePos, node.Points)) {
          InteractiveMap.SetPartitionLinesColor(node, STYLE.MAP_PARTITION_LINE_COLOR_SELECTED)
          mapLevel.elements.partitionSelected = node
          mapLevel.style.cursor = 'pointer'
          mapLevel.onclick = () => { InteractiveMap.SelectMapPartition(container, mapLevel, node) }
          mouseInPartition = true
        } else {
          InteractiveMap.SetPartitionLinesColor(node, STYLE.MAP_PARTITION_LINE_COLOR_UNSELECTED)
          if (mapLevel.elements.partitionSelected === node) mapLevel.elements.partitionSelected = null
        }
      })
      if (!mouseInPartition) mapLevel.style.cursor = 'auto'
    }
  },

  SelectMapPartition (container, mapLevel, partitionObj) {
    InteractiveMap.LoadMapEntry(container, mapLevel.elements.partitions[partitionObj.Index].MapEntry)
  },

  LoadMapImage (levelContainer, mapImageFile, loadCallback) {
    const mapImageInvisible = Image.create({ id: 'MapImageInvisible', style: { position: 'absolute', opacity: '0%' } })
    mapImageInvisible.setValue(mapImageFile)
    levelContainer.properties = { actualSize: { x: 1, y: 1 } }
    levelContainer.appendChild(mapImageInvisible)
    mapImageInvisible.onload = () => { loadCallback(mapImageInvisible) }
  },

  GetGivenSize () {
    return { x: STYLE.WORLD_MAP_SIZE[document.windowID].x, y: STYLE.WORLD_MAP_SIZE[document.windowID].y }
  },

  GetMapScale (domObject) {
    return {
      x: InteractiveMap.GetGivenSize().x / domObject.properties.actualSize.x,
      y: InteractiveMap.GetGivenSize().y / domObject.properties.actualSize.y
    }
  },

  LoadPartitionShapes (mapLevel, partitions) {
    if (mapLevel == null) { console.warn('Attempting to Load Partition Shapes with no level container!'); return }

    const mapScale = InteractiveMap.GetMapScale(mapLevel)

    mapLevel.elements.shapeContainer.innerHTML = ''

    for (const key in partitions) {
      const part = partitions[key]

      //  Create a container for the lines we're about to create to represent the partition
      const partitionLines = Container.create({
        id: 'PartitionLines',
        style: {
          position: 'absolute',
          width: InteractiveMap.GetGivenSize().x + 'px',
          height: InteractiveMap.GetGivenSize().y + 'px',
          color: STYLE.MAP_PARTITION_LINE_COLOR_UNSELECTED
        }
      })
      partitionLines.Index = key
      partitionLines.Points = []
      for (let i = 0; i < part.Points.length; ++i) partitionLines.Points.push({ x: part.Points[i].x * mapScale.x, y: part.Points[i].y * mapScale.y })
      partitionLines.NamePosition = part.NamePosition
      mapLevel.elements.shapeContainer.appendChild(partitionLines)

      const pList = partitionLines.Points
      for (let i = 0; i < pList.length - 1; ++i) {
        const line = DrawnLine.create({
          x1: pList[i].x,
          y1: pList[i].y,
          x2: pList[i + 1].x,
          y2: pList[i + 1].y,
          color: STYLE.MAP_PARTITION_LINE_COLOR_UNSELECTED
        })
        partitionLines.appendChild(line)
      }
      const line = DrawnLine.create({
        x1: pList[pList.length - 1].x,
        y1: pList[pList.length - 1].y,
        x2: pList[0].x,
        y2: pList[0].y,
        color: STYLE.MAP_PARTITION_LINE_COLOR_UNSELECTED
      })
      partitionLines.appendChild(line)
    }
  },

  LoadMapObjects (mapLevel, locations) {
    if (mapLevel == null) { console.warn('Attempting to Load Map Objects with no level container!'); return }

    const mapScale = InteractiveMap.GetMapScale(mapLevel)

    mapLevel.elements.objectContainer.innerHTML = ''

    const locationKeys = Object.keys(locations)
    locationKeys.forEach(key => {
      const locationData = locations[key]
      const objPosition = {
        x: parseInt(locationData.Position.x * mapScale.x) + 'px',
        y: parseInt(locationData.Position.y * mapScale.y) + 'px'
      }

      const mapObject = MapObject.create({
        objectID: locationData.ObjectID,
        objectType: locationData.Type,
        objectName: locationData.Name,
        icon: locationData.Icon,
        objSize: STYLE.MAP_ICON_SIZE,
        objPosition: objPosition,
        mapLevelData: locationData.mapEntry
      })
      mapLevel.elements.objectContainer.appendChild(mapObject)
    })
  },

  SetPartitionLinesColor (partition, color) {
    partition.childNodes.forEach(line => { line.style.border = '1px solid ' + color })
  }
}

//  Module Exports
module.exports = { InteractiveMap }
