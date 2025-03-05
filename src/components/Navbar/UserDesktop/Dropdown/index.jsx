import Image from 'next/image'
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
      className="mt-4 flex w-56 flex-col gap-1 rounded-lg p-3"
      align="end"
    >
      <NavLink href="/championships">
        <Image src="/icons/cup.svg" alt="user" width={24} height={24} />
        <p> {t('Chempionatlar')}</p>
      </NavLink>
      {userTable?.id ? (
        <>
          <NavLink href="/settings">
            <Image
              width={24}
              height={24}
              alt="settings"
              src="/icons/gear.svg"
            />
            <p>{t('Sozlamalar')}</p>
          </NavLink>
          <div
            onClick={async () => await logOut()}
            className="flex h-full w-full cursor-pointer gap-2 rounded p-1 hover:bg-neutral-800"
          >
            <Image
              src={'/icons/logout.svg'}
              alt="user"
              width={24}
              height={24}
            />
            <p>{t('Tizimdan chiqish')}</p>
          </div>
        </>
      ) : (
        <NavLink href="/auth">
          <Image src={'/icons/login.svg'} alt="user" width={24} height={24} />
          <p>{t('Tizimga kirish_2')}</p>
        </NavLink>
      )}
    </PopoverContent>
  )
}

export default Dropdown
