'use client';

import { selectCount, selectTotal } from '@/store';
import { cashFormat } from '@/util';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Navbar() {
	const count = useSelector(selectCount);
	const Total = useSelector(selectTotal);
	return (
		<header className="bg-[#425A8B] text-white sticky top-0 z-50">
			<div className="container h-16 flex items-center justify-between px-4">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="font-semibold tracking-tight text-xl md:text-2xl"
					>
						Online Shop
					</Link>
				</div>

				{/* Right Section */}
				<div className="flex items-center gap-1">
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle"
							>
								<div className="indicator">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<span className="badge badge-xs indicator-item">{count}</span>
								</div>

								
							</div>

							<div
								tabIndex={0}
								className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
							>
								<div className="card-body">
									<span className="text-lg font-bold text-black">{count} Items</span>
									<span className="text-[#5E568B]">Subtotal: {cashFormat(Total)}</span>
									<div className="card-actions">
										<Link href={"/cart"} className="btn btn-primary border-none">
											View cart
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
