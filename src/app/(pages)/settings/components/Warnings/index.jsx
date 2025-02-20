import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { CONFIG_KEY } from 'app/utils/config.util'
import SettingsAlert from '../Alert'
import { useTranslation } from 'react-i18next'
import ConfirmOTP from 'components/Modals/ConfirmOTP'
import { useCallback, useState } from 'react'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

export default function SettingsWarnings() {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const config = useSelector(selectSystemConfig)
  const can_send_sms =
    config[CONFIG_KEY.can_send_sms]?.value.toLowerCase() === 'true' || false
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const { sendOTP } = useSendOTP()

  const handleSendSms = useCallback(async () => {
    setOtpModalOpen(true)
    await sendOTP({ phone: userTable?.phone })
  }, [sendOTP, userTable?.phone])

  if (!userTable?.phone_verified && can_send_sms) {
    return (
      <>
        <ConfirmOTP
          phone={userTable?.phone}
          setModalOpen={setOtpModalOpen}
          isModalOpen={otpModalOpen}
        />
        <SettingsAlert
          message={t('Iltimos, telefon raqamingizni tasdiqlang')}
          actionText={t('Tasdiqlash')}
          onAction={handleSendSms}
          type="warning"
        />
      </>
    )
  }

  return <></>
}
