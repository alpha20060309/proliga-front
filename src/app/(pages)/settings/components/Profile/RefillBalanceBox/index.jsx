import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle } from 'lucide-react'
import RefillBalance from 'components/Modals/RefillBalance'
import { useState } from 'react'

const ProfessionalRefillBalanceBox = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <RefillBalance setIsModalOpen={setModalOpen} isModalOpen={isModalOpen} />
      <Card className="h-28 w-full space-y-0 border border-neutral-600 bg-neutral-800/50 text-white shadow-md xs:max-w-64">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-300">
              {t('Balans')}:
            </span>
            <div className="text-right">
              <NumericFormat
                value={userTable?.balance / 100 || 0}
                className="w-full select-none border-none bg-transparent text-right text-lg font-bold text-yellow-400 outline-none"
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
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-primary/75 text-neutral-900 transition-all hover:bg-primary"
          >
            <ArrowUpCircle className="mr-2 h-4 w-4" />
            {t('Balansni toldirish')}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default ProfessionalRefillBalanceBox
