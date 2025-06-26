import AuthListener from 'app/providers/AuthListener.provider'

const AuthLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <AuthListener>{children}</AuthListener>
    </main>
  )
}

export default AuthLayout
