/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'
import { signIn } from 'next-auth/react'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'

const GoogleSignIn = ({ className, iconClassName }) => {
  const { t } = useTranslation()
  const user = useSelector(selectUserTable)

  const handleGoogleSignIn = async () => {
    if (!user?.id) {
      localStorage.setItem('sign-in-method', SUPABASE_PROVIDERS.GOOGLE)
      await signIn('google', {
        redirect: true,
        // eslint-disable-next-line no-undef
        redirectTo: process.env.NEXT_PUBLIC_URL + '/auth?success=true',
      })
    }
  }

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
