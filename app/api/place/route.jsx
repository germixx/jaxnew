const {
    getPlaceData,
    addNewPlace
} = require('../../../util/functions/server/dbfunctions');

import { NextResponse } from "next/server";

import fs from "fs";

import path from "path";

export const config = { api: { bodyParser: false } };

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
        const locationLongitude = formData.get('locationLatitude');
        const locationDescription = formData.get('locationDescription');
        const locationCategory = formData.get('locationCategory');
        const active = formData.get('active');
        const file = formData.get("image");

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create the uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), "public/images/" + roomID);
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save file locally
        const filePath = path.join(uploadDir, file.name);
        
        fs.writeFileSync(filePath, buffer);

        addNewPlace(roomID, locationName, locationAddress, locationCity, locationState, locationZipcode, locationPhoneNumber, locationNeighborhood, locationLatitude, locationLongitude, locationDescription, locationCategory, active);

    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return Response.json({ status: true, message: 'Successfully added.' });
    // return NextResponse.json({
    //     message: "Upload successful",
    //     name,
    //     email,
    //     imageUrl: `/uploads/${file.name}`, // Local URL
    //   });
}













export async function GET(request, res) {

    const placeData = await getPlaceData();

    return Response.json(placeData);

}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}