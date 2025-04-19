import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';

const { 
    getUsers
} = require('../../../../util/functions/server/dbfunctions');

const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://jacksonvillians.com, https://www.jacksonvillians.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
};

export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(request, res) {
    console.log('because i anted topp part of same tribe')
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });

        const users = await getUsers();

        return Response.json(users, {
            status: 200,
            headers: corsHeaders
        });


    } catch (error) {
        console.error('JWT Verification Failed:', error.message);
        return NextResponse.json({ status: false, message: 'Invalid token' }, { status: 401 });
    }
    // return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}



















export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}