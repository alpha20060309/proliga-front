import WorldNews from './components/WorldNews'
import RulesSlider from './components/RulesSlider'

const PlayLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-linear-to-tr from-background to-card">
      {children}
      <WorldNews />
      <RulesSlider />
    </main>
  )
}

export default PlayLayout
