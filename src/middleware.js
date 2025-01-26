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

  // Menambahkan header Cache-Control
  const response = NextResponse.next();

  // Tidak menambahkan no-store di halaman yang ingin di-cache
  if (req.nextUrl.pathname.startsWith('/login')) {
    response.headers.set('Cache-Control', 'no-store');  // Halaman login tidak boleh di-cache
  } else {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');  // Halaman lainnya boleh di-cache
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/dashboard/:path*'],
};
