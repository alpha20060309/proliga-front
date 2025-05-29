import { useSelector } from 'react-redux'
import { selectClubs } from 'app/lib/features/club/club.selector'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const ClubsFilter = ({ column }) => {
  const selectedClubs = useSelector(selectClubs)
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)

  return (
    <Select onValueChange={(value) => column.setFilterValue(value)}>
      <SelectTrigger className="bg-background text-foreground border-border col-span-2 w-full max-w-64 truncate rounded-sm border px-2 shadow-sm data-[size=default]:h-8 sm:col-span-1 sm:max-w-40 md:max-w-48 lg:col-span-2 lg:max-w-full xl:col-span-1 xl:max-w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={'bg-background'}>
        <SelectItem defaultChecked>{t('Hamma_Clublar')}</SelectItem>
        {selectedClubs?.map((club) => (
          <SelectItem
            key={club.id}
            value={getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
            className="text-foreground checked:bg-card capitalize"
          >
            {getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ClubsFilter
