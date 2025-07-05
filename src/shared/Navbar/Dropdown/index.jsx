import { Popover, PopoverTrigger } from 'components/ui/popover'
import { useState } from 'react'
import Avatar from 'shared/Avatar'
import { useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { Trophy, Settings, LogOut, LogIn } from 'lucide-react'
import { useLogOut } from 'hooks/auth/useLogOut'
import { useTranslation } from 'react-i18next'
import { PopoverContent } from 'components/ui/popover'
import { Link } from 'next-view-transitions'

const Dropdown = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()
  const user = useSelector(selectUser)

  return (
    <PopoverContent
      className="bg-sidebar border-sidebar-border mt-4 flex w-56 flex-col gap-2 rounded-lg p-3"
      align="end"
    >
      <NavLink href="/championships">
        <Trophy className="h-6 w-6" />
        <p>{t('Chempionatlar')}</p>
      </NavLink>
      {user?.id ? (
        <>
          <NavLink href="/settings">
            <Settings className="h-6 w-6" />
            <p>{t('Sozlamalar')}</p>
          </NavLink>
          <div
            onClick={async () => await logOut()}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-destructive/50 text-sidebar-foreground group flex h-full w-full cursor-pointer gap-2 rounded px-1 py-1.5 transition-colors"
          >
            <LogOut className="h-6 w-6" />
            <p>{t('Tizimdan chiqish')}</p>
          </div>
        </>
      ) : (
        <NavLink href="/auth">
          <LogIn className="h-6 w-6" />
          <p>{t('Tizimga kirish_2')}</p>
        </NavLink>
      )}
    </PopoverContent>
  )
}

const NavLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground flex h-full w-full gap-2 rounded px-1 py-1.5 transition-colors"
    >
      {children}
    </Link>
  )
}

const NavigationDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const user = useSelector(selectUser)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger className="flex cursor-pointer items-center justify-center gap-2">
        <Avatar src={user?.image} className="rounded-full text-base" />
      </PopoverTrigger>
      <Dropdown />
    </Popover>
  )
}

export default NavigationDropdown
