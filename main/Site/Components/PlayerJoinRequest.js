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

//  NOTE: This is similar to a Label from ArcadiaJS, but uses a certain font family and writes itself in one character at a time
const PlayerJoinRequest = {
	create: (options) => {
		let container = Container.create({
            id: "PlayerJoinRequest",
            style: {
                width: "230px",
                height: "20px",
                backgroundColor: "rgb(200, 200, 200)",
                borderRadius: "4px",
                display: "inline-flex",
                margin: "0px 0px 2px 0px",
            },
        });

        container.elements = { approveButton: null, denyButton: null };

        container.username = options.name ? options.name : "UNKNOWN";

        let nameLabel = Label.create({
            id: "PlayerJoinRequestNameLabel",
            style: {
                width: "188px",
                height: "20px",
                fontFamily: "Vesper Libre",
                fontSize: "14px",
                fontWeight: "bold",
                color: "rgb(0, 0, 0)",
                textAlign: "left",
                margin: "0px 0px 0px 4px",
                userSelect: "none",
            },
            attributes: { value: container.username },
        });
        container.appendChild(nameLabel);

        container.elements.approveButton = FontawesomeButton.create({
            id: "PlayerApproveButton",
            style: {
                width: "16px",
                height: "16px",
                fontSize: "10px",
                margin: "1px 1px 0px 0px",
                border: "1px solid rgb(0, 0, 0)",
                cursor: "pointer",
            },
            icon: "fas fa-check",
        });
        if (options.approveCallback) container.elements.approveButton.onclick = () => { options.approveCallback(); }
        container.appendChild(container.elements.approveButton);

        container.elements.denyButton = FontawesomeButton.create({
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
        if (options.denyCallback) container.elements.denyButton.onclick = () => { options.denyCallback(); }
        container.appendChild(container.elements.denyButton);

		container.setValue = (text) => { PlayerJoinRequest.setValue(container, text); };

        Container.applyOptions(container, options);
        if (options && options.attributes && options.attributes.value) container.setValue(options.attributes.value);

		return container;
	},

    setApproveCallback(container, callback) {
        if (container.elements.approveButton) { container.elements.approveButton.onclick = () => callback(); }
    },

    setDenyCallback(container, callback) {
        if (container.elements.denyButton) { container.elements.denyButton.onclick = () => callback(); }
    },
};

//  Module Exports
module.exports = { PlayerJoinRequest }