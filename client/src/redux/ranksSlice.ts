import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Rank = {
  id: number;
  rank: number;
};

const initialState: Rank = {
  id: null,
  rank: null,
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
});

export const { setRank } = rankSlice.actions;

export default rankSlice.reducer;
