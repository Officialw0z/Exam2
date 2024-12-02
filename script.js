// Mainscript file with two eventlistener and my main fetch where i get all information from other files.
// My main fetch file fetches all SVG files and then transform it into the data that is displayed to all planets.

import {element} from "./dom.js";
import {getKey} from "./api.js";
import {displayInfo} from "./dom.js";


const planetImage = document.querySelector('.planet__outer--outer')

planetImage.addEventListener('click', () => {
    window.location.href = 'index.html'
})

element.sun.addEventListener('click', async ()=> {
    const planet = await getKey('POST', '/keys')
    if (planet) {
        console.log("Stjärnan", planet.bodies[0])
        displayInfo(planet.bodies[0])
    } else {
        console.error("ingen data tillgänglig")
    }
})

const fetchPlanetData = async () => {
    try {
        const response = await fetch('./Pictures/planets.svg')
        const data = await response.text()
        document.getElementById('svg-container').innerHTML = data

        document.querySelectorAll('circle').forEach((planet, index) => {
            const planetId = planet.id
            planet.style.transformOrigin = `${planet.getAttribute('cx')}px ${planet.getAttribute('cy')}px`

            planet.addEventListener('click', async () => {
                const planetData = await getKey('POST', '/keys')
                if (planetData) {
                    const planetInfo = planetData.bodies[index+1]
                    console.log(`Planet ${planetId}:`, planetInfo)
                    displayInfo(planetInfo)
                } else {
                    console.error("No data available")
                }
            })
        })
    } catch (error) {
        console.error('Error:', error)
    }
}

fetchPlanetData()