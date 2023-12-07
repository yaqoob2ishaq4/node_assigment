// store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import moneyReducer from './moneySlice';
import purchaseReducer from './purchaseSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    money: moneyReducer,
    purchase: purchaseReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
