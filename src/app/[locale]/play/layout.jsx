'use client'
import WorldNews from './components/WorldNews'
import RulesSlider from './components/RulesSlider'

const PlayLayout = ({ children }) => {
  return (
    <main className="from-secondary to-background min-h-screen bg-linear-to-tr">
      {children}
      <WorldNews />
      <RulesSlider />
    </main>
  )
}

export default PlayLayout
