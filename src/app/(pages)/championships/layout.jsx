'use client'

import { FootballBackground } from 'components/AnimatedBackground/FootballBackground'

const ChampionshipsLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-950 to-blue-950 pt-16">
      <FootballBackground />
      {children}
    </main>
  )
}

export default ChampionshipsLayout
