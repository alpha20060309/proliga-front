import { Link } from 'next-view-transitions'
import { Settings, LogOut, LogIn } from 'lucide-react'
import SystemLink from './SystemLink'
import SidebarTab from './Tab'
import SidebarTabLink from './TabLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { TABS } from 'app/utils/tabs.util'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { useTranslation } from 'react-i18next'
import { sidebarStyles } from './sidebarStyles.util'
import { cn } from '@/lib/utils'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const MobileSidebar = ({ isModalOpen, setModalOpen }) => {
  const path = usePathname()
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const { logOut } = useLogOut()

  const handleLogOut = () => {
    logOut()
    setModalOpen(false)
  }

  return (
    <Sheet open={isModalOpen} onOpenChange={setModalOpen}>
      <SheetContent
        side="right"
        className="xs:w-3/4 border-muted flex h-full w-4/5 min-w-80 flex-col rounded-s-xl rounded-e-none p-5 sm:w-2/3 sm:p-6"
      >
        <SheetTitle className="hidden">Title</SheetTitle>
        <div className="xs:gap-7 flex flex-col items-start justify-center gap-6 py-12 sm:py-16">
          {path.includes('play') && (
            <>
              <SidebarTab
                toggleModal={() => setModalOpen(false)}
                tab={TABS.GameProfile}
                title={t('Profil')}
              />
              <SidebarTab
                toggleModal={() => setModalOpen(false)}
                title={t('Transferlar')}
                tab={TABS.Transfer}
              />
              <SidebarTab
                toggleModal={() => setModalOpen(false)}
                tab={TABS.Tournament}
                title={t('Turnir')}
              />
              <SidebarTab
                toggleModal={() => setModalOpen(false)}
                sidebarStyles={sidebarStyles}
                title={t('Jurnal')}
                tab={TABS.Journal}
              />
              <SidebarTab
                toggleModal={() => setModalOpen(false)}
                title={t('Statistika')}
                tab={TABS.Statistics}
              />
            </>
          )}
          {!path.includes('play') && lastVisitedTeam && (
            <>
              <SidebarTabLink
                toggleModal={() => setModalOpen(false)}
                tab={TABS.GameProfile}
                title={t('Profil')}
              />
              <SidebarTabLink
                toggleModal={() => setModalOpen(false)}
                title={t('Transferlar')}
                tab={TABS.Transfer}
              />
              <SidebarTabLink
                toggleModal={() => setModalOpen(false)}
                tab={TABS.Tournament}
                title={t('Turnir')}
              />
              <SidebarTabLink
                toggleModal={() => setModalOpen(false)}
                title={t('Jurnal')}
                tab={TABS.Journal}
              />
              <SidebarTabLink
                toggleModal={() => setModalOpen(false)}
                title={t('Statistika')}
                tab={TABS.Statistics}
              />
            </>
          )}
          <div className="group flex w-full gap-4">
            <span
              className={cn(
                'block h-full w-2 rounded-md',
                path.includes('championships')
                  ? sidebarStyles.activeIndicator
                  : sidebarStyles.passiveIndicator
              )}
            />
            <Link
              className={cn(
                'group-hover:text-foreground transition-all',
                path.includes('championships')
                  ? sidebarStyles.active
                  : sidebarStyles.passive
              )}
              href="/championships"
              onClick={() => setModalOpen(false)}
            >
              {t('Chempionatlar')}
            </Link>
          </div>
          <div className="flex w-full gap-4">
            <span
              className={cn(
                'block h-full w-2 rounded-md',
                path.includes('prizes')
                  ? sidebarStyles.activeIndicator
                  : sidebarStyles.passiveIndicator
              )}
            />
            <Link
              className={cn(
                'hover:text-foreground transition-all',
                path.includes('prizes')
                  ? sidebarStyles.active
                  : sidebarStyles.passive
              )}
              onClick={() => setModalOpen(false)}
              href="/prizes"
            >
              {t('Yutuqlar')}
            </Link>
          </div>
          <div className="flex w-full gap-4">
            <span
              className={cn(
                'block h-full w-2 rounded-md',
                path.includes('regulation')
                  ? sidebarStyles.activeIndicator
                  : sidebarStyles.passiveIndicator
              )}
            />
            <Link
              className={cn(
                'hover:text-foreground transition-all',
                path.includes('regulation')
                  ? sidebarStyles.active
                  : sidebarStyles.passive
              )}
              onClick={() => setModalOpen(false)}
              href="/regulation"
            >
              {t('Qoidalar')}
            </Link>
          </div>
        </div>
        <section className="mt-auto flex w-full flex-col justify-between gap-1 rounded-md sm:flex-row">
          {userTable?.id ? (
            <>
              <SystemLink
                handleToggle={() => setModalOpen(false)}
                href="/settings"
              >
                <Settings className="text-foreground h-6 w-6" />
                <p>{t('Sozlamalar')}</p>
              </SystemLink>
              <div
                onClick={handleLogOut}
                className="hover:bg-secondary bg-background flex h-full w-full gap-2 rounded-sm p-2"
              >
                <LogOut className="text-foreground h-6 w-6" />
                <p>{t('Tizimdan chiqish')}</p>
              </div>
            </>
          ) : (
            <SystemLink handleToggle={() => setModalOpen(false)} href="/auth">
              <LogIn className="text-foreground h-6 w-6" />
              <p>{t('Tizimga kirish_1')}</p>
            </SystemLink>
          )}
        </section>
        <SheetDescription className="sr-only">
          This is a navigation sidebar for mobile devices
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
