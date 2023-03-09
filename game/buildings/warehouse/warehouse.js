import { returnDictData, ore_key, player_key, setStorageItem} from '../../global/js/storage.js';
import { formatNumber} from '../../global/js/formatNumber.js';
import { oreDict } from '../../data/oredata.js';
import { playerDict } from '../../data/playerdata.js';

let localPlayerDict = returnDictData(player_key, playerDict);
let localOreDict = returnDictData(ore_key, oreDict);

const rowElements = document.querySelectorAll('tr[data-ore]');

rowElements.forEach((row) => {
    const oreData = row.getAttribute('data-ore');
    const oreDataArray = oreData.split(', ');
    const planet = oreDataArray[0];
    const oreName = oreDataArray[1];
    const itemType = oreDataArray[2];
    const orenameArray = oreDataArray[1].split('-');

    const oreNameCapitalized = orenameArray.map(str => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('; ');

    const span = row.querySelector('span');

    span.textContent = oreNameCapitalized;

    const img = row.querySelector('img');

    const imageUrl = `../../img/${itemType}/${planet}/${oreNameCapitalized}.png`;
    const imageObj = new Image();
    imageObj.onload = () => {
        img.src = imageUrl;
    };
    imageObj.onerror = () => {
        img.src = '../../img/template/template.png';
    };
    imageObj.src = imageUrl;
});

function updateValues(planet) {

    for (let ore in localOreDict[planet]) {
        let amount = localOreDict[planet][ore].amount
        console.log(amount);
        // Get all the <tr> elements that have a data-ore attribute
        const trList = document.querySelectorAll('[data-ore]');

        // Loop through each <tr> element and set the ore-amount text
        trList.forEach(tr => {
            const [oreplanet, oreName] = tr.dataset.ore.split(', ');
            const oreNameFix = oreName.replace(" ", "_")
            if (oreplanet === planet && oreNameFix === ore) {
                tr.querySelector('.ore-amount').textContent = formatNumber(amount);
            }
        });
    }
}

updateValues("novaria");
updateValues("aethera");
updateValues("helion");
updateValues("terra");
updateValues("arcadia");
updateValues("cerulea");

// Get the progress bar element
const progressBar = document.getElementById('progress-bar-id');

// Get the percent value element
const percentVal = document.createElement('div');
percentVal.classList.add('percent-number');
progressBar.appendChild(percentVal);



// Set initial values
let minValue = localPlayerDict.warehouse_min;
let maxValue = localPlayerDict.warehouse_max;

let amounts = [];

for (let planet in localOreDict) {
    for (let ore in localOreDict[planet]) {
        amounts.push(localOreDict[planet][ore].amount);
    }
}

function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
}

console.log(amounts)

let currentValue = sumArray(amounts);

// Update the progress bar and values
function updateProgressBar() {
    const percent_type = localPlayerDict.warehouse_perType;
    const percent = (currentValue - minValue) / (maxValue - minValue) * 100;
    const percent_text = `${currentValue} | ${maxValue}`;
    const percent_text_perc = `${percent.toFixed(3)}%`;
    progressBar.style.width = `${percent}%`;
    if (percent_type === "short") {
        percentVal.textContent = percent_text_perc;
    } else {
        percentVal.textContent = percent_text;
    }
    
    // Change color if over 90%
    if (percent > 90) {
        progressBar.classList.add('red');
    } else {
        progressBar.classList.remove('red');
    }
}

progressBar.addEventListener("click", () => {
    if (localPlayerDict.warehouse_perType === "short") {
        localPlayerDict.warehouse_perType = "long";
        setStorageItem(player_key, localPlayerDict)
        updateProgressBar()
    } else {
        localPlayerDict.warehouse_perType = "short";
        setStorageItem(player_key, localPlayerDict)
        updateProgressBar()
    }
})

// Set initial progress bar
updateProgressBar();