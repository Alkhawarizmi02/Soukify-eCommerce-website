'use client'

import { ArrowRight, Tag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/CartContext"

const DELIVERY_FEE = 15

export default function OrderSummary() {
  const router = useRouter()
  const { subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const applyPromo = () => {
    // Simple demo promo
    if (promoCode.trim().toLowerCase() === 'save20') {
      setDiscount(Math.round(subtotal * 0.2))
    }
  }

  const total = subtotal - discount + (subtotal > 0 ? DELIVERY_FEE : 0)

  return (
    <div className="p-6 rounded-[20px] border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold font-satoshi mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-base sm:text-lg">
          <span className="text-gray-500 font-satoshi">Subtotal</span>
          <span className="font-bold font-satoshi">${subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-base sm:text-lg">
            <span className="text-gray-500 font-satoshi">Discount (20%)</span>
            <span className="font-bold font-satoshi text-red-500">-${discount}</span>
          </div>
        )}
        {subtotal > 0 && (
          <div className="flex justify-between text-base sm:text-lg">
            <span className="text-gray-500 font-satoshi">Delivery Fee</span>
            <span className="font-bold font-satoshi">${DELIVERY_FEE}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-5 mb-6 flex justify-between items-center text-xl sm:text-2xl font-bold font-satoshi">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
            className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 text-sm font-satoshi focus:outline-none"
          />
        </div>
        <button
          onClick={applyPromo}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-satoshi font-medium text-sm"
        >
          Apply
        </button>
      </div>

      <button
        onClick={() => router.push('/checkout')}
        className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-satoshi font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={subtotal === 0}
      >
        Go to Checkout
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}
