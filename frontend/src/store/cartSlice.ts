import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'; // Import RootState


interface CartState {
  items: { [itemId: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.items[itemId]) {
        state.items[itemId] = 1;
      } else {
        state.items[itemId]++;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId] > 0) {
        state.items[itemId]--;
      }
    },
    updateCartItemCount: (state, action) => {
      const { newAmount, itemId } = action.payload;
      state.items[itemId] = newAmount;
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, updateCartItemCount,resetCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
