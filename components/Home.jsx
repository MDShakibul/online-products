'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

export default function Home({ products = [] }) {
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('all');

	// categories from data
	const categories = useMemo(() => {
		const set = new Set(
			products.map((product) => product?.category).filter(Boolean)
		);
		return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
	}, [products]);

	// search and filter
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
		<div className="space-y-8">
			{/* Filters */}
			<section className="flex flex-col sm:flex-row sm:items-center gap-3">
				<input
					className="input input-bordered w-full sm:w-80"
					placeholder="Search products…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					aria-label="Search products"
				/>
				<select
					className="select select-bordered w-full sm:w-56 capitalize"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					aria-label="Filter by category"
				>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category === 'all' ? 'All Categories' : category}
						</option>
					))}
				</select>
			</section>

			
			<div className="text-sm opacity-70">
				Showing <b>{filteredProducts.length}</b> of <b>{products.length}</b>
				{category !== 'all' && (
					<>
						{' '}
						in <b className='capitalize'>{category}</b>
					</>
				)}
				{search && (
					<>
						{' '}
						for “<b>{search}</b>”
					</>
				)}
			</div>

			{/* All Products*/}
			{filteredProducts.length === 0 ? (
				<div className="alert">
					<span>No products found. Try clearing filters.</span>
				</div>
			) : (
				<ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ul>
			)}
		</div>
	);
}
