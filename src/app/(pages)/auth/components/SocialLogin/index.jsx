import GoogleSignIn from './Google'
import FacebookSignIn from './Facebook'
import YandexSignIn from './Yandex'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import SetPhoneNumber from 'components/Modals/SetPhoneNumber'
import { useState } from 'react'

function SocialLogin() {
  const { t } = useTranslation()
  const [isModalOpen, setModalOpen] = useState(true)

  return (
    <>
      <div className="w-full space-y-2">
        <div className="flex items-center py-0.5">
          <span className="flex-grow border-t border-gray-300" />
          <p className="px-3 text-sm text-neutral-400">
            {t('Or continue with')}
          </p>
          <span className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex gap-1">
          <GoogleSignIn />
          <FacebookSignIn />
          <YandexSignIn />
        </div>
      </div>
      <SetPhoneNumber isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export default memo(SocialLogin)
