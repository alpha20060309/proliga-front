import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { MATCH_STATUS } from "app/utils/match.util"

const MatchStatus = ({ status, homeScore, awayScore }) => {
  const { t } = useTranslation()

  switch (status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <Badge
          variant="secondary"
          className="bg-card py-px text-[11px] font-normal sm:text-xs"
        >
          {t('Boshlanmagan')}
        </Badge>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <Badge
          variant="default"
          className="animate-pulse py-px text-[11px] font-normal sm:text-xs"
        >
          {homeScore} - {awayScore}
        </Badge>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <Badge variant="outline text-[11px] font-normal sm:text-xs py-px">
          {homeScore} - {awayScore}
        </Badge>
      )
    default:
      return null
  }
}
export default MatchStatus