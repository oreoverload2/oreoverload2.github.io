import { returnDictData, ore_key} from '../../global/js/storage.js';
import { oreDict } from '../../data/oredata.js';

let localOreDict = returnDictData(ore_key, oreDict);

const rowElements = document.querySelectorAll('tr[data-ore]');

rowElements.forEach((row) => {
    // Get the data-ore attribute value
    const oreData = row.getAttribute('data-ore');
    // Split the attribute value into an array
    const oreDataArray = oreData.split(', ');
    // Get the ore name and item type
    const planet = oreDataArray[0];
    const oreName = oreDataArray[1];
    const itemType = oreDataArray[2];
    const orenameArray = oreDataArray[1].split('-');

    const oreNameCapitalized = orenameArray.map(str => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('; ');

    // Get the image element
    const span = row.querySelector('span');

    span.textContent = oreNameCapitalized;

    const img = row.querySelector('img');

    // Set the image source based on the ore name and item type
    const imageUrl = `../../img/${itemType}/${planet}/${oreName}.png`;
    const imageObj = new Image();
    imageObj.onload = () => {
        // Image is valid
        img.src = imageUrl;
    };
    imageObj.onerror = () => {
        // Image is invalid
        img.src = '../../img/template/template.png';
    };
    imageObj.src = imageUrl;
});
