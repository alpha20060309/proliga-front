import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const AuthTabs = ({ tabs, setCurrentTab, loginStyles, registerStyles }) => {
  const { t } = useTranslation()

  return (
    <div className="flex rounded bg-neutral-900 p-1">
      <button
        className={cn(
          'flex-1 select-none rounded py-1.5 text-sm font-bold capitalize transition-all',
          loginStyles
        )}
        onClick={() => setCurrentTab(tabs.login)}
      >
        {t('Tizimga kirish_1')}
      </button>
      <button
        className={cn(
          'flex-1 select-none rounded py-1.5 text-sm font-bold transition-all',
          registerStyles
        )}
        onClick={() => setCurrentTab(tabs.signup)}
      >
        {t("Ro'yxatdan o'tish")}
      </button>
    </div>
  )
}

export default AuthTabs
