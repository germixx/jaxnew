import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const bcrypt = require('bcrypt');

import jwt from "jsonwebtoken";

import { serialize } from "cookie";

const {
    checkUser,
    sanitizeIdentifier
} = require('../../../../util/functions/server/dbfunctions');

const RATE_LIMIT = 5; // Max attempts per 15 minutes
const ATTEMPT_RESET_TIME = 15 * 60 * 1000; // 15 minutes
const failedLoginAttempts = new Map(); // Track failed login attempts

// async function setCookie(refreshToken) {
//     await (await cookies()).set("refreshToken", refreshToken, {
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === "production",
//         secure: true,
//         sameSite: "strict",
//         path: "/",
//     });

// }



async function setCookie(token) {
    await (await cookies()).set({
        name: 'token',
        value: token,
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        sameSite: 'strict',
        path: '/',
    });

}


export async function POST(request, res) {
    try {
        // const data = await request.json(); // or request.text()
        const { identifier, password, type } = await request.json();

        if (!identifier || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const sanitizedIdentifier = sanitizeIdentifier(identifier);

        // Rate-limit check
        const now = Date.now();
        if (!failedLoginAttempts.has(sanitizedIdentifier)) {
            failedLoginAttempts.set(sanitizedIdentifier, { count: 0, timestamp: now });
        }

        const attemptData = failedLoginAttempts.get(sanitizedIdentifier);
        if (now - attemptData.timestamp > ATTEMPT_RESET_TIME) {
            attemptData.count = 0;
            attemptData.timestamp = now;
        }

        if (attemptData.count >= RATE_LIMIT) {
            return NextResponse.json({ error: "Too many failed attempts. Try again later.", type: 'lockout' }, { status: 429 });
        }

        const userData = await checkUser(sanitizedIdentifier, password, type);

        if (userData.length === 0) {
            return NextResponse.json({ error: "Invalid credentials", type: 'identifier' }, { status: 401 });
        }

        const user = userData[0];

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            attemptData.count++;
            return NextResponse.json({ error: "Invalid credentials", type: 'password' }, { status: 401 });
        }

        // Reset failed attempts on success
        failedLoginAttempts.delete(sanitizedIdentifier);

        // Generate JWT Tokens
        const accessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        // setCookie(accessToken)
        // Set HttpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set({ //cookies().set({
            name: 'token',
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        // Success response (consider JWT for authentication)
        return NextResponse.json({
            status: true,
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
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
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function GET(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}
