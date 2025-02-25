const bcrypt = require('bcrypt');

const connection = require('../../db');

import { connection2 } from '../../db2';

const getLocationFromCoords = require('./location');

async function getAllPlaces() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM tblLocations WHERE deleted = 0 AND active = 1', [], (err, rows) => {
            if (err) throw err;
            resolve({ status: true, rows })
        })

    })

}

async function getPlaceData(roomID) {

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM tblLocations WHERE room_id = ?', [roomID], (err, rows) => {

            if (err) throw err;

            resolve({ status: true, rows })
        })

    })

}

async function addNewPlace(roomid, name, address, city, state, zip, phone, neighborhood, latitude, longitude, description, category, active) {

    function formatPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/\D/g, '');
    }

    active = active === 'true' ? '1' : '0';

    const imageLink = 'https://new.jacksonvillians.com/api/image?roomID=' + roomid;

    return new Promise((resolve, reject) => {

        connection.query('INSERT INTO tblLocations(room_id, locationName, locationAddress, locationCity, locationState, locationZipCode, locationPhoneNumber, locationLatitude, locationLongitude, locationCategory, locationImage, neighborhood, description, locationRating, active, deleted) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)',
            [roomid, name, address, city, state, zip, formatPhoneNumber(phone), latitude, longitude, category, imageLink, neighborhood, description, '0', active, '0'], (err, rows) => {

                if (err) throw err;

                resolve({ status: true, rows })

            })
    })
}

const returnAddress = async (latitude, longitude) => {
    try {
        return await getLocationFromCoords.getCityByCoords(latitude, longitude)
    } catch (error) {
        return { message: "Server error", error: error.message };
    }

}

const hashPass = async (password) => {
    return bcrypt.hash(password, 10);
}

async function registerUser(username, password, email, latitude, longitude) {

    const con2 = await connection2();

    // check if email exists in DB
    let [rows] = await con2.execute(
        "SELECT id FROM tblUsers WHERE email = ? LIMIT 1",
        [email]
    );

    if (rows.length > 0) {
        return { status: false, errorType: 'email', errorMessage: 'Email is already in use. Please try again.' };
    }

    // Check if username exists in DB
    [rows] = await con2.execute(
        "SELECT id FROM tblUsers WHERE username = ? LIMIT 1",
        [username]
    );

    if (rows.length > 0) {
        return { status: false, errorType: 'username', errorMessage: 'Username is already in use. Please try again.' };
    }

    const locationAddress = await returnAddress(latitude, longitude);

    const hashedPassword = await hashPass(password, 10);
    console.log(hashedPassword, ' is hashed')

}

module.exports = {
    getAllPlaces,
    getPlaceData,
    addNewPlace,
    registerUser
}

