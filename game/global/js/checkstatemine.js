import { returnDictData, player_key, state_key} from './storage.js';
import { playerDict } from '../../data/playerdata.js';
import { worldstateDict } from '../../data/worldstatedata.js';

let localPlayerDict = returnDictData(player_key, playerDict);
let localStateDict = returnDictData(state_key, worldstateDict);

let debug = false;

window.addEventListener("load", () => {
    let mine = window.location.href;
    mine = mine.split("/").slice(-2)[0];

    console.log(localPlayerDict.planet)
    console.log("State "+localStateDict[localPlayerDict.planet][mine])

    let mine_state = localStateDict[localPlayerDict.planet][mine];

    if (!mine_state && !debug) {
        window.history.back()
    }
})