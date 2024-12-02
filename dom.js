// Module with DOM elements and displayinfo for each planet

export const element = {
header : document.querySelector('.main__header'),
headerLower : document.querySelector('.main__header--lower'),
mainText : document.querySelector('.main__text'),
circumferenceBread : document.querySelector('.main__circumference--bread'),
kmBread : document.querySelector('.main__km--bread'),
maxTempBread : document.querySelector('.main__maxtemp--bread'),
minTempBread : document.querySelector('.main__mintemp--bread'),
moonsBread : document.querySelector('.main__moons--bread'),
wrapper : document.querySelector('.wrapper'),
wrapper2 : document.querySelector('.wrapper2'),
sun : document.querySelector('.wrapper__sun'),
}

export const displayInfo = async(planet) => {
    element.wrapper.style.display = 'none'
    element.wrapper2.style.display = 'flex'
    element.header.innerText = planet.name
    element.headerLower.innerText = planet.latinName
    element.mainText.innerText = planet.desc
    element.circumferenceBread.innerText =  planet.circumference + ' km'
    element.kmBread.innerText = planet.distance + ' km'
    element.maxTempBread.innerText = planet.temp.day + ' ºC'
    element.minTempBread.innerText = planet.temp.night + ' ºC'
    element.moonsBread.innerText = planet.moons
}