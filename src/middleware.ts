import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

//Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly. 
//in our case we will use redirect
//req is the incoming request from the client (nextjs)
export async function middleware(request: NextRequest) {
 const cookieName = process.env.NODE_ENV === 'production'
 ? '__Secure-next-auth.session-token' :'next-auth.session-token' 
  const token = await getToken({req : request, cookieName})
 if (!token) {
    // Only redirect to /login if not already there (to prevent loop)
    if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    // If logged in and trying to access /login or /register → redirect home
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }


 return NextResponse.next()
}
 
export const config = {
  matcher: ['/cart', '/checkout', '/login', '/register', '/profile'],
}