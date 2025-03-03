'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Camera, Loader } from 'lucide-react'
import DatePicker from 'react-datepicker'

import { useUpdateUserData } from 'app/hooks/user/useUpdateUserData/useUpdateUserData'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import UploadFile from 'components/Modals/UploadFile'
import { SettingsContainer } from '../Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import './datepicker.scss'
import Avatar from 'components/Avatar'

const GENDERS = {
  UNSET: 'unset',
  MALE: 'male',
  FEMALE: 'female',
}

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
  const { updateUserData, isLoading } = useUpdateUserData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName) {
      return toast.warning(t('Iltimos ismni kiriting'))
    }
    if (!gender) {
      return toast.warning(t('Iltimos jiningizni tanlang'))
    }

    await updateUserData({
      name: firstName,
      last_name: lastName,
      middle_name: middleName,
      bio,
      gender,
      birth_date: date,
      userTable,
      cb: () => setHomeTab(),
    })
  }

  return (
    <>
      <UploadFile isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <SettingsContainer>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
          {t('Profil sozlamalari')}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <main className="flex flex-col items-start gap-2 sm:flex-row">
            <article className="relative">
              <Avatar
                className={
                  'size-32 w-full rounded-full border-2 border-neutral-200 xl:size-36'
                }
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 border border-neutral-500 bg-neutral-800 hover:bg-neutral-700"
                onClick={() => setModalOpen(true)}
              >
                <Camera className="h-4 w-4 text-neutral-200" />
              </Button>
            </article>
            <section className="grid w-full flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <article className="space-y-1">
                <label
                  className="text-sm font-medium text-neutral-300"
                  htmlFor="firstName"
                >
                  {t('Ism')}
                </label>
                <Input
                  id="firstName"
                  placeholder={t('Ism')}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                />
              </article>
              <article className="space-y-1">
                <label
                  className="text-sm font-medium text-neutral-300"
                  htmlFor="lastName"
                >
                  {t('Familiya')}
                </label>
                <Input
                  id="lastName"
                  placeholder={t('Familiya')}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                />
              </article>
              <article className="space-y-1">
                <label
                  className="text-sm font-medium text-neutral-300"
                  htmlFor="middleName"
                >
                  {t('Sharif')}
                </label>
                <Input
                  id="middleName"
                  placeholder={t('Sharif')}
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
                />
              </article>
              <article className="flex flex-col flex-wrap justify-between">
                <label
                  className="block text-sm font-medium text-neutral-300"
                  htmlFor="birthdate"
                >
                  {t("Tug'ilgan kuni")}
                </label>
                <DatePicker
                  id="birthdate"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="h-10 min-w-full flex-1 rounded-md border border-neutral-700 bg-neutral-800 p-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
                />
              </article>
              <article className="space-y-1">
                <label
                  className="text-sm font-medium text-neutral-300"
                  htmlFor="gender"
                >
                  {t('Jins')}
                </label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger
                    id="gender"
                    className="h-10 border-neutral-700 bg-neutral-800 text-neutral-200"
                  >
                    <SelectValue placeholder={t('Jins tanlang')} />
                  </SelectTrigger>
                  <SelectContent className="border-neutral-700 bg-neutral-900">
                    <SelectItem
                      value={GENDERS.UNSET}
                      className="text-neutral-200"
                    >
                      {t('Belgilanmagan')}
                    </SelectItem>
                    <SelectItem
                      value={GENDERS.MALE}
                      className="text-neutral-200"
                    >
                      {t('Erkak')}
                    </SelectItem>
                    <SelectItem
                      value={GENDERS.FEMALE}
                      className="text-neutral-200"
                    >
                      {t('Ayol')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </article>
            </section>
          </main>
          <section className="space-y-1">
            <Label
              className="text-sm font-medium text-neutral-300"
              htmlFor="bio"
            >
              {t('Siz haqingizda')}
            </Label>
            <Textarea
              id="bio"
              placeholder={t('Bio')}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-40 border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 lg:h-48 xl:h-56"
            />
          </section>
          <Button
            className="h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              t('Saqlash')
            )}
          </Button>
        </form>
      </SettingsContainer>
    </>
  )
}

export default CabinetSettingsTab
