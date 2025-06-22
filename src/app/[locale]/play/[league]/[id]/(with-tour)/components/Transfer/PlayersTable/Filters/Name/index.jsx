import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'

const PlayerNameFilter = ({ column, columnFilterValue }) => {
  const { t } = useTranslation()
  return (
    <div className="relative col-span-4 w-full sm:col-span-2 sm:max-w-96 lg:col-span-4 lg:max-w-full xl:col-span-1 xl:max-w-96">
      <Input
        // className="bg-background text-foreground border-border placeholder:text-muted-foreground h-8 w-full rounded-sm border px-2 shadow-sm"
        className="h-8 w-full border-dashed"
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={t("O'yinchi Ismi")}
        type="text"
        value={columnFilterValue ?? ''}
      />
    </div>
  )
}
export default PlayerNameFilter
