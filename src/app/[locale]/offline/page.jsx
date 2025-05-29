import { cn } from '@/lib/utils'
import OfflineClient from './components/OfflineClient'

const OfflinePage = () => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4',
        'bg-linear-to-b from-card to-background text-foreground transition-colors duration-200'
      )}
    >
      <OfflineClient />
    </div>
  )
}

export default OfflinePage
