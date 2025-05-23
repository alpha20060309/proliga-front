import { useTranslation } from 'react-i18next'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AuthTabs = ({ tabs, setCurrentTab }) => {
  const { t } = useTranslation()

  const handleValueChange = (value) => {
    setCurrentTab(value)
    window.location.hash = value
  }

  return (
    <Tabs
      defaultValue={tabs.login}
      onValueChange={handleValueChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value={tabs.login}
          className="text-sm font-bold capitalize"
        >
          {t('Tizimga kirish_1')}
        </TabsTrigger>
        <TabsTrigger
          value={tabs.signup}
          className="text-sm font-bold capitalize"
        >
          {t("Ro'yxatdan o'tish")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default AuthTabs
