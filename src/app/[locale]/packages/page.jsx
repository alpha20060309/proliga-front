import PackageContainer from './components/Package'
import initTranslations from 'app/lib/i18n'
import { PACKAGE_TYPE } from 'app/utils/packages.util'
import { cache } from 'react'
import { supabase } from 'app/lib/supabaseClient'

const fetchPackages = cache(async () => {
  const { data: packages, error } = await supabase
    .from('pay_package')
    .select('*')
    .is('deleted_at', null)

  if (error) {
    return { error: error?.message }
  }

  return { data: packages, error: null }
})

const Packages = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)
  const { data: packages, error } = await fetchPackages()

  if (error || packages.length === 0) {
    return <div>{t('No payment packages found')}</div>
  }

  return (
    <>
      <h1 className="text-foreground mb-8 text-center text-xl font-bold sm:text-2xl lg:text-3xl">
        {t('O‘yiningizni mukammallikka yetkazing')}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(PACKAGE_TYPE).map((packageType) => (
          <PackageContainer
            key={packageType}
            packageType={packageType}
            packages={packages}
            t={t}
          />
        ))}
      </div>
    </>
  )
}

export default Packages
