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

const CHARACTER = {
  CreateSavingThrowAdvantageMap (savingThrowList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < savingThrowList.length; ++i) data[savingThrowList[i]] = true
    return data
  },
  CreateWeaponProficiencyData (proficienyList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true
    return data
  },
  CreateArmorProficiencyData (proficienyList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true
    return data
  },
  CreateToolProficiencyData (proficienyList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < proficienyList.length; ++i) data[proficienyList[i]] = true
    return data
  },
  CreateCharacterAttributesData (attributeList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < attributeList.length; ++i) data[attributeList[i]] = true
    return data
  },
  CreateCharacterSkillProficiencies (knownList) {
    //  Fill in the given keys as true
    const data = {}
    for (let i = 0; i < knownList.length; ++i) data[knownList[i]] = true
    return data
  }
}

//  Module Exports
module.exports = { CHARACTER }
