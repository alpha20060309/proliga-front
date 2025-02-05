import PlayerNameFilter from './Name'
import ClubsFilter from './Clubs'

function StatisticsTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  switch (filterVariant) {
    case 'name':
      return (
        <PlayerNameFilter
          column={column}
          columnFilterValue={columnFilterValue}
        />
      )
    case 'club':
      return (
        <ClubsFilter column={column} columnFilterValue={columnFilterValue} />
      )
    default:
      return null
  }
}

export default StatisticsTableFilters
