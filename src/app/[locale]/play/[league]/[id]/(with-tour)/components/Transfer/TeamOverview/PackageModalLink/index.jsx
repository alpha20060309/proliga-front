import { Card, CardContent } from 'components/ui/card'
import { ArrowRight } from 'lucide-react'
import { Link } from 'next-view-transitions'

const PackageModalLink = ({ item, onClick, children }) => {
  return (
    <Card className="overflow-hidden py-2">
      <CardContent className="p-0">
        <Link
          href={`/confirm-payment/${item.id}`}
          onClick={onClick}
          className="border-primary text-foreground hover:bg-primary/10 relative block h-full w-full justify-start rounded-none border-l-4 px-4 py-2 text-left"
        >
          <div>{children}</div>
          <ArrowRight className="text-foreground dark:text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default PackageModalLink
