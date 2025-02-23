const bcrypt = require('bcrypt');

const connection = require('../../db');

async function getAllPlaces () {
    return new Promise((resolve, reject) => { 
        connection.query('SELECT * FROM tblLocations WHERE deleted = 0 AND active = 1', [], (err, rows) =>{
            if (err) throw err;
            resolve({ status: true, rows})
        })

    })

}

async function getPlaceData (roomID) {
    
    return new Promise((resolve, reject) => { 
        connection.query('SELECT * FROM tblLocations WHERE room_id = ?', [roomID], (err, rows) =>{
            
            if (err) throw err;

            resolve({ status: true, rows})
        })

    })

}

async function addNewPlace (roomid, name, address, city, state, zip, phone, neighborhood, latitude, longitude, description, category, active) {

    function formatPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/\D/g, '');
    }

    active = active === 'true' ? '1' : '0'; 

    const imageLink = 'https://new.jacksonvillians.com/api/image?roomID=' + roomid;

    return new Promise((resolve, reject) => { 
        
        connection.query('INSERT INTO tblLocations(room_id, locationName, locationAddress, locationCity, locationState, locationZipCode, locationPhoneNumber, locationLatitude, locationLongitude, locationCategory, locationImage, neighborhood, description, locationRating, active, deleted) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)', 
            [roomid, name, address, city, state, zip, formatPhoneNumber(phone), latitude, longitude, category, imageLink, neighborhood, description, '0', active, '0'], (err, rows) => { 

                if (err) throw err;

                resolve({ status: true, rows})

        })
    })
}

async function registerUser (username, password, email)  {
    
    const saltRounds = 10;
    console.log(email, 'is email')
    return new Promise((resolve, reject) => { 
        
        connection.query('SELECT * FROM tblUsers WHERE email = ?', [email], (err, rows) => { 

            if (err) throw err;
            
            if (rows.length > 0) {
                console.log(rows, ' is rowsssss')
                resolve({ status: false, errorType: 'email', errorMessage: 'Email is already in use. Please try again.' });
                return;
            }

            connection.query('SELECT * FROM tblUsers WHERE username = ?', [username], (err, rows) => { 

                if (err) throw err;
            
                if (rows.length > 0) {
                    console.log(rows, ' is rowsssss')
                    resolve({ status: false, errorType: 'username', errorMessage: 'Username is already in use. Please try again.' });
                    return;
                }

                // bcrypt.hash(password, saltRounds, function (err, hash) { 


                // });

            });

        });



        // resolve({status: true, data: 'data'})
    })

}

module.exports = {
    getAllPlaces,
    getPlaceData,
    addNewPlace,
    registerUser
}

