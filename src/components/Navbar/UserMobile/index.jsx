import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { getUrl } from 'app/utils/static.util'

const NavbarUserMobile = ({ handleToggleModal }) => {
  const userTable = useSelector(selectUserTable)

  return (
    <span
      onClick={handleToggleModal}
      className="flex cursor-pointer items-center justify-center gap-2 lg:hidden"
    >
      {userTable?.email && !userTable?.photo && (
        <span className="flex size-8 select-none items-center justify-center rounded-full bg-primary text-lg font-bold uppercase text-black">
          {userTable?.email.slice(0, 1)}
        </span>
      )}
      {userTable?.email && userTable?.photo && (
        <img
          src={getUrl(userTable?.photo)}
          alt="user"
          width={32}
          draggable={false}
          height={32}
          key={userTable?.photo}
          className="size-8 rounded-full bg-white"
        />
      )}
      {!userTable?.email && !userTable?.photo && (
        <Image
          src={'/icons/user.svg'}
          alt="user"
          width={32}
          draggable={false}
          height={32}
          className="size-8 rounded-full bg-white"
        />
      )}
    </span>
  )
}

export default NavbarUserMobile
