function setStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeStorageItem(key) {
    localStorage.removeItem(key);
}

function checkStorageItem(key) {
    if (localStorage.getItem(key)) {
        return true;
    } else {
        return false;
    }
    
}

function returnDictData(key, dict) {
    const dictCheck = checkStorageItem(key)

    let localDict;

    if (dictCheck === null || !dictCheck) {
        setStorageItem(key, dict);
        return getStorageItem(key);
    } else {
        localDict = getStorageItem(key);
        return localDict;
    }
}

let player_key = "player_data";
let ore_key = "ore_data";
let stockmarket_key = "stockmarket_data";
let state_key = "state_data";
let spaceplanetrotation_key = "planetrotation_data"
let novariamine_key = "novariamine_key"
let aetheramine_key = "aetheramine_key"
let helionmine_key = "helionmine_key"
let terramine_key = "terramine_key"
let arcadiamine_key = "arcadiamine_key"
let ceruleamine_key = "ceruleamine_key"
let xenosmine_key = "xenosmine_key"
let titanusmine_key = "titanusmine_key"
let eridanusmine_key = "eridanusmine_key"
let auriusmine_key = "auriusmine_key"

let key_array = [player_key, ore_key, stockmarket_key, state_key, spaceplanetrotation_key, novariamine_key, aetheramine_key, helionmine_key, terramine_key, arcadiamine_key, ceruleamine_key, xenosmine_key,titanusmine_key, eridanusmine_key, auriusmine_key]

export { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem, returnDictData, player_key, ore_key, stockmarket_key, state_key, spaceplanetrotation_key, novariamine_key, aetheramine_key, helionmine_key, terramine_key, arcadiamine_key, ceruleamine_key, xenosmine_key,titanusmine_key, eridanusmine_key, auriusmine_key, key_array };