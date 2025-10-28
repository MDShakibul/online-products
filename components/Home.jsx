'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import TopPicks from './TopPicks';

export default function Home({ products = [] }) {
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('all');

	// Build category counts
	const { categoryList, totalCount } = useMemo(() => {
		const counts = new Map();
		for (const p of products) {
			if (!p?.category) continue;
			counts.set(p.category, (counts.get(p.category) || 0) + 1);
		}
		const list = Array.from(counts.entries())
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => a.name.localeCompare(b.name));

		return {
			categoryList: [{ name: 'all', count: products.length }, ...list],
			totalCount: products.length,
		};
	}, [products]);

	// Filtered products
	const filteredProducts = useMemo(() => {
		const query = search.trim().toLowerCase();
		return products.filter((product) => {
			const inCategory = category === 'all' || product.category === category;
			if (!query) return inCategory;
			const inTitle = product.title?.toLowerCase().includes(query);
			const inDesc = product.description?.toLowerCase().includes(query);
			return inCategory && (inTitle || inDesc);
		});
	}, [products, search, category]);

	return (
		<div className="grid gap-6 md:grid-cols-12">
		
			<aside className="md:col-span-3 lg:col-span-3 md:sticky md:top-20 md:max-h-[calc(100vh-5rem)] md:overflow-auto self-start">
			
				<div className="rounded-xl border border-gray bg-card p-4 shadow-sm">
				
					<div className="mb-4">
						<input
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#425A8B] focus:ring-2 focus:ring-[#425A8B]/20"
							placeholder="Search products…"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							aria-label="Search products"
						/>
					</div>

					{/* Category list (single-select like radio) */}
					<h3 className="mb-3 text-lg font-semibold text-primary">
						Categories
					</h3>
					
					<ul
						role="radiogroup"
						aria-label="Filter by category"
						className="divide-y divide-gray rounded-lg border border-gray bg-card"
					>
						{categoryList.map((c) => {
							const selected = category === c.name;
							return (
								<li key={c.name}>
									<button
										role="radio"
										aria-checked={selected}
										onClick={() => setCategory(c.name)}
										className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition ${
											selected ? 'bg-card' : 'bg-card'
										}`}
									>
										<span className="flex items-center gap-3">
											<span
												className={`grid h-4 w-4 place-items-center rounded border ${
													selected
														? 'border-primary bg-checkout-bg'
														: 'border-gray-300 bg-white'
												}`}
												aria-hidden="true"
											>
												<span
													className={`h-2 w-2 rounded-sm bg-white transition  ${
														selected ? 'opacity-100' : 'opacity-0'
													}`}
												/>
											</span>
											<span
												className={`capitalize text-sm ${
													selected
														? 'text-primary font-medium'
														: 'text-primary'
												}`}
											>
												{c.name === 'all' ? 'All' : c.name}
											</span>
										</span>

										<span
											className={`text-xs ${
												selected ? 'text-secondary' : 'text-secondary'
											}`}
										>
											({c.count})
										</span>
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="mt-3 flex items-center justify-between text-xs text-secondary">
					<span>
						Showing <b className="text-secondary">{filteredProducts.length}</b>{' '}
						of <b className="text-secondary">{totalCount}</b>
					</span>
					{category !== 'all' && (
						<button
							className="underline hover:text-secondary cursor-pointer"
							onClick={() => setCategory('all')}
						>
							Clear category
						</button>
					)}
				</div>
			</aside>

			{/* RIGHT CONTENT */}
			<section className="md:col-span-9 lg:col-span-9">
				<div className="mb-2 text-sm text-gray-500 md:hidden">
					{category !== 'all' && (
						<>
							In <b className="capitalize text-gray-700">{category}</b>
						</>
					)}
					{search && (
						<>
							{' '}
							for “<b className="text-gray-700">{search}</b>”
						</>
					)}
				</div>

				{filteredProducts.length === 0 ? (
					<div className="rounded-lg border border-[#425A8B] bg-[#d3e1ff] px-4 py-3 text-sm ">
						No products found. Try clearing filters.
					</div>
				) : (
					<>
						<TopPicks products={products} />
						<h2 className="text-lg font-semibold text-text-dark my-2">All Products</h2>
			<div className="w-full h-px bg-gray-300"></div>

						<ul className="grid items-stretch gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-4">
							{filteredProducts.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</ul>
					</>
				)}
			</section>
		</div>
	);
}
