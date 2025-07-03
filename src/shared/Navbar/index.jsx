'use client'

import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Link } from 'next-view-transitions'
import { ThemeSwitcherSkeleton } from '../SwitcherTheme'
import Gutter from '../../components/Gutter'
import PlayLinks from './Links'
import NavigationDropdown from './Dropdown'
import ChangeLanguageDropdown from '../SwitcherLanguage'
import Notification from '../Notification'
import Marquee from 'components/Marquee'
import dynamic from 'next/dynamic'
import MobileNavigation from './Mobile'
import { Skeleton } from '@/components/ui/skeleton'
const NavbarLogo = dynamic(() => import('./Logo'), {
  ssr: false,
  loading: () => <Skeleton className="xs:w-32 h-7.5 w-28 md:w-36" />,
})
const ThemeSwitcher = dynamic(() => import('../SwitcherTheme'), {
  ssr: false,
  loading: () => <ThemeSwitcherSkeleton />,
})

const Navbar = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const NEXT_PUBLIC_TEST_NAV_SLIDER = Boolean(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_TEST_NAV_SLIDER ?? ''
  )

  return (
    <nav
      className={cn(
        'bg-sidebar border-border fixed top-0 right-0 left-0 z-50 w-screen border-b',
        NEXT_PUBLIC_TEST_NAV_SLIDER ? 'pb-3' : 'py-3'
      )}
    >
      {NEXT_PUBLIC_TEST_NAV_SLIDER && (
        <Marquee
          text={t('Website is in test mode')}
          className="mb-3"
          speed="slow"
        />
      )}
      <Gutter>
        <div className="text-foreground flex w-full items-center justify-between">
          <Link
            href={
              path.split('/').includes('championships') ? '/' : '/championships'
            }
          >
            <NavbarLogo />
          </Link>
          <PlayLinks />
          <div className="flex w-max items-center justify-center gap-3 sm:gap-4">
            <ChangeLanguageDropdown />
            <Notification />
            <ThemeSwitcher />
            <NavigationDropdown />
          </div>
        </div>
      </Gutter>
      <MobileNavigation />
    </nav>
  )
}

export default Navbar
