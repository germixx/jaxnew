'use server';

const {
    getImage
} = require('../../../../util/functions/server/images/functions');

import path from 'path';

const imageDirectory = path.join(process.cwd(), '/public/users/');

export async function GET(request, res) {

    const { searchParams } = new URL(request.url);

    const userID = searchParams.get("uID");

    const ImgFolderLocale = path.join(imageDirectory, userID);

    return getImage(ImgFolderLocale, imageDirectory);

    return Response.json({ message: 'Method Not Alloweds' }, { status: 405 });
}

// upload here
export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

