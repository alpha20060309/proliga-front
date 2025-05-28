import { Trophy, Settings, LogOut, LogIn } from 'lucide-react'
import NavLink from './NavLink'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PopoverContent } from '@/components/ui/popover'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const Dropdown = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

  return (
    <PopoverContent
      className="bg-sidebar border-sidebar-border mt-4 flex w-56 flex-col gap-1 rounded-lg p-3"
      align="end"
    >
      <NavLink href="/championships">
        <Trophy className="text-sidebar-foreground h-6 w-6" />
        <p className="text-sidebar-foreground">{t('Chempionatlar')}</p>
      </NavLink>
      {userTable?.id ? (
        <>
          <NavLink href="/settings">
            <Settings className="text-sidebar-foreground h-6 w-6" />
            <p className="text-sidebar-foreground">{t('Sozlamalar')}</p>
          </NavLink>
          <div
            onClick={async () => await logOut()}
            className="hover:bg-sidebar-accent text-sidebar-foreground flex h-full w-full cursor-pointer gap-2 rounded-sm p-1"
          >
            <LogOut className="h-6 w-6" />
            <p>{t('Tizimdan chiqish')}</p>
          </div>
        </>
      ) : (
        <NavLink href="/auth">
          <LogIn className="text-sidebar-foreground h-6 w-6" />
          <p className="text-sidebar-foreground">{t('Tizimga kirish_2')}</p>
        </NavLink>
      )}
    </PopoverContent>
  )
}

export default Dropdown
