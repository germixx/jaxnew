import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';

const {
    getAllPlaces
} = require('../../../util/functions/server/dbfunctions')

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function GET(request, res) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        // console.log(token, ' is places toens')
        // if (!token) {
        //     return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
        // }
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });

        const places = await getAllPlaces();
        // console.log(places, 'places here')
        return Response.json(places);
        // return NextResponse.json({
        //     status: true,
        //     locations: places,
        //     user: payload
        // });
    } catch (error) {
        console.error('JWT Verification Failed:', error.message);
        return NextResponse.json({ status: false, message: 'Invalid token' }, { status: 401 });
    }

}

