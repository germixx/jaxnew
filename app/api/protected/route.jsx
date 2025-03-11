import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({ message: "This is protected data" });
}

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405 });
}