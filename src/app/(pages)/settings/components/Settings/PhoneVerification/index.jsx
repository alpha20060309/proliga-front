import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import { PhoneInput } from 'components/PhoneInput'

export default function PhoneVerification({ phone, otp, setPhone, setOtp }) {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

  return (
    <section className="flex items-end gap-2">
      <div className="space-y-1">
        <Label htmlFor="phone" className="text-sm font-medium text-neutral-300">
          {t('Telefon raqam')}
        </Label>
        <PhoneInput
          type="tel"
          id="phone"
          placeholder={userTable?.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-neutral-600 bg-card"
        />
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          id="otp"
          name="otp"
          placeholder={t('Kodni kiriting')}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="h-10 w-40 border border-neutral-600 bg-card text-foreground focus:border-primary focus:ring-primary"
        />
        <Button
          type="button"
          variant="default"
          size="sm"
          className="flex h-10 items-center gap-2 border border-blue-600 bg-card text-neutral-50 hover:bg-blue-500"
        >
          <Send className="size-4" />
          {t('Send')}
        </Button>
      </div>
    </section>
  )
}
