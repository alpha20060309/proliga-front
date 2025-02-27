'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'

function Clear() {
  const { logOut } = useLogOut()
  // const router = useRouter()

  useEffect(() => {
    logOut()
  }, [ logOut])

  return <div className="h-svh" />
}

export default Clear
