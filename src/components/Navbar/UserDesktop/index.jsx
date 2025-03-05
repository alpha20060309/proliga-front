import Dropdown from './Dropdown'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import Avatar from 'components/Avatar'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const NavbarUserDesktop = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const user = useSelector(selectUserTable)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger className="hidden cursor-pointer items-center justify-center gap-2 lg:flex">
        <Avatar src={user?.image} className={'rounded-full text-base'} />
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavbarUserDesktop
