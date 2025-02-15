import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { supabase } from 'app/lib/supabaseClient'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'

const GoogleSignIn = ({ className, iconClassName }) => {
  const { t } = useTranslation()

  console.log(URL + '/auth')
  const handleGoogleSignIn = useCallback(() => {
    try {
      localStorage.setItem('sign-in-method', SUPABASE_PROVIDERS.GOOGLE)

      const { error } = supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // eslint-disable-next-line no-undef
          redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth`,
        },
      })

      if (error) throw new Error(error.message)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      toast.error(error.message, { theme: 'dark' })
    }
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
