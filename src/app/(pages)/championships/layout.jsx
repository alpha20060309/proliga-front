'use client'

import { IconsSpray } from 'components/AnimatedBackground/Spray'
import Gutter from 'components/Gutter'

const ChampionshipsLayout = ({ children }) => {
  return (
    <main className="from-chart-1 to-chart-2 relative min-h-screen overflow-hidden bg-linear-to-br pt-16">
      {/* <IconsSpray /> */}
      <Gutter>{children}</Gutter>
    </main>
  )
}

export default ChampionshipsLayout
