import dynamic from 'next/dynamic'
const ResetPasswordForm = dynamic(() => import('./ResetPasswordForm'), {
  ssr: false,
})

const ResetPassword = () => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <section className="mx-4 flex w-full max-w-[28rem] flex-col items-center justify-center gap-4 bg-black sm:mx-0">
        <ResetPasswordForm />
      </section>
    </main>
  )
}

export default ResetPassword
