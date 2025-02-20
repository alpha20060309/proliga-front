'use client'

import dynamic from 'next/dynamic'
import { useEffect, memo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
const ConfirmOTPForm = dynamic(() => import('./ConfirmOTPForm'), {
  ssr: false,
})

const ConfirmOTPPage = () => {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/auth'
  const phone = decodeURIComponent(params.get('phone')) || ''

  useEffect(() => {
    if (!phone) {
      router.push('/auth')
    }
  }, [phone, router])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <main className="flex min-h-screen w-full justify-center">
      <section className="mx-4 flex w-full max-w-[28rem] flex-col items-center justify-center gap-4 bg-black sm:mx-0">
        <ConfirmOTPForm redirect={redirect} phone={phone} />
      </section>
    </main>
  )
}

export default memo(ConfirmOTPPage)
