import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GoogleSignIn from './Google'
import SetUserCredentials from 'components/Modals/SetUserCredentials'
import YandexSignIn from './Yandex'

function SocialLogin() {
  const { t } = useTranslation()

  return (
    <>
      <div className="w-full space-y-2">
        <div className="flex items-center py-0.5">
          <span className="flex-grow border-t border-gray-300" />
          <p className="px-2 text-sm text-neutral-400">
            {t('Or continue with')}
          </p>
          <span className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex gap-1">
          <GoogleSignIn />
          <YandexSignIn />
        </div>
      </div>
      <SetUserCredentials />
    </>
  )
}

export default memo(SocialLogin)
