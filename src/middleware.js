import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from 'next/server';

const protectedRoutes = ["/settings", "/play"];
const apiAuthPrefix = "/api/auth";
const authRoute = "/auth";

export const DEFAULT_LOGIN_REDIRECT = "/auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAuthorized = !!session;
  const user = session?.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isListedProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
  const isAuthRoute = nextUrl.pathname === authRoute;

  if (isApiAuthRoute) {
    return null;
  }

  // Redirect authorized users away from auth page
  if (isAuthorized && isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (!isAuthorized && isListedProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/auth`, nextUrl)
    );
  }

  if (isAuthorized && isListedProtectedRoute) {
    if (!user) {
      console.error("Middleware: User object missing in session despite being authorized.");
      return NextResponse.redirect(new URL(`${DEFAULT_LOGIN_REDIRECT}?error=session_error`, nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)",
  ],
};