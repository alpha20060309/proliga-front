import { cn } from '@/lib/utils'
import { getUrl } from 'app/utils/static.util'

const MatchTeamDisplay = ({
  name,
  logo,
  isWinner,
  isDraw,
  alignment,
  match,
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-[35%] items-center gap-x-1 xs:gap-x-2',
        alignment === 'right' &&
          'w-1/3 flex-row-reverse items-center space-x-reverse',
        isWinner && 'font-bold'
      )}
    >
      <div
        className={cn(
          'relative',
          isWinner &&
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:animate-ping after:rounded-full after:bg-primary after:opacity-75 after:content-['']",
          isDraw &&
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:animate-ping after:rounded-full after:bg-neutral-500 after:opacity-50 after:content-['']"
        )}
      >
        <img
          src={getUrl(logo)}
          alt={name}
          width={40}
          height={40}
          onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
          className={cn(
            'size-7 min-w-7 rounded-full xs:size-8',
            isWinner && 'ring-2 ring-primary',
            isDraw && 'ring-2 ring-neutral-500'
          )}
        />
      </div>
      <div className="flex max-w-full flex-col truncate text-wrap">
        <span
          className={cn(
            'break-words text-xs md:text-sm',
            alignment === 'left' ? 'text-left' : 'text-right'
          )}
        >
          {name}
        </span>
        {match?.status === 'finished' && (
          <span
            className={cn(
              'text-sm',
              isWinner && 'ring-primary',
              isDraw && 'ring-neutral-500',
              alignment === 'left' ? 'text-left' : 'text-right'
            )}
          />
        )}
      </div>
    </div>
  )
}

export default MatchTeamDisplay
