import { setStorageItem, getStorageItem, returnDictData, player_key, spaceplanetrotation_key } from '../../../global/js/storage.js';
import { resetData } from '../../../global/js/reset_storage.js';
import { playerDict } from '../../../data/playerdata.js';

/* Ring radius */
let radius = 350;

/* Planet size */
let planet_size = 128;

/* Number of markers */
let numMarkers = 10;

/* Calculate the angle between markers */
let angle = (2 * Math.PI) / numMarkers;

/* Initialize rotation angle */
let rotationAngle = getStorageItem(spaceplanetrotation_key);

/* Define function to update rotation angle */
function updateRotationAngle() {
    rotationAngle += 0.005; // increment rotation angle by 1 degree
    if (rotationAngle > 6.275) {
        rotationAngle = 0; // reset rotation angle to 0 after completing a full circle
    }
    setStorageItem(spaceplanetrotation_key, rotationAngle)
    // Loop through each marker and update its position
    for (let i = 1; i <= numMarkers; i++) {
        let marker = document.getElementById("marker-" + i);
        let x = radius * Math.cos((i - 2) * angle + rotationAngle);
        let y = radius * Math.sin((i - 2) * angle + rotationAngle);
        marker.style.left = `calc(50vw - ${planet_size/2}px + ${x}px)`;
        marker.style.top = `calc(50vh - ${planet_size/2}px + ${y}px)`;
    }
    // Schedule the next update
    setTimeout(updateRotationAngle, 100); // replace 10 with the desired delay in milliseconds
}

// Start the loop
updateRotationAngle();


function savePlanet(planet) {
    const playerData = returnDictData(player_key, playerDict)
    playerData.planet = planet
    setStorageItem(player_key, playerData);
    window.location.href=`../planets/${planet}/${planet}.html`
    console.log(getStorageItem(player_key))
}

let markers = []

for (let i = 1; i <= numMarkers; i++) {
    const currmarker = document.getElementById("marker-" + i)
    const planet = currmarker.getAttribute("data-planet");
    markers.push(currmarker);
    currmarker.addEventListener("click", () => {
        savePlanet(planet);
        console.log("Saved planet: "+planet)
    })
}

const devDiv = document.getElementById("dev");

devDiv.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/dev/dev.html"
});

const resetDataB = document.getElementById("data-restet-b");

resetDataB.addEventListener("click", () => {
    resetData();
})