import Image from 'next/image'
import Dropdown from './Dropdown'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { getUrl } from 'app/utils/static.util'

const NavbarUserDesktop = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const userTable = useSelector(selectUserTable)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger
        className="hidden cursor-pointer items-center justify-center gap-2 lg:flex"
        asChild
      >
        {userTable?.email ? (
          userTable?.image ? (
            <img
              src={getUrl(userTable?.image)}
              alt="user"
              width={32}
              draggable={false}
              height={32}
              key={userTable?.image}
              className="size-8 select-none rounded-full bg-neutral-100"
            />
          ) : (
            <span className="flex size-8 select-none items-center justify-center rounded-full bg-primary text-lg font-bold uppercase text-black">
              {userTable.email.slice(0, 1)}
            </span>
          )
        ) : (
          <Image
            src={'/icons/user.svg'}
            alt="user"
            width={32}
            draggable={false}
            height={32}
            className="size-8 select-none rounded-full bg-neutral-100"
          />
        )}
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavbarUserDesktop
