'use client';

import { useMemo, useState } from 'react';

export default function Home({ products = [] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // Build categories from data
  const categories = useMemo(() => {
    const set = new Set(products.map(product => product?.category).filter(Boolean));
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);



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
          className="select select-bordered w-full sm:w-56"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </section>

    


    </div>
  );
}
