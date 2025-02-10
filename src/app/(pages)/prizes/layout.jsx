import { FootballBackground } from 'components/AnimatedBackground/FootballBackground'
import Gutter from 'components/Gutter'

export default function PrizesLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-red-800 to-blue-900 pb-12 pt-24">
      <Gutter>
        <FootballBackground type="prizes" />
      </Gutter>
      {children}
    </main>
  )
}
