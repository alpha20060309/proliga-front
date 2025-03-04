'use client'

import dynamic from 'next/dynamic'
import { SETTINGS_TABS } from '../../tabs'
const SettingsNavigationTab = dynamic(() => import('./Tab'), {
  ssr: false,
})
const SettingsSidebarLogOut = dynamic(() => import('./LogOut/LogOut'), {
  ssr: false,
})

const SettingsNavigation = ({ setTab, currentTab }) => {
  return (
    <aside className="flex h-auto w-full flex-row space-x-0.5 rounded-xl bg-neutral-900/80 bg-opacity-90 p-2 backdrop-blur fade-in lg:w-64 lg:flex-col lg:p-4 xl:gap-1">
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

export default SettingsNavigation
