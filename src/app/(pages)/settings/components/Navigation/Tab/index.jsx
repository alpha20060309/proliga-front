import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

import { Shield, User, Cog, History } from 'lucide-react'

const SettingsNavigationTab = ({ tab, setTab, currentTab }) => {
  const { t } = useTranslation()
  const active = 'text-primary'
  const passive = 'text-neutral-300'
  const containerActive = 'bg-neutral-800'
  const containerPassive = 'bg-transparent'
  const isActive = tab.key === currentTab

  const renderIcon = (type) => {
    switch (type) {
      case 'User':
        return <User className={cn('size-6', isActive ? active : passive)} />
      case 'Cog':
        return <Cog className={cn('size-6', isActive ? active : passive)} />
      case 'History':
        return <History className={cn('size-6', isActive ? active : passive)} />
      case 'Shield':
        return <Shield className={cn('size-6', isActive ? active : passive)} />
      default:
        return null
    }
  }

  return (
    <button
      key={tab}
      onClick={() => setTab(tab.key)}
      className={cn(
        'flex w-full cursor-pointer items-center justify-center gap-2 lg:justify-start',
        'rounded-md p-2 transition-all hover:bg-neutral-800 lg:w-auto',
        isActive ? containerActive : containerPassive
      )}
    >
      {renderIcon(tab.icon)}
      <div
        className={cn(
          'hidden select-none lg:block lg:text-sm',
          isActive ? active : passive
        )}
      >
        {t(tab.title)}
      </div>
    </button>
  )
}

export default SettingsNavigationTab
