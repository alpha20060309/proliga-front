import { MATCH_EVENTS } from 'app/utils/match.util'
import { RefreshCcw } from 'lucide-react'

const MatchEventIcon = ({ type }) => {
  switch (type) {
    case MATCH_EVENTS.GOAL:
      return (
        <img
          src="/icons/football.svg"
          alt="GOAL"
          className="filter-black dark:filter-white size-7"
        />
      )
    case MATCH_EVENTS.MISSED_PENALTY:
      return (
        <img
          src="/icons/missed-penalty.svg"
          alt="missed penalty"
          className="filter-black dark:filter-white size-7"
        />
      )
    case MATCH_EVENTS.HIT_PENALTY:
      return (
        <img
          src="/icons/hit-penalty.svg"
          alt="Penalty hit"
          className="filter-black dark:filter-white size-7"
        />
      )
    case MATCH_EVENTS.TRANSFER:
      return <RefreshCcw className="text-foreground size-7" />
    case MATCH_EVENTS.RED_CARD:
      return (
        <img
          src="/icons/soccer-card.svg"
          alt="red card"
          className="filter-red-600 size-7"
        />
      )
    case MATCH_EVENTS.YELLOW_CARD:
      return (
        <img
          src="/icons/soccer-card.svg"
          alt="Yellow Card"
          className="filter-yellow-500 size-7"
        />
      )
    default:
      return null
  }
}

export default MatchEventIcon
