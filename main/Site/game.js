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

const { gameMessages } = require('./Messaging/GameMessages')
var { GameDisplay } = require('./SiteParts/GameDisplay')

window.addEventListener('DOMContentLoaded', () => {
  document.windowID = "GAME";
  
  gameMessages.Initialize();
  LoadSiteContent();
})

function LoadSiteContent () {
  //  Create the AdminDisplay and drop it into the AdminPage div
  var gamePage = document.querySelector('#GamePage')
  if (gamePage) gamePage.appendChild(GameDisplay.create());
}