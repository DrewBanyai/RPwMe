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

const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { Container, Image, Label } = require('../Components/ArcadiaJS')
const { EventDispatch } = require('../Controllers/EventDispatch')
const { Tooltip } = require('../Components/Tooltip')
const STYLE = require('../style')

const MapObject = {
  create (options) {
    const container = Container.create({
      id: (options && options.id) ? options.id : 'MapObject',
      style: {
        position: 'absolute',
        left: options.objPosition.x,
        top: options.objPosition.y,
        width: pxFromInt(options.objSize.W),
        height: pxFromInt(options.objSize.H),
        zIndex: STYLE.Z_INDEX.MAP_OBJECT
      }
    })

    container.options = options
    container.elements = { objectIcon: null, tooltip: null }
    container.objectID = options.objectID
    container.mapLevelData = options.mapLevelData

    container.elements.objectIcon = Image.create({
      id: 'ObjectIcon',
      style: {
        position: 'absolute',
        top: pxFromInt(options.objSize.H / 2 * -1),
        left: pxFromInt(options.objSize.W / 2 * -1),
        width: pxFromInt(options.objSize.W),
        height: pxFromInt(options.objSize.H),
        cursor: 'pointer'
      }
    })
    container.elements.objectIcon.setValue('Images/Locations/Icons/' + options.icon + '.png')
    container.elements.objectIcon.onclick = () => { EventDispatch.SendEvent('Select World Map Object', { mapLevelData: container.mapLevelData }) }
    container.appendChild(container.elements.objectIcon)

    container.elements.tooltip = Tooltip.create({ id: 'MapObjectTooltip' })
    container.appendChild(container.elements.tooltip)

    container.onmouseover = () => { container.elements.tooltip.setVisible(true) }
    container.onmouseout = () => { container.elements.tooltip.setVisible(false) }

    MapObject.createTooltip(container)
    return container
  },

  createTooltip (container) {
    const nameLabel = Label.create({
      id: 'MapObjectName',
      attributes: { value: container.options.objectName },
      style: { margin: '2px 4px 0px 4px', cursor: 'pointer', fontSize: '16px' }
    })
    nameLabel.onclick = () => { EventDispatch.SendEvent('Select World Map Object', { mapLevelData: container.mapLevelData }) }
    container.elements.tooltip.setContent(nameLabel)
  }
}

//  Module Exports
module.exports = { MapObject }
