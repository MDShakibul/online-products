'use client';
import { addToCart } from '@/store/cartSlice';
import { cashFormat } from '@/util';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import StarRating from './StarRating';
const ProductDetails = ({ product }) => {
	const dispatch = useDispatch();
	if (!product) return null;

	return (
		<main className="container mx-auto my-8">
			<div className="justify-between breadcrumbs hidden md:flex text-sm text-text-dark">
				<ul>
					<li>
						<Link href={'/'}>Home</Link>
					</li>
					<li className="capitalize">{product.category}</li>
					<li>{product.title}</li>
				</ul>
				<Link
					href="/"
					className="flex items-center rounded-lg border border-gray px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition btn-primary active:scale-[.99]"
				>
					<FaAngleLeft className="text-sm sm:text-base mr-1" />
					<span>Back to Shop</span>
				</Link>
			</div>

			<div className="flex md:hidden">
				<Link
					href="/"
					className="flex items-center rounded-lg border border-gray px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition btn-primary active:scale-[.99]"
				>
					<FaAngleLeft className="text-sm sm:text-base" />
					<span>Back to Shop</span>
				</Link>
			</div>
			<div className="mt-4 md:mt-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Image card */}
					<div className="rounded-2xl border bg-iplaceholder border-gray  p-4 shadow-s">
						{/* swap to next/image if you prefer */}
						<Image
							src={product.image}
							alt={product.title}
							height={1000}
							width={1000}
							className="mx-auto aspect-square w-full max-w-sm object-contain"
						/>
					</div>

					{/* Details */}
					<div className="space-y-4">
						<p className="text-secondary capitalize mb-0 tracking-[0.06em]">
							{product.category}
						</p>
						<h2 className="text-2xl mb-0 font-bold leading-snug tracking-tight md:text-3xl text-primary">
							{product.title}
						</h2>
						<div>
							<StarRating
								rating={product.rating.rate}
								count={product.rating.count}
								text={'reviews'}
							/>
						</div>

						<p className="text-xl font-bold md:text-2xl text-primary">
							{cashFormat(product.price)}
						</p>
						{/* <div
							className="my-6 h-px w-full bg-repeat-x"
							style={{
								backgroundImage:
									'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 14px, transparent 12px, transparent 24px)',
							}}
						/> */}
						<div className="w-full h-px bg-gray-300"></div>

						<div className=" leading-relaxed">
							<p className="mb-1 text-lg text-text-dark font-semibold">
								Description:{' '}
							</p>
							<span className="text-paragraph">{product.description}</span>
						</div>

						<div className="pt-2">
							<button
								className="inline-flex items-center justify-center rounded-lg border border-[#425A8B] px-4 py-2.5 text-[14px] font-bold text-[#425A8B] transition-colors hover:bg-[#425A8B] hover:text-white cursor-pointer btn-primary"
								onClick={() => {
									dispatch(addToCart(product));
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 h-5 w-5"
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
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductDetails;
