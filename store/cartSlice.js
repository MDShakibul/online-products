// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const existing = state.items.find(item => item.id === payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    increaseQuantity(state, { payload: id }) {
      const existing = state.items.find(item => item.id === id);
      if (existing) existing.quantity += 1;
    },
    decreaseQuantity(state, { payload: id }) {
      const existing = state.items.find(item => item.id === id);
      if (existing) existing.quantity = Math.max(1, existing.quantity - 1);
    },
    clearCart(state) {
      state.items = [];
    },

    hydrateCart(_, { payload }) {
      return payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
