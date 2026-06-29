'use client'

import { Trash2, Minus, Plus } from "lucide-react"
import { useCart, CartItem as CartItemType } from "@/lib/CartContext"

export default function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQty } = useCart()

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0 first:pt-0">
      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F0EEED] rounded-lg overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base sm:text-xl font-bold font-satoshi mb-1">{item.name}</h3>
            {item.size && (
              <p className="text-sm font-satoshi text-gray-600 mb-1">
                Size: <span className="text-gray-400 capitalize">{item.size.replace(/_/g, '-')}</span>
              </p>
            )}
            {item.color && (
              <p className="text-sm font-satoshi text-gray-600">
                Color: <span className="text-gray-400 capitalize">{item.color}</span>
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.cartKey)}
            className="text-red-500 hover:text-red-600 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <span className="text-xl sm:text-2xl font-bold font-satoshi">${item.price}</span>

          <div className="flex items-center gap-4 bg-[#F0F0F0] px-4 py-2 rounded-full">
            <button
              onClick={() => updateQty(item.cartKey, item.quantity - 1)}
              className="text-black hover:opacity-70 transition-opacity"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold font-satoshi w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.cartKey, item.quantity + 1)}
              className="text-black hover:opacity-70 transition-opacity"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
