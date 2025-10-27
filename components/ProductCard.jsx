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
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Image (fixed height) */}
      <div className="relative h-56 md:h-64 bg-[#ededed]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-contain p-6 transition-transform duration-500 will-change-transform group-hover:scale-[1.05]"
          priority={false}
        />
      </div>

      {/* Body (single container; grid keeps price+button aligned; description LAST) */}
      <div className="grid flex-1 grid-rows-[auto_auto_auto_1fr_auto_auto_auto] gap-2 p-5">
        {/* Category */}
        <p className="text-[12px] capitalize text-[#8C9EC5]">
          {product.category}
        </p>

        {/* Title */}
        <h4 className="text-[14px] font-semibold leading-snug color-primary line-clamp-2">
          {product?.title}
        </h4>

        {/* Rating */}
        <div className="h-5 flex items-center">
          <StarRating
            rating={product.rating.rate}
            count={product.rating.count}
            text=""
          />
        </div>

        {/* Spacer (1fr) → pushes price + button to consistent baseline */}
        <div />

        {/* PRICE (its own row) */}
        <div>
          <span className="text-[20px] font-extrabold tracking-tight text-[#425A8B]">
            {cashFormat(product.price)}
          </span>
        </div>

        {/* BUTTON (next row) */}
        <div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#425A8B] px-4 py-2.5 text-[14px] font-bold text-[#425A8B] transition-colors hover:bg-[#425A8B] hover:text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
          >
            {/* cart icon */}
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

        {/* DESCRIPTION (bottom, clamped so cards stay uniform) */}
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
