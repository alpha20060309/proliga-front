import { FootballBackground } from 'components/AnimatedBackground/FootballBackground'

export default function SettingsLayout({ children }) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-tr from-red-800 to-blue-900 pb-6 pt-24 md:min-h-max">
      <FootballBackground type={'settings'} />
      {children}
    </main>
  )
}
