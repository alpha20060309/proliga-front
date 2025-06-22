import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'

const PlayerNameFilter = ({ column, columnFilterValue }) => {
  const { t } = useTranslation()
  return (
    <Input
      // className="bg-background text-foreground border-border placeholder:text-muted-foreground h-8 w-full rounded-sm border px-2 shadow-sm"
      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:text-foreground border-border h-8 w-full rounded-md border border-dashed px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={t("O'yinchi Ismi")}
      type="text"
      value={columnFilterValue ?? ''}
    />
  )
}
export default PlayerNameFilter
