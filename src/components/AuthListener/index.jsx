import { useEffect } from 'react'
import { supabase } from 'app/lib/supabaseClient'

export default function AuthListener() {
  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session)
        const isEmailIdentity =
          session?.user?.app_metadata?.provider === 'email'

        console.log(
          isEmailIdentity,
          session?.user?.id,
          session?.user?.id && !isEmailIdentity
        )

        if (session?.user?.id && !isEmailIdentity) {
          localStorage.setItem(
            `user-auth-${sbUrl}`,
            JSON.stringify(session?.user)
          )
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return null
}
