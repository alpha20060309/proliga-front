import PriceFilter from './Price'
import PositionsFilter from './Positions'
import PlayerNameFilter from './Name'
import ClubsFilter from './Clubs'

function TransferTableFilters({ column }) {
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
    case 'clb':
      return (
        <ClubsFilter column={column} columnFilterValue={columnFilterValue} />
      )
    case 'pice':
      return (
        <PriceFilter column={column} columnFilterValue={columnFilterValue} />
      )
    case 'positin':
      return (
        <PositionsFilter
          column={column}
          columnFilterValue={columnFilterValue}
        />
      )
    default:
      return null
  }
}

export default TransferTableFilters
