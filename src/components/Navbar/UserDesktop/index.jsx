import Dropdown from './Dropdown'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import Avatar from 'components/Avatar'

const NavbarUserDesktop = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger className="hidden cursor-pointer items-center justify-center gap-2 lg:flex">
        <Avatar className={'size-8 shadow-sm shadow-neutral-200 select-none rounded-full text-lg'} />
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavbarUserDesktop
