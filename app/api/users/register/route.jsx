const {
    registerUser
} = require('../../../../util/functions/server/dbfunctions')


export async function POST(request, res) {

    const data = await request.json(); // or request.text()
    
    const username = data.username;
    const password = data.password;
    const email = data.email;
    const lon = data.longitude;
    const lat = data.latitude;

    let returnData = await registerUser(username, password, email, lat, lon);

    return Response.json(returnData , { status: 200});
}








export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function GET(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}