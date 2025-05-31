import Gutter from 'shared/Gutter'

export default function PrizesLayout({ children }) {
  return (
    <main className="from-chart-1 to-chart-2 relative min-h-screen overflow-hidden bg-linear-to-br pt-24 pb-12">
      <Gutter>{children}</Gutter>
    </main>
  )
}
