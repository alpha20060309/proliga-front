import { useSelector } from 'react-redux'
import StatisticsTable from './Table'
import StatisticsTableSkeleton from './Skeleton'
import { memo } from 'react'

const Statistics = () => {
  const { isLoading } = useSelector((state) => state.player)

  if (isLoading) return <StatisticsTableSkeleton />

  return <StatisticsTable />
}

export default memo(Statistics)
