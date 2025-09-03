import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/", "/signin", "/signup"];
  const { pathname } = req.nextUrl;

  if (!publicPaths.includes(pathname)) {
    const token = req.cookies.get("next-auth.session-token")?.value || req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  
}

export const config = {
  matcher: [
      '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};

