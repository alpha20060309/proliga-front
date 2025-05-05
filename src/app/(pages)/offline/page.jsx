import { cn } from '@/lib/utils'
import OfflineClient from './components/OfflineClient'

const OfflinePage = () => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4',
        'bg-gradient-to-b from-neutral-800 to-neutral-950 text-gray-100 transition-colors duration-200'
      )}
    >
      <OfflineClient />
    </div>
  )
}

export default OfflinePage
