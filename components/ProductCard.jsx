import { cashFormat } from '@/util/index.js';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import StarRating from './StarRating.jsx';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	return (
		<Link
			href={`/product/${product?.id}`}
			className="group relative flex flex-col h-full rounded-lg p-0.5 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
		>
			<div className="relative h-64 rounded-t-lg bg-[#f7f7f7] overflow-hidden">
				<Image
					src={product.image}
					alt={product.title}
					fill
					sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
					className="object-contain p-6 drop-shadow-[0_22px_34px_rgba(0,0,0,0.35)] transition-transform duration-500 will-change-transform group-hover:scale-[1.10] group-hover:rotate-2"
					priority={false}
				/>
			</div>

			<div className="flex flex-col flex-1 -mt-5 rounded-b-lg bg-white p-5  ring-1 ring-black/5 z-2">
				<p className="text-[12px] text-[#8C9EC5] capitalize">
					{product.category}
				</p>
				<h4 className="text-[14px] font-semibold leading-snug color-primary hover:underline">
					{product?.title}
				</h4>

				<StarRating
					rating={product.rating.rate}
					count={product.rating.count}
					className="mt-1"
				/>
				<p className="mt-3 text-sm color-primary leading-5">
					{(product?.description?.length ?? 0) > 60
						? product.description.slice(0, 60) + '…'
						: product?.description ?? ''}
				</p>

				<div className="my-4 text-xl font-bold tracking-tight color-primary">
					{cashFormat(product.price)}
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
		</Link>
	);
};

export default ProductCard;
