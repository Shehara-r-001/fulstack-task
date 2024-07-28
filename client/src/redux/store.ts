import { configureStore } from '@reduxjs/toolkit';

import rankReducer from './ranksSlice';

export const store = configureStore({
  reducer: {
    rank: rankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
