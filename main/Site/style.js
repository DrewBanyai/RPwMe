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
    ADMIN: 'rgb(30, 30, 30)',
    GAME: 'rgb(30, 30, 30)'
  },

  Z_INDEX: {
    MAP_OBJECT: 1,
    TOOLTIP: 2
  },

  ADMIN_WINDOW_BUTTONS_BACKGROUND_COLOR: 'rgb(33, 37, 41)',
  ADMIN_WINDOW_BUTTON_WIDTH: 72,
  ADMIN_WINDOW_BUTTON_HEIGHT: 72,
  ADMIN_WINDOW_BUTTON_COLOR_NORMAL: 'rgb(120, 120, 120)',
  ADMIN_WINDOW_BUTTON_COLOR_HIGHLIGHT: 'rgb(250, 250, 250)',
  ADMIN_WINDOW_BUTTON_COLOR_SELECTED: 'rgb(255, 255, 255)',
  ADMIN_WINDOW_BUTTON_DIVIDER_COLOR: 'rgb(64, 64, 64)',
  ADMIN_WINDOW_AREA_COLOR: 'rgb(30, 30, 30)',
  ADMIN_WINDOW_MENU_DISPLAY_TYPE: 'flex',

  GAME_WINDOW_BACKGROUND_COLOR: 'rgb(33, 37, 41)',
  GAME_WINDOW_AREA_COLOR: 'rgb(30, 30, 30)',
  GAME_WINDOW_MENU_DISPLAY_TYPE: 'flex',
  GAME_WINDOW_PEN_WRITING_COLOR: 'rgba(0, 0, 0, 0.65)',

  CHAT_BOX_BACKGROUND_COLOR: 'rgb(46, 46, 46)',
  CHAT_ENTRY_BG_GAMEMASTER: 'rgba(80, 60, 60, 0.3)',
  CHAT_ENTRY_BG_PLAYER: 'rgba(60, 80, 60, 0.3)',
  CHAT_ENTRY_BG_DEFAULT: 'rgba(50, 50, 70, 0.4)',
  CHAT_ENTRY_NAME_GAMEMASTER: 'rgb(255, 50, 70)',
  CHAT_ENTRY_NAME_PLAYER: 'rgb(50, 255, 70)',
  CHAT_ENTRY_NAME_DEFAULT: 'rgb(50, 70, 255)',
  CHAT_ENTRY_STRING_COLOR: 'rgb(220, 220, 220)',

  WORLD_MAP_SIZE: {
    ADMIN: { x: 800, y: 600 },
    GAME: { x: 800, y: 600 }
  },

  MAP_ICON_SIZE: { W: 48, H: 48 },
  MAP_PARTITION_LINE_COLOR_UNSELECTED: 'rgba(64, 64, 64, 0.25)',
  MAP_PARTITION_LINE_COLOR_SELECTED: 'rgba(64, 160, 64, 0.25)',

  INTERACTIVE_MAP_PADDING_LEFT: 4,
  INTERACTIVE_MAP_PADDING_RIGHT: 2,

  INFOBOX_WORLD_PADDING_LEFT: 2,
  INFOBOX_WORLD_PADDING_RIGHT: 4,

  ADMIN_SCREEN_DEBUG_BUTTON: {
    fontFamily: 'Vesper Libre',
    fontSize: '18px',
    margin: '0px 100px 0px 0px',
    display: 'inline-flex'
  },

  MAP_LEVEL_ENTRY: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  MAP_PAPER_BACKGROUND: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundImage: 'url(Images/DrawingPaper.png)',
    backgroundSize: '100%',
    borderRadius: '8px'
    // overflow: "hidden",
  },
  MAP_CONTAINER: {
    position: 'absolute',
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover'
  },
  MAP_PARTITION_SHAPE_CONTAINER: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  MAP_OBJECT_CONTAINER: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  LINED_PAPER_BACKGROUND: {
    width: '1240px',
    height: '740px',
    position: 'relative',
    top: '10px',
    backgroundImage: 'url(Images/CollegeRuledLinedPaper.png)',
    backgroundSize: '101%',
    overflow: 'hidden'
  },
  PLAYER_JOIN_CARD_NAME_TAG: {
    fontSize: '26px',
    width: '282px',
    position: 'absolute',
    left: '5px',
    top: '8px',
    lineHeight: '41px',
    textAlign: 'center'
  },
  PLAYER_JOIN_CARD_CHOICE: {
    fontSize: '32px',
    width: '282px',
    position: 'absolute',
    left: '6px',
    lineHeight: '41px',
    textAlign: 'center'
  },
  PLAYER_JOIN_CARD_RANDOM: {
    fontSize: '18px',
    width: '282px',
    position: 'absolute',
    left: '10px',
    lineHeight: '41px',
    textAlign: 'center'
  },
  PLAYER_JOIN_CHARACTER_NAMETAG: {
    fontSize: '14px',
    width: '282px',
    position: 'absolute',
    top: '48px',
    left: '18px',
    lineHeight: '41px',
    textAlign: 'left',
    color: 'rgb(0, 0, 0, 0.8)'
  },
  PLAYER_JOIN_CHARACTER_ABILITY_SCORE: {
    fontSize: '16px',
    width: '20px',
    position: 'absolute',
    lineHeight: '41px',
    textAlign: 'left'
  },
  PLAYER_JOIN_CHARACTER_MINORINFO: {
    fontSize: '14px',
    width: '282px',
    position: 'absolute',
    left: '18px',
    lineHeight: '41px',
    textAlign: 'left',
    color: 'rgb(0, 0, 0, 0.8)'
  },
  PLAYER_JOIN_CHARACTER_REROLL_AND_READY: {
    fontSize: '16px',
    width: '282px',
    position: 'absolute',
    left: '6px',
    lineHeight: '41px',
    textAlign: 'center',
    color: 'rgb(0, 0, 0, 0.85)'
  },
  PLAYER_JOIN_CARD_READY_TAG: {
    fontSize: '22px',
    width: '282px',
    position: 'relative',
    top: '8px',
    left: '0px',
    lineHeight: '41px',
    textAlign: 'center',
    color: 'rgb(0, 0, 0, 0.8)'
  },
  SCREEN_TAB_POSITIONS: {
    Journal: { x: 0, y: 16 },
    Map: { x: 0, y: 58 },
    Inventory: { x: 0, y: 100 },
    Combat: { x: 0, y: 142 }
  },
  SCREEN_TAB: {
    position: 'absolute',
    width: '120px',
    height: '38px',
    backgroundImage: 'url(Images/ScreenTabBG.png)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  SCREEN_TAB_COLOR_SELECTED: 'rgb(200, 255, 200)',
  SCREEN_TAB_COLOR_UNSELECTED: 'rgb(255, 255, 255)',
  SCREEN_TAB_LABEL: {
    fontSize: '20px',
    width: '106px',
    position: 'absolute',
    left: '10px',
    top: '8px'
  },
  GAME_SCREEN_TITLE: {
    fontFamily: 'FFF Tusj',
    fontSize: '100px',
    color: 'rgb(1, 150, 100)',
    position: 'absolute',
    left: '238px',
    top: '90px'
  },
  JOURNAL_LIST: {
    width: '984px',
    height: '446px',
    position: 'absolute',
    left: '234px',
    top: '244px'
  },
  JOURNAL_ENTRY: {
    fontSize: '20px',
    height: '42px',
    width: '800px'
  },
  JOURNAL_ENTRY_FULL: {
    width: '800px',
    height: '512px',
    position: 'absolute',
    left: '0px',
    top: '-50px',
    display: 'block',
    backgroundImage: 'url(Images/OldJournalPaper.png)',
    backgroundSize: 'cover'
  },
  JOURNAL_ENTRY_FULL_TITLE: {
    position: 'relative',
    color: 'rgb(64, 64, 64)',
    fontFamily: 'Handlee',
    fontWeight: 'bold',
    fontSize: '24px',
    marginTop: '25px',
    marginRight: '144px',
    left: '18px',
    top: '0px',
    width: '100%',
    height: '28px',
    textAlign: 'left'
  },
  JOURNAL_ENTRY_FULL_TEXTBOX: {
    width: '760px',
    height: '400px',
    display: 'block',
    position: 'relative',
    left: '20px',
    top: '20px',
    marginTop: '0px'
  },
  JOURNAL_ENTRY_FULL_TEXT: {
    fontSize: '20px',
    color: 'rgb(40, 40, 40)',
    fontFamily: 'Handlee',
    position: 'relative',
    left: '0px',
    top: '0px',
    marginBottom: '12px'
  },
  JOURNAL_ID: {
    fontSize: '20px',
    width: '100px',
    position: 'absolute',
    color: 'rgb(50, 150, 50)'
  },
  JOURNAL_TITLE: {
    fontSize: '20px',
    width: '800px',
    position: 'absolute',
    left: '110px',
    color: 'rgb(50, 50, 150)'
  },
  JOURNAL_BACK_FORWARD_PAGE_SECTION: {
    position: 'absolute',
    left: '2px',
    top: '417px',
    width: '816px',
    height: '28px',
    display: 'flex'
  },
  JOURNAL_BACK_FORWARD_PAGE_LABELS: {
    fontSize: '22px',
    width: '33%'
  },
  GAME_AREA_CAMPAIGN_SUBMENU: {
    display: 'none',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute'
  },
  CAMPAIGN_MAP_TABS: {
    position: 'absolute',
    width: '800px',
    height: '30px',
    border: '2px dotted rgb(100, 100, 100)',
    left: '228px',
    top: '66px'
  },
  CAMPAIGN_INTERACTIVE_MAP: {
    position: 'absolute',
    width: '800px',
    height: '600px',
    left: '230px',
    top: '108px'
  }
}
