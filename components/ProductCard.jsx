import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import { cashFormat } from '@/util/index.js';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	return (
		<Link
			href={`/product/${product?.id}`}
			className="group relative flex flex-col h-full rounded-3xl p-0.5 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
		>
			{/* <div className="relative h-64 rounded-t-2xl bg-linear-to-r from-[#45445B] to-[#A79DDA] overflow-hidden"> */}
			<div className="relative h-64 rounded-t-2xl bg-[#e5e7eb] overflow-hidden">
				<Image
					src={product.image}
					alt={product.title}
					fill
					sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
					className="object-contain p-6 drop-shadow-[0_22px_34px_rgba(0,0,0,0.35)] transition-transform duration-500 will-change-transform group-hover:scale-[1.10] group-hover:rotate-2"
					priority={false}
				/>
			</div>

			<div className="flex flex-col flex-1 -mt-5 rounded-2xl bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.08)] ring-1 ring-black/5 z-2">
				<h4
					className="text-[18px] font-semibold leading-snug text-slate-800 tooltip hover:underline"
					data-tip={product?.title ?? ''}
				>
					{(product?.title?.length ?? 0) > 30
						? product.title.slice(0, 30) + '…'
						: product?.title ?? ''}
				</h4>

				<div className="mt-2 flex flex-wrap gap-2">
					<span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium tracking-wide text-slate-600 capitalize">
						{product.category}
					</span>
					<span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium tracking-wide text-slate-600">
						<div className="flex items-center gap-1">
							<svg
								viewBox="0 0 24 24"
								className="h-4 w-4"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
							<span>{product.rating.rate}</span>
							<span className="text-slate-400">({product.rating.count})</span>
						</div>
					</span>
				</div>

				<p className="mt-3 text-sm leading-6 text-slate-600">
					{(product?.description?.length ?? 0) > 60
						? product.description.slice(0, 60) + '…'
						: product?.description ?? ''}
				</p>

				{/* FOOTER sticks to bottom across cards in same row */}
				<div className="mt-auto pt-5 flex items-end justify-between">
					<div>
						<div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
							Price
						</div>
						<div className="mt-0.5 text-xl font-extrabold tracking-tight text-slate-900">
							{cashFormat(product.price)}
						</div>
					</div>

					<button
						className="inline-flex items-center justify-center btn-primary px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							dispatch(addToCart(product));
						}}
					>
						<FaCartPlus className="mr-2 text-md" /> Add to cart
					</button>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
