const {
    getPlaceData
} = require('../../../../util/functions/server/dbfunctions')


export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function GET(request, {params}) {
    
    if (params.placeID !== undefined || params.placeID !== 'undefined') {
        const placeData = await getPlaceData(params.placeID);
        return Response.json(placeData);
    } else {
        return Response.json({status: false, message: 'No param ID'})
    }
    
}