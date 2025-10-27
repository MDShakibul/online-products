export const cashFormat = (price) => `TK ${Number(price ?? 0).toLocaleString('en-BD')}`;
export function topProductsByScore(products, k = 10) {
  const scored = products
    .map(p => ({
      ...p,
      _score: (p?.rating?.rate ?? 0) / Math.max(1, p.price),
      _pop: p?.rating?.count ?? 0,
    }))
    .sort((a,b) => {
      if (b._score !== a._score) return b._score - a._score
      return b._pop - a._pop
    })
  return scored.slice(0, k)
}