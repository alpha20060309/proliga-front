import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const PositionsFilter = ({ column, columnFilterValue }) => {
  const active = 'bg-primary text-black font-bold'
  const passive = 'bg-transparent text-neutral-500 font-base'
  const { t } = useTranslation()
  const DATA = [
    {
      title: 'Barchasi',
      key: '',
    },
    {
      title: 'Darvozabon',
      key: 'GOA',
    },
    {
      title: 'Himoyachi',
      key: 'DEF',
    },
    {
      title: 'Yar Himoyachi',
      key: 'MID',
    },
    {
      title: 'Hujumchi',
      key: 'STR',
    },
  ]

  return (
    <section className="col-span-4 flex w-full overflow-x-auto text-xs xs:text-sm lg:text-xs 2xl:gap-x-0.5 2xl:text-sm">
      {DATA.map((obj, index) => (
        <button
          key={index}
          className={cn(
            'text-nowrap break-keep rounded px-2 py-1 font-bold capitalize transition-all md:px-4 2xl:px-2',
            obj.key === '' && typeof columnFilterValue === 'undefined'
              ? active
              : obj.key === columnFilterValue
                ? active
                : passive
          )}
          onClick={() => column.setFilterValue(obj.key)}
        >
          {t(obj.title)}
        </button>
      ))}
    </section>
  )
}

export default PositionsFilter
