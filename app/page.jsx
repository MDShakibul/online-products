import Home from '@/components/Home';

export default async function Page() {
  let products = [];
  try {
    const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    products = await res.json();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Home products={products} />
    </div>
  );
}
