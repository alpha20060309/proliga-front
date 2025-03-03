import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'
import { PAYMENT_OPTIONS } from 'app/utils/paymentOptions.util'
import { useBuyPackageWithWallet } from 'app/hooks/payment/useBuyPackageWithWallet/useBuyPackageWithWallet'
import { useBuyPackageWithPayme } from 'app/hooks/payment/useBuyPackageWithPayme/useBuyPackageWithPayme'
import { useBuyPackageWithClick } from 'app/hooks/payment/useBuyPackageWithClick/useBuyPackageWithClick'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentPackage } from 'app/lib/features/package/package.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSession } from 'next-auth/react'

const ConfirmPaymentTab = ({ paymentOption }) => {
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentPackage = useSelector(selectCurrentPackage)
  const currentTeam = useSelector(selectCurrentTeam)
  const userTable = useSelector(selectUserTable)
  const { update } = useSession()

  const { t } = useTranslation()
  const { buyPackageWithWallet, isLoading } = useBuyPackageWithWallet()
  const { buyPackageWithPayme, isLoading: isPaymeLoading } =
    useBuyPackageWithPayme()
  const { buyPackageWithClick, isLoading: isClickLoading } =
    useBuyPackageWithClick()

  const handleConfirmPayment = async () => {
    if (!currentPackage?.id)
      return toast.error(t('Joriy paket yo‘q!'), { theme: 'dark' })
    if (!paymentOption)
      return toast.error(t('To‘lov varianti topilmadi!'), { theme: 'dark' })
    if (userTable.balance < currentPackage?.price) {
      return toast.error(t('Mablag‘ yetarli emas!'), { theme: 'dark' })
    }
    if (paymentOption === PAYMENT_OPTIONS.WALLET) {
      await buyPackageWithWallet({
        package_id: currentPackage?.id,
        team_id: currentTeam?.id,
      })
    }
    if (paymentOption === PAYMENT_OPTIONS.PAYME) {
      buyPackageWithPayme({
        userTable,
        currentPackage,
        currentTeam,
        lang,
      })
    }
    if (paymentOption === PAYMENT_OPTIONS.CLICKUP) {
      buyPackageWithClick({ userTable, currentPackage, currentTeam })
    }
    await update()
  }

  return (
    <section className="mt-auto flex flex-col items-start justify-between gap-2 rounded-md bg-gradient-to-l from-neutral-800 to-stone-900 p-4 md:h-auto md:flex-row md:items-center md:p-6">
      <div className="flex items-center justify-center gap-2 text-sm font-medium xs:text-base md:text-lg">
        <p>{t("To'lov miqdori")}</p>
        <NumericFormat
          value={currentPackage?.price / 100 || 0}
          className="text w-min select-none border-none bg-transparent text-base font-bold outline-none xs:text-lg sm:text-xl"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t("so'm")}
        />
      </div>
      <div className="flex items-center gap-1 self-end font-medium md:self-auto">
        <Link
          href={'/play/' + lastVisitedTeam}
          className="flex h-10 w-24 items-center justify-center rounded border border-neutral-300 bg-neutral-950 text-center text-sm text-neutral-300 transition-all hover:border-neutral-100 hover:bg-opacity-75 hover:text-neutral-100 lg:w-32 lg:text-base"
        >
          {t('Qaytish')}
        </Link>
        <button
          onClick={handleConfirmPayment}
          disabled={isLoading || isClickLoading || isPaymeLoading}
          className="flex h-10 w-24 items-center justify-center rounded border border-primary bg-neutral-950 text-sm text-neutral-50 transition-all hover:bg-opacity-75 hover:text-primary lg:w-32 lg:text-base"
        >
          {isLoading || isClickLoading || isPaymeLoading ? (
            <Image
              src="/icons/loading.svg"
              width={24}
              height={24}
              alt="loading"
              className="filter-white mx-auto size-5 animate-spin"
            />
          ) : (
            t("To'lash")
          )}
        </button>
      </div>
    </section>
  )
}

export default ConfirmPaymentTab
