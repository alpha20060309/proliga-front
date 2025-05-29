import { cn } from '@/lib/utils'

const Body = ({ table, flexRender }) => {
  const styles = (id) => {
    switch (id) {
      case 'ochko':
        return 'w-min px-1 bg-primary text-center text-primary-foreground rounded-sm'
      case 'competitor':
        return 'w-min px-0.5 sm:min-w-5 max-w-14 xs:max-w-20 break-all text-center font-bold'
      default:
        return 'w-min px-0.5 sm:min-w-8 text-center'
    }
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="bg-card even:bg-card/80 border-border mx-auto max-h-20 w-full border-b"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={cn(
                'text-break h-8 w-full py-0.5 capitalize md:py-1',
                styles(cell.column.id)
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

export default Body
