import { returnDictData, setStorageItem, ore_key, player_key, novariamine_key, aetheramine_key, helionmine_key, terramine_key, arcadiamine_key, ceruleamine_key, xenosmine_key, titanusmine_key, eridanusmine_key, auriusmine_key, getStorageItem, removeStorageItem} from '../../../global/js/storage.js';
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

import { calculateMinedOre } from '../calculation/oremined.js';
import { calculateDrillTime } from '../calculation/drilltime.js';

const planetDict = {
    'novaria':  novariaMineDict,
    'aethera':  aetheraMineDict,
    'helion':   helionMineDict,
    'terra':    terraMineDict,
    'arcadia':  arcadiaMineDict,
    'cerulea':  ceruleaMineDict,
    'xenos':    xenosMineDict,
    'titanus':  titanusMineDict,
    'eridanus': eridanusMineDict,
    'aurius':   auriusMineDict,
};

const planetKey = {
    'novaria':  novariamine_key,
    'aethera':  aetheramine_key,
    'helion':   helionmine_key,
    'terra':    terramine_key,
    'arcadia':  arcadiamine_key,
    'cerulea':  ceruleamine_key,
    'xenos':    xenosmine_key,
    'titanus':  titanusmine_key,
    'eridanus': eridanusmine_key,
    'aurius':   auriusmine_key,
};

const localPlayerDict = returnDictData(player_key, playerDict);

localPlayerDict.mine = 1;
setStorageItem(player_key, localPlayerDict);

const planet = localPlayerDict.planet;
const mineLevel = localPlayerDict.mine;
const mine = `mine${mineLevel}`;

const stopDrill = document.getElementById("stop-drill");

const mineKey = planetKey[planet];

let localPlanetMine = returnDictData(mineKey, planetDict[planet]);

let ore_per_sec = 0;
let ore_per_min = 0;
let ore_per_hur = 0;

// Mine

let progressIntervalMine;

function calcO() {
    localPlanetMine = returnDictData(mineKey, planetDict[planet])
    const oreMined = calculateMinedOre(
        planet,
        localPlanetMine[mine].depth,
        localPlanetMine[mine].miners,
    )
    return oreMined;
}

function initializeMine() {
    startProgressMine()
}

function startProgressMine() {
    if (!progressIntervalMine) {
        progressIntervalMine = setInterval(() => {
            const oreCalc = calcO();
            console.log(oreCalc);
            const amounts = [];
            const oreNames = [];
            for (const sublist of oreCalc) {
                for (const item of sublist) {
                    if (typeof item === 'number') {
                        amounts.push(item);
                    } else if (typeof item === 'string') {
                        oreNames.push(item);
                    }
                }
            }
            for (let i = 0; i < amounts.length; i++) {
                const amount = amounts[i];
                const oreName = oreNames[i];
                addOre(amount, oreName, planet);
            }

        }, 1000);
    }
}

function stopProgressMine() {
    clearInterval(progressInterval);
    progressInterval = null;
}




// Drill

let head = 1;
let engine = 1;
let shaft = 1;
let hardness = 1;

let drill_active = localPlanetMine[mine].active;

function calcDT() {
    localPlanetMine = returnDictData(mineKey, planetDict[planet])
    const time = calculateDrillTime(
        localPlanetMine[mine].depth,
        localPlanetMine[mine].drill.level.drill_head,
        localPlanetMine[mine].drill.level.drill_engine,
        localPlanetMine[mine].drill.level.drill_shaft,
        localPlanetMine[mine].drill.level.drill_weight,
    )[0];
    const weight = calculateDrillTime(
        localPlanetMine[mine].depth,
        localPlanetMine[mine].drill.level.drill_head,
        localPlanetMine[mine].drill.level.drill_engine,
        localPlanetMine[mine].drill.level.drill_shaft,
        localPlanetMine[mine].drill.level.drill_weight,
    )[1]
    return [time, weight];
}

function initializeDrill() {
    startProgress(0, calcDT()[0])
    console.log(drill_active)
    if (drill_active) {
        stopDrill.style.backgroundColor = "rgb(62, 182, 92)";
        stopDrill.style.border = "solid 2px rgb(35, 109, 41)";
    } else {
        stopDrill.style.backgroundColor = "rgb(182, 76, 62)";
        stopDrill.style.border = "solid 2px rgb(109, 44, 35)";
        stopProgress();
    }
}

function startstopDrill() {
    if (!drill_active) {
        drill_active = true;
        localPlanetMine[mine].active = drill_active;
        stopDrill.style.backgroundColor = "rgb(62, 182, 92)";
        stopDrill.style.border = "solid 2px rgb(35, 109, 41)";
        setStorageItem(mineKey, localPlanetMine);
        startProgress(0, calcDT()[0])
    } else {
        drill_active = false;
        localPlanetMine[mine].active = drill_active;
        stopDrill.style.backgroundColor = "rgb(182, 76, 62)";
        stopDrill.style.border = "solid 2px rgb(109, 44, 35)";
        setStorageItem(mineKey, localPlanetMine);
        stopProgress();
    }
    console.log(`Drill Active: ${drill_active}`);
}

function updateInfo() {
    ore_per_sec = 1;
    ore_per_min = 1;
    ore_per_hur = 1;
}

const drill_head_ub = document.getElementById("drill-head-upgrade");
const drill_engine_ub = document.getElementById("drill-engine-upgrade");
const drill_shaft_ub = document.getElementById("drill-shaft-upgrade");

drill_head_ub.addEventListener("click", () => {
    localPlanetMine[mine].drill.level.drill_head += 1;
    setStorageItem(mineKey, localPlanetMine);
    updateDrill();
})

drill_engine_ub.addEventListener("click", () => {
    localPlanetMine[mine].drill.level.drill_engine += 1;
    setStorageItem(mineKey, localPlanetMine);
    updateDrill();
})

drill_shaft_ub.addEventListener("click", () => {
    localPlanetMine[mine].drill.level.drill_shaft += 1;
    setStorageItem(mineKey, localPlanetMine);
    updateDrill();
})

function updateDrill() {
    head = localPlanetMine[mine].drill.level.drill_head;
    engine = localPlanetMine[mine].drill.level.drill_engine;
    shaft = localPlanetMine[mine].drill.level.drill_shaft;
    hardness = 1;

    const drill_head_s = document.getElementById("drill-head");
    const drill_engine_s = document.getElementById("drill-engine");
    const drill_shaft_s = document.getElementById("drill-shaft");
    const drill_weight_s = document.getElementById("drill-weight");

    const mine_planet = document.getElementById("mine-info-planet");

    drill_head_s.textContent = `Head: ${head}`;
    drill_engine_s.textContent = `Engine: ${engine}`;
    drill_shaft_s.textContent = `Shaft: ${shaft}`;
    drill_weight_s.textContent = `Weight: ${calcDT()[1]}`;

    mine_planet.textContent = `Planet: ${planet}`;

    stopProgress();
    startProgress(0, calcDT()[0])
};

console.log(`Drill Head:    ${head}`);
console.log(`Drill Engine:  ${engine}`);
console.log(`Drill Shaft:   ${shaft}`);
console.log(`Drill Weight:  ${calcDT()[1]}`);

stopDrill.addEventListener("click", () => {
    startstopDrill();
})

// JavaScript
const progressBarNew = document.getElementById("progress-bar-id");

let progressInterval;
let currentValue = 0;
let percent = 0;

// Update the progress bar and values
function updateProgressBar(percent) {
    progressBarNew.style.width = `${percent}%`;
}

function progressFinish() {
    localPlanetMine[mine].depth = localPlanetMine[mine].depth += 1;
    console.log(localPlanetMine[mine].depth)
    console.log("DONE")
    stopProgress();
    localPlanetMine[mine].drill_time = 0
    setStorageItem(mineKey, localPlanetMine)
    startProgress(0, calcDT()[0])
    console.log(`It will take ${calcDT()[0]} seconds to drill one meter down.`)
}

function startProgress(min, max) {
    runProgress(min, max);
}

function stopProgress() {
    clearInterval(progressInterval);
    progressInterval = null;
}

function runProgress(min, max) {
    if (!progressInterval && drill_active) {
        const storedValue = getStorageItem(mineKey)[mine].drill_time;
        console.log(storedValue)
        const value = storedValue ? Number(storedValue) : min;
        currentValue = value;
        progressInterval = setInterval(() => {
            currentValue += 1;
            percent = (currentValue - min) / (max - min) * 100;
            localPlanetMine[mine].drill_time = Math.round(currentValue);
            setStorageItem(mineKey, localPlanetMine)
            updateProgressBar(percent);
            console.log(`${currentValue} | ${max} | ${percent.toFixed(2)}% | ${localPlanetMine[mine].depth} meters`);
            if (currentValue === max || currentValue > max) {
                clearInterval(progressInterval);
                progressFinish();
            }
        }, 1000);
    }
}

function restartProgress() {
    localPlanetMine[mine].drill_time = 0;
    setStorageItem(mineKey, localPlanetMine)
    clearInterval(progressInterval);
    currentValue = 0;
}



initializeMine();
initializeDrill();
updateDrill();
updateInfo();






































/* 
import { returnDictData, setStorageItem, ore_key, player_key, novariamine_key, aetheramine_key, helionmine_key, terramine_key, arcadiamine_key, ceruleamine_key, xenosmine_key, titanusmine_key, eridanusmine_key, auriusmine_key, getStorageItem, removeStorageItem} from '../../../global/js/storage.js';
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

import { calculateMinedOre } from '../calculation/oremined.js';
import { calculateDrillTime } from '../calculation/drilltime.js';

const planetDict = {
    'novaria':  novariaMineDict,
    'aethera':  aetheraMineDict,
    'helion':   helionMineDict,
    'terra':    terraMineDict,
    'arcadia':  arcadiaMineDict,
    'cerulea':  ceruleaMineDict,
    'xenos':    xenosMineDict,
    'titanus':  titanusMineDict,
    'eridanus': eridanusMineDict,
    'aurius':   auriusMineDict,
};

const planetKey = {
    'novaria':  novariamine_key,
    'aethera':  aetheramine_key,
    'helion':   helionmine_key,
    'terra':    terramine_key,
    'arcadia':  arcadiamine_key,
    'cerulea':  ceruleamine_key,
    'xenos':    xenosmine_key,
    'titanus':  titanusmine_key,
    'eridanus': eridanusmine_key,
    'aurius':   auriusmine_key,
};

const localPlayerDict = returnDictData(player_key, playerDict);

localPlayerDict.mine = 1;
setStorageItem(player_key, localPlayerDict);

const planet = localPlayerDict.planet;
const mineLevel = localPlayerDict.mine;
const mine = `mine${mineLevel}`;

const stopDrill = document.getElementById("stop-drill");

const mineKey = planetKey[planet];

let localPlanetMine = returnDictData(mineKey, planetDict[planet]);

let ore_per_sec = 0;
let ore_per_min = 0;
let ore_per_hur = 0;

let head = 1;
let engine = 1;
let shaft = 1;
let weight = 1;
let hardness = 1;

let drill_active = localPlanetMine[mine].active;

function calcDT()[0] {
    localPlanetMine = returnDictData(planetKey, planetDict[planet])
    return calculateDrillTime(
        localPlanetMine[mine].depth,
        localPlanetMine[mine].drill.level.drill_head,
        localPlanetMine[mine].drill.level.drill_engine,
        localPlanetMine[mine].drill.level.drill_shaft,
        localPlanetMine[mine].drill.level.drill_weight,
    );
}

function initializeDrill() {
    startProgress(0, calcDT()[0])
    localPlanetMine[mine].active = drill_active;
    if (drill_active) {
        stopDrill.style.backgroundColor = "rgb(62, 182, 92)";
        stopDrill.style.border = "solid 2px rgb(35, 109, 41)";
    } else {
        stopDrill.style.backgroundColor = "rgb(182, 76, 62)";
        stopDrill.style.border = "solid 2px rgb(109, 44, 35)";
        stopProgress();
    }
}

function startstopDrill() {
    if (!drill_active) {
        drill_active = true;
        localPlanetMine[mine].active = drill_active;
        stopDrill.style.backgroundColor = "rgb(62, 182, 92)";
        stopDrill.style.border = "solid 2px rgb(35, 109, 41)";
        setStorageItem(mineKey, localPlanetMine);
        startProgress(0, calcDT()[0])
    } else {
        drill_active = false;
        localPlanetMine[mine].active = drill_active;
        stopDrill.style.backgroundColor = "rgb(182, 76, 62)";
        stopDrill.style.border = "solid 2px rgb(109, 44, 35)";
        setStorageItem(mineKey, localPlanetMine);
        stopProgress();
    }
    console.log(`Drill Active: ${drill_active}`);
}

function updateInfo() {

    ore_per_sec = 1;
    ore_per_min = 1;
    ore_per_hur = 1;

    

}

function updateDrill() {
    head = localPlanetMine[mine].drill.level.drill_head;
    engine = localPlanetMine[mine].drill.level.drill_engine;
    shaft = localPlanetMine[mine].drill.level.drill_shaft;
    weight = localPlanetMine[mine].drill.level.drill_weight;
    hardness = 1;

    const drill_head_s = document.getElementById("drill-head");
    const drill_engine_s = document.getElementById("drill-engine");
    const drill_shaft_s = document.getElementById("drill-shaft");
    const drill_weight_s = document.getElementById("drill-weight");

    const mine_planet = document.getElementById("mine-info-planet");

    drill_head_s.textContent = `Head: ${head}`;
    drill_engine_s.textContent = `Engine: ${engine}`;
    drill_shaft_s.textContent = `Shaft: ${shaft}`;
    drill_weight_s.textContent = `Weight: ${weight}`;

    mine_planet.textContent = `Planet: ${planet}`;
};

console.log(`Drill Head:    ${head}`);
console.log(`Drill Engine:  ${engine}`);
console.log(`Drill Shaft:   ${shaft}`);
console.log(`Drill Weight:  ${weight}`);

stopDrill.addEventListener("click", () => {
    startstopDrill()
})

// JavaScript
const progressBar = document.getElementById("progress-bar");
const progressBarNew = document.getElementById("progress-bar-id");

let progressInterval;

// Update the progress bar and values
function updateProgressBar(min, max) {
    const percent = (currentValue - min) / (max - min) * 100;
    progressBarNew.style.width = `${percent}%`;
}

function progressFinish() {
    localPlanetMine[mine].depth = localPlanetMine[mine].depth += 1;
    console.log(localPlanetMine[mine].depth)
    console.log("DONE")
    stopProgress();
    localPlanetMine[mine].drill_time = 0
    setStorageItem(planetKey, localPlanetMine)
    startProgress(0, calcDT()[0])
    console.log(`It will take ${calcDT()[0]} seconds to drill one meter down.`)
}

function startProgress(min, max) {
    runProgress(min, max);
}

function stopProgress() {
  clearInterval(progressInterval);
  progressInterval = null;
}

function runProgress(min, max) {
    if (!progressInterval) {
        const storedValue = getStorageItem(planetKey)[mine].drill_time;
        console.log(storedValue)
        const value = storedValue ? Number(storedValue) : min;
        progressBar.value = value;
        progressBar.max = max;
        progressInterval = setInterval(() => {
            progressBar.value += 1;
            setStorageItem(planetKey, localPlanetMine)
            localPlanetMine[mine].drill_time = progressBar.value;
            console.log(`${progressBar.value} | ${progressBar.max}`)
            console.log(`${progressInterval}`)
            if (progressBar.value === progressBar.max) {
                clearInterval(progressInterval);
                progressFinish();
            }
        }, 1000);
    }
}

function restartProgress() {
    localPlanetMine[mine].drill_time = 0;
    setStorageItem(planetKey, localPlanetMine)
    clearInterval(progressInterval);
    progressBar.value = 0;
}

initializeDrill();
updateDrill();
updateInfo();

*/