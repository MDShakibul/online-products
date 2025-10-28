export const cashFormat = (price) => `TK ${Number(price ?? 0).toLocaleString('en-BD')}`;
export function topProductsByScore(products, product_count = 10) {
  const scored = products
    .map(p => ({
      ...p,
      score: (p?.rating?.rate ?? 0) / Math.max(1, p.price),
      pop: p?.rating?.count ?? 0,
    }))
    .sort((a,b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.pop - a.pop
    })
  return scored.slice(0, product_count)
}