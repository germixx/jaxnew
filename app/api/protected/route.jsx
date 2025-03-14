import { NextResponse } from 'next/server';

export async function GET(req) {
    // 🔍 Extract user data from headers
    const userDataHeader = req.headers.get('x-user-data');

    if (!userDataHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Parse the JSON string back into an object
    const userData = JSON.parse(userDataHeader);

    console.log('🔑 User Data:', userData);

    return NextResponse.json({
        message: 'Protected data accessed!',
        user: userData,
    });
}

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}