'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SETTINGSTAB } from 'app/utils/settingsTab.util'
import TransactionsHistory from './components/Transactions'
import ChangePassword from './components/ChangePassword'
import SettingsTab from './components/Settings'
import Gutter from 'components/Gutter'
import dynamic from 'next/dynamic'
import SettingsSkeleton, {
  ProfileSkeleton,
  NavigationSkeleton,
} from './components/Skeleton'
import {
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { useRouter } from 'next/navigation'
const Profile = dynamic(() => import('./components/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
})
const Navigation = dynamic(() => import('./components/Navigation'), {
  ssr: false,
  loading: () => <NavigationSkeleton />,
})
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

function Settings() {
  const { t } = useTranslation()
  const router = useRouter()
  const [tab, setTab] = useState(SETTINGSTAB.PROFILE)
  const { isLoading } = useSelector((store) => store.auth)
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)

  useEffect(() => {
    if (!userTable || !userAuth) {
      toast.warning(t('Please login first'))
      router.push('/')
    }
  }, [router, t, userAuth, userTable])

  if (isLoading) {
    return <SettingsSkeleton />
  }
  return (
    <Gutter>
      <main className="flex h-full min-h-[44rem] flex-col gap-2 lg:min-h-[38rem] lg:flex-row">
        <Navigation currentTab={tab} tabs={SETTINGSTAB} setTab={setTab} />
        {tab === SETTINGSTAB.PROFILE && (
          <Profile setSettingsTab={() => setTab(SETTINGSTAB.SETTINGS)} />
        )}
        {tab === SETTINGSTAB.SETTINGS && (
          <SettingsTab setHomeTab={() => setTab(SETTINGSTAB.PROFILE)} />
        )}
        {tab === SETTINGSTAB.PASSWORD && <ChangePassword />}
        {tab === SETTINGSTAB.TRANSACTIONHISTORY && <TransactionsHistory />}
      </main>
    </Gutter>
  )
}

export default Settings
