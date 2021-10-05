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
        SIMPLE_MELEE: [
            { name: "Club", trigger: "CLUB", cost: 10, type: "Weapon", subtype: "Simple Melee", damage: "1d4", damageType: "Bludgening", weight: 2, properties: [ "light" ] },
            { name: "Dagger", trigger: "DAGGER", cost: 200, type: "Weapon", subtype: "Simple Melee", damage: "1d4", damageType: "Piercing", weight: 1, properties: [ "finesse", "light", "thrown (range 20/60)" ] },
            { name: "Greatclub", trigger: "GREATCLUB", cost: 20, type: "Weapon", subtype: "Simple Melee", damage: "1dd", damageType: "Bludgening", weight: 10, properties: [ "two-handed" ] },
            { name: "Handaxe", trigger: "HANDAXE", cost: 500, type: "Weapon", subtype: "Simple Melee", damage: "1d6", damageType: "Slashing", weight: 2, properties: [ "light", "thrown (range 20/60)" ] },
            { name: "Javelin", trigger: "JAVELIN", cost: 50, type: "Weapon", subtype: "Simple Melee", damage: "1d6", damageType: "Piercing", weight: 2, properties: [ "thrown (range 30/60)" ] },
            { name: "Light Hammer", trigger: "LIGHTHAMMER", cost: 200, type: "Weapon", subtype: "Simple Melee", damage: "1d4", damageType: "Bludgening", weight: 2, properties: [ "light", "thrown (range 20/60)" ] },
            { name: "Mace", trigger: "MACE", cost: 500, type: "Weapon", subtype: "Simple Melee", damage: "1d6", damageType: "Bludgening", weight: 4, properties: [] },
            { name: "Quarterstaff", trigger: "QUARTERSTAFF", cost: 20, type: "Weapon", subtype: "Simple Melee", damage: "1d6", damageType: "Bludgening", weight: 4, properties: [ "versatile (1d8)" ] },
            { name: "Sickle", trigger: "SICKLE", cost: 100, type: "Weapon", subtype: "Simple Melee", damage: "1d4", damageType: "Slashing", weight: 2, properties: [ "light" ] },
            { name: "Spear", trigger: "SPEAR", cost: 100, type: "Weapon", subtype: "Simple Melee", damage: "1d6", damageType: "Piercing", weight: 3, properties: [ "thrown (range 20/60), versatile (1d8)" ] }
        ],
        SIMPLE_RANGED: [
            { name: "Crossbow, light", trigger: "CROSSBOW_LIGHT", cost: 2500, type: "Weapon", subtype: "Simple Ranged", damage: "1d8", damageType: "Piercing", weight: 5, properties: [ "ammunition (range 80/320)", "loading", "two-handed" ] },
            { name: "Dart", trigger: "DART", cost: 50, type: "Weapon", subtype: "Simple Ranged", damage: "1d4", damageType: "Piercing", weight: 0.25, properties: [ "finesse", "thrown (range 20/60)" ] },
            { name: "Shortbow", trigger: "SHORTBOW", cost: 2500, type: "Weapon", subtype: "Simple Ranged", damage: "1d6", damageType: "Piercing", weight: 2, properties: [ "ammuniton (range 80/320)", "two-handed" ] },
            { name: "Sling", trigger: "SLING", cost: 10, type: "Weapon", subtype: "Simple Ranged", damage: "1d4", damageType: "Bludgening", weight: 0, properties: [ "ammunition (range 30/120)" ] },
        ],
        MARTIAL_MELEE: [
            { name: "Battleaxe", trigger: "BATTLEAXE", cost: 1000, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Slashing", weight: 4, properties: [ "versatile (1d10)" ] },
            { name: "Flail", trigger: "FLAIL", cost: 1000, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Bludgening", weight: 2, properties: [  ] },
            { name: "Glaive", trigger: "GLAIVE", cost: 2000, type: "Weapon", subtype: "Martial Melee", damage: "1d10", damageType: "Slashing", weight: 6, properties: ["heavy", "reach", "two-handed"  ] },
            { name: "Greataxe", trigger: "GREATAXE", cost: 3000, type: "Weapon", subtype: "Martial Melee", damage: "1d12", damageType: "Slashing", weight: 7, properties: [ "heavy", "two-handed" ] },
            { name: "Greatsword", trigger: "GREATSWORD", cost: 5000, type: "Weapon", subtype: "Martial Melee", damage: "2d6", damageType: "Slashing", weight: 6, properties: [ "heavy", "two-handed" ] },
            { name: "Halberd", trigger: "HALBERD", cost: 2000, type: "Weapon", subtype: "Martial Melee", damage: "1d10", damageType: "Slashing", weight: 6, properties: [ "heavy", "reach", "two-handed" ] },
            { name: "Lance", trigger: "LANCE", cost: 1000, type: "Weapon", subtype: "Martial Melee", damage: "1d12", damageType: "Piercing", weight: 6, properties: [ "reach", "special" ] },
            { name: "Longsword", trigger: "LONGSWORD", cost: 1500, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Slashing", weight: 3, properties: [ "versatile (1d10)" ] },
            { name: "Maul", trigger: "MAUL", cost: 1000, type: "Weapon", subtype: "Martial Melee", damage: "2d6", damageType: "Bludgening", weight: 10, properties: [ "heavy", "two-handed" ] },
            { name: "Morningstar", trigger: "MORNINGSTAR", cost: 1500, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Piercing", weight: 4, properties: [  ] },
            { name: "Pike", trigger: "PIKE", cost: 500, type: "Weapon", subtype: "Martial Melee", damage: "1d10", damageType: "Piercing", weight: 18, properties: [ "heavy", "reach", "two-handed" ] },
            { name: "Rapier", trigger: "RAPIER", cost: 2500, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Piercing", weight: 2, properties: [ "finesse" ] },
            { name: "Scimitar", trigger: "SCIMITAR", cost: 2500, type: "Weapon", subtype: "Martial Melee", damage: "1d6", damageType: "Slashing", weight: 3, properties: [ "finesse", "light" ] },
            { name: "Shortsword", trigger: "SHORTSWORD", cost: 1000, type: "Weapon", subtype: "Martial Melee", damage: "1d6", damageType: "Piercing", weight: 2, properties: [ "finesse", "light" ] },
            { name: "Trident", trigger: "TRIDENT", cost: 500, type: "Weapon", subtype: "Martial Melee", damage: "1d6", damageType: "Piercing", weight: 4, properties: [ "thrown (range (20/60)", "versatile (1d8)" ] },
            { name: "War pick", trigger: "WARPICK", cost: 500, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Piercing", weight: 2, properties: [  ] },
            { name: "Warhammer", trigger: "WARHAMMER", cost: 1500, type: "Weapon", subtype: "Martial Melee", damage: "1d8", damageType: "Bludgening", weight: 2, properties: [ "versatile (1d10)" ] },
            { name: "Whip", trigger: "WHIP", cost: 200, type: "Weapon", subtype: "Martial Melee", damage: "1d4", damageType: "Slashing", weight: 3, properties: [ "finesse", "reach" ] },
        ],
        MARTIAL_RANGED: [
            { name: "Blowgun", trigger: "BLOWGUN", cost: 1000, type: "Weapon", subtype: "Martial Ranged", damage: "1d1", damageType: "Piercing", weight: 1, properties: [ "ammunition (range 25/100)", "loading" ] },
            { name: "Crossbow, hand", trigger: "CROSSBOW_HAND", cost: 7500, type: "Weapon", subtype: "Martial Ranged", damage: "1d6", damageType: "Piercing", weight: 3, properties: [ "ammunition (range 30/120)", "light", "loading" ] },
            { name: "Crossbow, heavy", trigger: "CROSSBOW_HEAVY", cost: 5000, type: "Weapon", subtype: "Martial Ranged", damage: "1d10", damageType: "Piercing", weight: 18, properties: [ "ammunition (range 100/400)", "heavy", "loading", "two-handed" ] },
            { name: "Longbow", trigger: "LONGBOW", cost: 5000, type: "Weapon", subtype: "Martial Ranged", damage: "1d8", damageType: "Piercing", weight: 2, properties: [ "ammunition (range 150/600)", "heavy", "two-handed" ] },
            { name: "Net", trigger: "NET", cost: 100, type: "Weapon", subtype: "Martial Ranged", damage: "0d6", damageType: "None", weight: 3, properties: [ "special", "thrown (range 5/15)" ] },
        ]
    },
    ARMOR: {
        LIGHT_ARMOR: [
            { name: "Padded Armor", trigger: "PADDED", cost: 500, type: "Armor", subtype: "Light", armorClass: (modifiers) => { return 11 + modifiers.DEXTERITY; }, strengthReq: 0, weight: 8, stealth: "Disadvantage" },
            { name: "Leather Armor", trigger: "LEATHER", cost: 1000, type: "Armor", subtype: "Light", armorClass: (modifiers) => { return 11 + modifiers.DEXTERITY; }, strengthReq: 0, weight: 10, stealth: "" },
            { name: "Studded Armor", trigger: "STUDDED", cost: 4500, type: "Armor", subtype: "Light", armorClass: (modifiers) => { return 12 + modifiers.DEXTERITY; }, strengthReq: 0, weight: 13, stealth: "" },
        ],
        MEDIUM_ARMOR: [
            { name: "Hide Armor", trigger: "HIDE", cost: 1000, type: "Armor", subtype: "Medium", armorClass: (modifiers) => { return 12 + Math.min(modifiers.DEXTERITY, 2); }, strengthReq: 0, weight: 12, stealth: "" },
            { name: "Chain Shirt Armor", trigger: "CHAINSHIRT", cost: 5000, type: "Armor", subtype: "Medium", armorClass: (modifiers) => { return 13 + Math.min(modifiers.DEXTERITY, 2); }, strengthReq: 0, weight: 20, stealth: "" },
            { name: "Scale Mail Armor", trigger: "SCALEMAIL", cost: 5000, type: "Armor", subtype: "Medium", armorClass: (modifiers) => { return 14 + Math.min(modifiers.DEXTERITY, 2); }, strengthReq: 0, weight: 45, stealth: "Disadvantage" },
            { name: "Breastplate Armor", trigger: "BREASTPLATE", cost: 40000, type: "Armor", subtype: "Medium", armorClass: (modifiers) => { return 14 + Math.min(modifiers.DEXTERITY, 2); }, strengthReq: 0, weight: 20, stealth: "" },
            { name: "Half plate Armor", trigger: "HALFPLATE", cost: 75000, type: "Armor", subtype: "Medium", armorClass: (modifiers) => { return 15 + Math.min(modifiers.DEXTERITY, 2); }, strengthReq: 0, weight: 40, stealth: "Disadvantage" },
        ],
        HEAVY_ARMOR: [
            { name: "Ring Mail Armor", trigger: "RINGMAIL", cost: 3000, type: "Armor", subtype: "Heavy", armorClass: (modifiers) => { return 14; }, strengthReq: 0, weight: 40, stealth: "Disadvantage" },
            { name: "Chain Mail Armor", trigger: "CHAINMAIL", cost: 7500, type: "Armor", subtype: "Heavy", armorClass: (modifiers) => { return 16; }, strengthReq: 13, weight: 55, stealth: "Disadvantage" },
            { name: "Splint Armor", trigger: "SPLINT", cost: 20000, type: "Armor", subtype: "Heavy", armorClass: (modifiers) => { return 17; }, strengthReq: 15, weight: 60, stealth: "Disadvantage" },
            { name: "Plate Armor", trigger: "PLATE", cost: 150000, type: "Armor", subtype: "Heavy", armorClass: (modifiers) => { return 18; }, strengthReq: 15, weight: 65, stealth: "Disadvantage" },
        ],
        SHIELDS: [
            { name: "Breastplate Armor", trigger: "SHIELD", cost: 1000, type: "Shield", subtype: "Shield", armorClass: (modifiers) => { return 2; }, strengthReq: 0, weight: 6, stealth: "" },
        ]
    },
    TOOLS: [
        { name: "Smith's Tools", trigger: "SMITHSTOOLS", cost: 2000, type: "Tools", weight: 8, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
        { name: "Brewer's Supplies", trigger: "BREWERSSUPPLIES", cost: 2000, type: "Tools", weight: 9, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
        { name: "Mason's Tools", trigger: "MASONSTOOLS", cost: 1000, type: "Tools", weight: 8, notes: "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency." },
        { name: "Thieve's Tools", trigger: "THIEVESTOOLS", cost: 2500, type: "Tools", weight: 1, notes: "This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your Proficiency Bonus to any Ability Checks you make to Disarm traps or open locks." },
        { name: "Burglar's Pack", trigger: "BURGLARSPACK", cost: 1600, type: "Tools", weight: 47.5, notes: "Includes a backpack, a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days rations, a tinderbox, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it." },
        { name: "Dungeoneer's Pack", trigger: "DUNGEONEERSPACK", cost: 1200, type: "Tools", weight: 61.5, notes: "Includes a backpack, a crowbar, a hammer, 10 pitons, 10 torches, a tinderbox, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it." },
        { name: "Explorer's Pack", trigger: "EXPLORERSPACK", cost: 1000, type: "Tools", weight: 59, notes: "Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it." },
    ],
    GetEquipmentTriggerList(weaponList, armorList) {
        //  Create a list of weapon and armor triggers and return it
        let list = [];
        weaponList.forEach(weaponKey => { for (let entry in EQUIPMENT.WEAPONS[weaponKey]) list.push(EQUIPMENT.WEAPONS[weaponKey][entry].trigger); });
        armorList.forEach(armorKey => { for (let entry in EQUIPMENT.ARMOR[armorKey]) list.push(EQUIPMENT.ARMOR[armorKey][entry].trigger); });
        return list;
    },
    GetEquipmentNameList(weaponList, armorList) {
        //  Create a list of weapon and armor triggers and return it
        let list = [];
        weaponList.forEach(weaponKey => { for (let entry in EQUIPMENT.WEAPONS[weaponKey]) list.push(EQUIPMENT.WEAPONS[weaponKey][entry].name); });
        armorList.forEach(armorKey => { for (let entry in EQUIPMENT.ARMOR[armorKey]) list.push(EQUIPMENT.ARMOR[armorKey][entry].name); });
        return list;
    },
    GetAllWeaponsInOneList() {
        let list = [];
        for (let entryIndex1 in this.WEAPONS)
            for (let entryIndex2 in this.WEAPONS[entryIndex1])
                list.push(this.WEAPONS[entryIndex1][entryIndex2]);
        return list;
    }
};

//  Module Exports
module.exports = { EQUIPMENT }