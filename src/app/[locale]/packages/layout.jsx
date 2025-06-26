import Gutter from 'components/Gutter'

export default function PackagesLayout({ children }) {
  return (
    <main className="h-full min-h-screen pt-24 pb-12">
      <Gutter>{children}</Gutter>
    </main>
  )
}
