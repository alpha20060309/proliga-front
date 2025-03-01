'use client'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { formatDate } from 'app/utils/formatDate.util'
import { Phone, CalendarDays, UsersRound } from 'lucide-react'
import { SettingsContainer } from '../Container'
import Image from 'next/image'
import SettingsWarnings from '../Warnings'
import RefillBalanceBox from './RefillBalanceBox'
import Avatar from 'components/Avatar'

const SettingsProfile = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

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
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'), { theme: 'dark' })
  }

  return (
    <SettingsContainer>
      <SettingsWarnings />
      <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
        {t('Profil')}
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar
          className={
            'size-24 rounded-xl bg-neutral-200 object-cover object-top transition-all duration-1000 ease-in-out hover:object-bottom'
          }
        />
        <div className="flex flex-col justify-center">
          <div className="flex gap-1 text-lg font-bold capitalize text-neutral-50 xs:max-w-64 md:max-w-96">
            {userTable?.name && <p className="truncate">{userTable?.name}</p>}
            {userTable?.last_name && (
              <>
                <p className="truncate lg:hidden">
                  {userTable?.last_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">
                  {userTable?.last_name}
                </p>
              </>
            )}
            {userTable?.middle_name && (
              <>
                <p className="truncate lg:hidden">
                  {userTable?.middle_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">
                  {userTable?.middle_name}
                </p>
              </>
            )}
            {!userTable?.name &&
              !userTable?.last_name &&
              !userTable?.middle_name && (
                <p className="truncate">{t('Sizning Ismingiz')}</p>
              )}
          </div>
          <span className="text-sm text-neutral-300">{userTable?.email}</span>
        </div>
        <div className="ml-auto flex items-center justify-center gap-2 px-0 py-0 text-sm">
          <p className="block text-neutral-400">{t('Foydalanuvchi ID-si')}</p>
          <div
            className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-primary/90 px-3 py-1.5 text-base font-medium text-black transition-all hover:bg-primary"
            onClick={() => handleClick(userTable?.id)}
          >
            <Image
              width="16"
              height="16"
              className="filter-black size-4"
              src="/icons/copy.svg"
              alt="copy"
            />
            {userTable?.id}
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <Phone className="size-5 text-neutral-50" />
            <p className="text-sm font-medium text-neutral-300">
              {t('Telefon raqam')}:
            </p>
          </div>
          <p className="text-sm text-neutral-100">{userTable?.phone}</p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <CalendarDays className="size-5 text-neutral-50" />
            <p className="text-sm font-medium text-neutral-300">
              {t("Tug'ilgan kuni")}:
            </p>
          </div>
          <p className="text-sm text-neutral-100">
            {formatDate(userTable?.birth_date, 'news')}
          </p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <UsersRound className="size-5 text-neutral-50" />
            <p className="text-sm font-medium text-neutral-300">{t('Jins')}:</p>
          </div>
          <p className="text-sm text-neutral-100">
            {getCorrectGenderText(userTable?.gender)}
          </p>
        </ProfileItem>
      </section>
      <div className="line-clamp-5 h-28 max-w-full overflow-y-scroll text-wrap break-words rounded-lg border border-neutral-700 bg-neutral-800/50 p-2 text-sm text-neutral-300 md:p-4">
        {userTable?.bio ? userTable?.bio : t("Ma'lumot yo'q")}
      </div>
      <RefillBalanceBox />
    </SettingsContainer>
  )
}

const ProfileItem = ({ children }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/50 p-2 xl:p-4">
      {children}
    </div>
  )
}

export default SettingsProfile
