import Image from 'next/image'
import Dropdown from './Dropdown'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

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
          userTable?.photo ? (
            <span className="flex size-8 select-none items-center justify-center rounded-full bg-primary text-lg font-bold uppercase text-black">
              {userTable.email.slice(0, 1)}
            </span>
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
            className="size-8 rounded-full bg-white"
          />
        )}
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavbarUserDesktop
