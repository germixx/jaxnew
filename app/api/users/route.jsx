export async function GET(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
  }

  export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
  }

  export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
  }