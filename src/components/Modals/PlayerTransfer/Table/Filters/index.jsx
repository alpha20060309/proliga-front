import PriceFilter from 'components/Table/PriceFilter'
import NameFilter from 'components/Table/NameFilter'
import ClubsFilter from 'components/Table/ClubsFilter'

function TransferTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  return filterVariant === 'name' ? (
    <NameFilter column={column} columnFilterValue={columnFilterValue} />
  ) : filterVariant === 'club' ? (
    <ClubsFilter column={column} columnFilterValue={columnFilterValue} />
  ) : filterVariant === 'price' ? (
    <PriceFilter column={column} columnFilterValue={columnFilterValue} />
  ) : null
}

export default TransferTableFilters
