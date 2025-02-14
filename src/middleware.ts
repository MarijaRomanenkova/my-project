import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Paths that require authentication
  const protectedPaths = ['/tasks/create', '/tasks/apply']
  
  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp))

  if (isProtectedPath) {
    const token = await getToken({ req: request })

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
  matcher: ['/tasks/:path*']
} 
