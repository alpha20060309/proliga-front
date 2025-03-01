'use client'

import { useEffect } from 'react'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'

function Clear() {
  const { logOut } = useLogOut()

  useEffect(() => {
    logOut()
  }, [logOut])

  return <div className="h-svh" />
}

export default Clear
