'use client'
import './datepicker.scss'
import Image from 'next/image'
import { useUpdateUserData } from 'app/hooks/user/useUpdateUserData/useUpdateUserData'
import UploadFileModal from 'components/UploadFileModal'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Image as ImageIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { SettingsContainer } from '../Container'

const CabinetSettingsTab = ({ setHomeTab }) => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [date, setDate] = useState(userTable?.birth_date ?? new Date())
  const [firstName, setFirstName] = useState(userTable?.name ?? '')
  const [lastName, setLastName] = useState(userTable?.last_name ?? '')
  const [middleName, setMiddleName] = useState(userTable?.middle_name ?? '')
  const [bio, setBio] = useState(userTable?.bio ?? '')
  const [gender, setGender] = useState(userTable?.gender ?? GENDERS.UNSET)
  const [isModalOpen, setModalOpen] = useState(false)
  const { updateUserData, isLoading, error } = useUpdateUserData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName) {
      toast.warning(t('Iltimos ismni kiriting'), { theme: 'dark' })
    }

    if (!gender) {
      toast.warning(t('Iltimos jiningizni tanlang'), { theme: 'dark' })
    }
    await updateUserData(firstName, lastName, middleName, bio, gender, date)
    if (!isLoading && !error) {
      setHomeTab()
    }
  }

  return (
    <>
      <UploadFileModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <SettingsContainer>
        <h3 className="mb-2 text-xl font-bold capitalize tracking-tight text-neutral-100">
          {t('Profil sozlamalari')}
        </h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <section className="flex w-full flex-col gap-2 sm:flex-row">
            <div
              onClick={() => setModalOpen(true)}
              className="group flex size-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-400 bg-stone-900 transition-all hover:bg-primary/10"
            >
              <ImageIcon className="filter-neutral-200 size-8 self-center" />
              <p className="mx-0.5 break-words text-center text-[11px] text-neutral-300 md:text-xs">
                {t('Rasmni yuklash')}
              </p>
            </div>
            <div className="w-full space-y-1 sm:w-auto sm:min-w-80 md:space-y-2">
              <div className="w-full">
                <label
                  className="block text-sm font-bold capitalize text-neutral-300"
                  htmlFor="gender"
                >
                  {t('Jins')}
                </label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-10 w-full rounded border border-neutral-400 bg-stone-900 text-sm capitalize text-neutral-200 placeholder:text-neutral-300 md:text-base">
                    <SelectValue placeholder={t('Jins tanlang')} />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 capitalize">
                    <SelectItem value={GENDERS.UNSET}>
                      {t('Belgilanmagan')}
                    </SelectItem>
                    <SelectItem value={GENDERS.MALE}>{t('Erkak')}</SelectItem>
                    <SelectItem value={GENDERS.FEMALE}>{t('Ayol')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full flex-col">
                <label
                  className="block text-sm font-bold text-neutral-300"
                  htmlFor="birthdate"
                >
                  {t("Tug'ilgan kuni")}
                </label>
                <DatePicker
                  id="birthdate"
                  selected={date}
                  className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:text-base"
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-x-2 gap-y-0 lg:grid-cols-2">
            <div className="col-span-2 w-full lg:col-span-1">
              <label
                className="my-1 block text-sm font-bold capitalize text-neutral-300"
                htmlFor="firstName"
              >
                {t('Ism')}
              </label>
              <Input
                placeholder={userTable?.name ?? t('Ism')}
                id="firstName"
                name="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
              />
            </div>
            <div className="col-span-2 w-full lg:col-span-1">
              <label
                className="my-1 block text-sm font-bold capitalize text-neutral-300"
                htmlFor="lastName"
              >
                {t('Familiya')}
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={userTable?.last_name ?? t('Familiya')}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
              />
            </div>
            <div className="col-span-2 w-full lg:col-span-1">
              <label
                className="my-1 block text-sm font-bold capitalize text-neutral-300"
                htmlFor="surname"
              >
                {t('Sharif')}
              </label>
              <Input
                id="surname"
                name="surname"
                placeholder={userTable?.midde_name ?? t('Sharif')}
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="my-1 block text-sm font-bold capitalize text-neutral-300"
                htmlFor="bio"
              >
                {t('Siz haqingizda')}
              </label>
              <Textarea
                id="bio"
                placeholder={t('Bio')}
                value={bio}
                className="min-h-36 w-full border border-neutral-400 bg-stone-900 p-2 text-neutral-200 placeholder:text-neutral-300 md:text-base"
                onChange={(e) => setBio(e.target.value)}
                rows={5}
              />
            </div>
          </section>
          <button
            className="mt-2 h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Image
                src="/icons/loading.svg"
                width={24}
                height={24}
                alt="loading"
                className="filter-neutral-950 mx-auto size-6 animate-spin"
              />
            ) : (
              t('Saqlash')
            )}
          </button>
        </form>
      </SettingsContainer>
    </>
  )
}

const GENDERS = {
  UNSET: 'unset',
  MALE: 'male',
  FEMALE: 'female',
}

export default CabinetSettingsTab
