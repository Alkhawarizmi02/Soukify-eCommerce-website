import './globals.css'
import HeroSection from '@/components/HeroSection'
import NewArrivalsSection from '@/components/NewArrivalsSection'
import TopSellingSection from '@/components/TopSellingSection'
import BrowseByStyleSection from '@/components/BrowseByStyleSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <BrowseByStyleSection />
      <TestimonialsSection />
    </>
  )
}
