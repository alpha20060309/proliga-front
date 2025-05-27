import { cn } from '@/lib/utils'

const Body = ({ table, flexRender }) => {
  const condition = (status) => {
    switch (status) {
      case -1:
        return 'border-l-red-500'
      case 0:
        return 'border-l-yellow-500'
      case 1:
        return 'border-l-green-500'
      default:
        return ''
    }
  }

  return (
    <tbody className="h-auto">
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={cn(
            'border-border bg-background even:bg-secondary mx-auto w-full border-b border-l-2',
            condition(row?.original?.status)
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={
                'h-14 w-min max-w-24 px-0.5 text-center break-words sm:min-w-6 md:max-w-max md:px-1 md:text-start lg:h-12'
              }
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default Body
