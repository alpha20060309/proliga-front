import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

const TanStackPagination = ({ table, active, className, buttonClassName }) => {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const getPageRange = () => {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + 4)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  return (
    <section
      className={cn(
        'mt-2 flex items-center justify-center gap-2 overflow-x-auto py-0.5',
        className
      )}
    >
      <PaginationButton
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        icon={'double-left'}
        className={cn('size-7 rounded md:size-8', buttonClassName)}
      />
      <PaginationButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        icon={'left'}
        className={cn('size-7 rounded md:size-8', buttonClassName)}
      />
      {getPageRange().map((page) => (
        <button
          key={page}
          onClick={() => table.setPageIndex(page - 1)}
          className={cn(
            'block size-7 rounded border text-xs md:size-8 md:text-sm',
            buttonClassName,
            currentPage === page
              ? cn('bg-neutral-300 text-black', active)
              : 'bg-transparent hover:bg-neutral-800'
          )}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <PaginationButton
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        icon={'right'}
        className={cn('size-7 rounded md:size-8', buttonClassName)}
      />
      <PaginationButton
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        icon={'double-right'}
        className={cn('size-7 rounded md:size-8', buttonClassName)}
      />
    </section>
  )
}

const PaginationButton = ({ onClick, disabled, icon, className }) => {
  const render = () => {
    switch (icon) {
      case 'left':
        return <ChevronLeft className="h-full w-full" />
      case 'right':
        return <ChevronRight className="h-full w-full" />
      case 'double-left':
        return <ChevronsLeft className="h-full w-full" />
      case 'double-right':
        return <ChevronsRight className="h-full w-full" />
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'block rounded-sm border p-1 hover:bg-neutral-800 disabled:opacity-75 disabled:hover:bg-transparent',
        className
      )}
    >
      {render()}
    </button>
  )
}

export default TanStackPagination
