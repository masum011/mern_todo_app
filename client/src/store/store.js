import { configureStore } from '@reduxjs/toolkit'
import todosSlice from '../pages/Todos/todosSlice'

export const store = configureStore({
  reducer: {
    todos:todosSlice
  },
})