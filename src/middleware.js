import { NextResponse } from "next/server"
import { i18nRouter } from "next-i18n-router"
import i18nConfig from "./lib/i18n.config"
import { auth } from "app/auth"

const protectedRoutes = ['/settings', '/play']
const apiAuthPrefix = '/api/auth'
const DEFAULT_LOGIN_REDIRECT = '/auth'

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth
  const isAuthorized = !!session?.user
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isListedProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.includes(route)
  )

  if (isApiAuthRoute) return

  if (!isAuthorized && isListedProtectedRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  const i18nResponse = i18nRouter(req, i18nConfig)
  if (i18nResponse instanceof NextResponse) return i18nResponse
})

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|offline|offline.html|~offline).*)'
}
