import NameFilter from "components/Table/Filters/Name";
import ClubsFilter from "components/Table/Filters/Clubs";
import PositionsFilter from "components/Table/Filters/Position";

function StatisticsTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnFilterValue = column.getFilterValue();

  switch (filterVariant) {
    case "name":
      return (
        <NameFilter
          column={column}
          className={"w-full order-1 col-span-2 sm:col-span-1"}
          columnFilterValue={columnFilterValue}
        />
      );
    case "club":
      return (
        <ClubsFilter
          column={column}
          columnFilterValue={columnFilterValue}
          className="w-full  order-2 col-span-1"
        />
      );
    case "position":
      return (
        <PositionsFilter
          column={column}
          columnFilterValue={columnFilterValue}
          className="w-full  order-3 col-span-1"
        />
      );
    default:
      return null;
  }
}

export default StatisticsTableFilters;
