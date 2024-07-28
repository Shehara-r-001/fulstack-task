import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchUser } from './actions';

export type Rank = {
  id: number;
  rank: number;
  newRank?: number;
};

const initialState: Rank = {
  id: null,
  rank: null,
  newRank: null,
};

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    setRank: (state: Rank, action: PayloadAction<Rank>) => {
      state.id = action.payload.id;
      state.rank = action.payload.rank;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.newRank = action.payload.rank;
    });
  },
});

export const { setRank } = rankSlice.actions;

export default rankSlice.reducer;
