var seedrandom = require('seedrandom')
let RNG = seedrandom(Date.now());

const SeedRandom = (seed) => { RNG = seedrandom(seed); }
const RandIntBetween = (min, max) => { return (min + Math.floor(RNG() * (max - min))); }
const Random = () => { return RNG(); }

//  Module Exports
module.exports = { SeedRandom, RandIntBetween, Random }