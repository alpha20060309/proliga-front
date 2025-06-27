import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ThemeCustomizerModal from 'shared/ThemeCustomizer'

const ThemeCustomizer = () => {
  const { t } = useTranslation()

  return (
    <Card className="sm:max-w-64 flex w-full px-4 flex-col gap-4">
      <CardHeader className={'flex items-center p-0 justify-between'}>
        <CardTitle>{t('Настройки темы')}</CardTitle>
        <ThemeCustomizerModal />
      </CardHeader>
      <CardDescription >
        {t(
          'Персонализируй свою тему при помощи пользовательских тем, цветовых схем и настроек внешнего вида.'
        )}
      </CardDescription>
    </Card>
  )
}

export default ThemeCustomizer
