import Gutter from 'components/Gutter'

export default function SettingsLayout({ children }) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-linear-to-tr from-chart-1 to-chart-2 pt-24 pb-6 md:min-h-max">
      <Gutter>{children}</Gutter>
    </main>
  )
}
