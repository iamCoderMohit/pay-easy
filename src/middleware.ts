import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/", "/signin", "/signup"];
  const { pathname } = req.nextUrl;

  if (!publicPaths.includes(pathname)) {
    const token = req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
      '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};

