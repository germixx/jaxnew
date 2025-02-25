import { NextResponse } from 'next/server';

export function middleware(req) {
    const url = req.nextUrl;
    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

    // Allow access to these paths even during maintenance
    const allowedPaths = ['/maintenance', '/api', '/admin', '/_next', '/favicon.ico'];

    if (allowedPaths.some((path) => url.pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Redirect all users to maintenance page if mode is enabled
    if (isMaintenanceMode) {
        return NextResponse.rewrite(new URL('/maintenance', req.url));
    }

    return NextResponse.next();
}
