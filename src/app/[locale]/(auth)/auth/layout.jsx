import AuthListener from 'app/providers/AuthListener.provider'

const AuthLayout = ({ children }) => {
  return <AuthListener>{children}</AuthListener>
}

export default AuthLayout
