'use client';

import Link from 'next/link';
import { IoHomeOutline } from "react-icons/io5";

export default function PaymentSuccessPage() {
  return (
    <main className="h-[80vh] bg-background relative overflow-hidden">

      <section className="relative z-10 mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-6 py-10 text-center">
        
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full ring-2 ring-green-500">
          <svg
            className="h-12 w-12 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" className="opacity-0" />
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-500">
          Payment Successful!
        </h1>

        <p className="mt-3 max-w-xl text-sm sm:text-base text-gray-600 color-primary">
          Your order has been confirmed by the vendor. Thank you for giving us the
          opportunity to serve you.
        </p>

    
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md btn-primary px-6 py-3 text-sm sm:text-base font-semibold text-white transition hover:opacity-90 active:scale-[.99]"
        >
          <IoHomeOutline /> Go To Continue Shopping
        </Link>
      </section>
    </main>
  );
}
