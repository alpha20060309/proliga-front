'use client'

import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import {
  LoginFormSkeleton,
  SignUpFormSkeleton,
  AuthTabsSkeleton,
} from './components/Skeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useTranslation } from 'react-i18next'
import { useAuthStatus } from 'app/hooks/auth/useAuthStatus/useAuthStatus'
const SignUpForm = dynamic(() => import('./components/SignUpForm'), {
  ssr: false,
  loading: () => <SignUpFormSkeleton />,
})
const LoginForm = dynamic(() => import('./components/LoginForm'), {
  ssr: false,
  loading: () => <LoginFormSkeleton />,
})
const AuthTabs = dynamic(() => import('./components/Tabs'), {
  ssr: false,
  loading: () => <AuthTabsSkeleton />,
})

const Auth = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const userTable = useSelector(selectUserTable)
  const params = useSearchParams()
  const error = params.get('error')
  const [currentTab, setCurrentTab] = useState(tabs.login)
  const [shouldRedirect, setShouldRedirect] = useState(true)
  const { setAuth } = useAuthStatus()

  useEffect(() => {
    const SIGN_IN_METHOD =
      localStorage.getItem('sign-in-method') !== 'undefined' &&
      localStorage.getItem('sign-in-method')

    if (Boolean(userTable?.id) && shouldRedirect && !SIGN_IN_METHOD) {
      router.push('/championships')
    }
  }, [userTable?.id, router, shouldRedirect])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && Object.values(tabs).includes(hash)) {
      setCurrentTab(hash)
    }
  }, [])

  useEffect(() => {
    if (error) {
      const errorMessages = {
        OAuthAccountNotLinked: t(
          'An email with this email has been opened, please try a different account'
        ),
        Configuration: t('An unknown error occurred'),
      }
      toast.error(errorMessages[error] || t('An unknown error occurred'))
      setAuth(false)
      localStorage.removeItem('sign-in-method')
      router.push('/auth')
    }
  }, [error, router, t, setAuth])

  return (
    <main className="flex min-h-screen w-full justify-center">
      <section className="mx-4 mb-8 mt-24 flex w-full max-w-[28rem] flex-col gap-4 bg-black sm:mx-0 2xl:mt-32">
        <AuthTabs
          tabs={tabs}
          setCurrentTab={setCurrentTab}
          loginStyles={currentTab === tabs.login ? active : passive}
          registerStyles={currentTab === tabs.signup ? active : passive}
        />
        {currentTab === 'login' && (
          <LoginForm setShouldRedirect={setShouldRedirect} />
        )}
        {currentTab === 'signup' && (
          <SignUpForm setShouldRedirect={setShouldRedirect} />
        )}
      </section>
    </main>
  )
}

const tabs = {
  login: 'login',
  signup: 'signup',
}
const active = 'bg-black text-primary opacity-100'
const passive = 'bg-transparent text-neutral-400'

export default Auth

// const errorMessages = {
//   OAuthSignin: 'Error occurred while signing in with OAuth provider.',
//   OAuthCallback: 'Error occurred during OAuth callback.',
//   OAuthCreateAccount: 'Error creating OAuth account.',
//   EmailCreateAccount: 'Error creating email account.',
//   Callback: 'Error during callback processing.',
//   OAuthAccountNotLinked:
//     'This email is already associated with another account.',
//   EmailSignin: 'Error sending sign in email.',
//   CredentialsSignin:
//     'Invalid credentials. Please check your phone number and password.',
//   SessionRequired: 'Please sign in to access this page.',
//   Default: 'An unexpected error occurred.',
// }
