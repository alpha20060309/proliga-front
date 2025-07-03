import {
  fetchBroadcastNotifications,
  fetchPersonalNotifications,
} from './systemNotification.thunk'

export const systemNotificationExtraReducer = (builder) => {
  builder
    .addCase(fetchBroadcastNotifications.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchBroadcastNotifications.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        action.payload.data.forEach((item) => {
          state.notifications.unshift(item)
        })
      }

      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })

      state.isLoading = false
    })
    .addCase(fetchBroadcastNotifications.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error?.message
    })
    .addCase(fetchPersonalNotifications.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPersonalNotifications.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        action.payload.data.forEach((item) => {
          state.notifications.unshift(item)
        })
      }

      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })

      state.isLoading = false
    })
    .addCase(fetchPersonalNotifications.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error?.message ?? null
    })
}
