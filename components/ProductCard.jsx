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
			className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray bg-card shadow-sm transition-shadow hover:shadow-lg"
		>

			<div className="relative h-56 md:h-64 bg-iplaceholder">
				<Image
					src={product.image}
					alt={product.title}
					fill
					sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
					className="object-contain p-6 transition-transform duration-500 will-change-transform group-hover:scale-[1.05]"
					priority={false}
				/>
			</div>


			<div className="grid flex-1 grid-rows-[auto_auto_auto_1fr_auto_auto_auto] gap-2 p-5">

				<p className="text-[12px] capitalize text-secondary">
					{product.category}
				</p>


				<h4 className="text-[14px] font-semibold leading-snug color-primary line-clamp-2">
					{product?.title}
				</h4>


				<div className="h-5 flex items-center">
					<StarRating
						rating={product.rating.rate}
						count={product.rating.count}
						text=""
					/>
				</div>


				<div />


				<div>
					<span className="text-[20px] font-extrabold tracking-tight color-primary">
						{cashFormat(product.price)}
					</span>
				</div>


				<div>
					<button
						className="btn-primary w-full justify-center"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
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
						Add To Cart
					</button>
				</div>


				<p className="text-[12px] leading-4 color-primary line-clamp-2 mt-2">
					{(product?.description?.length ?? 0) > 80
						? product.description.slice(0, 80) + '…'
						: product?.description ?? ''}
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;
