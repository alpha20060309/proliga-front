import { useTranslation } from 'react-i18next'

const RulesSliderTitle = () => {
  const { t } = useTranslation()

  return (
    <div className="mb-4 w-3/4 max-w-[24rem] -skew-x-12 self-start rounded-xs bg-primary md:mb-6 md:max-w-120">
      <h3 className="carousel-header text-center font-bold capitalize text-accent-foreground">
        {t('Umumiy qoidalar')}
      </h3>
    </div>
  )
}

export default RulesSliderTitle
