// Module for API calls with apikeys to then fetch each planet with that key

export const getKey = async (apiType, endpoint) => {
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

let apiKey = null
export const getPlanets = async (apiType, endpoint, key) => {
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