import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle } from 'lucide-react'
import RefillBalanceModal from 'shared/Modals/RefillBalance'
import { useState } from 'react'
import { Wallet } from 'lucide-react'

const RefillBalance = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <Card className="sm:max-w-64 w-full gap-4">
      <RefillBalanceModal
        setIsModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
      />
      <CardHeader className="relative flex items-center">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Wallet className="text-foreground h-4 w-4" />
        </div>
        <CardTitle className="text-sm font-semibold">{t('Balans')}</CardTitle>
      </CardHeader>

      <CardContent>
        <NumericFormat
          value={userTable?.balance / 100 || 0}
          className="text-foreground w-full border-none bg-transparent text-right text-lg font-bold outline-hidden select-none"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t('UZS')}
        />
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => setModalOpen(true)}
          size="lg"
          className="group border-border bg-primary text-primary-foreground hover:bg-primary/90 relative w-full overflow-hidden border transition-all duration-300 hover:shadow-lg"
        >
          <ArrowUpCircle className="h-5 w-5 transition-transform" />
          <span className="font-semibold">{t('Balansni toldirish')}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RefillBalance
