'use client'

import { IconsSpray } from 'components/AnimatedBackground/Spray'
import Gutter from 'components/Gutter'

const ChampionshipsLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-950 to-blue-950 pt-16">
      <IconsSpray />
      <Gutter>{children}</Gutter>
    </main>
  )
}

export default ChampionshipsLayout
