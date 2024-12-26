import { NextResponse } from 'next/server';

export async function middleware(req) {
  // console.log('req ==>', req.nextUrl.pathname)
  const token = req.cookies.get('access_token')?.value;
  // console.log('token', token)

  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    // console.log('msk if 1')
    return;
  }
  
  if (req.nextUrl.pathname === '/' && !token) {
    // console.log('msk if 2')
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/home') && !token) {
    // console.log('msk if 5')
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (req.nextUrl.pathname === '/' && token) {
    // console.log('msk if 3')
    return NextResponse.redirect(new URL('/home', req.url));
  }
  
  if (req.nextUrl.pathname.startsWith('/login') && token) {
    // console.log('msk if 4')
    return NextResponse.redirect(new URL('/home', req.url));
  }
  
 

  // if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // if (req.nextUrl.pathname.startsWith('/dashboard/:path*') && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/dashboard/:path*'],
};
