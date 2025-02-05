import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  className,
  buttonClassName = '',
  iconClassName = '',
}) {
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    let startPage = Math.max(
      1,
      currentPage + 1 - Math.floor(maxVisiblePages / 2)
    )
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === currentPage + 1 ? 'secondary' : 'outline'}
          size="sm"
          aria-label={`Page ${i}`}
          onClick={() => onPageChange(i - 1)}
          disabled={disabled || totalPages === 0}
          className={cn('size-7 p-0 md:size-8', buttonClassName)}
        >
          {i}
        </Button>
      )
    }

    return pageNumbers
  }

  return (
    <section
      className={cn('flex items-center justify-center space-x-2', className)}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn('size-7 p-0 md:size-8', buttonClassName)}
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0 || disabled || totalPages === 0}
      >
        <ChevronsLeft className={cn('size-5', iconClassName)} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn('size-7 p-0 md:size-8', buttonClassName)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || disabled || totalPages === 0}
      >
        <ChevronLeft className={cn('size-5', iconClassName)} />
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        size="sm"
        className={cn('size-7 p-0 md:size-8', buttonClassName)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={
          currentPage === totalPages - 1 || disabled || totalPages === 0
        }
      >
        <ChevronRight className={cn('size-5', iconClassName)} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn('size-7 p-0 md:size-8', buttonClassName)}
        onClick={() => onPageChange(totalPages - 1)}
        disabled={
          currentPage === totalPages - 1 || disabled || totalPages === 0
        }
      >
        <ChevronsRight className={cn('size-5', iconClassName)} />
      </Button>
    </section>
  )
}

export const PaginationSkeleton = ({ count = 5, className }) => {
  return (
    <div className={cn('flex h-full justify-center space-x-2', className)}>
      <Button
        variant="outline"
        disabled
        className="size-7 animate-pulse p-0 md:size-8"
      >
        <ChevronsLeft className="size-5 text-neutral-400" />
      </Button>
      <Button
        variant="outline"
        disabled
        className="size-7 animate-pulse p-0 md:size-8"
      >
        <ChevronLeft className="size-5 text-neutral-400" />
      </Button>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="size-7 md:size-8" />
      ))}
      <Button
        variant="outline"
        disabled
        className="size-7 animate-pulse p-0 md:size-8"
      >
        <ChevronRight className="size-5 text-neutral-400" />
      </Button>
      <Button
        variant="outline"
        disabled
        className="size-7 animate-pulse p-0 md:size-8"
      >
        <ChevronsRight className="size-5 text-neutral-400" />
      </Button>
    </div>
  )
}
