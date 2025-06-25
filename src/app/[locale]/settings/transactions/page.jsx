'use client'

import CabinetTransactionsBalanceTable from './components/BalanceTable'
import CabinetTransactionsExpensesTable from './components/PackagesTable'
import CabinetTransactionsSkeleton from './components/Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { fetchPayBalance } from 'app/lib/features/payBalance/payBalance.thunk'
import { fetchPayExpenses } from 'app/lib/features/payExpense/payExpense.thunk'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Wallet, Boxes, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { selectExpenses } from 'app/lib/features/payExpense/payExpense.selector'
import { selectBalances } from 'app/lib/features/payBalance/payBalance.selector'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CabinetTransactionsHistory = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState(TRANSACTIONTABS.BALANCE)
  const userTable = useSelector(selectUserTable)
  const expenses = useSelector(selectExpenses)
  const balances = useSelector(selectBalances)
  const { isLoading: balanceLoading } = useSelector((state) => state.payBalance)

  useEffect(() => {
    if (userTable?.id && expenses?.length === 0 && balances?.length === 0) {
      Promise.all([
        dispatch(fetchPayBalance({ user_id: userTable?.id })),
        dispatch(fetchPayExpenses({ user_id: userTable?.id })),
      ])
    }
  }, [dispatch, userTable, expenses?.length, balances?.length])

  const refreshData = () => {
    switch (currentTab) {
      case TRANSACTIONTABS.BALANCE:
        return dispatch(fetchPayBalance({ user_id: userTable?.id }))
      case TRANSACTIONTABS.EXPENSES:
        return dispatch(fetchPayExpenses({ user_id: userTable?.id }))
      default:
        break
    }
  }

  return (
    <Tabs
      defaultValue={TRANSACTIONTABS.BALANCE}
      className="w-full sm:w-96"
      onValueChange={(value) => setCurrentTab(value)}
    >
      <div className="mb-2 flex flex-col gap-1 sm:mb-0 sm:justify-between md:flex-row">
        <h3 className="text-foreground text-xl font-bold tracking-tight">
          {t('Xarajatlar tarixi')}
        </h3>

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TRANSACTIONTABS.BALANCE}>
            <Wallet className="mr-2 h-4 w-4" />
            {t('Balans')}
          </TabsTrigger>
          <TabsTrigger value={TRANSACTIONTABS.EXPENSES}>
            <Boxes className="mr-2 h-4 w-4" />
            {t('Paketlar')}
          </TabsTrigger>
        </TabsList>
      </div>

      {currentTab === TRANSACTIONTABS.BALANCE &&
        (balanceLoading ? (
          <CabinetTransactionsSkeleton cols={4} />
        ) : (
          <div className="flex h-full w-full flex-1 flex-col">
            {balances?.length > 0 ? (
              <CabinetTransactionsBalanceTable />
            ) : (
              <p className="fade-in-fast text-foreground flex min-h-96 items-center justify-center text-center">
                {t('Balans haqida malumot topilmadi!')}
              </p>
            )}
          </div>
        ))}
      {currentTab === TRANSACTIONTABS.EXPENSES && (
        <CabinetTransactionsExpensesTable />
      )}
    </Tabs>
  )
}

const TRANSACTIONTABS = {
  BALANCE: 'balance',
  EXPENSES: 'expenses',
}

export default CabinetTransactionsHistory
