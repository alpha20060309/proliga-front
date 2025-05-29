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
        <Label htmlFor="phone" className="text-foreground text-sm font-medium">
          {t('Telefon raqam')}
        </Label>
        <PhoneInput
          type="tel"
          id="phone"
          placeholder={userTable?.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-card border-border"
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
          className="bg-card text-foreground focus:border-primary focus:ring-primary border-border h-10 w-40 border"
        />
        <Button
          type="button"
          variant="default"
          size="sm"
          className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground flex h-10 items-center gap-2 border"
        >
          <Send className="size-4" />
          {t('Send')}
        </Button>
      </div>
    </section>
  )
}
