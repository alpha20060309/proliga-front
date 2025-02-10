import Link from 'next/link'
import TournamentTableCurrentTeamRow from './CurrentTeamRow'
import { useSelector } from 'react-redux'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.selector'
import { cn } from '@/lib/utils'

const TournamentTableBody = ({ table, flexRender, showUserTourTeam }) => {
  const topThreeTeam = 'border-l-red-500 border-l-2 md:border-l-4'
  const topTenTeam = 'border-l-yellow-500 border-l-2 md:border-l-4'
  const matchingTeam = 'border-l-blue-500 border-l-2 md:border-l-4'
  const currentCompetition = useSelector(selectCurrentCompetition)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTourTeam = useSelector(selectCurrentTourTeam)

  const condition = (order, teamId) => {
    if (teamId === currentTeam?.id) {
      return matchingTeam
    }
    if (order > 0 && order <= 3) return topThreeTeam
    if (order > 3 && order <= 10) return topTenTeam
    return ''
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={cn(
            'mx-auto border-b border-neutral-700 bg-neutral-900 text-center odd:bg-stone-950 hover:bg-neutral-800 md:text-start',
            condition(row?.original?.team?.order, row?.original?.team?.id)
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <td className="h-8 w-min px-0.5 md:w-auto" key={cell.id}>
              <Link
                href={`/team-view/${currentCompetition?.id}/${row?.original?.team?.id ?? 0}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Link>
            </td>
          ))}
        </tr>
      ))}
      {showUserTourTeam && (
        <TournamentTableCurrentTeamRow
          currentCompetition={currentCompetition}
          currentTourTeam={currentTourTeam}
        />
      )}
    </tbody>
  )
}

export default TournamentTableBody
