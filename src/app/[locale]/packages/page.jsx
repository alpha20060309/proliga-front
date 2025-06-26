
import PackageContainer from './components/Package'
import prisma from 'lib/prisma'
import initTranslations from 'app/lib/i18n'
import { PACKAGE_TYPE } from 'app/utils/packages.util'
import { cache } from 'react'

const fetchPackages = cache(async () => {
  const packages = await prisma.pay_package.findMany({
    where: {
      deleted_at: null,
    }
  })
  return packages
})

const Packages = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)
  const packages = await fetchPackages()

  if (packages.length === 0) {
    return <div>{t('No payment packages found')}</div>
  }

  return (
    <>
      <h1 className="text-foreground mb-8 text-center text-xl font-bold sm:text-2xl lg:text-3xl">
        {t('O‘yiningizni mukammallikka yetkazing')}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(PACKAGE_TYPE).map((packageType) => (
          <PackageContainer key={packageType} packageType={packageType} packages={packages} t={t} />
        ))}
      </div>
    </>
  )
}

export default Packages
