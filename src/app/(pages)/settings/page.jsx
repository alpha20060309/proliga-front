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
import { Tabs, TabsContent } from '@/components/ui/tabs'

function Settings() {
  const { t } = useTranslation()
  const router = useRouter()
  // const [tab, setTab] = useState()
  const tab = window && window.location.hash
  const { isLoading } = useSelector((store) => store.auth)
  const { data: session } = useSession()

  // useEffect(() => {
  //   if (!session?.user?.id) {
  //     router.push('/')
  //   }
  // }, [router, t, session?.user?.id])

  if (isLoading) {
    return <SettingsSkeleton />
  }

  console.log(tab, 'tab')

  const renderSection = () => {
    switch (tab) {
      case SETTINGS_TAB.PROFILE:
        return <Profile tab={SETTINGS_TAB.PROFILE} />
      case SETTINGS_TAB.SETTINGS:
        return <SettingsTab tab={SETTINGS_TAB.PROFILE} />
      case SETTINGS_TAB.SECURITY:
        return <ChangePassword tab={SETTINGS_TAB.PROFILE} />
      case SETTINGS_TAB.HISTORY:
        return <TransactionsHistory tab={SETTINGS_TAB.PROFILE} />
      default:
        return <Profile />
    }
  }

  return (
    <Tabs
      defaultValue={SETTINGS_TAB.PROFILE}
      className="flex h-full min-h-[44rem] flex-col gap-2 lg:min-h-[38rem] lg:flex-row"
    >
      <Navigation currentTab={tab} tabs={SETTINGS_TAB} />
      {renderSection()}
    </Tabs>
  )
}

export default Settings
