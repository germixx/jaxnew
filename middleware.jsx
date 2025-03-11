import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

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
export function middleware(req) {

    const url = req.nextUrl;

    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

    // Allow access to these paths even during maintenance
    const allowedPaths = ['/maintenance', '/api', '/admin', '/_next', '/favicon.ico', '/sitemap.xml'];

    if (allowedPaths.some((path) => url.pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Redirect all users to maintenance page if mode is enabled
    if (isMaintenanceMode) {
        return NextResponse.rewrite(new URL('/maintenance', req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except maintenance and login
export const config = {
    matcher: "/((?!maintenance|login).*)",
};
// // working above here


// const maintenancePath = "/maintenance";
// export function middleware(req) {
//     const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'
//     const maintenancePath = "/maintenance";
//     const loginPath = "/";
//     const currentPath = req.nextUrl.pathname;

//     // Redirect to maintenance page if maintenance mode is enabled
//     if (maintenanceMode && currentPath !== maintenancePath) {
//         return NextResponse.redirect(new URL(maintenancePath, req.url));
//     }

//     // Define protected routes
//     const protectedRoutes = ["/dashboard", "/admin", "/profile"];

//     if (protectedRoutes.includes(currentPath)) {
//         const token = req.cookies.get("token")?.value;
//         console.log(token, ' is tokens')
//         if (!token) {
//             return NextResponse.redirect(new URL(loginPath, req.url));
//         }

//         try {
//             jwt.verify(token, SECRET_KEY);
//         } catch (error) {
//             return NextResponse.redirect(new URL(loginPath, req.url));
//         }
//     }

//     return NextResponse.next();
// }

// // Apply middleware to all routes except maintenance and login
// export const config = {
//     matcher: "/((?!maintenance|/).*)",
// };

// protected routes working below
// export function middleware(req) {
//     const token = req.headers.get("Authorization")?.split(" ")[1];
//     console.log(token, ' is token')
//     if (!token) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         return NextResponse.next();
//     } catch (error) {
//         return NextResponse.json({ error: "Invalid token" }, { status: 403 });
//     }
// }

// export const config = {
//     matcher: "/api/protected/:path*", // Apply to protected routes
// };