import { useSelector } from 'react-redux'
import StatisticsTable from './Table'
import StatisticsTableSkeleton from './Skeleton'

const Statistics = () => {
  const { isLoading } = useSelector((state) => state.players)

  if (isLoading) return <StatisticsTableSkeleton />

  return <StatisticsTable />
}

export default Statistics
