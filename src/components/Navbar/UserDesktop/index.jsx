import Dropdown from './Dropdown'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import Avatar from 'components/Avatar'

const NavbarUserDesktop = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger className="hidden cursor-pointer items-center justify-center gap-2 lg:flex">
        <Avatar className={'size-8 select-none rounded-full text-xl'} />
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavbarUserDesktop
