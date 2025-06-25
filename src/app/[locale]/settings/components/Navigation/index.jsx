'use client'

import dynamic from 'next/dynamic'
const SettingsNavigationTab = dynamic(() => import('./Tab'), {
  ssr: false,
})
const SettingsSidebarLogOut = dynamic(() => import('./LogOut/LogOut'), {
  ssr: false,
})
import { Card, CardContent } from '@/components/ui/card'

const SettingsNavigation = ({ setTab, currentTab }) => {
  return (
    <Card className="fade-in animate-in w-full p-2 backdrop-blur-sm duration-300 lg:w-64">
      <CardContent
        className={'flex flex-row space-x-0.5 p-0 lg:flex-col lg:gap-1'}
      >
        {SETTINGS_TABS.map((tab) => (
          <SettingsNavigationTab
            key={tab.href}
            setTab={setTab}
            tab={tab}
            currentTab={currentTab}
          />
        ))}
      </CardContent>
      <SettingsSidebarLogOut />
    </Card>
  )
}

const SETTINGS_TABS = [
  {
    title: 'Profil',
    icon: 'User',
    href: '/settings',
  },
  {
    title: 'Sozlamalar',
    icon: 'Cog',
    href: '/settings/general',
  },

  {
    title: 'Xarajatlar',
    icon: 'Banknote',
    href: '/settings/transactions',
  },
  {
    title: 'Security',
    icon: 'Shield',
    href: '/settings/security',
  },
]

export default SettingsNavigation
