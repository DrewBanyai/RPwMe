var seedrandom = require('seedrandom')
let RNG = seedrandom(Date.now());

const SeedRandom = (seed) => { RNG = seedrandom(seed); return RNG; }
const RandIntBetween = (min, max) => { return (min + Math.floor(RNG() * (max - min))); }

//  Module Exports
module.exports = { SeedRandom, RandIntBetween }