'use client'

import Gutter from 'components/Gutter'
import dynamic from 'next/dynamic'
const CurrentPackage = dynamic(() => import('./components/CurrentPackage'), {
  ssr: false,
})
const PaymentOptions = dynamic(() => import('./components/PaymentOptions'), {
  ssr: false,
})
const ConfirmPaymentTab = dynamic(
  () => import('./components/ConfirmPaymentTab'),
  {
    ssr: false,
  }
)
import { toast } from 'react-toastify'
import Spinner from 'components/Spinner'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackages } from 'app/lib/features/package/package.thunk'
import { useRouter } from 'next/navigation'
import { PAYMENT_OPTIONS } from 'app/utils/paymentOptions.util'
import { setCurrentPackage } from 'app/lib/features/package/package.slice'
import { useTranslation } from 'react-i18next'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import {
  selectCurrentPackage,
  selectPackages,
} from 'app/lib/features/package/package.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'

const ConfirmPayment = ({ params }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.WALLET)
  const { isLoading } = useSelector((store) => store.package)
  const packages = useSelector(selectPackages)
  const currentPackage = useSelector(selectCurrentPackage)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const userTable = useSelector(selectUserTable)

  useEffect(() => {
    if (
      !currentTeam?.id ||
      !currentTour?.id ||
      !currentCompetition?.id ||
      !userTable?.id
    ) {
      toast.info(t('Iltimos, avval jamoani tanlang!'), { theme: 'dark' })
      router.push('/championships')
    }
  }, [
    currentTeam?.id,
    currentTour?.id,
    currentCompetition?.id,
    router,
    userTable?.id,
    t,
  ])

  useEffect(() => {
    dispatch(setCurrentPackage(+params.packageId))
  }, [params, dispatch])

  useEffect(() => {
    if (packages?.length === 0) {
      dispatch(fetchPackages())
    }
  }, [dispatch, packages?.length])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  if (!currentPackage?.id) return null

  return (
    <Gutter>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="my-4 flex min-h-[85vh] w-full flex-col">
          <CurrentPackage />
          <PaymentOptions
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
          />
          <ConfirmPaymentTab paymentOption={paymentOption} />
        </section>
      )}
    </Gutter>
  )
}

export default ConfirmPayment
