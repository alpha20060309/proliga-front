import { cn } from '@/lib/utils'

const JournalTableBody = ({ table, flexRender }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="hover:bg-secondary bg-card text-card-foreground hover:text-secondary-foreground w-full border-b border-border"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={cn('h-8 w-min pr-1 text-xs md:text-sm')}
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

export default JournalTableBody
