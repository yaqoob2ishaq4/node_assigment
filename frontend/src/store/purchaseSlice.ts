import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'; // Import RootState
import { IProduct } from '../models/interfaces';


interface PurchaseState {
  purchasedItems: IProduct[];
}

const initialState: PurchaseState = {
  purchasedItems: [],
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setPurchasedItems: (state, action) => {
      state.purchasedItems = action.payload;
    },
  },
});

export const { setPurchasedItems } = purchaseSlice.actions;
export const selectPurchasedItems = (state: RootState) => state.purchase.purchasedItems;
export default purchaseSlice.reducer;
