import { returnDictData, player_key, stockmarket_key} from '../../global/js/storage.js';
import { playerDict } from '../../data/playerdata.js';
import { stockmarketDict } from '../../data/stockmarketdata.js';

let localPlayerDict = returnDictData(player_key, playerDict);
let localStockmarketDict = returnDictData(stockmarket_key, stockmarketDict)

