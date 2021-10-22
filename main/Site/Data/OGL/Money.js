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

const MONEY = {
  TranslateMoneyToCoins (money) {
    let removed = 0

    const g = Math.floor((money - removed) / 100)
    removed += (g * 100)

    const s = Math.floor((money - removed) / 10)
    removed += (s * 10)

    const c = Math.floor((money - removed) / 1)
    removed += (c * 10)

    const moneyList = []
    if (g) { moneyList.push(g.toString() + ' gold') }
    if (s) { moneyList.push(s.toString() + ' silver') }
    if (c) { moneyList.push(c.toString() + ' copper') }

    return moneyList.join(', ')
  }
}

//  Module Exports
module.exports = { MONEY }
