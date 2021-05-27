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

"use strict"

let Container = {
    options: null,
    content: null,

    create: (options) => {
        let containerType = (options && options.style && options.style.containerType) ? options.style.containerType : "div";
        let container = document.createElement(containerType);

        Container.applyOptions(container, options);

        return container;
    },

    applyOptions: (container, options) => {
		//  Generic options application
		if (options && options.id) container.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { container[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { container.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { container.addEventListener(key, options.events[key]); } }
    }
};

let Fontawesome = {
    create: (options) => {
        let container = Container.create({
            id: (options && options.id) ? options.id : "Fontawesome",
            attributes: {
                className: (options && options.attributes && options.attributes.className) ? options.attributes.className : "far fa-question-circle",
            },
            style: {
                containerType: "i",
                userSelect: "none",
            }
        });
        Container.applyOptions(container, options);

        container.setSymbol = (className) => { container.className = className; }
        
        return container;
    },
};

let Label = {
	create: (options) => {
        if (!options.id) options.id = "Label";
		let container = Container.create(options);

		container.setValue = (text) => { Label.setValue(container, text); };

        Container.applyOptions(container, options);
        if (options && options.attributes && options.attributes.value) container.setValue(options.attributes.value);

		return container;
	},
	
	getValue(container) { return container.innerHTML; },
	setValue(container, value) { container.innerHTML = value; },
	setFont(container, font) { container.style.fontFamily = font; },
	setFontSize(container, size) { container.style.fontSize = size; },
	setColor(container, color) { container.style.color = color; },
};

//  Module Exports
module.exports = { Container, Fontawesome, Label }