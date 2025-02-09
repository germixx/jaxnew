const connection = require('../../db');

async function getAllPlaces () {
    return new Promise((resolve, reject) => { 
        connection.query('SELECT * FROM tblLocations WHERE deleted = 0 AND active = 1', [], (err, rows) =>{
            if (err) throw err;
            resolve({ status: true, rows})
        })

    })

}


 module.exports = {
    getAllPlaces
 }

