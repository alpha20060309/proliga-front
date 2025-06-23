import NameFilter from "components/Table/NameFilter"
import ClubsFilter from "components/Table/ClubsFilter"

function StatisticsTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  switch (filterVariant) {
    case 'name':
      return (
        <NameFilter
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
