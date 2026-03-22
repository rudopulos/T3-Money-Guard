import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
};

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

const persistConfig = {
  key: 'balance',
  storage,
};

export const { setBalance } = balanceSlice.actions;

export const PersistedBalanceReducer = persistReducer(
  persistConfig,
  balanceSlice.reducer
);

export default balanceSlice.reducer;

