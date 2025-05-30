'use client'

import { useTranslation } from 'react-i18next'

const PrizesTitle = () => {
  const { t } = useTranslation()

  return (
    <h1 className="text-foreground mb-6 text-2xl font-bold">{t('Yutuqlar')}</h1>
  )
}

export default PrizesTitle
