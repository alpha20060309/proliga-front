'use client'

import dynamic from 'next/dynamic'
const SettingsNavigationTab = dynamic(() => import('./Tab'), {
  ssr: false,
})
const SettingsSidebarLogOut = dynamic(() => import('./LogOut/LogOut'), {
  ssr: false,
})
import { SETTINGS_TAB } from '../../page'

const SettingsNavigation = ({ setTab, currentTab }) => {
  return (
    <aside className="bg-card bg-opacity-90 fade-in flex h-auto w-full flex-row space-x-0.5 rounded-xl p-2 backdrop-blur-sm lg:w-64 lg:flex-col lg:p-4 xl:gap-1">
      {SETTINGS_TABS.map((tab) => (
        <SettingsNavigationTab
          key={tab.key}
          setTab={setTab}
          tab={tab}
          currentTab={currentTab}
        />
      ))}
      <SettingsSidebarLogOut />
    </aside>
  )
}

const SETTINGS_TABS = [
  {
    key: SETTINGS_TAB.PROFILE,
    title: 'Profil',
    icon: 'User',
  },
  {
    key: SETTINGS_TAB.SETTINGS,
    title: 'Sozlamalar',
    icon: 'Cog',
  },
  {
    key: SETTINGS_TAB.HISTORY,
    title: 'Xarajatlar',
    icon: 'History',
  },
  {
    key: SETTINGS_TAB.SECURITY,
    title: 'Security',
    icon: 'Shield',
  },
]

export default SettingsNavigation
