import * as LINKS from '../links'

function fetchLocations () {
    return new Promise((resolve, reject) => {
        fetch(`${LINKS.PLACES}`, {
            method: 'GET',
        }).then(res => res.json())
            .then((json) => {
                
                if (json.status) {
                    resolve({ locations: json.rows, status: true })
                } else {
                    reject({ status: false })
                    return false;
                }
            })
            .catch(err => {
                throw err
            });

    }).catch(e => console.log(e))
}

function fetchPlaceData (id) {
    
    return new Promise((resolve, reject) => {
        fetch(`${LINKS.PLACES + "/" + id}`, {
            method: 'GET',
        }).then(res => res.json())
            .then((json) => {
                
                if (json.status) {
                    resolve({ locations: json.rows, status: true })
                } else {
                    reject({ status: false })
                    return false;
                }
            })
            .catch(err => {
                throw err
            });
    }).catch(e => console.log(e))
}

module.exports = { 
    fetchLocations,
    fetchPlaceData
}