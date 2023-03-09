import { returnDictData, ore_key} from '../../../global/js/storage.js';
import { addOre, removeOre} from '../../../global/js/orehandling.js';
import { oreDict } from '../../../data/oredata.js';

let localOreDict = returnDictData(ore_key, oreDict);

const add_ore_b = document.getElementById("add-ore");
const remove_ore_b = document.getElementById("remove-ore");

add_ore_b.addEventListener("click", () => {
    addOre(100000, "cryonite", "novaria");
})

remove_ore_b.addEventListener("click", () => {
    removeOre(100, "cryonite", "novaria");
})