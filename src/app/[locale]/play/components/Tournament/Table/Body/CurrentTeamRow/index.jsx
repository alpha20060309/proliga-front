import { Link } from 'next-view-transitions'

const TournamentTableCurrentTeamRow = ({
  currentCompetition,
  currentTourTeam,
}) => {
  return (
    <tr className="hover:bg-card border-border bg-background odd:bg-secondary mx-auto h-8 border-b border-l-2 border-l-blue-600 text-center md:border-l-4 md:text-start">
      <td>
        <Link
          href={`/team-view/${currentCompetition?.id}/${currentTourTeam.team?.id ?? 0}`}
        >
          {currentTourTeam?.team?.order}
        </Link>
      </td>
      <td>
        <Link
          href={`/team-view/${currentCompetition?.id}/${currentTourTeam.team?.id ?? 0}`}
        >
          {currentTourTeam?.team?.name}
        </Link>
      </td>
      <td>
        <Link
          href={`/team-view/${currentCompetition?.id}/${currentTourTeam.team?.id ?? 0}`}
        >
          {currentTourTeam?.user_id?.name}
        </Link>
      </td>
      <td>
        <Link
          href={`/team-view/${currentCompetition?.id}/${currentTourTeam.team?.id ?? 0}`}
        >
          {currentTourTeam?.point}
        </Link>
      </td>
      <td>
        <Link
          href={`/team-view/${currentCompetition?.id}/${currentTourTeam.team?.id ?? 0}`}
        >
          {currentTourTeam?.team?.point}
        </Link>
      </td>
    </tr>
  )
}

export default TournamentTableCurrentTeamRow
