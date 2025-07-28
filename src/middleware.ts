// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("🔒 middleware is running: ", request.nextUrl.pathname);
  const token = request.cookies.get('token')?.value;
  console.log('Middleware token:', token);

  const isAuthPage = request.nextUrl.pathname.startsWith('/loginPage');

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/loginPage', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const config = {
    matcher: [
      '/((?!_next/static|_next/image|favicon.ico|loginPage|api).*)',
    ],
  };