import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const SettingsNavigationTab = ({ tab, setTab, currentTab }) => {
  const { t } = useTranslation()
  const isActive = tab.key === currentTab
  const active = 'text-primary'
  const passive = 'text-neutral-300'
  const activeIcon = 'filter-primary'
  const passiveIcon = 'filter-neutral-300'
  const containerActive = 'bg-neutral-800'
  const containerPassive = 'bg-transparent'

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
      <Image
        src={tab?.icon}
        width={24}
        height={24}
        alt={tab}
        className={cn('size-6', isActive ? activeIcon : passiveIcon)}
      />
      <div
        className={cn(
          'hidden lg:block lg:text-sm',
          isActive ? active : passive
        )}
      >
        {t(tab.title)}
      </div>
    </button>
  )
}

export default SettingsNavigationTab
