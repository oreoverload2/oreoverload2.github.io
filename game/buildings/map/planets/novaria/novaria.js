import { returnDictData, player_key, state_key} from '../../../../global/js/storage.js';
import { playerDict } from '../../../../data/playerdata.js';
import { worldstateDict } from '../../../../data/worldstatedata.js';

let localPlayerDict = returnDictData(player_key, playerDict);
let localStateDict = returnDictData(state_key, worldstateDict);

const buttons_buildings = document.querySelectorAll('.building-b');
const buttons_mine = document.querySelectorAll('.building-b-m');

// loop through each button
buttons_mine.forEach(mine => {
    let minenum = mine.getAttribute("data-building")
    let mine1_state = localStateDict[localPlayerDict.planet][minenum];

    console.log(mine1_state)

    if (!mine1_state) {
        if (!mine.disabled) {
            mine.disabled = true;
            mine.style.backgroundColor = '#212121';
            mine.style.cursor = "default"
            const p = mine.querySelector('p');
            p.style.backgroundColor = '#6B3B00';
        }
    }
});

buttons_buildings.forEach(building => {
    let buildingname = building.getAttribute("data-building")
    let building_state = localStateDict.global[buildingname];

    console.log(building_state)

    if (!building_state) {
        if (!building.disabled) {
            building.disabled = true;
            building.style.backgroundColor = '#212121';
            building.style.cursor = "default"
            const p = building.querySelector('p');
            p.style.backgroundColor = '#6B3B00';
        }
    }
});