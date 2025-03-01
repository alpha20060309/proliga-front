'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SETTINGS_TAB } from './tabs'
import { useRouter } from 'next/navigation'
import TransactionsHistory from './components/Transactions'
import ChangePassword from './components/Security'
import SettingsTab from './components/Settings'
import dynamic from 'next/dynamic'
import SettingsSkeleton, {
  ProfileSkeleton,
  NavigationSkeleton,
} from './components/Skeleton'
const Profile = dynamic(() => import('./components/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
})
const Navigation = dynamic(() => import('./components/Navigation'), {
  ssr: false,
  loading: () => <NavigationSkeleton />,
})
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

function Settings() {
  const { t } = useTranslation()
  const router = useRouter()
  const [tab, setTab] = useState(SETTINGS_TAB.PROFILE)
  const { isLoading } = useSelector((store) => store.auth)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user?.id) {
      router.push('/')
    }
  }, [router, t, session?.user?.id])

  if (isLoading) {
    return <SettingsSkeleton />
  }
  return (
    <main className="flex h-full min-h-[44rem] flex-col gap-2 lg:min-h-[38rem] lg:flex-row">
      <Navigation currentTab={tab} tabs={SETTINGS_TAB} setTab={setTab} />
      {tab === SETTINGS_TAB.PROFILE && (
        <Profile setSettingsTab={() => setTab(SETTINGS_TAB.SETTINGS)} />
      )}
      {tab === SETTINGS_TAB.SETTINGS && (
        <SettingsTab setHomeTab={() => setTab(SETTINGS_TAB.PROFILE)} />
      )}
      {tab === SETTINGS_TAB.PASSWORD && <ChangePassword />}
      {tab === SETTINGS_TAB.TRANSACTIONHISTORY && <TransactionsHistory />}
    </main>
  )
}

export default Settings
