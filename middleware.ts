import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/protected') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'],
};
