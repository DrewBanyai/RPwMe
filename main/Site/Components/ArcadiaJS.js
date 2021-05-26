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

class Container {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
        this.applyOptions(this.options);
    }

    generateContent() {
        let container = document.createElement("div");
        container.id = this.constructor.name;
        return container;
    }

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    appendChild(child) { this.content.appendChild(child); }
    removeChild(child) { this.content.removeChild(child); }
}

class DropDown {
	constructor(options) {
        this.options = options;
        this.values = [];
		this.content = this.GenerateContent();
        this.applyOptions(this.options);
	}
	
	GenerateContent() {
        let container = document.createElement("select");
		container.setValues = (array) => this.setValues(array);
		return container;
	}

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    setOnChangeCallback(callback) { this.content.onchange = callback; }
	
	getValues() { return this.valuesArray; }
    setValues(array) {
        this.valuesArray = array;
        for (let i = 0; i < this.valuesArray.length; ++i) {
            let option = document.createElement("option");
            option.value = this.valuesArray[i];
            option.text = option.value;
            this.content.appendChild(option);
        }
    }

    getValue() { return this.content.value; }
    setValue(val) {
        if (this.valuesArray.includes(val)) { this.content.value = val; }
        else { console.warn("Trying to set value " + val + " but that is not within the values array of this select object!"); }
    }
}

class FileInput {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();

		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        let container = document.createElement("input");
        container.setAttribute("type", "file");

        return container;
    }
}

class Fontawesome {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
        
		if (options && options.id) this.content.id = options.id;
    }

    generateContent() {
        let container = new Container({
            id: this.constructor.name,
            attributes: {
                className: (this.options && this.options.attributes && this.options.attributes.className) ? this.options.attributes.className : "far fa-question-circle",
            },
            style: {
                containerType: "i",
                userSelect: "none",
            }
        });
        container.applyOptions(this.options);

        return container.content;
    }

    setSymbol(className) { this.content.className = className; }
}

class Image {
	constructor(options) {
		this.options = options;
		this.content = this.generateContent();
        this.applyOptions(this.options);
		this.setValue(this.content.value);
	}
	
	generateContent() {
        let container = document.createElement("img");
		container.setValue = (text) => this.setValue(text);
		return container;
	}

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }
	
	getValue() { return this.content.src; }
    setValue(value) { this.content.src = value; }
}

class Label {
	constructor(options) {
		this.options = options;
		this.content = this.generateContent();
        this.applyOptions(this.options);
		this.setValue(this.content.value);
	}
	
	generateContent() {
        if (!this.options.id) this.options.id = this.constructor.name;
		let container = new Container(this.options);
		container.content.setValue = (text) => this.setValue(text);
		return container.content;
	}

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }
	
	getValue() { return this.content.innerHTML; }
	setValue(value) { this.content.innerHTML = value; }
	setFont(font) { this.content.style.fontFamily = font; }
	setFontSize(size) { this.content.style.fontSize = size; }
	setColor(color) { this.content.style.color = color; }
}

class Modal {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();

		if (options && options.id) this.content.id = options.id;
    }

    generateContent() {
        let container = new Container({
            id: this.constructor.name, 
            style: {
                width: "100%",
                height: "100%",
                position: "fixed",
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px",
                zIndex: "1",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
        });
        container.content.addEventListener('mousedown', (e) => { if (e.srcElement === container.content) { return this.closeDialog(); } });

        let centerPopup = new Container({
            style: {
                position: "fixed",
                top: (this.options && this.options.topOverride) ? this.options.topOverride : "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "2",
            },
        });
        container.appendChild(centerPopup.content);

        if (this.options && this.options.content) { centerPopup.appendChild(this.options.content); }

        container.content.closeDialog = () => { this.closeDialog(); }

        return container.content;
    }

    closeDialog() { return this.content.parentElement.removeChild(this.content); }

    appendChild(child) { this.content.appendChild(child); }
}

class PrimaryButton {
	constructor(options) {
		this.options = options;
		this.ButtonElement = null;
		this.ButtonGradient = null;
		this.ButtonTextLabel = null;
		this.content = this.GenerateContent();

		this.ButtonTextLabel.setValue(this.content.value);

		if (options && options.id) this.content.id = options.id;
	}
	
	GenerateContent() {
		let highlightGradient = "linear-gradient(to right, rgba(200, 200, 200, 0.6), rgba(170, 170, 170, 0.4))";
		let mouseDownGradient = "linear-gradient(to right, rgba(140, 140, 140, 0.6), rgba(170, 170, 170, 0.4))";
		
		//  Create the main button, a rounded box
		this.ButtonElement = new Container({
            id: this.constructor.name,
			style: {
				width: "200px",
				height: "25px",
				borderRadius: "5px",
				backgroundImage: "linear-gradient(to right, rgb(255, 99, 0), rgb(255, 165, 0))",
				display: "flex",
			}
		});
		this.ButtonElement.applyOptions(this.options);
		
		this.ButtonGradient = new Container({
			style: {
				width: "100%",
				height: "100%",
				lineHeight: "25px",
				borderRadius: "5px",
				display: "flex",
			}
		});
		this.ButtonElement.appendChild(this.ButtonGradient.content);
		
		//  Create a centered label on the button
		this.ButtonTextLabel = new Label({
			attributes: { value: "" },
			style: {
				fontFamily: "'Titillium Web', sans-serif",
				margin: "auto",
				cursor: "default",
				userSelect: "none",
				textAlign: "center",
			},
		});
		this.ButtonGradient.appendChild(this.ButtonTextLabel.content);
		
		//  Set mouse reactions
		this.ButtonElement.content.onmouseover = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		this.ButtonElement.content.onmouseout = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = ""; } }
		this.ButtonElement.content.onmousedown = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = mouseDownGradient; } }
		this.ButtonElement.content.onmouseup = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		
		return this.ButtonElement.content;
	}
	
	setValue(text) { this.ButtonTextLabel.setValue(text); }
	setFont(font) { this.ButtonTextLabel.setFont(font); }
	setFontSize(size) { this.ButtonTextLabel.setFontSize(size); }
	
	SetOnClick(callback) { this.ButtonElement.content.onclick = () => { if (this.ButtonElement.content.disabled) { return; } callback(); }; }
	
	SetEnabledState(enabled) {
		this.ButtonElement.content.disabled = (!enabled);
		this.ButtonGradient.content.disabled = (!enabled);
		
		if (!enabled) { setStyle(this.ButtonGradient.content, { backgroundImage: "", }); }
	}
}

class BasicButton {
	constructor(options) {
		this.options = options;
        this.elements = { bgColor: null, textLabel: null };
		this.content = this.GenerateContent();

		this.elements.textLabel.setValue(this.content.value);

		if (options && options.id) this.content.id = options.id;
	}
	
	GenerateContent() {
        let bgColorNormal = "rgb(15, 157, 88)";
        let bgColorHighlight = "rgb(11, 115, 65)";
        let bgColorSelected = "rgb(7, 75, 44)";

		//  Create the main button, a rounded box
		let container = new Container({
            id: this.constructor.name,
			style: {
				width: "200px",
				height: "26px",
				borderRadius: "6px",
				display: "flex",
                border: "1px solid rgb(240, 240, 240)",
			}
		});
		container.applyOptions(this.options);
		
		this.elements.bgColor = new Container({
			style: {
				width: "100%",
				height: "100%",
				lineHeight: "26px",
				borderRadius: "6px",
				display: "flex",
                backgroundColor: bgColorNormal,
			}
		});
		container.appendChild(this.elements.bgColor.content);
		
		//  Create a centered label on the button
		this.elements.textLabel = new Label({
			attributes: { value: "" },
			style: {
				fontFamily: "'Titillium Web', sans-serif",
				margin: "auto",
				cursor: "default",
				userSelect: "none",
				textAlign: "center",
                color: "rgb(220, 220, 220)"
			},
		});
		this.elements.bgColor.appendChild(this.elements.textLabel.content);
		
		//  Set mouse reactions
		container.content.onmouseover = () => { if (!container.content.disabled) { this.elements.bgColor.content.style.backgroundColor = bgColorHighlight; } }
		container.content.onmouseout = () => { if (!container.content.disabled) { this.elements.bgColor.content.style.backgroundColor = bgColorNormal; } }
		container.content.onmousedown = () => { if (!container.content.disabled) { this.elements.bgColor.content.style.backgroundColor = bgColorSelected; } }
		container.content.onmouseup = () => { if (!container.content.disabled) { this.elements.bgColor.content.style.backgroundColor = bgColorHighlight; } }
		
		return container.content;
	}
	
	setValue(text) { this.elements.textLabel.setValue(text); }
	setFont(font) { this.elements.textLabel.setFont(font); }
	setFontSize(size) { this.elements.textLabel.setFontSize(size); }
	
	setOnClick(callback) { this.content.onclick = () => { if (this.content.disabled) { return; } callback(); }; }
	
	setEnabled(enabled) {
		this.content.disabled = (!enabled);
		this.ButtonGradient.content.disabled = (!enabled);
		
		if (!enabled) { setStyle(this.ButtonGradient.content, { backgroundImage: "", }); }
	}
}

class TextInput {
    constructor(options) {
        this.options = options;
        this.callbacks = { return: null };
        this.content = this.generateContent();
        this.applyOptions(options);
    }

    generateContent() {
        let inputType = (this.options && this.options.type) ? this.options.type : "text";

        let container = document.createElement("input");
        container.id = this.constructor.name;
        container.setAttribute("type", inputType);

        container.addEventListener("keyup", (e) => { if ((e.code === 13) && (this.callbacks.return)) { this.callbacks.return(); } })

        container.style.backgroundColor = "white";
        container.style.color = "black";

        return container;
    }

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    getValue() { return this.content.value; }
    setValue(value) { this.content.value = value; }
}

class Checkbox {
    constructor(options) {
        this.options = options;
        this.checked = false;
        this.clickCallback = null;
        this.elements = { exteriorBox: null, interiorSymbol: null };
        this.content = this.generateContent();
        this.applyOptions(this.options);
    }

    generateContent() {
        this.createStyleOptions();

        if (this.options.clickCallback) { this.clickCallback = this.options.clickCallback; }

        this.elements.exteriorBox = new Container({ id: this.constructor.name, style: { borderRadius: "3px", border: "1px solid rgb(0, 0, 0)", cursor: "pointer", }, });
        this.elements.exteriorBox.content.onclick = () => {
            this.setChecked(!this.checked);
            if (this.options.clickCallback) { this.options.clickCallback(this.checked); }
        };

        this.elements.interiorSymbol = new Fontawesome({ style: { textAlign: "center", position: "relative", }, });
        this.elements.exteriorBox.appendChild(this.elements.interiorSymbol.content);

        this.setChecked((this.options.checked === true));

        return this.elements.exteriorBox.content;
    }

    createStyleOptions() {
        /*
        Potential values in this.options.styleOptions
            - exteriorColorUnchecked
            - exteriorColorChecked
            - interiorColorUnchecked
            - interiorColorChecked
            - checkSymbolUnchecked
            - checkSymbolChecked
            - checkSize
            - exteriorBoxSize
            - interiorSymbolSize
            - interiorSymbolTop
            - interiorSymbolLeft
        */

        if (!this.options.styleOptions) { this.options.styleOptions = {}; }
        if (!this.options.styleOptions.exteriorColorUnchecked) { this.options.styleOptions.exteriorColorUnchecked = "rgb(0, 0, 0)"; }
        if (!this.options.styleOptions.exteriorColorChecked) { this.options.styleOptions.exteriorColorChecked = "rgb(0, 0, 0)"; }
        if (!this.options.styleOptions.interiorColorUnchecked) { this.options.styleOptions.interiorColorUnchecked = "rgb(255, 0, 0)"; }
        if (!this.options.styleOptions.interiorColorChecked) { this.options.styleOptions.interiorColorChecked = "rgb(0, 255, 0)"; }
        if (!this.options.styleOptions.checkSymbolUnchecked) { this.options.styleOptions.checkSymbolUnchecked = "fas fa-times"; }
        if (!this.options.styleOptions.checkSymbolChecked) { this.options.styleOptions.checkSymbolChecked = "fas fa-check"; }
        if (!this.options.styleOptions.exteriorBoxSize) { this.options.styleOptions.exteriorBoxSize = "16px"; }
        if (!this.options.styleOptions.interiorSymbolSize) { this.options.styleOptions.interiorSymbolSize = "12px"; }
        if (!this.options.styleOptions.interiorSymbolTop) { this.options.styleOptions.interiorSymbolTop = "-1px"; }
        if (!this.options.styleOptions.interiorSymbolLeft) { this.options.styleOptions.interiorSymbolLeft = "0px"; }
    }

    setChecked(checked) {
        this.checked = checked;
        this.elements.exteriorBox.content.style.border = "1px solid " + this.options.styleOptions[this.checked ? "exteriorColorChecked": "exteriorColorUnchecked"];
        this.elements.exteriorBox.content.style.width = this.elements.exteriorBox.content.style.height = this.options.styleOptions["exteriorBoxSize"];
        this.elements.interiorSymbol.content.style.width = this.elements.interiorSymbol.content.style.height = this.options.styleOptions["exteriorBoxSize"];
        this.elements.interiorSymbol.content.style.color = this.options.styleOptions[this.checked ? "interiorColorChecked": "interiorColorUnchecked"];
        this.elements.interiorSymbol.setSymbol(this.checked ? this.options.styleOptions.checkSymbolChecked : this.options.styleOptions.checkSymbolUnchecked);
        this.elements.interiorSymbol.content.style.fontSize = this.options.styleOptions.interiorSymbolSize;
        this.elements.interiorSymbol.content.style.top = this.options.styleOptions.interiorSymbolTop;
        this.elements.interiorSymbol.content.style.left = this.options.styleOptions.interiorSymbolLeft;

        if (this.clickCallback) { this.clickCallback(checked); }
    }

    setClickCallback(callback) { this.clickCallback = callback; }
    getChecked() { return this.checked; }

    applyOptions(options) {
		//  Generic options application
		if (options && options.id) this.content.id = options.id;
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }
}