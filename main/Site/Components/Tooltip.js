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

const { Container } = require('../Components/ArcadiaJS')

"use strict"

let Tooltip = {
    create(options) {
        let container = Container.create({
            id: (options.id ? options.id : "Tooltip"),
            style: { position: "relative", zIndex: "1", pointerEvents: "none", }
        });

        container.elements = { tooltip: null };

        container.elements.tooltip = Container.create({
            id: "DetachedTooltip",
            style: { minWidth: "100px", minHeight: "20px", maxWidth: "200px", maxHeight: "400px", backgroundColor: "rgb(64, 64, 64)", color: "rgb(255, 255, 255)", position: "absolute", opacity: "0", textAlign: "center", transition: "opacity 0.3s", pointerEvents: "none", }
        });
        container.appendChild(container.elements.tooltip);

        container.setVisible = (visible) => {
            container.elements.tooltip.style.opacity = (visible ? 1.0 : 0.0);
            container.elements.tooltip.style.pointerEvents = (visible ? "all" : "none");
        };
    
        container.setContent = (content) => {
            while (container.elements.tooltip.firstChild) {
                container.elements.tooltip.removeChild(container.elements.tooltip.firstChild);
            }
            container.elements.tooltip.appendChild(content);
        };

        return container;
    }
}

//  Module Exports
module.exports = { Tooltip }