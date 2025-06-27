import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const NotificationToggle = () => {
  const { t } = useTranslation()

  return (
    <Card className="sm:max-w-64 flex w-full flex-col px-4 gap-4">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Xabarnomalar')}</CardTitle>
        <Switch
          disabled
          className="data-[state=checked]:bg-success data-[state=unchecked]:bg-muted h-5 w-10"
          thumbClassName="size-5 data-[state=checked]:translate-x-5"
        />
      </CardHeader>
      <CardDescription>
        {t(
          'Получайте уведомление о важных новостях, сообщениях, и действиях в режиме реального времени'
        )}
      </CardDescription>
    </Card>
  )
}

export default NotificationToggle
