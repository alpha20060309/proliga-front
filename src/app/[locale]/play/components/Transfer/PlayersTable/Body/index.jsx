import { cn } from '@/lib/utils'

const TransferTableBody = ({ table, flexRender }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-muted-foreground bg-card/80 text-foreground odd:bg-muted hover:bg-background mx-auto border-b"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={cn(
                'text-3xs xs:text-xs px-0 text-center capitalize sm:text-start',
                'md:p-1 md:text-sm lg:text-xs xl:text-sm',
                cell.column.id === 'name' ? 'min-w-1/4' : 'w-min sm:w-auto'
              )}
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

export default TransferTableBody
