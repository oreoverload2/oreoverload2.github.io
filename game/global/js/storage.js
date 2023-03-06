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
    if (dictCheck) {
        localDict = getStorageItem(key);
        return localDict;
    } else {
        setStorageItem(key, dict);
        return getStorageItem(key);
    }
}

let player_key = "player_data";
let ore_key = "ore_data";
let stockmarket_key = "stockmarket_data";
let state_key = "state_data";
let spaceplanetrotation_key = "planetrotation_data"

export { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem, returnDictData, player_key, ore_key, stockmarket_key, state_key, spaceplanetrotation_key };