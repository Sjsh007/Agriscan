import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection for demo/private deployment
// For production, use Vercel's built-in password protection or proper auth

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if user has the access cookie
  const hasAccess = request.cookies.get('demo-access')?.value === 'granted'

  // If accessing the auth check page, allow it
  if (request.nextUrl.pathname === '/demo-auth') {
    return NextResponse.next()
  }

  // If no access, redirect to auth page
  if (!hasAccess) {
    return NextResponse.redirect(new URL('/demo-auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
