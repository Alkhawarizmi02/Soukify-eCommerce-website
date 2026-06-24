'use client'

import { useCart } from '@/lib/CartContext'
import CartItem from '@/components/CartItem'
import OrderSummary from '@/components/OrderSummary'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items } = useCart()

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-satoshi">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">Cart</span>
        </nav>

        <h1 className="text-3xl sm:text-[40px] font-extrabold font-integralcf mb-8 sm:mb-12">YOUR CART</h1>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-200" />
            <p className="text-xl font-semibold font-satoshi text-gray-400">Your cart is empty</p>
            <Link
              href="/shop"
              className="bg-black text-white px-8 py-3 rounded-full font-satoshi font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cart Items List */}
            <div className="w-full lg:flex-1 p-6 rounded-[20px] border border-gray-200">
              {items.map((item) => (
                <CartItem key={item.cartKey} item={item} />
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}