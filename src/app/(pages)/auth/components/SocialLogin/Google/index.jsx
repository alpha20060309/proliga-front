/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { supabase } from 'app/lib/supabaseClient'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

const GoogleSignIn = ({ className, iconClassName }) => {
  const { t } = useTranslation()

  // eslint-disable-next-line no-undef
  const handleGoogleSignIn = useCallback(() => {
    // try {
    //   localStorage.setItem('sign-in-method', SUPABASE_PROVIDERS.GOOGLE)

    //   const { error } = supabase.auth.signInWithOAuth({
    //     provider: 'google',
    //   })

    //   if (error) throw new Error(error.message)
    // } catch (error) {
    //   console.error('Error signing in with Google:', error)
    //   toast.error(error.message, { theme: 'dark' })
    // }
    signIn('google')
  }, [])

  return (
    <Button
      variant="outline"
      className={cn('w-1/2 p-0', className)}
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
