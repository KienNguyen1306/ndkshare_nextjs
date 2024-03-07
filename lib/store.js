import { configureStore } from '@reduxjs/toolkit'
import  modgameSlice  from '../lib/modgameSlice'
import  shareCouresSlice  from '../lib/shareCouresSlice'


export const store = configureStore({
  reducer: {
    modgame:modgameSlice,
    courses:shareCouresSlice
  },
})