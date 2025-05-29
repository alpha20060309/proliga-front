import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const PlayerNameFilter = ({ column, columnFilterValue }) => {
  const { t } = useTranslation()
  return (
    <div className="relative col-span-4 w-full sm:col-span-2 sm:max-w-96 lg:col-span-4 lg:max-w-full xl:col-span-2 xl:max-w-96">
      <Input
        className="bg-background text-foreground border-border placeholder:text-muted-foreground h-8 w-full rounded-sm border pr-7 pl-2 shadow-sm"
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={t("O'yinchi Ismi")}
        type="text"
        value={columnFilterValue ?? ''}
      />
      <Search className="text-muted-foreground xs:block absolute top-[5px] right-[5px] hidden size-5" />
    </div>
  )
}
export default PlayerNameFilter
