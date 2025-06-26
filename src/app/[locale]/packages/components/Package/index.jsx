import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Zap, Users, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { PACKAGE_TYPE } from 'app/utils/packages.util'

const PackageContainer = ({ packageType, packages, t }) => {
  const getPackageTitle = (type) => {
    switch (type) {
      case PACKAGE_TYPE.team_balance:
        return t('Balans')
      case PACKAGE_TYPE.transfer_count:
        return t('Transfer')
      case PACKAGE_TYPE.single_club_count:
        return t('Bir jamoa oyinchilari')
      default:
        return ''
    }
  }

  return (
    <Card className="border-accent/50 hover:border-accent gap-0  shadow transition-all">
      <CardHeader className="flex items-center justify-between" >
        <CardTitle className="text-xl font-bold">
          {getPackageTitle(packageType)}
        </CardTitle>
        <PackageIcon type={packageType} />
      </CardHeader>
      <CardContent className="space-y-0 pt-4">
        <Separator className="bg-accent/20 mb-4" />
        <div className="space-y-4">
          {packages
            .filter((item) => item.type === packageType)
            .map((item, index) => (
              <div
                key={index}
                className="bg-card hover:bg-secondary flex items-center justify-between rounded-sm p-2 shadow transition-all"
              >
                <div className="flex cursor-default items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/15 border-accent text-accent border"
                  >
                    {item.amount}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    {t('ga oshirish')}
                  </span>
                </div>
                <Button asChild size="sm">
                  <Link href={`/confirm-payment/${item.id}`}>
                    {t('Tanlash')}
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

const PackageIcon = ({ type }) => {
  switch (type) {
    case PACKAGE_TYPE.team_balance:
      return <Coins className="text-accent h-6 w-6" />
    case PACKAGE_TYPE.transfer_count:
      return <Zap className="text-accent h-6 w-6" />
    case PACKAGE_TYPE.single_club_count:
      return <Users className="text-accent h-6 w-6" />
    default:
      return null
  }
}

export default PackageContainer
