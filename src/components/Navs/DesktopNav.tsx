'use client'


import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'


const categories = [
  { key: 'tshirts', label: 'T-Shirts', href: '/shop?category=tshirts', image: '/assets/tshirt.png' },
  { key: 'shorts', label: 'Shorts', href: '/shop?category=shorts', image: '/assets/shorts.png' },
  { key: 'shirts', label: 'Shirts', href: '/shop?category=shirts', image: '/assets/shirts.png' },
  { key: 'jeans', label: 'Jeans', href: '/shop?category=jeans', image: '/assets/jeans.png' },
]


function DesktopNav() {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(categories[0].key)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsShopOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentImage = categories.find((c) => c.key === hoveredCategory)?.image

  return (
    <ul className="hidden md:flex gap-6 relative font-satoshi">
      {/* Shop Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsShopOpen(!isShopOpen)}
          className="flex items-center gap-1 hover:text-gray-600"
        >
          <span>Shop</span>
          <ChevronDownIcon className={`w-4 h-4 stroke-2 translate-y-0.5 transition-transform duration-300 ${isShopOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
        {isShopOpen && (
          <div ref={dropdownRef} className="absolute left-0 top-10 mt-2 bg-white shadow-lg rounded-lg z-50 flex overflow-hidden">
            <div className="w-40 py-2 border-r border-gray-100">
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  href={cat.href}
                  onMouseEnter={() => setHoveredCategory(cat.key)}
                  onClick={() => setIsShopOpen(false)}
                  className={`block px-4 py-2.5 transition-colors duration-200 ${
                    hoveredCategory === cat.key
                      ? 'bg-gray-100 font-semibold text-black'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div className="w-56 h-48 p-3">
              <img
                src={currentImage}
                alt={hoveredCategory}
                loading="lazy"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Other Links */}
      <Link href="/shop" className="hover:text-gray-600">
        On Sale
      </Link>
      <Link href="/#new-arrivals" className="hover:text-gray-600">
        New Arrivals
      </Link>
      <Link href="/shop" className="hover:text-gray-600">
        Brands
      </Link>
    </ul>
  )
}

export default DesktopNav