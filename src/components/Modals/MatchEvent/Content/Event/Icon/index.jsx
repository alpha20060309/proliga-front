import { MATCH_EVENTS } from 'app/utils/match.util'

const MatchEventIcon = ({ type }) => {
  switch (type) {
    case MATCH_EVENTS.GOAL:
      return <img src="/icons/football.svg" alt="GOAL" className="size-7" />
    case MATCH_EVENTS.MISSED_PENALTY:
      return (
        <img
          src="/icons/missed-penalty.svg"
          alt="missed penalty"
          className="size-7"
        />
      )
    case MATCH_EVENTS.HIT_PENALTY:
      return (
        <img
          src="/icons/hit-penalty.svg"
          alt="Penalty hit"
          className="size-7"
        />
      )
    case MATCH_EVENTS.TRANSFER:
      return (
        <img
          src="/icons/arrows-transfer.svg"
          alt="transfer players"
          className="size-7"
        />
      )
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
