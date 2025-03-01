// import { selectUserTable } from 'app/lib/features/auth/auth.selector'
// import { useSelector } from 'react-redux'
// import { User } from 'lucide-react'
// import { getUrl } from 'app/utils/static.util'
// import { cn } from '@/lib/utils'

// const Avatar = ({ className }) => {
//   const user = useSelector(selectUserTable)

//    user?.email ? (
//     user?.image ? (
//      <img
//         src={getUrl(user?.image)}
//         alt="user-photo"
//         width={96}
//         height={96}
//         key={user?.image}
//         onError={(e) => {
//           e.target.src = '/icons/user.svg'
//         }}
//         className={cn('aspect-square size-8 select-none', className)}
//       />)
//     ) : (
//       <span
//         className={cn(
//           'flex aspect-square size-8 select-none items-center justify-center bg-primary text-3xl font-bold uppercase text-black',
//           className
//         )}
//       >
//         {user.email.slice(0, 1)}
//       </span>
//     )
//   ) : (
//     <User
//       key={user?.image}
//       className={cn('size-8 select-none bg-neutral-800', className)}
//     />
//   )
// }

// // aspect-square size-32 rounded-xl border-2 border-neutral-700 object-cover object-top transition-all duration-1000 ease-in-out hover:object-bottom

// export default Avatar
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import { User } from 'lucide-react'
import { getUrl } from 'app/utils/static.util'
import { cn } from '@/lib/utils'

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
          key={user.image}
          onError={(e) => {
            e.target.src = '/icons/user.svg'
          }}
          className={cn('aspect-square size-8 select-none', className)}
        />
      )
    }
    return (
      <span
        className={cn(
          'flex aspect-square size-8 select-none items-center justify-center bg-primary text-3xl font-bold uppercase text-black',
          className
        )}
      >
        {user.email.slice(0, 1)}
      </span>
    )
  }

  return (
    <User className={cn('size-8 select-none bg-neutral-800 p-px', className)} />
  )
}

export default Avatar
