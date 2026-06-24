'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, SlidersHorizontal, Check } from "lucide-react"

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "")
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get('style') || "")
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.getAll('colors'))
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.getAll('sizes'))
  const [priceRange, setPriceRange] = useState({ 
    min: Number(searchParams.get('minPrice')) || 50, 
    max: Number(searchParams.get('maxPrice')) || 200 
  })

  // Sync state with URL when params change (e.g. back button)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || "")
    setSelectedStyle(searchParams.get('style') || "")
    setSelectedColors(searchParams.getAll('colors'))
    setSelectedSizes(searchParams.getAll('sizes'))
    setPriceRange({
      min: Number(searchParams.get('minPrice')) || 50,
      max: Number(searchParams.get('maxPrice')) || 200
    })
  }, [searchParams])

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

  const updateURL = (newParams: URLSearchParams) => {
    router.push(`/shop?${newParams.toString()}`)
  }

  const handleCategoryClick = (value: string) => {
    const newValue = selectedCategory === value ? "" : value
    setSelectedCategory(newValue)
    const params = new URLSearchParams(searchParams.toString())
    if (newValue) params.set('category', newValue)
    else params.delete('category')
    updateURL(params)
  }

  const handleStyleClick = (value: string) => {
    const newValue = selectedStyle === value ? "" : value
    setSelectedStyle(newValue)
    const params = new URLSearchParams(searchParams.toString())
    if (newValue) params.set('style', newValue)
    else params.delete('style')
    updateURL(params)
  }

  const handlePriceChange = (max: number) => {
    setPriceRange({ ...priceRange, max })
    const params = new URLSearchParams(searchParams.toString())
    if (max < 500) params.set('maxPrice', max.toString())
    else params.delete('maxPrice')
    updateURL(params)
  }

  const toggleSelection = (list: string[], setList: (l: string[]) => void, paramName: string, value: string) => {
    const newList = list.includes(value) 
      ? list.filter(item => item !== value) 
      : [...list, value]
    
    setList(newList)
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    newList.forEach(item => params.append(paramName, item))
    updateURL(params)
  }

  return (
    <aside className="w-full lg:w-64 p-5 rounded-[20px] border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
        <h2 className="text-xl font-bold font-satoshi">Filters</h2>
        <SlidersHorizontal className="w-5 h-5 text-gray-500" />
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
        {categories.map((cat) => (
          <div 
            key={cat.value} 
            onClick={() => handleCategoryClick(cat.value)}
            className={`flex items-center justify-between cursor-pointer group transition-colors ${
              selectedCategory === cat.value ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            <span className="font-satoshi">{cat.label}</span>
            <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Price Placeholder (Simplifying for now to numerical text or single range) */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-satoshi text-lg">Price</h3>
        </div>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="500" 
            value={priceRange.max} 
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm font-medium font-satoshi text-black">
            <span>$0</span>
            <span>Up to ${priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-satoshi text-lg">Colors</h3>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleSelection(selectedColors, setSelectedColors, 'colors', color.value)}
              className={`w-9 h-9 rounded-full border border-gray-200 transition-all flex items-center justify-center relative overflow-hidden`}
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
      <div className="mb-6 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-satoshi text-lg">Size</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => toggleSelection(selectedSizes, setSelectedSizes, 'sizes', size.value)}
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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-satoshi text-lg">Dress Style</h3>
        </div>
        <div className="space-y-4">
          {styles.map((style) => (
            <div 
              key={style.value} 
              onClick={() => handleStyleClick(style.value)}
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
    </aside>
  )
}
