import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectMatchEvents } from 'app/lib/features/matchEvent/matchEvent.selector'
import MatchEvent from './Event'
import MatchEventSkeleton from './Skeleton'

const MatchEventContent = () => {
  const events = useSelector(selectMatchEvents)
  const { isLoading } = useSelector((store) => store.matchEvent)

  if (isLoading) {
    return <MatchEventSkeleton />
  }

  return (
    <motion.section className="relative flex h-full max-h-[calc(90vh-300px)] flex-col gap-4 overflow-y-auto px-4 py-4">
      {/* Center line */}
      <span
        style={{ height: `${events?.length * 3.6 || 0}rem` }}
        className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-neutral-600"
      />

      {events.map((event, index) => (
        <MatchEvent key={index} index={index} event={event} />
      ))}
    </motion.section>
  )
}

export default MatchEventContent
