const {
    getAllPlaces
} = require('../../../util/functions/server/dbfunctions')

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function GET(request, res) {

    const places = await getAllPlaces();

    return Response.json(places);

}

