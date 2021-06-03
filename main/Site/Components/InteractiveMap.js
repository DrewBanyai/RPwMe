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
var { WORLD_OBJECTS } = require('../Data/WorldObjects')
var { MapObject } = require('../Components/MapObject')

const InteractiveMap = {
    create: (options) => {
        let properties = { mapWidth: 0, mapHeight: 0, size: { X: STYLE.WORLD_MAP_WIDTH, Y: STYLE.WORLD_MAP_HEIGHT }, objectSize: { W: 24, H: 24 } };

        let container = Container.create({
            id: "InteractiveMap",
            style: {
                width: parseInt(properties.size.X) + "px",
                height: parseInt(properties.size.Y) + "px"
            }
        });
        container.options = options;
        container.elements = { mapImage: null, mapContainer: null, mapObjectContainer: null, };
        container.objectCount = 0;
        container.objectMap = {};
        container.properties = properties;

        let mapImageSrc = "Images/Locations/Level_0/" + options.mapSelection + ".png"

        //  Get an img tag for the map image to get the full width and height
        container.elements.mapImage = Image.create({ id: "MapImage", style: { opacity: "0%", }});
        container.elements.mapImage.setValue(mapImageSrc);
        container.appendChild(container.elements.mapImage);

        container.elements.mapContainer = Container.create({
            id: "MapContainer",
            style: {
                position: "absolute",
                borderRadius: "6px",
                width: parseInt(properties.size.X) + "px",
                height: parseInt(properties.size.Y) + "px",
                backgroundImage: "url(" + mapImageSrc + ")",
                backgroundSize: "cover"
            }
        });
        container.appendChild(container.elements.mapContainer);

        container.elements.mapObjectContainer = Container.create({
            id: "MapObjectContainer",
            style: {
                position: "absolute",
                width: parseInt(properties.size.X) + "px",
                height: parseInt(properties.size.Y) + "px"
            }
        });
        container.appendChild(container.elements.mapObjectContainer);
        
        return container;
    },

    generateNewObjectID(container) {
        return container.objectCount++;
    },

    LoadMapObjects(container) {
        container.properties.mapWidth = container.elements.mapImage.clientWidth;
        container.properties.mapHeight = container.elements.mapImage.clientHeight;
        container.removeChild(container.elements.mapImage);

        container.options.cities.forEach(city => {
            let objPosition = {
                X: parseInt(city.Position.X / container.properties.mapWidth * container.properties.size.X) + "px",
                Y: parseInt(city.Position.Y / container.properties.mapHeight * container.properties.size.Y) + "px"
            };
            let objectID = InteractiveMap.generateNewObjectID(container);

            let mapObject = MapObject.create({
                id: "MapObject",
                objectID: objectID,
                objectType: "City",
                objectName: city.Name,
                icon: city.Icon,
                objSize: container.properties.objectSize,
                objPosition: objPosition, 
            });
            WORLD_OBJECTS[objectID] = city;
            container.elements.mapObjectContainer.appendChild(mapObject);
        });

        container.options.landmarks.forEach(landmark => {
            let objPosition = {
                X: parseInt(landmark.Position.X / container.properties.mapWidth * container.properties.size.X) + "px",
                Y: parseInt(landmark.Position.Y / container.properties.mapHeight * container.properties.size.Y) + "px"
            };
            let objectID = InteractiveMap.generateNewObjectID(container);

            let mapObject = MapObject.create({
                id: "MapObject",
                objectID: objectID,
                objectType: "Landmark",
                objectName: landmark.Name,
                icon: landmark.Icon,
                objSize: container.properties.objectSize,
                objPosition: objPosition,
            });
            WORLD_OBJECTS[objectID] = landmark;
            container.elements.mapObjectContainer.appendChild(mapObject);
        });
    }
};

//  Module Exports
module.exports = { InteractiveMap }