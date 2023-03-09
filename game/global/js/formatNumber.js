import { returnDictData, player_key } from "./storage.js";
import { playerDict } from "../../data/playerdata.js";



function formatNumber(num) {
    let localPlayerDict = returnDictData(player_key, playerDict);
    const unit_type = localPlayerDict.unit_type;

    const units_long = [
        '', ' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion',
        ' Sextillion', ' Septillion', ' Octillion', ' Nonillion', ' Decillion', ' Undecillion',
        ' Duodecillion', ' Tredecillion', ' Quattuordecillion', ' Quindecillion', ' Sedecillion',
        ' Septendecillion', ' Octodecillion', ' Novemdecillion'];

    const units_short = [''].concat(units_long.slice(1).map(unit => unit.slice(0, 4)));
    let units = "short";
    if (unit_type === "short") {
        units = units_short;
    } else {
        units = units_long;
    }
    let formatted = '';
    for (let i = 0; i < units.length; i++) {
        let size = Math.pow(10, (i + 1) * 3);
        if (size > num) {
            if (i != 0) {
                if (i != 1) {
                    formatted = (num / Math.pow(10, i * 3)).toFixed(3) + units[i];
                    break;
                } else if (i == 1) {
                    formatted = (num / Math.pow(10, i * 3)).toFixed(2) + units[i];
                    break;
                }
            } else {
                formatted = (num / Math.pow(10, i * 3)).toFixed(0) + units[i];
                break;
            }
        }
    }
    if (formatted != "") {
        return formatted;
    } else {
        return (num / Math.pow(10, units.length * 3)).toFixed(3) + units.at(-1)
    }
}

export { formatNumber }