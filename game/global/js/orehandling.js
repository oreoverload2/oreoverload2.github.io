import { returnDictData, setStorageItem, ore_key} from './storage.js';
import { oreDict } from '../../data/oredata.js';

let localOreDict = returnDictData(ore_key, oreDict);

function addOre(amount, ore, planet) {
    localOreDict[planet][ore].amount = parseInt(localOreDict[planet][ore].amount) + parseInt(amount);
    setStorageItem(ore_key, localOreDict);
}

function removeOre(amount, ore, planet) {
    localOreDict[planet][ore].amount = parseInt(localOreDict[planet][ore].amount) - parseInt(amount);
    setStorageItem(ore_key, localOreDict);
}

export { addOre, removeOre }