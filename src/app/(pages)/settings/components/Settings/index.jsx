// 'use client'
// import './datepicker.scss'
// import UploadFile from 'components/Modals/UploadFile'
// import Image from 'next/image'
// import DatePicker from 'react-datepicker'
// import { useUpdateUserData } from 'app/hooks/user/useUpdateUserData/useUpdateUserData'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
// import { useState } from 'react'
// import { selectUserTable } from 'app/lib/features/auth/auth.selector'
// import { Image as ImageIcon } from 'lucide-react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Textarea } from '@/components/ui/textarea'
// import { Input } from '@/components/ui/input'
// import { SettingsContainer } from '../Container'
// import { PhoneInput } from 'components/PhoneInput'
// import { Button } from '@/components/ui/button'

// const CabinetSettingsTab = ({ setHomeTab }) => {
//   const { t } = useTranslation()
//   const userTable = useSelector(selectUserTable)
//   const [date, setDate] = useState(userTable?.birth_date ?? new Date())
//   const [phone, setPhone] = useState(userTable?.phone)
//   const [firstName, setFirstName] = useState(userTable?.name ?? '')
//   const [lastName, setLastName] = useState(userTable?.last_name ?? '')
//   const [middleName, setMiddleName] = useState(userTable?.middle_name ?? '')
//   const [bio, setBio] = useState(userTable?.bio ?? '')
//   const [gender, setGender] = useState(userTable?.gender ?? GENDERS.UNSET)
//   const [isModalOpen, setModalOpen] = useState(false)
//   const { updateUserData, isLoading, error } = useUpdateUserData()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!firstName) {
//       toast.warning(t('Iltimos ismni kiriting'), { theme: 'dark' })
//     }

//     if (!gender) {
//       toast.warning(t('Iltimos jiningizni tanlang'), { theme: 'dark' })
//     }
//     await updateUserData(firstName, lastName, middleName, bio, gender, date)
//     if (!isLoading && !error) {
//       setHomeTab()
//     }
//   }

//   return (
//     <>
//       <UploadFile isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
//       <SettingsContainer>
//         <h3 className="mb-2 text-xl font-bold capitalize tracking-tight text-neutral-100">
//           {t('Profil sozlamalari')}
//         </h3>
//         <form className="flex flex-col" onSubmit={handleSubmit}>
//           <section className="flex w-full flex-col gap-2 sm:flex-row">
//             <div
//               onClick={() => setModalOpen(true)}
//               className="group flex size-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-400 bg-stone-900 transition-all hover:bg-primary/10"
//             >
//               <ImageIcon className="filter-neutral-200 size-8 self-center" />
//               <p className="mx-0.5 break-words text-center text-[11px] text-neutral-300 md:text-xs">
//                 {t('Rasmni yuklash')}
//               </p>
//             </div>
//             <div className="w-full space-y-1 sm:w-auto sm:min-w-80 md:space-y-2">
//               <div className="w-full">
//                 <label
//                   className="block text-sm font-bold capitalize text-neutral-300"
//                   htmlFor="gender"
//                 >
//                   {t('Telefon raqam')}
//                 </label>
//                 <PhoneInput
//                   placeholder={userTable?.phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   value={phone}
//                 />
//               </div>
//               <Button>{t('Tasdiqlash')}</Button>
//             </div>

//             <div className="w-full space-y-1 sm:w-auto sm:min-w-80 md:space-y-2">
//               <div className="w-full">
//                 <label
//                   className="block text-sm font-bold capitalize text-neutral-300"
//                   htmlFor="gender"
//                 >
//                   {t('Jins')}
//                 </label>
//                 <Select value={gender} onValueChange={setGender}>
//                   <SelectTrigger className="h-10 w-full rounded border border-neutral-400 bg-stone-900 text-sm capitalize text-neutral-200 placeholder:text-neutral-300 md:text-base">
//                     <SelectValue placeholder={t('Jins tanlang')} />
//                   </SelectTrigger>
//                   <SelectContent className="bg-neutral-900 capitalize">
//                     <SelectItem value={GENDERS.UNSET}>
//                       {t('Belgilanmagan')}
//                     </SelectItem>
//                     <SelectItem value={GENDERS.MALE}>{t('Erkak')}</SelectItem>
//                     <SelectItem value={GENDERS.FEMALE}>{t('Ayol')}</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex w-full flex-col">
//                 <label
//                   className="block text-sm font-bold text-neutral-300"
//                   htmlFor="birthdate"
//                 >
//                   {t("Tug'ilgan kuni")}
//                 </label>
//                 <DatePicker
//                   id="birthdate"
//                   selected={date}
//                   className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:text-base"
//                   onChange={(date) => setDate(date)}
//                 />
//               </div>
//             </div>
//           </section>
//           <section className="grid grid-cols-1 gap-x-2 gap-y-0 lg:grid-cols-2">
//             <div className="col-span-2 w-full lg:col-span-1">
//               <label
//                 className="my-1 block text-sm font-bold capitalize text-neutral-300"
//                 htmlFor="firstName"
//               >
//                 {t('Ism')}
//               </label>
//               <Input
//                 placeholder={userTable?.name ?? t('Ism')}
//                 id="firstName"
//                 name="firstName"
//                 type="text"
//                 onChange={(e) => setFirstName(e.target.value)}
//                 value={firstName}
//                 className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
//               />
//             </div>
//             <div className="col-span-2 w-full lg:col-span-1">
//               <label
//                 className="my-1 block text-sm font-bold capitalize text-neutral-300"
//                 htmlFor="lastName"
//               >
//                 {t('Familiya')}
//               </label>
//               <Input
//                 id="lastName"
//                 name="lastName"
//                 placeholder={userTable?.last_name ?? t('Familiya')}
//                 type="text"
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
//               />
//             </div>
//             <div className="col-span-2 w-full lg:col-span-1">
//               <label
//                 className="my-1 block text-sm font-bold capitalize text-neutral-300"
//                 htmlFor="surname"
//               >
//                 {t('Sharif')}
//               </label>
//               <Input
//                 id="surname"
//                 name="surname"
//                 placeholder={userTable?.midde_name ?? t('Sharif')}
//                 type="text"
//                 value={middleName}
//                 onChange={(e) => setMiddleName(e.target.value)}
//                 className="h-10 w-full rounded border border-neutral-400 bg-stone-900 px-2 text-sm text-neutral-200 placeholder:text-neutral-300 md:h-12 md:text-base"
//               />
//             </div>
//             <div className="col-span-2 w-full">
//               <label
//                 className="my-1 block text-sm font-bold capitalize text-neutral-300"
//                 htmlFor="bio"
//               >
//                 {t('Siz haqingizda')}
//               </label>
//               <Textarea
//                 id="bio"
//                 placeholder={t('Bio')}
//                 value={bio}
//                 className="min-h-36 w-full border border-neutral-400 bg-stone-900 p-2 text-neutral-200 placeholder:text-neutral-300 md:text-base"
//                 onChange={(e) => setBio(e.target.value)}
//                 rows={5}
//               />
//             </div>
//           </section>
//           <button
//             className="mt-2 h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Image
//                 src="/icons/loading.svg"
//                 width={24}
//                 height={24}
//                 alt="loading"
//                 className="filter-neutral-950 mx-auto size-6 animate-spin"
//               />
//             ) : (
//               t('Saqlash')
//             )}
//           </button>
//         </form>
//       </SettingsContainer>
//     </>
//   )
// }

// const GENDERS = {
//   UNSET: 'unset',
//   MALE: 'male',
//   FEMALE: 'female',
// }

// export default CabinetSettingsTab
'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { Camera, Loader } from 'lucide-react'

import { useUpdateUserData } from 'app/hooks/user/useUpdateUserData/useUpdateUserData'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import UploadFile from 'components/Modals/UploadFile'
import { PhoneInput } from 'components/PhoneInput'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import './datepicker.scss'

const GENDERS = {
  UNSET: 'unset',
  MALE: 'male',
  FEMALE: 'female',
}

const CabinetSettingsTab = ({ setHomeTab }) => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [date, setDate] = useState(userTable?.birth_date ?? new Date())
  const [phone, setPhone] = useState(userTable?.phone)
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
      return
    }

    if (!gender) {
      toast.warning(t('Iltimos jiningizni tanlang'), { theme: 'dark' })
      return
    }
    await updateUserData(firstName, lastName, middleName, bio, gender, date)
    if (!isLoading && !error) {
      setHomeTab()
    }
  }

  return (
    <>
      <UploadFile isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <SettingsContainer>
        <h3 className="mb-4 text-2xl font-bold text-neutral-100">
          {t('Profil sozlamalari')}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <div className="relative">
              <Avatar className="size-32 border-2 border-neutral-700 xl:size-36">
                <AvatarImage src={userTable?.photo} alt={userTable?.name} />
                <AvatarFallback className="bg-neutral-800 text-neutral-200">
                  {userTable?.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 bg-neutral-800 hover:bg-neutral-700"
                onClick={() => setModalOpen(true)}
              >
                <Camera className="h-4 w-4 text-neutral-200" />
              </Button>
            </div>
            <div className="w-full flex-1 space-y-4">
              <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
                    <SelectContent className="border-neutral-700 bg-neutral-800">
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
                <article className="flex flex-col justify-between">
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
              </section>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="space-y-1">
              <label
                className="text-sm font-medium text-neutral-300"
                htmlFor="phone"
              >
                {t('Telefon raqam')}
              </label>
              <PhoneInput
                placeholder={userTable?.phone}
                onChange={(value) => setPhone(value)}
                value={phone}
                className="bg-neutral-800"
              />
            </article>
          </div>

          <div className="space-y-1">
            <label
              className="text-sm font-medium text-neutral-300"
              htmlFor="bio"
            >
              {t('Siz haqingizda')}
            </label>
            <Textarea
              id="bio"
              placeholder={t('Bio')}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              className="border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
            />
          </div>
          <button
            className="mt-2 h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              t('Saqlash')
            )}
          </button>
        </form>
      </SettingsContainer>
    </>
  )
}

export default CabinetSettingsTab
