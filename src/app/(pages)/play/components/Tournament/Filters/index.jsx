import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { selectTours } from 'app/lib/features/tour/tour.selector

const TournamentSelectedTour = ({ tour, setTour }) => {
  const tours = useSelector(selectTours)
  const { teamsLoading } = useSelector((state) => state.teams)

  const handleSelectTour = (value) => {
    setTour(value)
  }

  return (
    <Select
      disabled={teamsLoading}
      value={tour}
      onValueChange={handleSelectTour}
    >
      <SelectTrigger className="h-8 w-1/3 max-w-36 truncate rounded border-neutral-500 bg-neutral-950 px-2 text-neutral-200 shadow">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tours?.map((t) => (
          <SelectItem key={t.id} defaultChecked={t.id === tour} value={t.id}>
            {t.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TournamentSelectedTour
