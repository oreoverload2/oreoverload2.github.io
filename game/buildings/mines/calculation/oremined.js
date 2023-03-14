import { oreDict } from '../../../data/oredata.js';

function calculateMinedOre(planet, depth, totalMiners) {
    const planetOreDict = oreDict[planet];
    let baseminedArray = [];
    let baseorenameArray = [];

    for (const oreType in planetOreDict) {
        const ore = planetOreDict[oreType];        
        if (ore.minDepth <= depth) {
            const oreName = ore.name;
            const oreYield = ore.yield;
            const oreMinDepth = ore.minDepth;
            const oreMaxDepth = ore.maxDepth;

            baseminedArray.push(parseInt(((10*((((oreMinDepth*0.15)*oreYield)/2)*depth/10+1))*totalMiners)/2));
            baseorenameArray.push(oreName);
        }
    };
    return [baseminedArray, baseorenameArray];
}

export { calculateMinedOre }
  