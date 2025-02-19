// 'use client'

// import Image from 'next/image'
// import SettingsAlert from '../Alert'
// import ConfirmOTP from 'components/Modals/ConfirmOTP'
// import { useTranslation } from 'react-i18next'
// import { useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { toast } from 'react-toastify'
// import { Eye, EyeOff, EditIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { SettingsContainer } from '../Container'
// import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
// import { useSelector } from 'react-redux'
// import { selectUserTable } from 'app/lib/features/auth/auth.selector'
// import { useAuthUpdatePassword } from 'app/hooks/auth/useAuthChangePassword/useAuthChangePassword'
// import UpdatePhoneNumber from 'components/Modals/UpdatePhoneNumber'
// import { Label } from '@/components/ui/label'

// const ChangePasswordTab = () => {
//   const { t } = useTranslation()
//   const userTable = useSelector(selectUserTable)
//   const { sendOTP } = useSendOTP()
//   const { updatePassword, isLoading } = useAuthUpdatePassword()

//   const [oldPassword, setOldPassword] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [showOldPassword, setShowOldPassword] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isSMSVerified, setSMSVerified] = useState(false)
//   const [isModalOpen, setModalOpen] = useState(false)
//   const [updateModalOpen, setUpdateModalOpen] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (password !== confirmPassword) {
//       toast.warning(t('Parollar mos kelmadi'), { theme: 'dark' })
//       return
//     }
//     if (
//       oldPassword.length < 6 ||
//       password.length < 6 ||
//       confirmPassword.length < 6
//     ) {
//       toast.warning(t("Parolar 6 ta belgidan kam bo'lmasligi kerak"))
//       return
//     }
//     if (oldPassword === password) {
//       toast.warning(
//         t('Yangi parol eski parol bilan birhil bolishi mumkin emas'),
//         {
//           theme: 'dark',
//         }
//       )
//       return
//     }

//     if (password !== confirmPassword) {
//       toast.error(t('Parollar mos kelmadi'), { theme: 'dark' })
//       return
//     }

//     if (!isSMSVerified) {
//       return toast.warning(t('Iltimos, telefon raqamingizni tasdiqlang'))
//     }

//     await updatePassword({
//       oldPassword,
//       newPassword: password,
//       email: userTable?.email,
//     })
//   }

//   const handleSendSms = async () => {
//     setModalOpen(true)
//     await sendOTP({ phone: userTable?.phone })
//   }

//   return (
//     <>
//       <UpdatePhoneNumber
//         isModalOpen={updateModalOpen}
//         setModalOpen={setUpdateModalOpen}
//       />
//       <ConfirmOTP
//         setModalOpen={setModalOpen}
//         isModalOpen={isModalOpen}
//         setVerificationStatus={setSMSVerified}
//       />
//       <SettingsContainer>
//         <SettingsAlert
//           message={t(
//             'To change your password, you must confirm your identity using a one-time password sent via SMS.'
//           )}
//           actionText={t('Send')}
//           onAction={handleSendSms}
//         />
//         <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
//           {t('Security settings')}
//         </h3>
//         <form onSubmit={handleSubmit} className="space-y-2">
//           <section className="space-y-1">
//             <div className="relative space-y-1 sm:max-w-96">
//               <Label
//                 className="block text-sm font-bold text-neutral-300"
//                 htmlFor="phone"
//               >
//                 {t('Telefon raqam')}:
//               </Label>
//               <div className="group relative">
//                 <Input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   className="h-10 cursor-pointer rounded border-neutral-500 bg-neutral-900 text-sm text-neutral-300 transition-colors placeholder:text-neutral-500 md:text-base"
//                   placeholder={'99-999-99-99'}
//                   value={userTable?.phone}
//                   disabled={!isSMSVerified}
//                   readOnly
//                 />
//                 <Button
//                   // disabled={!isSMSVerified}
//                   type="button"
//                   size="icon"
//                   variant="ghost"
//                   onClick={() => setUpdateModalOpen(true)}
//                   className="absolute bottom-0 right-0 bg-transparent transition-all group-hover:bg-neutral-950"
//                 >
//                   <EditIcon className="size-5 text-neutral-200" />
//                 </Button>
//               </div>
//             </div>
//             <div className="relative space-y-1 sm:max-w-96">
//               <Label
//                 className="block text-sm font-bold text-neutral-300"
//                 htmlFor="oldPassword"
//               >
//                 {t('Eski parol')}
//               </Label>
//               <Input
//                 disabled={!isSMSVerified}
//                 id="oldPassword"
//                 name="oldPassword"
//                 className="relative h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
//                 type={showOldPassword ? 'text' : 'password'}
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute bottom-0 right-0 hover:bg-transparent"
//                 onClick={() => setShowOldPassword(!showOldPassword)}
//               >
//                 {showOldPassword ? (
//                   <EyeOff className="size-6 text-neutral-200" />
//                 ) : (
//                   <Eye className="size-6 text-neutral-200" />
//                 )}
//               </Button>
//             </div>
//             <div className="relative space-y-1 sm:max-w-96">
//               <Label
//                 className="block text-sm font-bold text-neutral-300"
//                 htmlFor="newPassword"
//               >
//                 {t('Yangi parol')}
//               </Label>
//               <Input
//                 id="newPassword"
//                 name="newPassword"
//                 className="h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 disabled={!isSMSVerified}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute bottom-0 right-0 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="size-6 text-neutral-200" />
//                 ) : (
//                   <Eye className="size-6 text-neutral-200" />
//                 )}
//               </Button>
//             </div>
//             <div className="relative space-y-1 sm:max-w-96">
//               <Label
//                 className="block text-sm font-bold text-neutral-300"
//                 htmlFor="confirmPassword"
//               >
//                 {t('Yangi parolni qayta kiriting')}
//               </Label>
//               <Input
//                 disabled={!isSMSVerified}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 className="h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute bottom-0 right-0 hover:bg-transparent"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="size-6 text-neutral-200" />
//                 ) : (
//                   <Eye className="size-6 text-neutral-200" />
//                 )}
//               </Button>
//             </div>
//           </section>
//           <Button
//             className="h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
//             type="submit"
//             disabled={isLoading || !isSMSVerified}
//           >
//             {isLoading ? (
//               <Image
//                 src="/icons/loading.svg"
//                 width={24}
//                 height={24}
//                 alt="loading"
//                 className="filter-black mx-auto size-5 animate-spin"
//               />
//             ) : (
//               t('Saqlash')
//             )}
//           </Button>
//         </form>
//       </SettingsContainer>
//     </>
//   )
// }

// export default ChangePasswordTab

// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { SettingsContainer } from '../Container'
// import ChangePhoneForm from './ChangePhoneForm'
// import ChangePasswordForm from './ChangePasswordForm'
// import SettingsAlert from '../Alert'
// import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
// import { useSelector } from 'react-redux'
// import { selectUserTable } from 'app/lib/features/auth/auth.selector'
// import ConfirmOTP from 'components/Modals/ConfirmOTP'

// export default function SettingsPage() {
//   const { t } = useTranslation()
//   const userTable = useSelector(selectUserTable)
//   const { sendOTP } = useSendOTP()

//   const [isSMSVerified, setSMSVerified] = useState(false)
//   const [isModalOpen, setModalOpen] = useState(false)

//   const handleSendSms = async () => {
//     setModalOpen(true)
//     await sendOTP({ phone: userTable?.phone })
//   }

//   return (
//     <SettingsContainer>
//       <SettingsAlert
//         message={t(
//           'To change your password, you must confirm your identity using a one-time password sent via SMS.'
//         )}
//         actionText={t('Send')}
//         onAction={handleSendSms}
//       />
//       <ConfirmOTP
//         setModalOpen={setModalOpen}
//         isModalOpen={isModalOpen}
//         setVerificationStatus={setSMSVerified}
//       />
//       <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
//         {t('Security settings')}
//       </h3>
//       <div className="grid gap-8 md:grid-cols-2">
//         <ChangePasswordForm isSMSVerified={isSMSVerified} />
//         <ChangePhoneForm isSMSVerified={isSMSVerified} />
//       </div>
//     </SettingsContainer>
//   )
// }
'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsContainer } from '../Container'
import ChangePasswordForm from './ChangePasswordForm'
import ChangePhoneForm from './ChangePhoneForm'
import SettingsAlert from '../Alert'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import ConfirmOTP from 'components/Modals/ConfirmOTP'
import { Shield } from 'lucide-react'

export default function SettingsPage() {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { sendOTP } = useSendOTP()

  const [isSMSVerified, setSMSVerified] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleSendSms = async () => {
    setModalOpen(true)
    await sendOTP({ phone: userTable?.phone })
  }

  return (
    <SettingsContainer>
      <SettingsAlert
        message={t(
          'To change your password, you must confirm your identity using a one-time password sent via SMS.'
        )}
        actionText={t('Send')}
        onAction={handleSendSms}
      />
      <h2 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
        {t('Security settings')}
      </h2>
      <ConfirmOTP
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        setVerificationStatus={setSMSVerified}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {/* <ChangePasswordForm isSMSVerified={isSMSVerified} />
        <ChangePhoneForm isSMSVerified={isSMSVerified} /> */}
        <FormCard title={t('Password Management')}>
          <ChangePasswordForm isSMSVerified={isSMSVerified} />
        </FormCard>
        <FormCard title={t('Phone Number Update')}>
          <ChangePhoneForm isSMSVerified={isSMSVerified} />
        </FormCard>
      </div>
    </SettingsContainer>
  )
}

function FormCard({ title, children }) {
  return (
    <div className="rounded-lg bg-neutral-800 p-6">
      <div className="mb-4 flex items-center">
        {/* <div className="mr-3 h-1 w-1 rounded-full bg-primary"></div> */}
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      {children}
    </div>
  )
}
