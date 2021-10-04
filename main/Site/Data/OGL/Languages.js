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

const LANGUAGES = {
    List: [
        { name: "Common", trigger: "COMMON", description: "Common" },
        { name: "Dwarvish", trigger: "DWARVISH", description: "Dwarvish" },
        { name: "Elvish", trigger: "ELVISH", description: "Elvish" },
        { name: "Giant", trigger: "GIANT", description: "Giant" },
        { name: "Gnomish", trigger: "GNOMISH", description: "Gnomish" },
        { name: "Goblin", trigger: "GOBLIN", description: "Goblin" },
        { name: "Halfling", trigger: "HALFLING", description: "Halfling" },
        { name: "Orc", trigger: "ORC", description: "Orc" },
        { name: "Abyssal", trigger: "ABYSSAL", description: "Abyssal" },
        { name: "Celestial", trigger: "CELESTIAL", description: "Celestial" },
        { name: "Draconic", trigger: "DRACONIC", description: "Draconic" },
        { name: "Deep Speech", trigger: "DEEPSPEECH", description: "Deep Speech" },
        { name: "Infernal", trigger: "INFERNAL", description: "Infernal" },
        { name: "Primordial", trigger: "PRIMORDIAL", description: "Primordial" },
        { name: "Sylvan", trigger: "SYLVAN", description: "Sylvan" },
        { name: "Undercommon", trigger: "UNDERCOMMON", description: "Undercommon" },
    ],
    CreateCharacterLanguages(knownList) {
        //  Create a struct with all language triggers as keys, set to false
        let data = {};
        for (let language in this.List) { data[this.List[language].trigger] = false; }
        
        //  Fill in the given keys as true
        for (let i = 0; i < knownList.length; ++i) data[knownList[i]] = true;
        return data;
    }
};

//  Module Exports
module.exports = { LANGUAGES }