'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import { PAYMENT_OPTIONS } from 'app/utils/paymentOptions.util'
import { useSelector } from 'react-redux'
import { useRedirectToClick } from 'app/hooks/payment/useRedirectToClick/useRedirectToClick'
import { useRedirectToPayme } from 'app/hooks/payment/useRedirectToPayme/useRedirectToPayme'
import { CONFIG_KEY } from 'app/utils/config.util'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { formatCurrency } from 'app/utils/formatCurrency'
import { memo } from 'react'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { BALANCE_OPTIONS } from 'app/utils/paymentOptions.util'
import PaymentOption from './PaymentOption'

const RefillBalance = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const config = useSelector(selectSystemConfig)
  const { lang } = useSelector((store) => store.systemLanguage)

  const { redirectToClick } = useRedirectToClick()
  const { redirectToPayme } = useRedirectToPayme()

  const cabinet_payme =
    config[CONFIG_KEY.cabinet_payme]?.value.toLowerCase() === 'true' || false
  const cabinet_click =
    config[CONFIG_KEY.cabinet_click]?.value.toLowerCase() === 'true' || false
  const [paymentOption, setPaymentOption] = useState(null)
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!paymentOption) {
      return toast.warning(t("Iltimos to'lov usulini tanlang"))
    }

    if (+amount < 100) {
      toast.warning(
        t("Hisobni kamida $ so'm ga toldirish lozim").replace('$', '100')
      )
      return
    }
    if (!userTable) {
      return toast.error(t("Siz ro'yxatdan o'tmagansiz"))
    }

    if (paymentOption === PAYMENT_OPTIONS.CLICKUP) {
      redirectToClick({ amount, userTable })
    }
    if (paymentOption === PAYMENT_OPTIONS.PAYME) {
      redirectToPayme({ amount, lang, userTable })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-h-[80%] w-[98%] max-w-lg overflow-auto rounded-xl bg-neutral-900 p-4 xl:p-6">
        <DialogTitle className="text-lg font-bold sm:text-xl">
          {t('Balansingizni toldiring')}
        </DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full space-y-1">
            <h3 className="text-sm font-medium text-neutral-300 sm:text-base">
              {t("To'lov usulini tanlang")}
            </h3>
            <section className="flex flex-wrap justify-start gap-1 sm:flex-nowrap">
              {cabinet_click && (
                <PaymentOption
                  onClick={() => setPaymentOption(BALANCE_OPTIONS.CLICKUP)}
                  style={
                    paymentOption === BALANCE_OPTIONS.CLICKUP ? ACTIVE : PASSIVE
                  }
                  img={'/icons/click-up.svg'}
                  alt={'click-up'}
                />
              )}
              {cabinet_payme && (
                <PaymentOption
                  onClick={() => setPaymentOption(BALANCE_OPTIONS.PAYME)}
                  style={
                    paymentOption === BALANCE_OPTIONS.PAYME ? ACTIVE : PASSIVE
                  }
                  img={'/icons/payme.svg'}
                  alt={'payme'}
                />
              )}
              {!cabinet_click && !cabinet_payme && (
                <p className="flex h-10 w-full items-center justify-center rounded border border-red-400 bg-red-700/80 font-bold">
                  {t("Hozircha to'lovlar o'chirib qo'yilgan!")}
                </p>
              )}
            </section>
          </div>
          <div className="w-full space-y-1">
            <label
              className="text-sm font-medium text-neutral-300 sm:text-base"
              htmlFor="money"
            >
              {t("To'lash summasini tering")}
            </label>
            <Input
              type="number"
              id="money"
              placeholder={formatCurrency({
                value: 10000000,
                t,
                decimalPlaces: 0,
              })}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name="money"
              className="flex h-10 w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus:border-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded border border-neutral-600 bg-primary/80 font-bold text-neutral-900 transition-all hover:bg-primary hover:text-black"
          >
            {t("To'lash")}
          </button>
        </form>
      </DialogContent>
      <DialogDescription className="hidden">
        This is a dialog to refill user balance
      </DialogDescription>
    </Dialog>
  )
}

const ACTIVE = 'border-primary'
const PASSIVE = 'border-neutral-600 hover:border-yellow-600'

export default memo(RefillBalance)
