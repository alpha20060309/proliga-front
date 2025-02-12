import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const PlayerNameFilter = ({ column, columnFilterValue }) => {
  const { t } = useTranslation()
  return (
    <div className="relative h-8 w-2/3 sm:col-span-2 sm:min-w-80 md:w-auto">
      <Input
        className="h-8 w-full rounded border border-neutral-500 bg-neutral-950 px-2 text-neutral-200 shadow placeholder:text-neutral-300"
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={t("O'yinchi Ismi")}
        type="text"
        value={columnFilterValue ?? ''}
      />

      <Search className="absolute right-2 top-1/2 hidden size-5 -translate-y-1/2 text-neutral-400 xs:block" />
    </div>
  )
}
export default PlayerNameFilter
