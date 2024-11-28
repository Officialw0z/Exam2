const header = document.querySelector('.main__header')
const headerLower = document.querySelector('.main__header--lower')
const mainText = document.querySelector('.main__text')
const circumferenceBread = document.querySelector('.main__circumference--bread')
const kmBread = document.querySelector('.main__km--bread')
const maxTempBread = document.querySelector('.main__maxtemp--bread')
const minTempBread = document.querySelector('.main__mintemp--bread')
const moonsBread = document.querySelector('.main__moons--bread')
const wrapper = document.querySelector('.wrapper')
const wrapper2 = document.querySelector('.wrapper2')

const planet0 = document.querySelector('.wrapper__sun')
const planet1 = document.getElementById('planet1')
const planet2 = document.getElementById('planet2')
const planet3 = document.getElementById('planet3')
const planet4 = document.getElementById('planet4')
const planet5 = document.getElementById('planet5')
const planet6 = document.getElementById('planet6')
const planet7 = document.getElementById('planet7')
const planet8 = document.getElementById('planet8')

const planetImage = document.querySelector('.planet__outer--outer')

planetImage.addEventListener('click', () => {
    window.location.href = 'index.html'
})

let apiKey = null

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
                    console.error("Ingen data tillgänglig")
                }
            })
        })
    } catch (error) {
        console.error('Error loading SVG:', error)
    }
}

fetchPlanetData()


const getKey = async (apiType, endpoint) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        "method": apiType
    }
   try {
    const res = await fetch(url, options)
    const data = await res.json()
    apiKey = data.key
    console.log("API-KEY:", apiKey)

    let planetsData = await getPlanets('GET','/bodies', apiKey)
    console.log("Planeter:", planetsData)
    return planetsData
   }
   catch (error) {
   console.error("error getting key", error)
}}


const getPlanets = async (apiType, endpoint, key) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType,
        headers: {
            'x-zocom': key
        }
    }

   try {
    const res = await fetch(url, options)
    return await res.json()
   }
   catch (error) {
    console.error("error getting planets:", error)
   }
}

getKey('POST', '/keys')

const displayInfo = async(planet) => {
    wrapper.style.display = 'none'
    wrapper2.style.display = 'flex'
    header.innerText = planet.name
    headerLower.innerText = planet.latinName
    mainText.innerText = planet.desc
    circumferenceBread.innerText =  planet.circumference + ' km'
    kmBread.innerText = planet.distance + ' km'
    maxTempBread.innerText = planet.temp.day + ' ºC'
    minTempBread.innerText = planet.temp.night + ' ºC'
    moonsBread.innerText = planet.moons
}

planet0.addEventListener('click', async ()=> {
    const planet = await getKey('POST', '/keys')
    if (planet) {
        console.log("Stjärnan", planet.bodies[0])
        displayInfo(planet.bodies[0])
    } else {
        console.error("ingen data tillgänglig")
    }
})

