const bcrypt = require('bcrypt');

const connection = require('../../db');

import { connection2 } from '../../db2';

const getLocationFromCoords = require('./location');

// Function to sanitize username (disallow @ for usernames)
const sanitizeIdentifier = (input) => {
    const trimmed = input.trim();
  
    if (/\S+@\S+\.\S+/.test(trimmed)) {
      return trimmed; // Return as-is if it's an email
    } else {
      return trimmed.replace(/[^a-zA-Z0-9._-]/g, ""); // Remove unwanted chars for username
    }
};

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

    const hashedPassword = await hashPass(password, 10);

    let locationNumber = null;
    let locationRoad = null;
    let locationNeighborhood = null;
    let locationCity = null;
    let locationCounty = null;
    let locationState = null;
    let locationZipCode = null;
    let locationCountry = null;
    let locationCountryCode = null;
    let locationSet = null;
    let locationLat = latitude;
    let locationLon = longitude;
    let timeSignedUp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let verified = 0;
    let banned = 0;
    let isAdmin = 0;
    let emlMarketing = 0;
    let deleted = 0;
    let passwords = hashedPassword;
    let profileImage = 'https://jacksonvillians.com/api/image/users?uID=';

    if (latitude !== null && longitude !== null) {
        try {
            const locationAddress = await returnAddress(latitude, longitude);
            locationNumber = locationAddress.house_number;
            locationRoad = locationAddress.road;
            locationNeighborhood = locationAddress.neighbourhood;
            locationCity = locationAddress.city;
            locationCounty = locationAddress.county;
            locationState = locationAddress.state;
            locationZipCode = locationAddress.postcode;
            locationCountry = locationAddress.country;
            locationCountryCode = locationAddress.country_code;
            locationSet = 1;
        } catch (error) {
            console.error("Geocoding error:", error);
        }

    }

    // insert into Database here, received ID
    [rows] = await con2.execute(
        "INSERT INTO tblUsers (email, password, username, profileImage, timeSignedUp, locationNumber, locationRoad, locationNeighborhood, locationCity, locationCounty, locationState, locationZipCode, locationCountry, locationCountryCode, locationLat, locationLon, locationSet, emlMarketing, deleted, verified, banned, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, passwords, username, profileImage, timeSignedUp, locationNumber, locationRoad, locationNeighborhood, locationCity, locationCounty, locationState, locationZipCode, locationCountry, locationCountryCode, locationLat, locationLon, locationSet, emlMarketing, deleted, verified, banned, isAdmin]
    );
    
    let DBID = rows.insertId;
    if (rows.length > 0) {
        return { status: false, errorType: 'signup', errorMessage: 'Error Signing Up. Please try again.' };
    }

    profileImage = `https://jacksonvillians.com/api/image/users?uID=${DBID}`;
    // update user with updated profile image link here
    [rows] = await con2.execute(
        "UPDATE tblUsers SET profileImage = ? WHERE id = ?",
        [profileImage, DBID]
    );

    return ({ status: true, ID: DBID, email, username, profileImage }); //userdetails here after DB input
}

async function checkUser (identifier, password, type, NextResponse) {

    const con2 = await connection2();

    const sanitized = sanitizeIdentifier(identifier);
    
    const isEmail = /\S+@\S+\.\S+/.test(sanitized);

    const query = isEmail
      ? "SELECT id, email, username, password, isAdmin, verified, banned, profileImage FROM tblUsers WHERE email = ?"
      : "SELECT id, email, username, password, isAdmin, verified, banned, profileImage FROM tblUsers WHERE username = ?";
    
    const [rows] = await con2.execute(query, [sanitized]);
    
    return rows;

}

module.exports = {
    getAllPlaces,
    getPlaceData,
    addNewPlace,
    registerUser,
    checkUser
}

