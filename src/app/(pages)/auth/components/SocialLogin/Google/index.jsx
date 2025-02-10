/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { supabase } from 'app/lib/supabaseClient'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

const GoogleSignIn = ({
  type = GOOGLE_SIGN_IN_TYPES.PAGE,
  className,
  iconClassName,
}) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { logOut } = useLogOut()

  const handleGoogleSignIn = useCallback(() => {
    try {
      const { error } = supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:2030/auth',
        },
      })

      if (error) throw new Error(error.message)
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [handleGoogleSignIn])

  return (
    <Button
      variant="outline"
      className={cn('flex-1 p-0', className)}
      onClick={handleGoogleSignIn}
    >
      <Image
        src="./icons/google.svg"
        alt="Google"
        className={cn('mr-2 size-4', iconClassName)}
        width={24}
        height={24}
      />
      Google
    </Button>
  )
}

export const GOOGLE_SIGN_IN_TYPES = {
  POP_UP: 'POP_UP',
  PAGE: 'PAGE',
}

export default GoogleSignIn
