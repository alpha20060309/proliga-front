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
      <SelectTrigger className="bg-background text-secondary-foreground h-8 w-1/3 min-w-40 truncate rounded-sm border border-neutral-500 px-2 shadow-sm sm:max-w-36 md:max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="checked:bg-card rounded" defaultChecked={true}>
          {t('Hamma_Clublar')}
        </SelectItem>
        {selectedClubs?.map((club) => (
          <SelectItem
            key={club.id}
            value={getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
            className="text-secondary-foreground checked:bg-card capitalize"
          >
            {getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ClubsFilter
