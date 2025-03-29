const {
    getPlaceData
} = require('../../../../util/functions/server/dbfunctions');

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // ✅ Change * to your frontend URL in production
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
};

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function GET(request, {params}) {
    const param = await params;
    if (param.placeID !== undefined || param.placeID !== 'undefined') {
        const placeData = await getPlaceData(param.placeID);
        return Response.json(placeData, {
            status: 200,
            headers: corsHeaders
    });
    } else {
        return Response.json({status: false, message: 'No param ID'})
    }
    
}