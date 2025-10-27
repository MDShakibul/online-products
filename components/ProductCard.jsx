import { cashFormat } from '@/util/index.js';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import StarRating from './StarRating.jsx';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();

	return (
		<Link
			href={`/product/${product?.id}`}
			className="group relative flex h-full flex-col rounded-lg p-0.5 transition-shadow duration-300  cursor-pointer"
		>
			<div className="relative h-64 overflow-hidden rounded-t-lg bg-[#f7f7f7]">
				<Image
					src={product.image}
					alt={product.title}
					fill
					sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
					className="object-contain p-6  transition-transform duration-500 will-change-transform group-hover:rotate-2 group-hover:scale-[1.10]"
					priority={false}
				/>
			</div>

			<div className="z-2 -mt-5 grid flex-1 grid-rows-[auto_auto_auto_1fr_auto_auto] gap-2 rounded-b-lg bg-white p-5 ring-1 ring-black/5">
				<p className="text-[12px] capitalize text-[#8C9EC5]">
					{product.category}
				</p>

				<h4 className="text-[14px] font-semibold leading-snug color-primary hover:underline line-clamp-2">
					{product?.title}
				</h4>

				<div className="h-5 flex items-center">
					<StarRating
						rating={product.rating.rate}
						count={product.rating.count}
					/>
				</div>

				{/* Description grows; pushes price+button rows down */}
				{/* <p className="mt-1 text-sm leading-5 color-primary">
					{(product?.description?.length ?? 0) > 60
						? product.description.slice(0, 60) + '…'
						: product?.description ?? ''}
				</p> */}

				{/* PRICE ROW (alone) */}
				<div className="mt-2">
					<div className="flex items-baseline gap-2">
						<span className="text-[20px] font-extrabold tracking-tight text-[#425A8B]">
							{cashFormat(product.price)}
						</span>
					</div>
				</div>

				<div className="mt-1">
					<button
						className="inline-flex w-full text-[14px] font-bold items-center justify-center
                       rounded-lg px-4 py-2.5
                       border border-[#425A8B] text-[#425A8B] bg-transparent
                       hover:bg-[#425A8B] hover:text-white
                       transition-colors duration-200 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							dispatch(addToCart(product));
						}}
					>
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
						&nbsp; Add To Cart
					</button>
				</div>
				<p className="mt-1 text-sm leading-5 color-primary">
					{(product?.description?.length ?? 0) > 50
						? product.description.slice(0, 50) + '…'
						: product?.description ?? ''}
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;
