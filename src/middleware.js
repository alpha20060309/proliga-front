import { NextResponse } from 'next/server'

export function middleware(request) {
  // Log request details
  console.log('Request URL:', request.url)
  console.log('Request Method:', request.method)
  console.log('Request Headers:', Object.fromEntries(request.headers))

  // Continue with middleware chain
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
