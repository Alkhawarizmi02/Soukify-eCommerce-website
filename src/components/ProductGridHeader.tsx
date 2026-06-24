'use client'

import { useState, Suspense } from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import MobileFilterDrawer from "./MobileFilterDrawer"

export default function ProductGridHeader({ category }: { category: string }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-satoshi">{category}</h1>
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center justify-center p-3 bg-[#F0F0F0] rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>

        <div className="hidden lg:flex items-center gap-2 text-gray-500 font-satoshi text-sm">
          <span>Sort by:</span>
          <button className="text-black font-bold flex items-center gap-1">
            Most Popular
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Suspense fallback={null}>
        <MobileFilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </Suspense>
    </>
  )
}
