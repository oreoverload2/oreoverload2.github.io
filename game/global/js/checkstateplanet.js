import { returnDictData, player_key, state_key} from './storage.js';
import { playerDict } from '../../data/playerdata.js';
import { worldstateDict } from '../../data/worldstatedata.js';

let localPlayerDict = returnDictData(player_key, playerDict);
let localStateDict = returnDictData(state_key, worldstateDict);

let debug = true;

window.addEventListener("load", () => {
    console.log(localPlayerDict.planet)
    console.log(localStateDict[localPlayerDict.planet].state)

    let planet_state = localStateDict[localPlayerDict.planet].state;

    if (!planet_state && !debug) {
        window.history.back()
    }
})