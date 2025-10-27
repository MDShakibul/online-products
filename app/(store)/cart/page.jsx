'use client'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart, selectTotal } from '../../../store/index.js'
import { decreaseQuantity, increaseQuantity, removeFromCart, clearCart } from '../../../store/cartSlice.js'

export default function CartPage(){
  const cart = useSelector(selectCart)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()

  if(cart.items.length === 0){
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/" className="text-blue-600 underline">Go shopping →</Link>
      </div>
    )
  }

  return (
    <div className="container space-y-6">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <ul className="divide-y rounded-md border">
        {cart.items.map((it) => (
          <li key={it.id} className="p-4 flex gap-4 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.image} alt={it.title} className="h-16 w-16 object-contain" />
            <div className="flex-1">
              <p className="font-medium">{it.title}</p>
              <p className="text-sm opacity-80">${it.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 border rounded" onClick={()=>dispatch(decreaseQuantity(it.id))}>-</button>
              <span>{it.quantity}</span>
              <button className="px-2 border rounded" onClick={()=>dispatch(increaseQuantity(it.id))}>+</button>
            </div>
            <button className="ml-4 text-red-600" onClick={()=>dispatch(removeFromCart(it.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <button className="px-4 py-2 rounded-md bg-green-600 text-white" onClick={()=>alert('Checkout simulated: payment successful!')}>Checkout</button>
      </div>
      <button className="text-sm text-gray-500 underline" onClick={()=>dispatch(clearCart())}>Clear cart</button>
    </div>
  )
}
