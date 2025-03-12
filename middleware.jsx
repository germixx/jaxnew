import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';


const PUBLIC_ROUTES = ['/', '/api/users/login', '/api/auth/logout',];

export async function middleware(req) {

    const { pathname } = req.nextUrl;

    // const url = req.nextUrl;

    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

    // Maintenance mode enabled
    if (maintenanceMode && !PUBLIC_ROUTES.includes(pathname)) {
        return new NextResponse(JSON.stringify({ message: 'Site is under maintenance' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // const allowedPaths = ['/maintenance', '/api', '/admin', '/_next', '/favicon.ico', '/sitemap.xml'];
    // console.log(maintenanceMode, ' is mainten')
    // if (maintenanceMode) {
    //     return NextResponse.rewrite(new URL('/maintenance', req.url));
    // }

    // if (allowedPaths.some((path) => url.pathname.startsWith(path))) {
    //     return NextResponse.next();
    // }

    // ✅ Allow requests to /assets/*
    if (pathname.startsWith('/assets/')) {
        return NextResponse.next();
    }

    // Skip auth check for public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Authentication check
    const token = req.cookies.get('token')?.value;
    console.log(token, ' si le token')
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const secretKey =  new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });
        console.log('TOKEN DECODED:', payload); // Debugging: Check if decoding works
        return NextResponse.next();
    } catch (error) {
        console.log('JWT ERROR:', error.message); // Debugging: Log error details
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

// Apply middleware to all routes
// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };

// ✅ Only protect API routes that require authentication
export const config = {
    matcher: ['/dashboard', '/profile', '/api/protected/:path*'], 
};


























// const SECRET_KEY = process.env.JWT_SECRET;
// const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE == true;
// console.log(MAINTENANCE_MODE, typeof (MAINTENANCE_MODE));


// // Define protected routes
// const protectedRoutes = ['/dashboard', '/profile', '/admin'];

// // Admin users can access the site even in maintenance mode
// const adminRoutes = ['/admin'];

// export async function middleware(req) {
//     const { pathname } = req.nextUrl;
//     const token = await cookies().get('token')?.value;

//     // Maintenance mode check
//     if (MAINTENANCE_MODE && !adminRoutes.includes(pathname)) {
//         return NextResponse.redirect(new URL('/maintenance', req.url));
//     }

//     // Protect certain routes
//     if (protectedRoutes.includes(pathname)) {
//         if (!token) {
//             return NextResponse.redirect(new URL('/', req.url));
//         }

//         try {
//             const decoded = jwt.verify(token, SECRET_KEY);
//             if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
//                 return NextResponse.redirect(new URL('/unauthorized', req.url));
//             }
//         } catch (err) {
//             return NextResponse.redirect(new URL('/', req.url));
//         }
//     }

//     return NextResponse.next();
// }

// // Apply middleware to specific routes
// export const config = {
//     matcher: ['/:path*'],
// };

// export const config = {
//     matcher: "/api/protected/:path*", // Apply to protected routes
// };


















//working below
// export function middleware(req) {

//     const url = req.nextUrl;

//     const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

//     // Allow access to these paths even during maintenance
//     const allowedPaths = ['/maintenance', '/api', '/admin', '/_next', '/favicon.ico', '/sitemap.xml'];

//     if (allowedPaths.some((path) => url.pathname.startsWith(path))) {
//         return NextResponse.next();
//     }

//     // Redirect all users to maintenance page if mode is enabled
//     if (isMaintenanceMode) {
//         return NextResponse.rewrite(new URL('/maintenance', req.url));
//     }

//     return NextResponse.next();
// }

// // Apply middleware to all routes except maintenance and login
// export const config = {
//     matcher: "/((?!maintenance|login).*)",
// };
// // working above here













