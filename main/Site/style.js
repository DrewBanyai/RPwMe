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

module.exports = {
  WINDOW_BACKGROUND_COLOR: {
    ADMIN: "rgb(30, 30, 30)",
    GAME: "rgb(30, 30, 30)",
  },
  
  ADMIN_WINDOW_BUTTONS_BACKGROUND_COLOR: "rgb(33, 37, 41)",
  ADMIN_WINDOW_BUTTON_WIDTH: 72,
  ADMIN_WINDOW_BUTTON_HEIGHT: 72,
  ADMIN_WINDOW_BUTTON_COLOR_NORMAL: "rgb(120, 120, 120)",
  ADMIN_WINDOW_BUTTON_COLOR_HIGHLIGHT: "rgb(250, 250, 250)",
  ADMIN_WINDOW_BUTTON_COLOR_SELECTED: "rgb(255, 255, 255)",
  ADMIN_WINDOW_BUTTON_DIVIDER_COLOR: "rgb(64, 64, 64)",
  ADMIN_WINDOW_AREA_COLOR: "rgb(30, 30, 30)",
  ADMIN_WINDOW_MENU_DISPLAY_TYPE: "flex",
  
  GAME_WINDOW_BACKGROUND_COLOR: "rgb(33, 37, 41)",
  GAME_WINDOW_AREA_COLOR: "rgb(30, 30, 30)",
  GAME_WINDOW_MENU_DISPLAY_TYPE: "flex",
  GAME_WINDOW_PEN_WRITING_COLOR: "rgba(0, 0, 0, 0.65)",

  CHAT_BOX_BACKGROUND_COLOR: "rgb(46, 46, 46)",
  CHAT_ENTRY_BG_GAMEMASTER: "rgba(80, 60, 60, 0.3)",
  CHAT_ENTRY_BG_PLAYER: "rgba(60, 80, 60, 0.3)",
  CHAT_ENTRY_BG_DEFAULT: "rgba(50, 50, 70, 0.4)",
  CHAT_ENTRY_NAME_GAMEMASTER: "rgb(255, 50, 70)",
  CHAT_ENTRY_NAME_PLAYER: "rgb(50, 255, 70)",
  CHAT_ENTRY_NAME_DEFAULT: "rgb(50, 70, 255)",
  CHAT_ENTRY_STRING_COLOR: "rgb(220, 220, 220)",

  WORLD_MAP_SIZE: {
    ADMIN: { x: 800, y: 600 },
    GAME: { x: 1024, y: 768 },
  },
  
  INTERACTIVE_MAP_PADDING_LEFT: 4,
  INTERACTIVE_MAP_PADDING_RIGHT: 2,

  INFOBOX_WORLD_PADDING_LEFT: 2,
  INFOBOX_WORLD_PADDING_RIGHT: 4,
}
