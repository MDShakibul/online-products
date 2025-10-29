'use client';

import ConfirmModal from '@/components/Modal/ConfirmModal.jsx';
import { cashFormat } from '@/util/index.js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearCart,
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
} from '../../../store/cartSlice.js';
import { selectCart, selectTotal } from '../../../store/index.js';


export default function CartPage() {
	const cart = useSelector(selectCart) || { items: [] };
	const total = useSelector(selectTotal) || 0;
	const dispatch = useDispatch();
	const router = useRouter();
	const hasItems = (cart?.items?.length || 0) > 0;


	const [modal, setModal] = useState(null);

	const openRemove = (item) =>
		setModal({
			type: 'remove',
			itemId: item.id,
			title: item.title,
		});

	const openClear = () => setModal({ type: 'clear' });
	const openCheckout = () => setModal({ type: 'checkout' });

	const closeModal = () => setModal(null);

	const handleConfirm = () => {
		if (!modal) return;
		if (modal.type === 'remove' && modal.itemId != null) {
			dispatch(removeFromCart(modal.itemId));
		} else if (modal.type === 'clear') {
			dispatch(clearCart());
		} else if (modal.type === 'checkout') {
			dispatch(clearCart());
			router.push('/success');
		}
		closeModal();
	};

	return (
		<div className="container sm:p-6 md:p-10">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">

				<section className="md:col-span-2 bg-card p-4 sm:p-6 rounded-lg border border-gray">
					<div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<h1 className="text-2xl sm:text-3xl md:text-2xl font-bold tracking-tight color-primary">
							Shopping Cart
						</h1>

						<div className="flex flex-wrap items-center gap-2 sm:gap-3">
							{hasItems && (
								<button
									onClick={openClear}
									className="rounded-md border border-red-200 bg-red-50 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[.99] cursor-pointer"
								>
									<span className="flex items-center">
										<RiDeleteBin6Line fontSize={18} className="mr-1" />
										Clear Cart
									</span>
								</button>
							)}
							<Link
								href="/"
								className="flex items-center rounded-xl border border-gray px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold btn-primary transition  active:scale-[.99]"
							>
								<FaAngleLeft /> Continue shopping
							</Link>
						</div>
					</div>


					<div className="hidden grid-cols-6 gap-4 border-b pb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 md:grid">
						<span className="col-span-3 color-primary">Product</span>
						<span className="color-primary">Price</span>
						<span className="color-primary">Qty</span>
						<span className="text-right color-primary">Total</span>
					</div>

					{!hasItems ? (
						<div className="flex flex-col items-center justify-center gap-3 py-12 sm:py-16 text-center">
							<div className=" px-4 sm:px-6 py-3 sm:py-4 text-text-dark text-sm sm:text-base">
								Your cart is empty.
							</div>
							<Link
								href="/"
								className="rounded-lg btn-primary px-4 py-3 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow hover:opacity-90 active:scale-[.99]"
							>
								Browse products
							</Link>
						</div>
					) : (
						<ul className="divide-y divide-gray">
							{cart.items.map((item) => {
								const lineTotal = (item.price || 0) * (item.quantity || 0);
								return (
									<li
										key={item.id}
										className="grid grid-cols-1 gap-4 py-4 md:grid-cols-6 md:items-center"
									>
										{/* Product */}
										<div className="col-span-3 flex items-center gap-3 sm:gap-4">
											<div className="relative h-24 w-24 overflow-hidden rounded-lg ring-1 ring-gray-200 bg-iplaceholder shrink-0">
												<Image
													src={item.image}
													alt={item.title}
													fill
													loading="lazy"
													quality={70}
													className="object-contain"
												/>
											</div>

											<div className="min-w-0">
												<h3 className="text-sm sm:text-base md:text-lg color-primary font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
													{item.title}
												</h3>

												{item.category && (
													<p className="mt-0.5 text-xs sm:text-sm capitalize text-secondary">
														{item.category}
													</p>
												)}

												<button
													onClick={() => openRemove(item)}
													className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs sm:text-sm font-semibold text-red-600 hover:underline"
													aria-label={`Remove ${item.title}`}
												>
													<RiDeleteBin6Line fontSize={18} /> Remove
												</button>
											</div>
										</div>

										{/* Price */}
										<div className="text-sm sm:text-base text-gray-700 color-primary">
											{cashFormat(item.price)}
										</div>

										{/* Qty controls */}
										<div className="flex items-center gap-2 sm:gap-3">
											<button
												className="h-9 w-9 sm:h-10 sm:w-10 rounded-md border border-gray-300 text-lg leading-none transition active:scale-[.98] cursor-pointer text-secondary"
												onClick={() => dispatch(decreaseQuantity(item.id))}
												aria-label={`Decrease quantity of ${item.title}`}
											>
												−
											</button>
											<span className="min-w-[2ch] text-center font-semibold text-sm sm:text-base text-primary">
												{item.quantity}
											</span>
											<button
												className="h-9 w-9 sm:h-10 sm:w-10 rounded-md border border-gray-300 text-lg leading-none transition active:scale-[.98] cursor-pointer text-secondary"
												onClick={() => dispatch(increaseQuantity(item.id))}
												aria-label={`Increase quantity of ${item.title}`}
											>
												+
											</button>
										</div>

										{/* Line total */}
										<div className="text-right text-sm sm:text-base font-semibold color-primary">
											{cashFormat(lineTotal)}
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</section>

				{/* Checkout */}
				<aside className="md:sticky md:top-20 h-fit bg-card p-4 sm:p-6 rounded-lg border border-gray self-start">
					<h2 className="text-lg sm:text-xl md:text-2xl font-bold color-primary">
						Order Summary
					</h2>
					<div className="mt-4 sm:mt-6 space-y-2 text-sm sm:text-base">
						<div className="flex items-center justify-between text-primary">
							<span>Subtotal</span>
							<span>{cashFormat(total)}</span>
						</div>
						<div className="flex items-center justify-between text-primary">
							<span>Shipping</span>
							<span>Free</span>
						</div>
						<div className="flex items-center justify-between border-t border-gray color-primary pt-3 text-base sm:text-lg font-bold">
							<span>Total</span>
							<span>{cashFormat(total)}</span>
						</div>
						<button
							disabled={!hasItems}
							onClick={openCheckout}
							className="mt-3 w-full rounded-lg btn-primary bg-black px-4 py-3 sm:px-5 sm:py-3 text-center text-sm sm:text-base font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[.99]"
							aria-disabled={!hasItems}
						>
							Checkout
						</button>
					</div>
				</aside>
			</div>

			{/* Confirmation Modal */}
			<ConfirmModal
				open={!!modal}
				title={
					modal?.type === 'remove'
						? 'Remove Item?'
						: modal?.type === 'clear'
						? 'Clear Cart?'
						: modal?.type === 'checkout'
						? 'Proceed to checkout?'
						: ''
				}
				message={
					modal?.type === 'remove'
						? `Remove "${modal?.title ?? 'this item'}" from your cart?`
						: modal?.type === 'clear'
						? 'This will remove all items from your cart.'
						: modal?.type === 'checkout'
						? 'You will be taken to the checkout page.'
						: ''
				}
				confirmText={
					modal?.type === 'remove'
						? 'Remove'
						: modal?.type === 'clear'
						? 'Clear cart'
						: modal?.type === 'checkout'
						? 'Continue'
						: 'Confirm'
				}
				cancelText="Cancel"
				onConfirm={handleConfirm}
				onCancel={closeModal}
			/>
		</div>
	);
}
