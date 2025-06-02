import { cn } from '@/lib/utils'
import OfflineClient from './components/OfflineClient'
import '../globals.css'

export const metadata = {
  title: 'Offline',
}

const OfflinePage = () => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4',
        'from-card to-background text-foreground bg-linear-to-b transition-colors duration-200'
      )}
    >
      <OfflineClient />
    </div>
  )
}

export default OfflinePage
