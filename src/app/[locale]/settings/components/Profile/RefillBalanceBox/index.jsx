import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle } from 'lucide-react'
import RefillBalance from 'components/Modals/RefillBalance'
import { useState } from 'react'

const ProfessionalRefillBalanceBox = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <Card className="border-border bg-card/50 text-foreground xs:max-w-64 w-full space-y-0 border p-0 shadow-md">
      <CardContent className="space-y-2 p-4">
        <RefillBalance
          setIsModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
        />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            {t('Balans')}:
          </span>
          <div className="text-right">
            <NumericFormat
              value={userTable?.balance / 100 || 0}
              className="text-foreground w-full border-none bg-transparent text-right text-lg font-bold outline-hidden select-none"
              defaultValue={0}
              readOnly
              thousandSeparator
              fixedDecimalScale
              decimalScale={2}
              tabIndex={-1}
              suffix={' ' + t("so'm")}
            />
          </div>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-accent-foreground hover:bg-accent w-full shadow transition-all"
        >
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          {t('Balansni toldirish')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProfessionalRefillBalanceBox
