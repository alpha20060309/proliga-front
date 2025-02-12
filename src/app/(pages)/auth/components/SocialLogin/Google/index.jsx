/* eslint-disable no-undef */

import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { supabase } from 'app/lib/supabaseClient'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'

const GoogleSignIn = ({ className, iconClassName }) => {
  const { t } = useTranslation()
  const URL = process.env.NEXT_PUBLIC_URL

  const handleGoogleSignIn = useCallback(() => {
    try {
      localStorage.setItem('sign-in-method', SUPABASE_PROVIDERS.GOOGLE)

      const { error } = supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: URL + '/championships',
        },
      })

      if (error) throw new Error(error.message)
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }, [URL])

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
      {t('Google')}
    </Button>
  )
}

export default GoogleSignIn
