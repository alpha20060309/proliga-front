import { memo } from 'react'
import GoogleSignIn from './Google'
import YandexSignIn from './Yandex'

function SocialLogin() {
  return (
    <div className="flex gap-1">
      <GoogleSignIn />
      <YandexSignIn />
    </div>
  )
}

export default memo(SocialLogin)
