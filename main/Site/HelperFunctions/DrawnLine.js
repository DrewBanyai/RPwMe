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

//  Pulled from https://stackoverflow.com/questions/4270485/drawing-lines-on-html-page
//  StackOverflow user madox2

const DrawnLine = {
  create: (options) => {
    const createLineElement = (x, y, length, angle, color) => {
      const line = document.createElement('div')
      const styles = 'border: 1px solid ' + color + '; ' +
                        'width: ' + length + 'px; ' +
                        'height: 0px; ' +
                        '-moz-transform: rotate(' + angle + 'rad); ' +
                        '-webkit-transform: rotate(' + angle + 'rad); ' +
                        '-o-transform: rotate(' + angle + 'rad); ' +
                        '-ms-transform: rotate(' + angle + 'rad); ' +
                        'position: absolute; ' +
                        'top: ' + y + 'px; ' +
                        'left: ' + x + 'px; '
      line.setAttribute('style', styles)
      return line
    }

    const createLine = (x1, y1, x2, y2, color) => {
      const a = x1 - x2
      const b = y1 - y2
      const c = Math.sqrt(a * a + b * b)

      const sx = (x1 + x2) / 2
      const sy = (y1 + y2) / 2

      const x = sx - c / 2
      const y = sy

      const alpha = Math.PI - Math.atan2(-b, a)

      return createLineElement(x, y, c, alpha, color)
    }

    return createLine(options.x1, options.y1, options.x2, options.y2, options.color)
  }
}

//  Module Exports
module.exports = { DrawnLine }
