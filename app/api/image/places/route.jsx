'use server';

const {
    getImage
} = require('../../../../util/functions/server/images/functions');

import path from 'path';

const imageDirectory = path.join(process.cwd(), '/public/images/');

export async function GET(request, res) {
    //Example: https://new.jacksonvillians.com/api/image/places?roomID=qXBDZGiVV
    const { searchParams } = new URL(request.url);

    const roomID = searchParams.get("roomID");

    const ImgFolderLocale = path.join(imageDirectory, roomID);

    return getImage(ImgFolderLocale, imageDirectory);

}








// upload image here
export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

// update/replace image here
export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}