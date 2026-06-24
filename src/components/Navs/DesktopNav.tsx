'use client'


import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'


function DesktopNav() {
    const [isShopOpen, setIsShopOpen] = useState(false)

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
                  <div className="absolute left-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link href="/shop?category=tshirts" className="block px-4 py-2 hover:bg-gray-100">
                      T-Shirts
                    </Link>
                    <Link href="/shop?category=shorts" className="block px-4 py-2 hover:bg-gray-100">
                      Shorts
                    </Link>
                    <Link href="/shop?category=shirts" className="block px-4 py-2 hover:bg-gray-100">
                      Shirts
                    </Link>
                    <Link href="/shop?category=jeans" className="block px-4 py-2 hover:bg-gray-100">
                      Jeans
                    </Link>
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