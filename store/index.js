'use client';
import { configureStore } from '@reduxjs/toolkit';
import cart from './cartSlice';
export const createStore = () => configureStore({ reducer: { cart } });
export const selectCart = (selected) => selected.cart;
export const selectCount = (selected) =>
	selected.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectTotal = (selected) =>
	selected.cart.items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
