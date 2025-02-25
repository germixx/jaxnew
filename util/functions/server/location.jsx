const axios = require('axios');

async function getCityByCoords(lat, lon) {
    console.log(lat, lon)
    let city;
    try {
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=a5282cedc8634e&lat=${lat}&lon=${lon}&format=json`)
            .then(re => {
                return city = re.data.address;
            })

        return city;
    } catch (err) {
        console.error(err)
    }

}

exports.getCityByCoords = getCityByCoords;