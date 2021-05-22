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

const path = require('path')

module.exports = {
  APP_NAME: 'RPwME',
  WINDOW_WIDTH: 1280,
  WINDOW_HEIGHT: 720,
  INDEX: {
    ADMIN: 'file://' + path.resolve(__dirname, '..', 'site', 'admin.html'),
    GAME: 'file://' + path.resolve(__dirname, '..', 'site', 'game.html'),
  },
  DEBUG: false
}
