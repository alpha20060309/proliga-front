'use client'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getTourName } from 'app/utils/tour.util'

const GameTab = ({ item }) => {
  const { lang } = useSelector((state) => state.systemLanguage)
  const { t } = useTranslation()

  return (
    <div className="tour-tab-container">
      <p className="tour-tab-title">
        {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
      </p>
      <p className="tour-tab-description">{getTourName(item.status, t)}</p>
    </div>
  )
}

export default GameTab
