'use client';

import { cashFormat, topProductsByScore } from '@/util';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from './StarRating.jsx';

export default function TopPicks({ products = [] }) {
	if (!products?.length) return null;
	const picks = topProductsByScore(products, 10);

	return (
		<section className="mb-6 space-y-3">
			<h2 className="text-lg font-semibold text-text-dark mb-2">Top 10 Products</h2>
			<div className="w-full h-px bg-gray "></div>

			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 mt-4">
				{picks.map((pick) => (
					<Link
						key={pick.id}
						href={`/product/${pick.id}`}
						className="group relative flex h-[110px] overflow-hidden rounded-xl border border-gray bg-card shadow-sm hover:shadow-md"
					>
						<div className="relative w-18 shrink-0 bg-iplaceholder">
							<Image
								src={pick.image}
								alt={pick.title}
								fill
								sizes="96px"
								className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
							/>
						</div>

						<div className="flex min-w-0 flex-1 flex-col p-3">
							<p className="text-[6px] text-secondary capitalize">
								{pick.category || '—'}
							</p>

							<h3 className="mt-0.5 text-[10px] font-semibold leading-snug text-text-dark line-clamp-2">
								{pick.title}
							</h3>

							<div className="mt-1 flex items-center gap-1.5">
								<StarRating
									rating={pick?.rating?.rate || 0}
									size={8}
									count={pick?.rating?.count}
									className="hidden"
								/>
							</div>

							<div className="flex-1" />

							<div className="pt-1 text-[10px] text-sm font-extrabold tracking-tight text-primary">
								{cashFormat(pick.price)}
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
