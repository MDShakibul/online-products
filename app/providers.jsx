'use client';
import { ThemeProvider } from 'next-themes';
import { useEffect, useRef } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { hydrateCart } from '../store/cartSlice.js';
import { createStore } from '../store/index.js';

const store = createStore();

function CartHydrator() {
	const dispatch = useDispatch();
	const done = useRef(false);
	useEffect(() => {
		if (done.current) return;
		try {
			const raw = localStorage.getItem('cart-products');
			if (raw) dispatch(hydrateCart(JSON.parse(raw)));
		} catch {}
		done.current = true;
	}, [dispatch]);
	useEffect(() => {
		const unsub = store.subscribe(() => {
			localStorage.setItem('cart-products', JSON.stringify(store.getState().cart));
		});
		return unsub;
	}, []);
	return null;
}

export default function Providers({ children }) {
	return (
		<Provider store={store}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<CartHydrator />
				{children}
			</ThemeProvider>
		</Provider>
	);
}
