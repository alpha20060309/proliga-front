import { useTranslation } from 'react-i18next'

const ChampionshipsTitle = () => {
  const { t } = useTranslation()

  return (
    <h2 className="mb-6 text-2xl font-bold text-white">
      <span className="text-accent mr-2">{t('Available')}</span>
      {t('Ligalar')}
    </h2>
  )
}

export default ChampionshipsTitle
