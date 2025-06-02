'use client'

import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { formatDate } from 'app/utils/formatDate.util'
import { Phone, CalendarDays, UsersRound } from 'lucide-react'
import { SettingsContainer } from '../Container'
import RefillBalanceBox from './RefillBalanceBox'
import Avatar from 'components/Avatar'
import { getUrl } from 'app/utils/static.util'
import { Copy } from 'lucide-react'

const SettingsProfile = () => {
  const { t } = useTranslation()
  const user = useSelector(selectUserTable)

  const getCorrectGenderText = (gender) => {
    switch (gender) {
      case 'male':
        return t('Erkak')
      case 'female':
        return t('Ayol')
      default:
        return t('Belgilanmagan')
    }
  }

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  return (
    <SettingsContainer>
      <h3 className="text-foreground mb-2 text-xl font-bold tracking-tight">
        {t('Profil')}
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar
          src={getUrl(user?.image)}
          className={
            'text-foreground size-24 rounded-xl object-cover object-top transition-all duration-1000 ease-in-out hover:object-bottom'
          }
        />
        <div className="flex flex-col justify-center">
          <div className="text-foreground xs:max-w-64 flex gap-1 text-lg font-bold capitalize md:max-w-96">
            {user?.name && <p className="truncate">{user?.name}</p>}
            {user?.last_name && (
              <>
                <p className="truncate lg:hidden">
                  {user?.last_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">{user?.last_name}</p>
              </>
            )}
            {user?.middle_name && (
              <>
                <p className="truncate lg:hidden">
                  {user?.middle_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">{user?.middle_name}</p>
              </>
            )}
            {!user?.name && !user?.last_name && !user?.middle_name && (
              <p className="truncate">{t('Sizning Ismingiz')}</p>
            )}
          </div>
          <span className="text-muted-foreground text-sm">{user?.email}</span>
        </div>
        <div className="ml-auto flex items-center justify-center gap-2 px-0 py-0 text-sm">
          <p className="text-muted-foreground block">
            {t('Foydalanuvchi ID-si')}
          </p>
          <div
            className="bg-accent hover:bg-primary text-accent-foreground flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-1.5 text-base font-medium transition-all"
            onClick={() => handleClick(user?.id)}
          >
            <Copy className="text-accent-foreground size-4" />
            {user?.id}
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <Phone className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t('Telefon raqam')}:
            </p>
          </div>
          <p className="text-foreground text-sm">{user?.phone}</p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <CalendarDays className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t("Tug'ilgan kuni")}:
            </p>
          </div>
          <p className="text-foreground text-sm">
            {formatDate(user?.birth_date, 'news')}
          </p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <UsersRound className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t('Jins')}:
            </p>
          </div>
          <p className="text-foreground text-sm">
            {getCorrectGenderText(user?.gender)}
          </p>
        </ProfileItem>
      </section>
      <div className="bg-card/50 border-border text-muted-foreground line-clamp-5 h-28 max-w-full overflow-y-scroll rounded-lg border p-2 text-sm text-wrap break-words shadow md:p-4">
        {user?.bio ? user?.bio : t("Ma'lumot yo'q")}
      </div>
      <RefillBalanceBox />
    </SettingsContainer>
  )
}

const ProfileItem = ({ children }) => {
  return (
    <div className="bg-card/50 border-border flex items-center gap-2 rounded-lg border p-2 shadow xl:p-4">
      {children}
    </div>
  )
}

export default SettingsProfile
