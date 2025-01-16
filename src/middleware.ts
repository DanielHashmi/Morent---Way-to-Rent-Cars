import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });

  const excludedPaths = [
    '/_next/',
    '/api/',
    '/favicon.ico',
    '/public/',
  ];

  if (
    excludedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) ||
    /\.(ico|css|js|png|jpg|svg|woff2?|eot|ttf)$/.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }
  
  if (!token && request.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
