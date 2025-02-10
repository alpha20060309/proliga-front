import Image from 'next/image'
import { PAYMENT_OPTIONS } from 'app/utils/paymentOptions.util'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const ClickUpPaymentOption = ({
  setPaymentOption,
  paymentOption,
  active,
  passive,
}) => {
  const { t } = useTranslation()

  return (
    <div
      onClick={() => setPaymentOption(PAYMENT_OPTIONS.CLICKUP)}
      className={cn(
        'flex size-36 cursor-pointer flex-col justify-center gap-2 rounded-xl border bg-stone-950 transition-all sm:size-44 lg:size-56 xl:size-60',
        paymentOption === PAYMENT_OPTIONS.CLICKUP ? active : passive
      )}
    >
      <Image
        src="/icons/click-up.svg"
        width={36}
        draggable={false}
        height={36}
        className="h-8 w-20 select-none self-center lg:h-9 lg:w-28"
        alt="click up"
      />
      <div className="w-full self-center text-center">
        <p className="mx-2 select-none text-xs text-neutral-400 lg:text-sm">
          {t('Click up orqali tolov qilish')}
        </p>
      </div>
    </div>
  )
}

export default ClickUpPaymentOption
