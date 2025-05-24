import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from 'next/server';

import { i18nRouter } from 'next-i18n-router';
import i18nConfig from "./app/lib/i18n.config";

export function middleware(request) {
  return i18nRouter(request, i18nConfig);
}


const protectedRoutes = ["/settings", "/play"];
const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAuthorized = !!session;
  const user = session?.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isListedProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));

  if (isApiAuthRoute) {
    return null;
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