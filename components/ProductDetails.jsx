'use client';
import { addToCart } from '@/store/cartSlice';
import { cashFormat } from '@/util';
import Link from 'next/link';
import { FaAngleLeft, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
const ProductDetails = ({ product }) => {
	const dispatch = useDispatch();
	if (!product) return null;

	return (
		<main className="container mx-auto my-8">
			<div className="justify-between breadcrumbs hidden md:flex text-sm">
				<ul>
					<li>
						<Link href={'/'}>Home</Link>
					</li>
					<li className="capitalize">{product.category}</li>
					<li>{product.title}</li>
				</ul>
				<Link
					href="/"
					className="flex items-center rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[.99]"
				>
					<FaAngleLeft className="text-sm sm:text-base mr-1" />
					<span>Back to Shop</span>
				</Link>
			</div>

			<div className="flex md:hidden">
				<Link
					href="/"
					className="flex items-center rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[.99]"
				>
					<FaAngleLeft className="text-sm sm:text-base" />
					<span>Back to Shop</span>
				</Link>
			</div>
			<div className="mt-4 md:mt-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Image card */}
					<div className="rounded-2xl border bg-[#F2F2F2] border-gray-200  p-4 shadow-s">
						{/* swap to next/image if you prefer */}
						<img
							src={product.image}
							alt={product.title}
							className="mx-auto aspect-square w-full max-w-sm object-contain"
						/>
					</div>

					{/* Details */}
					<div className="space-y-4">
						<p className="text-[#8F8F8F] capitalize mb-0 tracking-[0.06em]">
							{product.category}
						</p>
						<h2 className="text-2xl font-bold leading-snug tracking-tight md:text-3xl">
							{product.title}
						</h2>

						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-xl font-bold md:text-2xl">
								{cashFormat(product.price)}
							</p>

							<div className="flex items-center gap-2">
								<p className="text-[#8F8F8F] capitalize mb-0 tracking-[0.06em]">
									{product.rating.count} Count
								</p>
								<div className="flex items-center gap-2 text-xl font-bold md:text-2xl">
									<FaStar className="text-[#FFA439]" />
									<span>{product.rating.rate}</span>
								</div>
							</div>
						</div>

						<div
							className="my-6 h-px w-full bg-repeat-x"
							style={{
								backgroundImage:
									'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 14px, transparent 12px, transparent 24px)',
							}}
						/>

						<div className=" leading-relaxed">
							<p className="mb-1 text-lg text-[#292929] font-semibold">
								Description:{' '}
							</p>
							<span className="text-[#666666]">{product.description}</span>
						</div>

						<div className="pt-2">
							<button
								className="inline-flex items-center rounded-xl btn-primary  px-5 py-2.5 text-white shadow"
								onClick={() => {
									dispatch(addToCart(product));
								}}
							>
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
