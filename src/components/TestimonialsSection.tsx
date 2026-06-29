'use client'

import React, { useRef, useState, useEffect } from 'react'
import client from '@/lib/graphql-client'
import { GET_TESTIMONIALS } from '@/lib/queries'
import { Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
import TestimonialsSkeleton from '@/components/ui/TestimonialsSkeleton'

interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  date?: string
}

interface TestimonialsResponse {
  Testimonials: { docs: Testimonial[] }
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await client.request<TestimonialsResponse>(GET_TESTIMONIALS, {
          limit: 10,
        })
        setTestimonials(res.Testimonials.docs)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }
    fetchTestimonials()
  }, [])

  // Duplicate items for infinite loop effect
  const loopedItems = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    // Start at the middle set
    if (scrollRef.current && testimonials.length > 0) {
      const cardWidth = scrollRef.current.scrollWidth / 3
      scrollRef.current.scrollLeft = cardWidth
    }
  }, [testimonials])

  const handleScroll = () => {
    if (!scrollRef.current || testimonials.length === 0) return
    const { scrollLeft, scrollWidth } = scrollRef.current
    const oneThird = scrollWidth / 3

    if (scrollLeft < oneThird / 2) {
      scrollRef.current.scrollLeft = scrollLeft + oneThird
    } else if (scrollLeft > oneThird * 1.5) {
      scrollRef.current.scrollLeft = scrollLeft - oneThird
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (testimonials.length === 0) return <TestimonialsSkeleton />

  return (
    <section className="w-full py-10 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-integralcf text-black">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth"
        >
          {loopedItems.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="min-w-[280px] w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white snap-start"
            >
              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium font-satoshi text-black">
                  {t.rating.toFixed(1)}
                </span>
              </div>

              {/* User info */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg sm:text-xl font-bold font-satoshi text-black">
                  {t.name}
                </span>
                <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500 text-white" />
              </div>

              {/* Comment */}
              <p className="text-sm sm:text-base text-gray-600 font-satoshi leading-relaxed">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
