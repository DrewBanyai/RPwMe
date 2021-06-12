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

const CONFIG = require('../../config')
const STYLE = require('../style')
const { Container, Label } = require('../Components/ArcadiaJS')
const { pxFromInt } = require('../HelperFunctions/pxFromInt')
const { HandwrittenNote } = require('../Components/HandwrittenNote')

let GameArea_PlayerJoin = {
    create() {
        let container = Container.create({
            id: "GameArea_PlayerJoin",
            style: {
                width: pxFromInt(CONFIG.WINDOW_WIDTH),
                height: pxFromInt(CONFIG.WINDOW_HEIGHT),
                backgroundColor: STYLE.GAME_WINDOW_AREA_COLOR,
                display: STYLE.GAME_WINDOW_MENU_DISPLAY_TYPE,
                justifyContent: "center",
                overflow: "hidden",
            }
        });

        container.elements = { playerJoinCard1: null, playerJoinCard2: null, playerJoinCard3: null, }

        //GameArea_PlayerJoin.createPlayerJoinCard(0, )

        return container;
    },
};

//  Module Exports
module.exports = { GameArea_PlayerJoin }