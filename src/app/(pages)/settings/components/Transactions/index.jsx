'use client'

import CabinetTransactionsBalanceTable from './BalanceTable'
import CabinetTransactionsExpensesTable from './PackagesTable'
import CabinetTransactionsSkeleton from './Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { fetchPayBalance } from 'app/lib/features/payBalance/payBalance.thunk'
import { fetchPayExpenses } from 'app/lib/features/payExpense/payExpense.thunk'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Wallet, Boxes, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsContainer } from '../Container'
import { selectExpenses } from 'app/lib/features/payExpense/payExpense.selector'
import { selectBalances } from 'app/lib/features/payBalance/payBalance.selector'
import { Button } from '@/components/ui/button'

const CabinetTransactionsHistory = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState(TRANSACTIONTABS.BALANCE)
  const userTable = useSelector(selectUserTable)
  const expenses = useSelector(selectExpenses)
  const balances = useSelector(selectBalances)
  const { isLoading: balanceLoading } = useSelector((state) => state.payBalance)
  const { isLoading: expenseLoading } = useSelector((store) => store.payExpense)

  useEffect(() => {
    if (userTable?.id && expenses?.length === 0 && balances?.length === 0) {
      // eslint-disable-next-line no-undef
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
    <SettingsContainer>
      <div className="mb-2 flex flex-col gap-1 sm:mb-0 sm:justify-between md:flex-row">
        <h3 className="mb-1 flex justify-between text-xl font-bold tracking-tight text-neutral-100 md:mb-0 md:block">
          {t('Xarajatlar tarixi')}
          <Button
            onClick={refreshData}
            variant="outline"
            size="sm"
            className="flex size-8 justify-center p-0 text-neutral-200 hover:text-neutral-100 md:hidden"
          >
            <RefreshCcw className="size-4" />
          </Button>
        </h3>
        <div className="flex w-full overflow-hidden rounded-lg bg-neutral-900 sm:w-96">
          <Button
            className={cn(
              'flex h-9 flex-1 items-center justify-center font-bold',
              'rounded-none text-sm font-medium transition-all disabled:opacity-50',
              currentTab === TRANSACTIONTABS.BALANCE ? active : passive
            )}
            onClick={() => setCurrentTab(TRANSACTIONTABS.BALANCE)}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {t('Balans')}
          </Button>
          <Button
            className={cn(
              'flex h-9 flex-1 items-center justify-center font-bold',
              'rounded-none text-sm font-medium transition-all disabled:opacity-50',
              currentTab === TRANSACTIONTABS.EXPENSES ? active : passive
            )}
            onClick={() => setCurrentTab(TRANSACTIONTABS.EXPENSES)}
          >
            <Boxes className="mr-2 h-4 w-4" />
            {t('Paketlar')}
          </Button>
        </div>
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          className="hidden h-9 w-32 items-center justify-center gap-1 self-end p-0 text-sm text-neutral-200 hover:text-neutral-100 md:flex"
        >
          <RefreshCcw className="size-4" />
          {t('Refresh')}
        </Button>
      </div>
      {currentTab === TRANSACTIONTABS.BALANCE &&
        (balanceLoading ? (
          <CabinetTransactionsSkeleton cols={4} />
        ) : (
          <div className="flex h-full w-full flex-1 flex-col">
            {balances?.length > 0 ? (
              <CabinetTransactionsBalanceTable />
            ) : (
              <p className="fade-in-fast flex min-h-96 items-center justify-center text-center text-neutral-300">
                {t('Balans haqida malumot topilmadi!')}
              </p>
            )}
          </div>
        ))}
      {currentTab === TRANSACTIONTABS.EXPENSES &&
        (expenseLoading ? (
          <CabinetTransactionsSkeleton cols={5} />
        ) : (
          <div className="flex h-full w-full flex-1 flex-col">
            {expenses?.length > 0 ? (
              <CabinetTransactionsExpensesTable />
            ) : (
              <p className="fade-in-fast flex min-h-96 items-center justify-center text-center text-neutral-300">
                {t('Paketlar haqida malumoti topilmadi!')}
              </p>
            )}
          </div>
        ))}
    </SettingsContainer>
  )
}

const TRANSACTIONTABS = {
  BALANCE: 'balance',
  EXPENSES: 'expenses',
}

const active = 'bg-neutral-950 text-primary opacity-100'
const passive = 'bg-transparent text-neutral-400/80 hover:bg-neutral-950/30'

export default CabinetTransactionsHistory
