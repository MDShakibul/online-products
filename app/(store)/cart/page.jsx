'use client';

import { cashFormat } from '@/util/index.js';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../../store/cartSlice.js';
import { selectCart, selectTotal } from '../../../store/index.js';
import { FaAngleLeft } from "react-icons/fa6";

export default function CartPage() {
  const cart = useSelector(selectCart) || { items: [] };
  const total = useSelector(selectTotal) || 0;
  const dispatch = useDispatch();
  const hasItems = (cart?.items?.length || 0) > 0;

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="container grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <section className="md:col-span-2 rounded-2xl bg-white p-4 sm:p-6 shadow-xl ring-1 ring-gray-100">
          <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Shopping Cart
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {hasItems && (
                <button
                  onClick={() => dispatch(clearCart())}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[.99] cursor-pointer"
                >
                  Clear cart
                </button>
              )}
              <Link
                href="/"
                className="flex items-center rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[.99]"
              >
                <FaAngleLeft /> Continue shopping
              </Link>
            </div>
          </div>


          <div className="hidden grid-cols-6 gap-4 border-b pb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 md:grid">
            <span className="col-span-3">Product</span>
            <span>Price</span>
            <span>Qty</span>
            <span className="text-right">Total</span>
          </div>

          {!hasItems ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 sm:py-16 text-center">
              <div className="rounded-2xl bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">
                Your cart is empty.
              </div>
              <Link
                href="/"
                className="rounded-xl btn-primary  px-4 py-3 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow hover:opacity-90 active:scale-[.99]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <ul className="divide-y">
              {cart.items.map((item) => {
                const lineTotal = (item.price || 0) * (item.quantity || 0);
                return (
                  <li
                    key={item.id}
                    className="grid grid-cols-1 gap-4 py-4 md:grid-cols-6 md:items-center"
                  >
                    {/* Product */}
                    <div className="col-span-3 flex items-center gap-3 sm:gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-xl ring-1 ring-gray-200 bg-[#e5e7eb] shrink-0">
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
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.title}
                        </h3>

                        {item.category && (
                          <p className="mt-0.5 text-xs sm:text-sm capitalize text-gray-500">
                            {item.category}
                          </p>
                        )}

                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs sm:text-sm font-semibold text-red-600 hover:underline"
                          aria-label={`Remove ${item.title}`}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>

                
                    <div className="text-sm sm:text-base text-gray-700">
                      {cashFormat(item.price)}
                    </div>

                  
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border border-gray-300 text-lg leading-none transition hover:bg-gray-50 active:scale-[.98] cursor-pointer"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center font-semibold text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border border-gray-300 text-lg leading-none transition hover:bg-gray-50 active:scale-[.98] cursor-pointer"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    
                    <div className="text-right text-sm sm:text-base font-semibold">
                      {cashFormat(lineTotal)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

       
        <aside className="md:sticky md:top-18 h-fit rounded-2xl bg-white p-4 sm:p-6 shadow-xl ring-1 ring-gray-100">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Order Summary</h2>
          <div className="mt-4 sm:mt-6 space-y-2 text-sm sm:text-base">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{cashFormat(total)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>{cashFormat(total)}</span>
            </div>
            <button
              disabled={!hasItems}
              className="mt-3 w-full rounded-xl btn-primary bg-black px-4 py-3 sm:px-5 sm:py-3 text-center text-sm sm:text-base font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[.99]"
              aria-disabled={!hasItems}
            >
              Checkout {hasItems ? cashFormat(total) : ''}
            </button>
          </div>
          
        </aside>
      </div>
    </div>
  );
}
