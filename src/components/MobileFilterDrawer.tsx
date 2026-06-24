'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, ChevronRight, Check } from "lucide-react"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { label: "T-Shirts", value: "tshirts" },
  { label: "Shorts", value: "shorts" },
  { label: "Shirts", value: "shirts" },
  { label: "Jeans", value: "jeans" },
  { label: "Dresses", value: "dresses" },
  { label: "Accessories", value: "accessories" },
]

const colors = [
  { hex: "#00C12B", value: "green" },
  { hex: "#F50606", value: "red" },
  { hex: "#F5DD06", value: "yellow" },
  { hex: "#F57906", value: "orange" },
  { hex: "#06CAF5", value: "cyan" },
  { hex: "#063AF5", value: "blue" },
  { hex: "#7D06F5", value: "purple" },
  { hex: "#F506A4", value: "pink" },
  { hex: "#FFFFFF", value: "white" },
  { hex: "#000000", value: "black" },
]

const sizes = [
  { label: "XX-Small", value: "xx_small" },
  { label: "X-Small", value: "x_small" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "X-Large", value: "x_large" },
  { label: "XX-Large", value: "xx_large" },
  { label: "3X-Large", value: "three_x_large" },
  { label: "4X-Large", value: "four_x_large" },
]

const styles = [
  { label: "Casual", value: "casual" },
  { label: "Formal", value: "formal" },
  { label: "Party", value: "party" },
  { label: "Gym", value: "gym" },
]

export default function MobileFilterDrawer({ isOpen, onClose }: MobileFilterDrawerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local draft state — only committed on "Apply Filter"
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "")
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get('style') || "")
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.getAll('colors'))
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.getAll('sizes'))
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 200)

  // Sync draft when drawer opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(searchParams.get('category') || "")
      setSelectedStyle(searchParams.get('style') || "")
      setSelectedColors(searchParams.getAll('colors'))
      setSelectedSizes(searchParams.getAll('sizes'))
      setMaxPrice(Number(searchParams.get('maxPrice')) || 200)
    }
  }, [isOpen, searchParams])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleColor = (value: string) => {
    setSelectedColors(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    )
  }

  const toggleSize = (value: string) => {
    setSelectedSizes(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    )
  }

  const handleApply = () => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedStyle) params.set('style', selectedStyle)
    if (maxPrice < 500) params.set('maxPrice', maxPrice.toString())
    selectedColors.forEach(c => params.append('colors', c))
    selectedSizes.forEach(s => params.append('sizes', s))
    router.push(`/shop?${params.toString()}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl lg:hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold font-satoshi">Filters</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5">
          {/* Categories */}
          <div className="space-y-4 py-6 border-b border-gray-100">
            {categories.map((cat) => (
              <div
                key={cat.value}
                onClick={() => setSelectedCategory(prev => prev === cat.value ? "" : cat.value)}
                className={`flex items-center justify-between cursor-pointer group transition-colors ${
                  selectedCategory === cat.value ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
                }`}
              >
                <span className="font-satoshi">{cat.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold font-satoshi text-lg mb-4">Price</h3>
            <input
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-sm font-medium font-satoshi text-black mt-2">
              <span>$0</span>
              <span>Up to ${maxPrice}</span>
            </div>
          </div>

          {/* Colors */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold font-satoshi text-lg mb-4">Colors</h3>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => toggleColor(color.value)}
                  className="w-9 h-9 rounded-full border border-gray-200 transition-all flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                  title={color.value}
                >
                  {selectedColors.includes(color.value) && (
                    <Check className={`w-4 h-4 ${color.value === 'white' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold font-satoshi text-lg mb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => toggleSize(size.value)}
                  className={`px-4 py-2 rounded-full text-sm font-satoshi transition-all ${
                    selectedSizes.includes(size.value) ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="py-6">
            <h3 className="font-bold font-satoshi text-lg mb-4">Dress Style</h3>
            <div className="space-y-4">
              {styles.map((style) => (
                <div
                  key={style.value}
                  onClick={() => setSelectedStyle(prev => prev === style.value ? "" : style.value)}
                  className={`flex items-center justify-between cursor-pointer group transition-colors ${
                    selectedStyle === style.value ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className="font-satoshi">{style.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleApply}
            className="w-full bg-black text-white font-satoshi font-medium py-4 rounded-full text-base hover:bg-gray-900 transition-colors"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </>
  )
}
