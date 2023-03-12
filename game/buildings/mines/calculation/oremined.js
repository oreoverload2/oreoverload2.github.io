import { oreDict } from '../../../data/oredata.js';

function calculateMinedOre(planet, depth, totalMiners) {
    const planetOreDict = oreDict[planet];
    let baseminedArray = [];

    for (const oreType in planetOreDict) {
        const ore = planetOreDict[oreType];        
        if (ore.minDepth <= depth) {
            const oreYield = ore.yield;
            const oreMinDepth = ore.minDepth;
            const oreMaxDepth = ore.maxDepth;

            baseminedArray.push(oreType+" - "+(parseInt((1 * oreYield) + ((1 * oreYield) * (oreMinDepth/100)) * totalMiners) * 10))
        }
    };
    return baseminedArray;
}

export { calculateMinedOre }
  