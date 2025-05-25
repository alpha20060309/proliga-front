import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const PlayerNameFilter = ({ column, columnFilterValue }) => {
  const { t } = useTranslation()
  return (
    <div className="relative col-span-2 w-full">
      <Input
        className="bg-background text-secondary-foreground h-8 w-full rounded-sm border border-neutral-500 pr-7 pl-2 shadow-sm placeholder:text-neutral-300"
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={t("O'yinchi Ismi")}
        type="text"
        value={columnFilterValue ?? ''}
      />
      <Search className="xs:block absolute top-1/2 right-2 hidden size-5 -translate-y-1/2 text-neutral-300" />
    </div>
  )
}
export default PlayerNameFilter
