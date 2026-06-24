import { Star } from 'lucide-react'
import Link from 'next/link'

export interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  discount?: number | null
  rating?: number | null
  image?: { url?: string | null } | null
}

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = (product.discount ?? 0) > 0
  const rating = product.rating ?? 3.5

  return (
    <Link href={`/shop/${product.id}`} className="flex flex-col font-satoshi group/card">
      {/* Image Box */}
      <div className="bg-[#F0F0F0] rounded-2xl p-4 sm:p-6 aspect-square sm:aspect-[4/5] flex items-center justify-center overflow-hidden">
        <img
          src={product.image?.url || '/placeholder.png'}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover/card:scale-110"
        />
      </div>

      {/* Name */}
      <h3 className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="mt-1 flex items-center gap-1.5">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span className="text-[11px] sm:text-xs text-gray-700">{rating}/5</span>
      </div>

      {/* Price + Discount */}
      {product.price != null && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-gray-900">${product.price}</span>

          {hasDiscount && (
            <span className="text-[10px] sm:text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
