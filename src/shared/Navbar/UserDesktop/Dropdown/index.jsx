import { Trophy, Settings, LogOut, LogIn } from 'lucide-react'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PopoverContent } from '@/components/ui/popover'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Link } from 'next-view-transitions'

const Dropdown = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

  return (
    <PopoverContent
      className="bg-sidebar border-sidebar-border mt-4 flex w-56 flex-col gap-2 rounded-lg p-3"
      align="end"
    >
      <NavLink href="/championships">
        <Trophy className="h-6 w-6" />
        <p>{t('Chempionatlar')}</p>
      </NavLink>
      {userTable?.id ? (
        <>
          <NavLink href="/settings">
            <Settings className="h-6 w-6" />
            <p>{t('Sozlamalar')}</p>
          </NavLink>
          <div
            onClick={async () => await logOut()}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-destructive/50 text-sidebar-foreground group flex h-full w-full cursor-pointer gap-2 rounded  px-1 py-1.5 transition-colors"
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

export default Dropdown
