// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"

// export async function GET(request) {
//   const { searchParams } = new URL(request.url)
//   const code = searchParams.get("code")

//   if (code) {
//     const cookieStore = cookies()
//     const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
//     const { error } = await supabase.auth.exchangeCodeForSession(code)

//     if (!error) {
//       // eslint-disable-next-line no-undef
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth`)
//     }
//   }

//   // eslint-disable-next-line no-undef
//   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth`)
// }
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + "/auth")
}

