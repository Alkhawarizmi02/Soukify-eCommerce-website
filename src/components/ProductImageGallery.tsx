'use client'

import { useState } from 'react'

interface ProductImageGalleryProps {
  mainImageUrl: string
  productName: string
}

export default function ProductImageGallery({ mainImageUrl, productName }: ProductImageGalleryProps) {
  const [selectedImg, setSelectedImg] = useState(mainImageUrl)

  // We show the same image in thumbnails (product only has one image in the schema).
  // Show 3 thumbnails to match the design layout.
  const thumbnails = [mainImageUrl, mainImageUrl, mainImageUrl]

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar">
        {thumbnails.map((url, i) => (
          <button
            key={i}
            onClick={() => setSelectedImg(url)}
            className={`flex-shrink-0 w-20 h-20 md:w-[111px] md:h-[111px] rounded-[12px] bg-[#F0F0F0] overflow-hidden border-2 transition-colors ${
              selectedImg === url && i === thumbnails.indexOf(url)
                ? 'border-black'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img src={url} alt={`${productName} view ${i + 1}`} className="w-full h-full object-contain p-2" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 bg-[#F0F0F0] rounded-[20px] overflow-hidden flex items-center justify-center aspect-square md:aspect-auto min-h-[300px] md:min-h-[500px]">
        <img
          src={selectedImg}
          alt={productName}
          className="w-full h-full object-contain p-6 md:p-10"
        />
      </div>
    </div>
  )
}
