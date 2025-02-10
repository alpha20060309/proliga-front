'use client'

import { fetchPackages } from 'app/lib/features/package/package.thunk'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Gutter from 'components/Gutter'
import dynamic from 'next/dynamic'
import PackagesSkeleton from './components/PackagesSkeleton'
import { IconsSpray } from 'components/AnimatedBackground/Spray'
import { selectPackages } from 'app/lib/features/package/package.selector'
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
      <IconsSpray />
      <Gutter>
        <PaymentPackages />
      </Gutter>
    </>
  )
}

export default Packages
