import * as LINKS from '../../links'

function getLocationsAdmin() {
    return new Promise((resolve, reject) => {
        fetch(`${LINKS.ADMINPLACES}`, {
            method: 'GET',
            credentials: 'include'
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

async function editPlaceDataAdmin (data) {
    return new Promise((resolve, reject) => {
        fetch(`${LINKS.PLACE }`, {
            method: 'PUT',
            // credentials: 'include',
            // headers: {
            //     "Content-Type": "multipart/form-data"
            //   },
              body: data
        }).then(res => res.json())
            .then((json) => {

                if (json.status) {
                    resolve({ status: true })
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
    getLocationsAdmin,
    editPlaceDataAdmin
}