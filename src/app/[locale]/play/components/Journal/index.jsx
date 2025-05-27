import JournalTable from './Table'
import JournalSkeleton from './Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserActivity } from 'app/lib/features/userActivity/userActivity.thunk'
import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Pagination } from 'components/Table/Pagination'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { memo } from 'react'

function Journal() {
  const path = usePathname()
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const { season } = useSelector((state) => state.season)
  const { isLoading, count } = useSelector((state) => state.userActivity)
  const currentTeam = useSelector(selectCurrentTeam)
  const [page, setPage] = useState(0)
  const perPage = 16
  const pages = useMemo(() => {
    return Math.ceil(count / perPage)
  }, [count, perPage])
  const competition_id = +path.split('/')[2] || 0

  useEffect(() => {
    if (competition_id && season?.id && currentTeam?.id) {
      dispatch(
        fetchUserActivity({
          competition_id,
          user_id: userTable?.id,
          team_id: currentTeam?.id,
          page,
          perPage,
        })
      )
    }
  }, [dispatch, competition_id, season, page, perPage, userTable, currentTeam])

  if (isLoading)
    return <JournalSkeleton paginationCount={pages < 5 ? pages : 5} />

  return (
    <>
      <JournalTable />
      <Pagination
        onPageChange={setPage}
        currentPage={page}
        totalPages={pages}
        className={'mt-auto pt-1'}
      />
    </>
  )
}

export default memo(Journal)
