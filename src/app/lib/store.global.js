import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root.reducer'

const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
