import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { cookies } from 'next/headers';

// ✅ Define admin-only routes
const ADMIN_ROUTES = ['/admin', '/admin/dashboard', '/admin/settings'];

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    console.log('Middleware triggered for:', pathname); // Debugging
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
    // console.log('All Cookies:', cookieStore.getAll()); // ✅ Debugging cookies
    const token = cookieStore.get('token')?.value;
    // console.log('TOKEN IN MIDDLEWARE:', token); // Debugging
    if (!token) {
        console.warn('🚨 No token found! Redirecting to home.');
        return NextResponse.redirect(new URL('/', req.url)); // ⬅️ Redirect to home page
    }

    try {

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });

        // console.log('✅ Decoded User Data:', payload);

        const userRole = payload.role || 'user'; // Default to 'user' if no role
        // console.log(userRole, ' is the role: ');
        // console.log(`👤 User Role: ${userRole}`);

        // 🚨 Restrict access to admin-only pages
        if (ADMIN_ROUTES.includes(pathname) && userRole !== 'admin') {
            console.warn('⛔ Access Denied: Non-admin trying to access admin page!');
            return NextResponse.redirect(new URL('/', req.url));
        }

    
        // ✅ Attach user data to request headers (so API routes can use it)
        const requestHeaders = new Headers(req.headers);

        requestHeaders.set('x-user-data', JSON.stringify(payload));
        
        return NextResponse.next({ request: { headers: requestHeaders } });

    } catch (error) {
        console.log('JWT ERROR:', error.message);
        return NextResponse.redirect(new URL('/', req.url)); // ⬅️ Redirect to home page on invalid token
    }
}

export const config = {
    matcher: ['/dashboard(.*)', '/admin(.*)', '/api/protected(.*)'],
};