import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Log the incoming request path
  console.log('Incoming request path:', request.nextUrl.pathname);

  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected paths for creating tasks
  const protectedPaths = ['/api/tasks']
  
  // Check if the current path requires authentication
  const isProtectedPath = request.method === 'POST' && protectedPaths.some(pp => path.startsWith(pp))

  if (isProtectedPath) {
    const token = await getToken({ req: request })
    console.log('Token:', token); // Log the token for debugging

    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/api/tasks/:path*']
} 
