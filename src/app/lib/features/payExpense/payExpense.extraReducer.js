import { fetchPayExpenses } from './payExpense.thunk'

export const payExpenseExtraReducer = (builder) => {
  builder
    .addCase(fetchPayExpenses.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPayExpenses.fulfilled, (state, action) => {
      state.expenses = []
      if (action.payload.data?.length > 0) {
        state.expenses = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchPayExpenses.rejected, (state, action) => {
      state.error = action?.error?.message ?? null
      state.isLoading = false
    })
}
