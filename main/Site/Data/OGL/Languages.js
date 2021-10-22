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
    { name: 'Common', description: 'Common' },
    { name: 'Dwarvish', description: 'Dwarvish' },
    { name: 'Elvish', description: 'Elvish' },
    { name: 'Giant', description: 'Giant' },
    { name: 'Gnomish', description: 'Gnomish' },
    { name: 'Goblin', description: 'Goblin' },
    { name: 'Halfling', description: 'Halfling' },
    { name: 'Orc', description: 'Orc' },
    { name: 'Abyssal', description: 'Abyssal' },
    { name: 'Celestial', description: 'Celestial' },
    { name: 'Draconic', description: 'Draconic' },
    { name: 'Deep Speech', description: 'Deep Speech' },
    { name: 'Infernal', description: 'Infernal' },
    { name: 'Primordial', description: 'Primordial' },
    { name: 'Sylvan', description: 'Sylvan' },
    { name: 'Undercommon', description: 'Undercommon' }
  ],
  CreateCharacterLanguages (knownList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < knownList.length; ++i) data[knownList[i]] = true
    return data
  },
  GetLanguageNameList () {
    const list = []
    for (const i in this.List) { list.push(this.List[i].name) }
    return list
  }
}

//  Module Exports
module.exports = { LANGUAGES }
