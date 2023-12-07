import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'; // Import RootState


interface MoneyState {
  availableMoney: number;
}

const initialState: MoneyState = {
  availableMoney: 0,
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    setAvailableMoney: (state, action) => {
      state.availableMoney = action.payload;
    },
  },
});

export const { setAvailableMoney } = moneySlice.actions;
export const selectAvailableMoney = (state: RootState) => state.money.availableMoney;
export default moneySlice.reducer;
