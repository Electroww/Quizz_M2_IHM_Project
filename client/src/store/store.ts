import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './features/players-slice'
import questionsReducer from './features/questions-slice'

export const store = configureStore({
  reducer: {
    players: playerReducer,
    questions: questionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
