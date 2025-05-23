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
      <SelectTrigger className="h-8 w-1/3 min-w-40 truncate rounded-sm border border-neutral-500 bg-background px-2 text-secondary-foreground shadow-sm sm:max-w-36 md:max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="rounded checked:bg-neutral-800"
          defaultChecked={true}
        >
          {t('Hamma_Clublar')}
        </SelectItem>
        {selectedClubs?.map((club) => (
          <SelectItem
            key={club.id}
            value={getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
            className="capitalize text-secondary-foreground checked:bg-neutral-800"
          >
            {getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ClubsFilter
