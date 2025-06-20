'use client'

import Gutter from 'shared/Gutter'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'
import GameProfile from './components/GameProfile'

export default function ProfilePage() {
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated')

  //   if (!isAuthenticated) {
  //     router.push('/')
  //     toast.error('Please login first')
  //   }
  // }, [router])

  return (
    <Gutter>
      <BannerTemplate>
        <GameProfile />
      </BannerTemplate>
    </Gutter>
  )
}
