import Gutter from 'components/Gutter'
import { IconsSpray } from 'components/AnimatedBackground/Spray'

export default function PrizesLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-red-800 to-blue-900 pb-12 pt-24">
      <Gutter>
        <IconsSpray type="prizes" />
      </Gutter>
      {children}
    </main>
  )
}
