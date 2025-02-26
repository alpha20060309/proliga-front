import GoogleSignIn from './Google'
// import FacebookSignIn from './Facebook'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import SetPhoneNumber from 'components/Modals/SetPhoneNumber'
import { useSelector } from 'react-redux'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { CONFIG_KEY } from 'app/utils/config.util'
import YandexSignIn from './Yandex'

function SocialLogin() {
  const { t } = useTranslation()
  const config = useSelector(selectSystemConfig)

  // eslint-disable-next-line no-unused-vars
  const facebook =
    config[CONFIG_KEY.provider_facebook]?.value?.toLowerCase() === 'true'
  // eslint-disable-next-line no-unused-vars
  const google =
    config[CONFIG_KEY.provider_google]?.value?.toLowerCase() === 'true'

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
      <SetPhoneNumber />
    </>
  )
}

export default memo(SocialLogin)
