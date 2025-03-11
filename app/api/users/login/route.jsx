import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

const {
    checkUser
} = require('../../../../util/functions/server/dbfunctions');

export async function POST(request, res) {
    try {
        // const data = await request.json(); // or request.text()
        const { identifier, password, type } = await request.json();
        
        if (!identifier || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const userData = await checkUser(identifier, password, type);
        
        if (userData.length === 0) {
            return NextResponse.json({ error: "Invalid credentials", type:'identifier' }, { status: 401 });
        }

        const user = userData[0];

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials", type: 'password' }, { status: 401 });
        }

            // Success response (consider JWT for authentication)
        return NextResponse.json({ 
            status: true,
            message: "Login successful", 
            user: { 
                id: user.id, 
                email: user.email, 
                username: user.username , 
                isAdmin: user.isAdmin,
                verified: user.verified,
                banned: user.banned,
                profileImage: user.profileImage
            } 
        });

    } catch (error) {
        console.log(error, ' is error')
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function GET(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}
