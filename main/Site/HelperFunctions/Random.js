const seedrandom = require('seedrandom')
let RNG = seedrandom(Date.now())

const SeedRandom = (seed) => { RNG = seedrandom(seed) }
const Random = () => { return RNG() }
const RandIntBetween = (min, max) => { return (min + Math.trunc(Random() * (max - min + 0.99))) }

//  Module Exports
module.exports = { SeedRandom, RandIntBetween, Random }
