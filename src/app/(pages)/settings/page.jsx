'use client'

import { useEffect, useState } from 'react'
import { SETTINGS_TAB } from './tabs'
import TransactionsHistory from './components/Transactions'
import ChangePassword from './components/Security'
import SettingsTab from './components/Settings'
import dynamic from 'next/dynamic'
import { ProfileSkeleton, NavigationSkeleton } from './components/Skeleton'
const Profile = dynamic(() => import('./components/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
})
const Navigation = dynamic(() => import('./components/Navigation'), {
  ssr: false,
  loading: () => <NavigationSkeleton />,
})

function Settings() {
  const [tab, setTab] = useState(SETTINGS_TAB.PROFILE)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && Object.values(SETTINGS_TAB).includes(hash)) {
      setTab(hash)
    }
  }, [])

  const renderSection = () => {
    switch (tab) {
      case SETTINGS_TAB.PROFILE:
        return <Profile />
      case SETTINGS_TAB.SETTINGS:
        return <SettingsTab setHomeTab={() => setTab(SETTINGS_TAB.PROFILE)} />
      case SETTINGS_TAB.SECURITY:
        return <ChangePassword />
      case SETTINGS_TAB.HISTORY:
        return <TransactionsHistory />
      default:
        return <Profile />
    }
  }

  return (
    <main className="flex h-full min-h-[44rem] flex-col gap-2 lg:min-h-[38rem] lg:flex-row">
      <Navigation setTab={setTab} currentTab={tab} tabs={SETTINGS_TAB} />
      {renderSection()}
    </main>
  )
}

export default Settings
