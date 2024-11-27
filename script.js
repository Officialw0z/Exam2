fetch('./Pictures/planets.svg')
    .then(response => response.text())
    .then(data => {
        document.getElementById('svg-container').innerHTML = data;
        document.querySelectorAll('circle').forEach(planet => {
            const cx = planet.getAttribute('cx');
            const cy = planet.getAttribute('cy');
            planet.style.transformOrigin = `${cx}px ${cy}px`;
        });
    })
    .catch(error => console.error('Error loading SVG:', error));

const getKey = (apiType, endpoint) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType
    }
    fetch (url, options).then(res => {
        return res.json()
    }).then (res => {
        console.log(res)
        getPlanets('GET', '/bodies', res.key)
    })
}

const getPlanets = async (apiType, endpoint, key) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType,
        headers: {
            'x-zocom': key
        }
    }

    const bodiesData = await fetch(url, options)
    const bodiesDataJson = await bodiesData.json()

    console.log(bodiesDataJson)
}

getKey('POST', '/keys')