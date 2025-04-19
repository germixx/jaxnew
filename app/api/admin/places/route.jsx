import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';

const {
    getPlacesAdmin
} = require('../../../../util/functions/server/dbfunctions');


export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://jacksonvillians.com, https://www.jacksonvillians.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function GET(request, res) {
    
    const placeData = await getPlacesAdmin();

    // return Response.json(placeData);
    return new Response(JSON.stringify(placeData), {
        headers: corsHeaders,
      });

}

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}