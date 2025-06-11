import Gutter from 'shared/Gutter'

export default function AboutUsLayout({ children }) {
  return (
    <Gutter>
      <main className="min-h-screen pt-16">{children}</main>
    </Gutter>
  )
}
