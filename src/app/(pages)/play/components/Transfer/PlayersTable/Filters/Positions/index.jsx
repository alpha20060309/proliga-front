import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
// import { LANGUAGE } from 'app/utils/languages.util'
// import { PLAYER_POSITION } from 'app/utils/player.util'
import { cn } from '@/lib/utils'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'

const PositionsFilter = ({ column, columnFilterValue }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const active = 'bg-primary text-black font-bold'
  const passive = 'bg-transparent text-neutral-500 font-base'
  const { t } = useTranslation()
  const DATA = [
    {
      title: t('Barchasi'),
      key: '',
    },
    {
      title: t('Darvozabon'),
      key: 'GOA',
    },
    {
      title: t('Himoyachi'),
      key: 'DEF',
    },
    {
      title: t('Yar Himoyachi'),
      key: 'MID',
    },
    {
      title: t('Hujumchi'),
      key: 'STR',
    },
  ]
  // const getCorrentPlayerPosition = (position) => {
  //   if (lang === LANGUAGE.ru) {
  //     if (position === PLAYER_POSITION.GOA) {
  //       return 'ВР'
  //     }
  //     if (position === PLAYER_POSITION.DEF) {
  //       return 'ЗЩ'
  //     }
  //     if (position === PLAYER_POSITION.MID) {
  //       return 'ПЗ'
  //     }
  //     if (position === PLAYER_POSITION.STR) {
  //       return 'НП'
  //     }
  //   }
  //   if (lang === LANGUAGE.uz) {
  //     if (position === PLAYER_POSITION.GOA) {
  //       return 'DR'
  //     }
  //     if (position === PLAYER_POSITION.DEF) {
  //       return 'HM'
  //     }
  //     if (position === PLAYER_POSITION.MID) {
  //       return 'YH'
  //     }
  //     if (position === PLAYER_POSITION.STR) {
  //       return 'HJ'
  //     }
  //   }
  //   return position
  // }

  return (
    <section className="col-span-4 flex w-full overflow-x-auto text-xs xs:text-sm lg:text-xs 2xl:gap-x-0.5 2xl:text-sm">
      {DATA.map((obj, index) => (
        <button
          key={index}
          className={cn(
            'text-nowrap break-keep rounded px-2 py-1 font-bold capitalize transition-all md:px-4 2xl:px-2',
            getCorrentPlayerPosition(obj.key, lang) === '' &&
              typeof columnFilterValue === 'undefined'
              ? active
              : getCorrentPlayerPosition(obj.key, lang) === columnFilterValue
                ? active
                : passive
          )}
          onClick={() =>
            column.setFilterValue(getCorrentPlayerPosition(obj.key, lang))
          }
        >
          {obj.title}
        </button>
      ))}
    </section>
  )
}



export default PositionsFilter
