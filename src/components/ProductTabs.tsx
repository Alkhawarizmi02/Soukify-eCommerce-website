'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MoreHorizontal } from 'lucide-react'

/* ── Review card ── */
interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date?: string | null
}

function ReviewCard({ review }: { review: Review }) {
  const fullStars = Math.floor(review.rating)
  return (
    <div className="border border-gray-100 rounded-[20px] p-6 font-satoshi flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
            />
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-bold text-sm">{review.name}</span>
        <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>

      {review.date && (
        <p className="text-gray-400 text-xs">
          Posted on {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
    </div>
  )
}

/* ── Tabs component ── */
interface ProductTabsProps {
  description?: string | null
  reviews?: Review[]
}

const tabs = ['Product Details', 'Rating & Reviews', 'FAQs'] as const
type Tab = (typeof tabs)[number]

const FAQS = [
  { q: 'What materials are used?', a: 'Our products are crafted from high-quality, breathable fabrics designed for comfort and durability.' },
  { q: 'How do I care for this item?', a: 'Machine wash cold with like colors. Tumble dry low. Do not bleach or iron print.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Simply contact us and we\'ll arrange a free return.' },
]

export default function ProductTabs({ description, reviews = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Rating & Reviews')
  const [showAll, setShowAll] = useState(false)

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6)

  return (
    <div className="mt-12 font-satoshi">
      {/* Tab header */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === 'Product Details' && (
          <div className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            {description || 'No product details available.'}
          </div>
        )}

        {activeTab === 'Rating & Reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">All Reviews <span className="text-gray-400 font-normal text-base">({reviews.length})</span></h3>
              <button className="flex items-center gap-2 text-sm bg-[#F0F0F0] px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                <ThumbsUp className="w-4 h-4" /> Latest
              </button>
            </div>

            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first to review this product!</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {visibleReviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>

                {reviews.length > 6 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="border border-gray-200 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      {showAll ? 'Show Less' : 'Load More Reviews'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'FAQs' && (
          <div className="space-y-4 max-w-2xl">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-[16px] p-5">
                <p className="font-medium text-sm mb-2">{faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
