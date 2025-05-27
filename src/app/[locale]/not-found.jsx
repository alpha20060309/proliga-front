import { Link } from 'next-view-transitions'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="bg-card flex min-h-screen items-center justify-center p-4">
      <Card className="border-primary/50 bg-secondary w-full max-w-md border-4">
        <div className="p-6 text-center">
          <h1 className="text-warning mb-4 text-6xl font-bold">404</h1>
          <div className="relative mx-auto mb-6 h-24 w-24">
            <div className="bg-foreground absolute inset-0 rounded-full"></div>
            <div className="bg-card absolute inset-2 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground text-2xl font-bold">XATO</span>
            </div>
          </div>
          <h2 className="text-foreground mb-4 text-2xl font-semibold">
            Sahifa topilmadi
          </h2>
          <p className="text-muted-foreground mb-6">
            Kechirasiz, siz so&apos;ragan sahifa mavjud emas. Iltimos, manzilni
            tekshiring yoki quyidagi havoladan foydalaning.
          </p>

          <Link
            href="/"
            className="bg-warning hover:bg-link text-accent-foreground rounded px-4 py-2 transition-colors"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </Card>
    </div>
  )
}
