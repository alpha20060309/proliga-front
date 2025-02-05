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
import { PAYMENTOPTIONS } from 'app/utils/paymentOptions.util'
import { useSelector } from 'react-redux'
import { useRedirectToClick } from 'app/hooks/payment/useRedirectToClick/useRedirectToClick'
import { useRedirectToPayme } from 'app/hooks/payment/useRedirectToPayme/useRedirectToPayme'
import { configKey } from 'app/utils/config.util'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { formatCurrency } from 'app/utils/formatCurrency'
import PaymentOption from './PaymentOption'

const RefillBalanceModal = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation()

  const userTable = useSelector(selectUserTable)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { config } = useSelector((store) => store.systemConfig)

  const { redirectToClick } = useRedirectToClick()
  const { redirectToPayme } = useRedirectToPayme()

  const cabinet_payme =
    config[configKey.cabinet_payme]?.value.toLowerCase() === 'true' ?? false
  const cabinet_click =
    config[configKey.cabinet_click]?.value.toLowerCase() === 'true' ?? false
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

    if (paymentOption === PAYMENTOPTIONS.CLICKUP) {
      redirectToClick({ amount, userTable })
    }
    if (paymentOption === PAYMENTOPTIONS.PAYME) {
      redirectToPayme({ amount, lang, userTable })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-h-[92%] max-w-[96%] overflow-auto rounded-lg bg-neutral-900 sm:max-w-[28rem] xl:max-w-[32rem] xl:p-6">
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
                  onClick={() => setPaymentOption(BALANCEOPTIONS.CLICKUP)}
                  style={
                    paymentOption === BALANCEOPTIONS.CLICKUP ? ACTIVE : PASSIVE
                  }
                  img={'/icons/click-up.svg'}
                  alt={'click-up'}
                />
              )}
              {cabinet_payme && (
                <PaymentOption
                  onClick={() => setPaymentOption(BALANCEOPTIONS.PAYME)}
                  style={
                    paymentOption === BALANCEOPTIONS.PAYME ? ACTIVE : PASSIVE
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

export const BALANCEOPTIONS = {
  CLICKUP: 'click',
  PAYME: 'payme',
  OKTO: 'okto',
}
const ACTIVE = 'border-primary'
const PASSIVE = 'border-neutral-600 hover:border-yellow-600'

export default RefillBalanceModal
