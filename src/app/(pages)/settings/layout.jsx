import { IconsSpray } from 'components/AnimatedBackground/Spray'

export default function SettingsLayout({ children }) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-tr from-red-800 to-blue-900 pb-6 pt-24 md:min-h-max">
      <IconsSpray type={'settings'} />
      {children}
    </main>
  )
}
