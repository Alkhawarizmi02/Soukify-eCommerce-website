'use client'

import { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

const COLOR_HEX: Record<string, string> = {
  green: '#00C12B',
  red: '#F50606',
  yellow: '#F5DD06',
  orange: '#F57906',
  cyan: '#06CAF5',
  blue: '#063AF5',
  purple: '#7D06F5',
  pink: '#F506A4',
  white: '#FFFFFF',
  black: '#000000',
}

const SIZE_LABELS: Record<string, string> = {
  xx_small: 'XX-Small',
  x_small: 'X-Small',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  x_large: 'X-Large',
  xx_large: 'XX-Large',
  three_x_large: '3X-Large',
  four_x_large: '4X-Large',
}

interface ProductInfoProps {
  id: string
  name: string
  rating: number
  price: number
  discount?: number | null
  description?: string | null
  colors?: string[] | null
  sizes?: string[] | null
  imageUrl?: string
}

export default function ProductInfo({
  id,
  name,
  rating,
  price,
  discount,
  description,
  colors,
  sizes,
  imageUrl = '/placeholder.png',
}: ProductInfoProps) {
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState<string | null>(colors?.[0] ?? null)
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes?.[0] ?? null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const discountedPrice = discount ? Math.round(price * (1 - discount / 100)) : price
  const originalPrice = discount ? price : null

  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: discountedPrice,
      image: imageUrl,
      color: selectedColor ?? '',
      size: selectedSize ?? '',
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5 font-satoshi">
      {/* Name */}
      <h1 className="text-2xl sm:text-3xl font-bold font-integralcf leading-tight uppercase">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < fullStars
                  ? 'text-yellow-400 fill-yellow-400'
                  : i === fullStars && hasHalf
                  ? 'text-yellow-400 fill-yellow-200'
                  : 'text-gray-200 fill-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{rating}/5</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${discountedPrice}</span>
        {originalPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">${originalPrice}</span>
            <span className="bg-red-100 text-red-500 text-xs font-medium px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed border-b border-gray-100 pb-5">
          {description}
        </p>
      )}

      {/* Colors */}
      {colors && colors.length > 0 && (
        <div className="border-b border-gray-100 pb-5">
          <p className="text-sm font-medium text-gray-500 mb-3">Select Colors</p>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                  selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: COLOR_HEX[color] ?? color }}
                title={color}
              >
                {selectedColor === color && (
                  <span className={`text-xs font-bold ${color === 'white' ? 'text-black' : 'text-white'}`}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div className="border-b border-gray-100 pb-5">
          <p className="text-sm font-medium text-gray-500 mb-3">Choose Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  selectedSize === size
                    ? 'bg-black text-white font-medium'
                    : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {SIZE_LABELS[size] ?? size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + Add to Cart */}
      <div className="flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center gap-4 bg-[#F0F0F0] rounded-full px-5 py-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-medium w-4 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-all ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
