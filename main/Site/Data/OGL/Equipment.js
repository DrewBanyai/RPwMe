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

const EQUIPMENT = {
  WEAPONS: {
    'Simple Melee': [
      { name: 'Club', cost: 10, type: 'Weapon', subtype: 'Simple Melee', damage: '1d4', damageType: 'Bludgening', weight: 2, properties: ['light'] },
      { name: 'Dagger', cost: 200, type: 'Weapon', subtype: 'Simple Melee', damage: '1d4', damageType: 'Piercing', weight: 1, properties: ['finesse', 'light', 'thrown (range 20/60)'] },
      { name: 'Greatclub', cost: 20, type: 'Weapon', subtype: 'Simple Melee', damage: '1dd', damageType: 'Bludgening', weight: 10, properties: ['two-handed'] },
      { name: 'Handaxe', cost: 500, type: 'Weapon', subtype: 'Simple Melee', damage: '1d6', damageType: 'Slashing', weight: 2, properties: ['light', 'thrown (range 20/60)'] },
      { name: 'Javelin', cost: 50, type: 'Weapon', subtype: 'Simple Melee', damage: '1d6', damageType: 'Piercing', weight: 2, properties: ['thrown (range 30/60)'] },
      { name: 'Light Hammer', cost: 200, type: 'Weapon', subtype: 'Simple Melee', damage: '1d4', damageType: 'Bludgening', weight: 2, properties: ['light', 'thrown (range 20/60)'] },
      { name: 'Mace', cost: 500, type: 'Weapon', subtype: 'Simple Melee', damage: '1d6', damageType: 'Bludgening', weight: 4, properties: [] },
      { name: 'Quarterstaff', cost: 20, type: 'Weapon', subtype: 'Simple Melee', damage: '1d6', damageType: 'Bludgening', weight: 4, properties: ['versatile (1d8)'] },
      { name: 'Sickle', cost: 100, type: 'Weapon', subtype: 'Simple Melee', damage: '1d4', damageType: 'Slashing', weight: 2, properties: ['light'] },
      { name: 'Spear', cost: 100, type: 'Weapon', subtype: 'Simple Melee', damage: '1d6', damageType: 'Piercing', weight: 3, properties: ['thrown (range 20/60), versatile (1d8)'] }
    ],
    'Simple Ranged': [
      { name: 'Crossbow, light', cost: 2500, type: 'Weapon', subtype: 'Simple Ranged', damage: '1d8', damageType: 'Piercing', weight: 5, properties: ['ammunition (range 80/320)', 'loading', 'two-handed'] },
      { name: 'Dart', cost: 50, type: 'Weapon', subtype: 'Simple Ranged', damage: '1d4', damageType: 'Piercing', weight: 0.25, properties: ['finesse', 'thrown (range 20/60)'] },
      { name: 'Shortbow', cost: 2500, type: 'Weapon', subtype: 'Simple Ranged', damage: '1d6', damageType: 'Piercing', weight: 2, properties: ['ammuniton (range 80/320)', 'two-handed'] },
      { name: 'Sling', cost: 10, type: 'Weapon', subtype: 'Simple Ranged', damage: '1d4', damageType: 'Bludgening', weight: 0, properties: ['ammunition (range 30/120)'] }
    ],
    'Martial Melee': [
      { name: 'Battleaxe', cost: 1000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Slashing', weight: 4, properties: ['versatile (1d10)'] },
      { name: 'Flail', cost: 1000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Bludgening', weight: 2, properties: [] },
      { name: 'Glaive', cost: 2000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d10', damageType: 'Slashing', weight: 6, properties: ['heavy', 'reach', 'two-handed'] },
      { name: 'Greataxe', cost: 3000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d12', damageType: 'Slashing', weight: 7, properties: ['heavy', 'two-handed'] },
      { name: 'Greatsword', cost: 5000, type: 'Weapon', subtype: 'Martial Melee', damage: '2d6', damageType: 'Slashing', weight: 6, properties: ['heavy', 'two-handed'] },
      { name: 'Halberd', cost: 2000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d10', damageType: 'Slashing', weight: 6, properties: ['heavy', 'reach', 'two-handed'] },
      { name: 'Lance', cost: 1000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d12', damageType: 'Piercing', weight: 6, properties: ['reach', 'special'] },
      { name: 'Longsword', cost: 1500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Slashing', weight: 3, properties: ['versatile (1d10)'] },
      { name: 'Maul', cost: 1000, type: 'Weapon', subtype: 'Martial Melee', damage: '2d6', damageType: 'Bludgening', weight: 10, properties: ['heavy', 'two-handed'] },
      { name: 'Morningstar', cost: 1500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Piercing', weight: 4, properties: [] },
      { name: 'Pike', cost: 500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d10', damageType: 'Piercing', weight: 18, properties: ['heavy', 'reach', 'two-handed'] },
      { name: 'Rapier', cost: 2500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Piercing', weight: 2, properties: ['finesse'] },
      { name: 'Scimitar', cost: 2500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d6', damageType: 'Slashing', weight: 3, properties: ['finesse', 'light'] },
      { name: 'Shortsword', cost: 1000, type: 'Weapon', subtype: 'Martial Melee', damage: '1d6', damageType: 'Piercing', weight: 2, properties: ['finesse', 'light'] },
      { name: 'Trident', cost: 500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d6', damageType: 'Piercing', weight: 4, properties: ['thrown (range (20/60)', 'versatile (1d8)'] },
      { name: 'War pick', cost: 500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Piercing', weight: 2, properties: [] },
      { name: 'Warhammer', cost: 1500, type: 'Weapon', subtype: 'Martial Melee', damage: '1d8', damageType: 'Bludgening', weight: 2, properties: ['versatile (1d10)'] },
      { name: 'Whip', cost: 200, type: 'Weapon', subtype: 'Martial Melee', damage: '1d4', damageType: 'Slashing', weight: 3, properties: ['finesse', 'reach'] }
    ],
    'Martial Ranged': [
      { name: 'Blowgun', cost: 1000, type: 'Weapon', subtype: 'Martial Ranged', damage: '1d1', damageType: 'Piercing', weight: 1, properties: ['ammunition (range 25/100)', 'loading'] },
      { name: 'Crossbow, hand', cost: 7500, type: 'Weapon', subtype: 'Martial Ranged', damage: '1d6', damageType: 'Piercing', weight: 3, properties: ['ammunition (range 30/120)', 'light', 'loading'] },
      { name: 'Crossbow, heavy', cost: 5000, type: 'Weapon', subtype: 'Martial Ranged', damage: '1d10', damageType: 'Piercing', weight: 18, properties: ['ammunition (range 100/400)', 'heavy', 'loading', 'two-handed'] },
      { name: 'Longbow', cost: 5000, type: 'Weapon', subtype: 'Martial Ranged', damage: '1d8', damageType: 'Piercing', weight: 2, properties: ['ammunition (range 150/600)', 'heavy', 'two-handed'] },
      { name: 'Net', cost: 100, type: 'Weapon', subtype: 'Martial Ranged', damage: '0d6', damageType: 'None', weight: 3, properties: ['special', 'thrown (range 5/15)'] }
    ]
  },
  ARMOR: {
    'Light Armor': [
      { name: 'Padded Armor', cost: 500, type: 'Armor', subtype: 'Light Armor', armorClass: (modifiers) => { return 11 + modifiers.Dexterity }, strengthReq: 0, weight: 8, stealth: 'Disadvantage' },
      { name: 'Leather Armor', cost: 1000, type: 'Armor', subtype: 'Light Armor', armorClass: (modifiers) => { return 11 + modifiers.Dexterity }, strengthReq: 0, weight: 10, stealth: '' },
      { name: 'Studded Armor', cost: 4500, type: 'Armor', subtype: 'Light Armor', armorClass: (modifiers) => { return 12 + modifiers.Dexterity }, strengthReq: 0, weight: 13, stealth: '' }
    ],
    'Medium Armor': [
      { name: 'Hide Armor', cost: 1000, type: 'Armor', subtype: 'Medium Armor', armorClass: (modifiers) => { return 12 + Math.min(modifiers.Dexterity, 2) }, strengthReq: 0, weight: 12, stealth: '' },
      { name: 'Chain Shirt Armor', cost: 5000, type: 'Armor', subtype: 'Medium Armor', armorClass: (modifiers) => { return 13 + Math.min(modifiers.Dexterity, 2) }, strengthReq: 0, weight: 20, stealth: '' },
      { name: 'Scale Mail Armor', cost: 5000, type: 'Armor', subtype: 'Medium Armor', armorClass: (modifiers) => { return 14 + Math.min(modifiers.Dexterity, 2) }, strengthReq: 0, weight: 45, stealth: 'Disadvantage' },
      { name: 'Breastplate Armor', cost: 40000, type: 'Armor', subtype: 'Medium Armor', armorClass: (modifiers) => { return 14 + Math.min(modifiers.Dexterity, 2) }, strengthReq: 0, weight: 20, stealth: '' },
      { name: 'Half Plate Armor', cost: 75000, type: 'Armor', subtype: 'Medium Armor', armorClass: (modifiers) => { return 15 + Math.min(modifiers.Dexterity, 2) }, strengthReq: 0, weight: 40, stealth: 'Disadvantage' }
    ],
    'Heavy Armor': [
      { name: 'Ring Mail Armor', cost: 3000, type: 'Armor', subtype: 'Heavy Armor', armorClass: (modifiers) => { return 14 }, strengthReq: 0, weight: 40, stealth: 'Disadvantage' },
      { name: 'Chain Mail Armor', cost: 7500, type: 'Armor', subtype: 'Heavy Armor', armorClass: (modifiers) => { return 16 }, strengthReq: 13, weight: 55, stealth: 'Disadvantage' },
      { name: 'Splint Armor', cost: 20000, type: 'Armor', subtype: 'Heavy Armor', armorClass: (modifiers) => { return 17 }, strengthReq: 15, weight: 60, stealth: 'Disadvantage' },
      { name: 'Plate Armor', cost: 150000, type: 'Armor', subtype: 'Heavy Armor', armorClass: (modifiers) => { return 18 }, strengthReq: 15, weight: 65, stealth: 'Disadvantage' }
    ],
    Shield: [
      { name: 'Shield', cost: 1000, type: 'Shield', subtype: 'Shield', armorClass: (modifiers) => { return 2 }, strengthReq: 0, weight: 6, stealth: '' }
    ]
  },
  TOOLS: [
    { name: "Smith's Tools", cost: 2000, type: 'Tools', weight: 8, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
    { name: "Brewer's Supplies", cost: 2000, type: 'Tools', weight: 9, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
    { name: "Mason's Tools", cost: 1000, type: 'Tools', weight: 8, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
    { name: "Thieve's Tools", cost: 2500, type: 'Tools', weight: 1, notes: 'This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your Proficiency Bonus to any Ability Checks you make to Disarm traps or open locks.' },
    { name: "Burglar's Pack", cost: 1600, type: 'Tools', weight: 47.5, notes: 'Includes a backpack, a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days rations, a tinderbox, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.' },
    { name: "Dungeoneer's Pack", cost: 1200, type: 'Tools', weight: 61.5, notes: 'Includes a backpack, a crowbar, a hammer, 10 pitons, 10 torches, a tinderbox, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.' },
    { name: "Explorer's Pack", cost: 1000, type: 'Tools', weight: 59, notes: 'Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.' }
  ],
  GetEquipmentNameList (weaponList, armorList) {
    //  Create a list of weapon and armor names and return it
    const list = []
    weaponList.forEach(weaponKey => { for (const entry in EQUIPMENT.WEAPONS[weaponKey]) list.push(EQUIPMENT.WEAPONS[weaponKey][entry].name) })
    armorList.forEach(armorKey => { for (const entry in EQUIPMENT.ARMOR[armorKey]) list.push(EQUIPMENT.ARMOR[armorKey][entry].name) })
    return list
  },
  GetAllWeaponsInOneList () {
    let list = []
    for (const entryIndex1 in this.WEAPONS) list = list.concat(this.WEAPONS[entryIndex1])
    return list
  },
  GetAllArmorInOneList () {
    let list = []
    for (const entryIndex1 in this.ARMOR) list = list.concat(this.ARMOR[entryIndex1])
    return list
  },
  GetCharacterArmorClass (character) {
    const armorNames = this.GetEquipmentNameList([], ['Light Armor', 'Medium Armor', 'Heavy Armor', 'Shield'])
    const armorOwned = character.Inventory.filter((item) => armorNames.includes(item.item))
    const allArmor = this.GetAllArmorInOneList()

    //  If the character has armor, determine their AC based on it
    let armorClass = 0
    for (const itemIndex in armorOwned) { armorClass += (allArmor.find(armor => armor.name === armorOwned[itemIndex].item)).armorClass(character.AbilityScoreModifiers) }

    //  If a character is unarmored, give them the Unarmored AC
    if (armorOwned.filter(a => a.item !== 'Shield').length === 0) armorClass += 10 + character.AbilityScoreModifiers.Dexterity

    return armorClass
  }
}

//  Module Exports
module.exports = { EQUIPMENT }
