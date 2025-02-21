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
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()

  return (
    <Select onValueChange={(value) => column.setFilterValue(value)}>
      <SelectTrigger className="col-span-1 h-8 w-full max-w-56 truncate rounded border border-neutral-500 bg-neutral-950 px-2 text-neutral-200 shadow sm:max-w-36 md:max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultChecked>{t('Hamma_Clublar')}</SelectItem>
        {selectedClubs?.map((club) => (
          <SelectItem
            key={club.id}
            value={getCorrectName({ lang, uz: club.name, ru: club.name_ru })}
            className="capitalize text-neutral-200 checked:bg-neutral-800"
          >
            {getCorrectName({ lang, uz: club.name, ru: club.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ClubsFilter
