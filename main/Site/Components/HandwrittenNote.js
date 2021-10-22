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

const { Container } = require('../Components/ArcadiaJS')
const STYLE = require('../style')

//  NOTE: This is similar to a Label from ArcadiaJS, but uses a certain font family and writes itself in one character at a time
const HandwrittenNote = {
  create: (options) => {
    if (!options.id) options.id = 'Label'
    const container = Container.create(options)

    container.setValue = (text) => { HandwrittenNote.setValue(container, text) }
    HandwrittenNote.SetHandwrittenStyle(options)
    container.writeDelay = options.writeDelay
    container.fullValue = ''
    container.interval = null
    container.callback = options.callback

    Container.applyOptions(container, options)
    if (options && options.attributes && options.attributes.value) container.setValue(options.attributes.value)

    return container
  },

  SetHandwrittenStyle (options) {
    if (!options) { options = {} }
    if (!options.style) { options.style = {} }
    if (!options.style.fontFamily) { options.style.fontFamily = 'Handlee' }
    if (!options.style.fontWeight) { options.style.fontWeight = 'bold' }
    if (!options.style.color) { options.style.color = STYLE.GAME_WINDOW_PEN_WRITING_COLOR }
    if (!options.writeDelay) { options.writeDelay = 100 }
  },

  getValue (container) { return container.innerHTML },
  setValue (container, value) {
    container.innerHTML = ''
    container.fullValue = value
    if (container.interval) { clearInterval(container.interval) }
    container.interval = setInterval(() => {
      if (container.innerHTML === container.fullValue) {
        clearInterval(container.interval)
        container.interval = null
        if (container.callback) { container.callback() }
        return
      }
      if (!container.innerHTML) { container.innerHTML = '' }
      container.innerHTML += container.fullValue.slice(container.innerHTML.length, container.innerHTML.length + 1)
    }, container.writeDelay)
  },
  setFont (container, font) { container.style.fontFamily = font },
  setFontSize (container, size) { container.style.fontSize = size },
  setColor (container, color) { container.style.color = color }
}

//  Module Exports
module.exports = { HandwrittenNote }
