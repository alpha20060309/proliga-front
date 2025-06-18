import PlayFooter from './components/PlayFooter'
import { auth } from 'app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
// import { toast } from 'sonner'

const PlayLayout = async ({ children }) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/auth')
  }

  return (
    <main className="bg-background min-h-screen py-4">
      {children}
      <PlayFooter />
    </main>
  )
}

export default PlayLayout
