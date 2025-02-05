'use client'

import { fetchPackages } from 'app/lib/features/packages/packages.thunk'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Gutter from 'components/Gutter'
import dynamic from 'next/dynamic'
import PackagesSkeleton from './components/PackagesSkeleton'
import AnimatedBackground from 'components/AnimatedBackground'
import { selectPackages } from 'app/lib/features/packages/packages.selector'
const PaymentPackages = dynamic(() => import('./components/Packages'), {
  ssr: false,
  loading: () => <PackagesSkeleton />,
})

const Packages = () => {
  const dispatch = useDispatch()
  const packages = useSelector(selectPackages)

  useEffect(() => {
    if (packages?.length === 0) {
      dispatch(fetchPackages())
    }
  }, [dispatch, packages?.length])

  return (
    <>
      <AnimatedBackground />
      <Gutter>
        <PaymentPackages />
      </Gutter>
    </>
  )
}

export default Packages
