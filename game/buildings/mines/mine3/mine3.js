import { returnDictData, setStorageItem, ore_key, player_key, novariamine_key, aetheramine_key, helionmine_key, terramine_key, arcadiamine_key, ceruleamine_key, xenosmine_key, titanusmine_key, eridanusmine_key, auriusmine_key} from '../../../global/js/storage.js';
import { addOre, removeOre} from '../../../global/js/orehandling.js';
import { oreDict } from '../../../data/oredata.js';
import { playerDict } from '../../../data/playerdata.js';
import { novariaMineDict } from '../../../data/planet_mine/novaria_mine.js';
import { aetheraMineDict } from '../../../data/planet_mine/aethera_mine.js';
import { helionMineDict } from '../../../data/planet_mine/helion_mine.js';
import { terraMineDict } from '../../../data/planet_mine/terra_mine.js';
import { arcadiaMineDict } from '../../../data/planet_mine/arcadia_mine.js';
import { ceruleaMineDict } from '../../../data/planet_mine/cerulea_mine.js';
import { xenosMineDict } from '../../../data/planet_mine/xenos_mine.js';
import { titanusMineDict } from '../../../data/planet_mine/titanus_mine.js';
import { eridanusMineDict } from '../../../data/planet_mine/eridanus_mine.js';
import { auriusMineDict } from '../../../data/planet_mine/aurius_mine.js';

let localOreDict = returnDictData(ore_key, oreDict);
let localPlayerDict = returnDictData(player_key, playerDict);

let localnovariaMineDict = returnDictData(novariamine_key, novariaMineDict);
let localaetheraMineDict = returnDictData(aetheramine_key, aetheraMineDict);
let localhelionMineDict = returnDictData(helionmine_key, helionMineDict);
let localterraMineDict = returnDictData(terramine_key, terraMineDict);
let localarcadiaMineDict = returnDictData(arcadiamine_key, arcadiaMineDict);
let localceruleaMineDict = returnDictData(ceruleamine_key, ceruleaMineDict);
let localxenosMineDict = returnDictData(xenosmine_key, xenosMineDict);
let localtitanusMineDict = returnDictData(titanusmine_key, titanusMineDict);
let localeridanusMineDict = returnDictData(eridanusmine_key, eridanusMineDict);
let localauriusMineDict = returnDictData(auriusmine_key, auriusMineDict);

const planetDict = {
    'novaria': localnovariaMineDict,
    'aethera': localaetheraMineDict,
    'helion': localhelionMineDict,
    'terra': localterraMineDict,
    'arcadia': localarcadiaMineDict,
    'cerulea': localceruleaMineDict,
    'xenos': localxenosMineDict,
    'titanus': localtitanusMineDict,
    'eridanus': localeridanusMineDict,
    'aurius': localauriusMineDict
};

window.addEventListener("load", () => {
    localPlayerDict.mine = 3;
    setStorageItem(player_key, localPlayerDict);
})

const planet = localPlayerDict.planet;
const mineLevel = localPlayerDict.mine;
const mine = `mine${mineLevel}`;

const stopDrill = document.getElementById("stop-drill");

const mineDict = planetDict[planet];

console.log(mine)

let head = 1;
let engine = 1;
let shaft = 1;
let weight = 1;
let hardness = 1;

let drill_active = false;

function calculateDrillTime(head, engine, shaft, weight, hardness) {
    const baseTime = (weight*10) / (head * engine * shaft * weight);
    const timeMultiplier = 1 + (hardness * 10) * 1;
    const drillTime = (baseTime * 10) * timeMultiplier;
    return drillTime;
}

function startstopDrill() {
    if (!drill_active) {
        drill_active = true;
        stopDrill.style.backgroundColor = "rgb(62, 182, 92)";
        stopDrill.style.border = "solid 2px rgb(35, 109, 41)";
    } else {
        drill_active = false;
        stopDrill.style.backgroundColor = "rgb(182, 76, 62)";
        stopDrill.style.border = "solid 2px rgb(109, 44, 35)";
    }
    console.log(`Drill Active: ${drill_active}`);
}

function updateDrill() {
    head = mineDict[mine].drill.level.drill_head;
    engine = mineDict[mine].drill.level.drill_engine;
    shaft = mineDict[mine].drill.level.drill_shaft;
    weight = mineDict[mine].drill.level.drill_weight;
    hardness = 1;

    const drill_head_s = document.getElementById("drill-head");
    const drill_engine_s = document.getElementById("drill-engine");
    const drill_shaft_s = document.getElementById("drill-shaft");
    const drill_weight_s = document.getElementById("drill-weight");

    drill_head_s.textContent = `Head: ${head}`;
    drill_engine_s.textContent = `Engine: ${engine}`;
    drill_shaft_s.textContent = `Shaft: ${shaft}`;
    drill_weight_s.textContent = `Weight: ${weight}`;
};

console.log(`Drill Head:    ${head}`);
console.log(`Drill Engine:  ${engine}`);
console.log(`Drill Shaft:   ${shaft}`);
console.log(`Drill Weight:  ${weight}`);


let drillTime = calculateDrillTime(head, engine, shaft, weight, hardness);
console.log(`It will take ${drillTime.toFixed(2)} seconds to drill one meter down.`);

stopDrill.addEventListener("click", () => {
    startstopDrill()
})


updateDrill();