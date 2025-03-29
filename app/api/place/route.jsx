const {
    getPlaceData,
    addNewPlace,
    updatePlaceData
} = require('../../../util/functions/server/dbfunctions');

import { NextResponse } from "next/server";

import fs from "fs/promises";

import path from "path";

// Move to support functions file
function formatName(name) {
    return name
        .toLowerCase()         // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-'); // Replace spaces with dashes
}

export const config = { api: { bodyParser: false } };

// export async function OPTIONS(req) {
//     return new Response(null, {
//       status: 204, // ✅ No content, prevents redirects
//       headers: {
//         "Access-Control-Allow-Origin": "*", // Change to match your frontend domain
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         "Access-Control-Allow-Credentials": "true", // If using authentication
//       },
//     });
//   }

export async function POST(request, res) {

    try {

        const formData = await request.formData();

        const roomID = formData.get('roomID');
        const locationName = formData.get('locationName');
        const locationAddress = formData.get('locationAddress');
        const locationCity = formData.get('locationCity');
        const locationState = formData.get('locationState');
        const locationZipcode = formData.get('locationZipcode');
        const locationPhoneNumber = formData.get('locationPhoneNumber');
        const locationNeighborhood = formData.get('locationNeighborhood');
        const locationLatitude = formData.get('locationLatitude');
        const locationLongitude = formData.get('locationLongitude');
        const locationDescription = formData.get('locationDescription');
        const locationCategory = formData.get('locationCategory');
        const active = formData.get('active');

        const file = formData.get("image");

        if(file) {
            
            const arrayBuffer = await file.arrayBuffer();

            const buffer = Buffer.from(arrayBuffer);
            
            const uploadDir = path.join(process.cwd(), "public/images/" + roomID);

            // Get file extension
            const ext = file.name.split('.').pop();

            // format name - remove spaces, special characters, and lowercare into string
            const formattedName = formatName(locationName);

            // rename filename
            const newFileName = `${formattedName}.${ext}`;

            // file path with new name
            const filePath = path.join(uploadDir, newFileName);

            try {
            
                // Check if folder exists
                await fs.access(uploadDir, fs.constants.F_OK);
                
                // Write file
                await fs.writeFile(filePath, buffer);
    
            } catch (error) {
    
                // Create folder is does not exist
                await fs.mkdir(uploadDir, { recursive: true });
                
                // Write file
                await fs.writeFile(filePath, buffer);
    
            }

        }

        let resultz = await addNewPlace(roomID, locationName, locationAddress, locationCity, locationState, locationZipcode, locationPhoneNumber, locationNeighborhood, locationLatitude, locationLongitude, locationDescription, locationCategory, active);

        return Response.json({
            status: true,
            id: resultz.rows.insertId,
            message: 'Successfully added.'
        });

    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

}

export async function PUT(request, res) {

    const formdata = await request.formData();
    
    const ID = formdata.get('id');
    const roomID = formdata.get('room_id');
    const locationName = formdata.get('locationName');
    const locationAddress = formdata.get('locationAddress');
    const locationCity = formdata.get('locationCity');
    const locationState = formdata.get('locationState');
    const locationZipcode = formdata.get('locationZipCode');
    const locationPhoneNumber = formdata.get('locationPhoneNumber');
    const locationNeighborhood = formdata.get('neighborhood');
    const locationLatitude = formdata.get('locationLatitude');
    const locationLongitude = formdata.get('locationLongitude');
    const locationDescription = formdata.get('description');
    const locationCategory = formdata.get('locationCategory');
    const locationRating = formdata.get('locationRating');
    const active = formdata.get('active');
    const deleted = formdata.get('deleted');

    const file = formdata.get("image");
    
    if(file) {
       
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadDir = path.join(process.cwd(), "public/images/" + roomID);
    
        // Delete existing files**
        const files = await fs.readdir(uploadDir);
        await Promise.all(files.map(file => fs.unlink(path.join(uploadDir, file))));

        // Get file extension
        const ext = file.name.split('.').pop();

        // format name - remove spaces, special characters, and lowercare into string
        const formattedName = formatName(locationName);

        // rename filename
        const newFileName = `${formattedName}.${ext}`;

        // file path with new name
        const filePath = path.join(uploadDir, newFileName);

        try {
            
            // Check if folder exists
            await fs.access(uploadDir, fs.constants.F_OK);
            
            // Write file
            await fs.writeFile(filePath, buffer);

        } catch (error) {

            // Create folder is does not exist
            await fs.mkdir(uploadDir, { recursive: true });
            
            // Write file
            await fs.writeFile(filePath, buffer);

        }

    }

    let updateDB = await updatePlaceData(locationName, locationAddress, locationCity, locationState, locationZipcode, locationPhoneNumber, locationNeighborhood, locationLatitude, locationLongitude, locationCategory, locationDescription, locationRating, active, deleted, ID);

    return Response.json({ status: true }, { 
        status: 200,
        // headers: {
        //     "Access-Control-Allow-Origin": "https://www.jacksonvillians.com",
        //     "Content-Type": "application/json",
        // }, 
    });

    // return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}



export async function GET(request, res) {

    const placeData = await getPlaceData();

    return Response.json(placeData);

}

