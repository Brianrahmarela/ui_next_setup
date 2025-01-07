import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('access_token')?.value;

  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    return;
  }
  
  if (req.nextUrl.pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/home') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (req.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  
  if (req.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // Menambahkan header Cache-Control untuk tidak menyimpan cache
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/dashboard/:path*'],
};
