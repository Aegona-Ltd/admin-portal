import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { AuthApi } from 'src/services/auth'
import { LearnerApi } from 'src/services/learner'
import { UserApi } from 'src/services/user'

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [LearnerApi.reducerPath]: LearnerApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([AuthApi.middleware, LearnerApi.middleware, UserApi.middleware])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
