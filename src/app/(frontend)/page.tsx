import './globals.css'
import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import NewArrivalsSection from '@/components/NewArrivalsSection'
import TopSellingSection from '@/components/TopSellingSection'
import BrowseByStyleSection from '@/components/BrowseByStyleSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton'
import TestimonialsSkeleton from '@/components/ui/TestimonialsSkeleton'
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<ProductGridSkeleton />}>
        <NewArrivalsSection />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <TopSellingSection />
      </Suspense>
      <BrowseByStyleSection />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
    </>
  )
}
