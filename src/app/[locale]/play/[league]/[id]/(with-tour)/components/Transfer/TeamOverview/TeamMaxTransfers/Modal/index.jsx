import { Link } from 'next-view-transitions'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { PACKAGE_TYPE } from 'app/utils/packages.util'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { setTransferModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, InfoIcon } from 'lucide-react'
import { selectPackages } from 'app/lib/features/package/package.selector'

const TeamMaxTransfersModal = () => {
  const dispatch = useDispatch()
  const { transferModal } = useSelector((store) => store.currentTeam)
  const packages = useSelector(selectPackages)
  const { t } = useTranslation()
  // eslint-disable-next-line no-undef
  const defaultTransfers = +process.env.NEXT_PUBLIC_DEFAULT_TRANSFERS

  return (
    <Dialog
      onOpenChange={() => dispatch(setTransferModal(!transferModal))}
      open={transferModal}
    >
      <DialogContent className="max-h-[92%] max-w-[96%] overflow-auto rounded-lg sm:max-w-md xl:max-w-lg xl:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold lg:text-2xl">
            {t('Boost Your Transfer Limit!')}
          </DialogTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <DialogDescription className="flex cursor-help items-center text-sm lg:text-base">
                {t('Upgrade your game strategy with more transfers')}
                <InfoIcon className="ml-1 h-4 w-4" />
              </DialogDescription>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{t('transfer modal info')}</p>
            </HoverCardContent>
          </HoverCard>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {packages.map(
            (transfer) =>
              transfer.type === PACKAGE_TYPE.transfer_count && (
                <Card key={transfer.id} className="overflow-hidden py-2">
                  <CardContent className="p-0">
                    <Link
                      href={`/confirm-payment/${transfer.id}`}
                      className="block"
                      onClick={() => dispatch(setTransferModal(false))}
                    >
                      <Button
                        variant="ghost"
                        className="border-primary hover:bg-primary/10 relative h-full w-full justify-start rounded-none border-l-4 px-4 py-2 text-left"
                      >
                        <div>
                          <Badge
                            variant="secondary"
                            className="text-foreground mb-2"
                          >
                            +{transfer.amount - defaultTransfers}{' '}
                            {t('Transfers')}
                          </Badge>
                          <h3 className="text-foreground text-lg font-semibold">
                            {t('Expand your options')}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {t('Increase limit by').replace(
                              '$',
                              transfer.amount
                            )}
                          </p>
                        </div>
                        <ArrowRight className="text-foreground dark:text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
          )}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
          <Zap className="text-foreground dark:text-accent h-4 w-4" />
          <p className="text-muted-foreground font-medium">
            {t('Upgrade now for instant access!')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamMaxTransfersModal
