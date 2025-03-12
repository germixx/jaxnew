import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';


export async function middleware(req) {
    const { pathname } = req.nextUrl;
    // console.log(`Middleware running on: ${process.env.NEXT_RUNTIME}`);
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

    // Skip middleware for Next.js static files and assets
    if (pathname.startsWith('/_next/') || pathname.startsWith('/assets/') || pathname.startsWith('/favicon.ico')) {
        return NextResponse.next();
    }

    // Maintenance mode: Block all pages except maintenance page
    if (maintenanceMode) {
        return NextResponse.rewrite(new URL('/maintenance', req.url));
    }

    // Define public routes (no authentication required)
    const PUBLIC_ROUTES = [
        '/',
        '/about',
        '/terms',
        '/contact',
        '/api/users/login',
        '/api/users/register',
        '/api/users/forgot'
    ];

    // Allow public routes without authentication
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Authentication check for protected routes
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // console.log('TOKEN IN MIDDLEWARE:', token); // Debugging
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url)); // ⬅️ Redirect to home page
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jwtVerify(token, secretKey, { algorithms: ['HS256'] });
        return NextResponse.next();
    } catch (error) {
        console.log('JWT ERROR:', error.message);
        return NextResponse.redirect(new URL('/', req.url)); // ⬅️ Redirect to home page on invalid token
    }
}

// Apply middleware to all routes except Next.js static files
export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};








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













