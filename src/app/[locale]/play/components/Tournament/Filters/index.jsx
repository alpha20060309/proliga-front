import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { selectTours } from 'app/lib/features/tour/tour.selector'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const TournamentSelectedTour = ({ tour, setTour }) => {
  const tours = useSelector(selectTours)
  const { teamsLoading } = useSelector((state) => state.team)
  const { lang } = useSelector((store) => store.systemLanguage)

  const handleSelectTour = (value) => {
    setTour(value)
  }

  return (
    <Select
      disabled={teamsLoading}
      value={tour}
      onValueChange={handleSelectTour}
    >
      <SelectTrigger className="bg-background text-muted-foreground data-[size=default]:h-8 w-1/3 max-w-36 truncate rounded-sm border-border px-2 shadow-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tours?.map((t) => (
          <SelectItem key={t.id} defaultChecked={t.id === tour} value={t.id}>
            {getCorrectName({ lang, uz: t.name, ru: t.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TournamentSelectedTour
