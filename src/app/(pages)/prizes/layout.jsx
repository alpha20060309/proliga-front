import Gutter from 'components/Gutter'

export default function PrizesLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-tr from-red-800 to-blue-900 pt-24 pb-12">
      <Gutter>{children}</Gutter>
    </main>
  )
}
