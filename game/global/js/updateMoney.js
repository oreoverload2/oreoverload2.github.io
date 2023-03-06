import { returnDictData, player_key} from './storage.js';
import { playerDict } from '../../data/playerdata.js';

let localPlayerDict = returnDictData(player_key, playerDict);

function updateBalance() {
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = "◈ "+parseFloat(localPlayerDict.money).toFixed(2)
}

updateBalance()