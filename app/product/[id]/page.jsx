
import ProductDetails from '@/components/ProductDetails';

export const revalidate = 60;

async function isProductExist(res) {
  if (!res || !res.ok) return null;
  const text = await res.text(); 
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=10');
    const items = await isProductExist(res);
    if (!Array.isArray(items)) return [];
    return items.map(p => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

async function getProduct(id) {
  if (!id) return null;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await isProductExist(res);
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="alert" style={{ maxWidth: 900, margin: '40px auto' }}>
        <span>No product found. Try a different item.</span>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
