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

const EventDispatch = {
  dispatchEventTypeList: [],
  dispatchEventHandlers: {},

  AddEventHandler: (eventType, handler) => {
    if (!EventDispatch.dispatchEventTypeList.includes(eventType)) { EventDispatch.dispatchEventTypeList.push(eventType) }
    if (!EventDispatch.dispatchEventHandlers.hasOwnProperty(eventType)) { EventDispatch.dispatchEventHandlers[eventType] = [] }
    EventDispatch.dispatchEventHandlers[eventType].push(handler)
  },

  RemoveEventHandler: (eventType, handler) => {
    if (!EventDispatch.dispatchEventTypeList.includes(eventType)) { return false }
    if (!EventDispatch.dispatchEventHandlers.hasOwnProperty(eventType)) { return false }
    if (!EventDispatch.dispatchEventHandlers[eventType].includes(handler)) { return false }

    for (let i = 0; i < EventDispatch.dispatchEventHandlers[eventType].length; ++i) {
      if (EventDispatch.dispatchEventHandlers[eventType][i] !== handler) { continue }
      EventDispatch.dispatchEventHandlers[eventType].splice(i, 1)
      return
    }
  },

  SendEvent: (eventType, eventData) => {
    if (!EventDispatch.dispatchEventTypeList.includes(eventType)) { return }
    if (!EventDispatch.dispatchEventHandlers[eventType]) { return }

    EventDispatch.dispatchEventHandlers[eventType].forEach((handler) => { handler(eventType, eventData) })
  }
}

//  Module Exports
module.exports = { EventDispatch }
