import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import { User } from 'lucide-react'
import { getUrl } from 'app/utils/static.util'
import { cn } from '../../@/lib/utils'

const Avatar = ({ className }) => {
  const user = useSelector(selectUserTable)

  if (user?.email) {
    if (user?.image) {
      return (
        <img
          src={getUrl(user.image)}
          alt="user-photo"
          width={96}
          height={96}
          key={user?.image}
          onError={(e) => {
            e.target.src = '/icons/user.svg'
          }}
          className={cn(
            'aspect-square size-8 bg-neutral-100 select-none',
            className
          )}
        />
      )
    }
    return (
      <span
        className={cn(
          'bg-primary text-accent-foreground flex aspect-square size-8 items-center justify-center text-3xl font-bold uppercase select-none',
          className
        )}
        key={user?.email}
      >
        {user.email.slice(0, 1)}
      </span>
    )
  }

  if (user?.name) {
    return (
      <span
        className={cn(
          'bg-primary text-accent-foreground flex aspect-square size-8 items-center justify-center text-3xl font-bold uppercase select-none',
          className
        )}
        key={user?.name}
      >
        {user.name.slice(0, 1)}
      </span>
    )
  }

  return (
    <User
      className={cn(
        'size-8 bg-neutral-200 p-px text-neutral-950 select-none lg:p-0.5',
        className
      )}
    />
  )
}

export default Avatar
