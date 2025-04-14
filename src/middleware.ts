import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {

    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    const path = request.nextUrl.pathname;

    const publicPath = path === '/login' || path === '/signup'
    const securePath = path === '/' || path === '/addBlog' || path === '/addProduct' || path === '/blogList' || path === '/enquiry' || path === '/help' || path === '/notifications' || path === '/orders' || path === '/queries' || path === '/sales' || path === '/settings' || path === '/stocks'

    if (accessToken && publicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!accessToken && securePath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/login",
        "/signup",
    ],
}