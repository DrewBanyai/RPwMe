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

const { Container, Label, FontawesomeButton } = require('../Components/ArcadiaJS')

const ActivePlayerEntry = {
	create: (options) => {
		let container = Container.create({
            id: "ActivePlayerEntry",
            style: {
                width: "230px",
                height: "20px",
                backgroundColor: "rgb(200, 200, 200)",
                borderRadius: "4px",
                display: "inline-flex",
                margin: "0px 0px 2px 0px",
            },
        });

        container.elements = { removeButton: null };

        container.username = options.name ? options.name : "UNKNOWN";

        let nameLabel = Label.create({
            id: "ActivePlayerEntryNameLabel",
            style: {
                width: "207px",
                height: "20px",
                fontFamily: "Vesper Libre",
                fontSize: "14px",
                fontWeight: "bold",
                color: "rgb(0, 0, 0)",
                textAlign: "left",
                margin: "0px 0px 0px 4px",
                userSelect: "none",
                cursor: "pointer",
            },
            attributes: { value: options.name ? options.name : "UNKNOWN" },
        });
        if (options.selectCallback) nameLabel.onclick = () => { options.selectCallback(); }
        container.appendChild(nameLabel);

        container.elements.removeButton = FontawesomeButton.create({
            id: "PlayerDenuButton",
            style: {
                width: "16px",
                height: "16px",
                fontSize: "10px",
                margin: "1px 1px 0px 0px",
                border: "1px solid rgb(0, 0, 0)",
                cursor: "pointer",
            },
            icon: "fas fa-times",
            bgColorNormal: "rgb(157, 15, 88)",
            bgColorHighlight: "rgb(115, 11, 65)",
            bgColorSelected: "rgb(75, 7, 44)"
        });
        if (options.removeCallback) container.elements.removeButton.onclick = () => { options.removeCallback(); }
        container.appendChild(container.elements.removeButton);

		container.setValue = (text) => { ActivePlayerEntry.setValue(container, text); };

        Container.applyOptions(container, options);
        if (options && options.attributes && options.attributes.value) container.setValue(options.attributes.value);

		return container;
	},

    setSelectCallback(container, callback) {
        if (container) { container.onclick = () => callback(); }
    },

    setRemoveCallback(container, callback) {
        if (container.elements.removeButton) { container.elements.removeButton.onclick = () => callback(); }
    },
};

//  Module Exports
module.exports = { ActivePlayerEntry }