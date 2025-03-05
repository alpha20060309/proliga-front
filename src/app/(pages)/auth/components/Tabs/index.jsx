import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const AuthTabs = ({ tabs, setCurrentTab, loginStyles, registerStyles }) => {
  const { t } = useTranslation()

  const handleClick = (tab) => {
    setCurrentTab(tab)
    window.location.hash = tab
  }

  return (
    <div className="flex gap-0.5 rounded bg-neutral-900 p-1">
      <Button
        className={cn(
          'h-8 flex-1 select-none rounded text-sm font-bold capitalize transition-all',
          loginStyles
        )}
        onClick={() => handleClick(tabs.login)}
      >
        {t('Tizimga kirish_1')}
      </Button>
      <Button
        className={cn(
          'h-8 flex-1 select-none rounded text-sm font-bold transition-all',
          registerStyles
        )}
        onClick={() => handleClick(tabs.signup)}
      >
        {t("Ro'yxatdan o'tish")}
      </Button>
    </div>
  )
}

export default AuthTabs
