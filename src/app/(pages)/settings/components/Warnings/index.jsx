import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { configKey } from 'app/utils/config.util'
import SettingsAlert from '../Alert'
import { useTranslation } from 'react-i18next'
import OTPConfirmationModal from 'components/ConfirmOTPModal'
import { useCallback, useState } from 'react'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'

export default function SettingsWarnings() {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { config } = useSelector((store) => store.systemConfig)
  const can_send_sms =
    config[configKey.can_send_sms]?.value.toLowerCase() === 'true' ?? false
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const { sendOTP } = useSendOTP()

  const handleSendSms = useCallback(async () => {
    setOtpModalOpen(true)
    await sendOTP({ phone: userTable?.phone })
  }, [sendOTP, userTable?.phone])

  if (!userTable?.phone_verified && can_send_sms) {
    return (
      <>
        <OTPConfirmationModal
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
