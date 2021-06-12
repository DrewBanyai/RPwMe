var seedrandom = require('seedrandom')
let RNG = seedrandom(Date.now());

const SeedRandom = (seed) => { RNG = seedrandom(seed); }
const Random = () => { return RNG(); }
const RandIntBetween = (min, max) => { return (min + Math.floor(Random() * (max - min))); }

//  Module Exports
module.exports = { SeedRandom, RandIntBetween, Random }