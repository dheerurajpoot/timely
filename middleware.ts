import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Note: For client-side protected routes, we'll use the useAuth hook in components
  // This middleware is for basic routing logic
  
  const pathname = request.nextUrl.pathname;

  // Protect admin routes - enforce client-side check via protected route component
  if (pathname.startsWith('/admin')) {
    // Client-side check in AdminProtectedRoute component will handle this
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|public).*)'],
};
