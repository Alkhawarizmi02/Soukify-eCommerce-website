import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import client from '@/lib/graphql-client'
import { GET_PRODUCT_BY_ID, GET_PRODUCTS } from '@/lib/queries'
import ProductImageGallery from '@/components/ProductImageGallery'
import ProductInfo from '@/components/ProductInfo'
import ProductTabs from '@/components/ProductTabs'
import ProductCard from '@/components/ProductCard'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

interface ProductResponse {
  Product: {
    id: string
    name: string
    description?: string | null
    rating?: number | null
    price: number
    discount?: number | null
    category: string
    colors?: string[] | null
    sizes?: string[] | null
    style?: string | null
    image?: { url?: string | null } | null
  } | null
}

interface ProductsResponse {
  Products: { docs: any[] }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let product: ProductResponse['Product'] = null
  let similarProducts: any[] = []

  try {
    const res = await client.request<ProductResponse>(GET_PRODUCT_BY_ID, { id })
    product = res.Product
  } catch (error) {
    console.error('Error fetching product:', error)
  }

  if (!product) {
    notFound()
  }

  // Fetch similar products from same category (exclude current)
  try {
    const res = await client.request<ProductsResponse>(GET_PRODUCTS, {
      limit: 5,
      where: { category: { equals: product.category } },
    })
    similarProducts = res.Products.docs.filter((p) => p.id !== id).slice(0, 4)
  } catch (error) {
    console.error('Error fetching similar products:', error)
  }

  const imageUrl = product.image?.url || '/placeholder.png'
  const rating = product.rating ?? 4.0

  // Static placeholder reviews matching the design
  const placeholderReviews = [
    { id: '1', name: 'Samantha D.', rating: 4.5, comment: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt!', date: '2023-08-14' },
    { id: '2', name: 'Alex M.', rating: 4, comment: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I pay close attention to aesthetics, and this t-shirt definitely gets a thumbs up from me!', date: '2023-08-15' },
    { id: '3', name: 'Ethan R.', rating: 3.5, comment: 'This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can say the designer\'s touch in every aspect of this shirt.', date: '2023-08-16' },
    { id: '4', name: 'Olivia P.', rating: 4, comment: 'As a UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured a lot of thought into making this shirt stand out!', date: '2023-08-17' },
    { id: '5', name: 'Liam K.', rating: 4, comment: 'This t-shirt is a fusion of comfort and creativity. The design speaks to a culture of innovation and design. It\'s like wearing a piece of art that reflects your passion for both fashion and design.', date: '2023-08-18' },
    { id: '6', name: 'Ava H.', rating: 3.5, comment: 'I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.', date: '2023-08-19' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-satoshi flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium capitalize">{product.name}</span>
        </nav>

        {/* Product hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <React.Suspense fallback={<div className="aspect-square bg-gray-100 rounded-[20px] animate-pulse" />}>
            <ProductImageGallery mainImageUrl={imageUrl} productName={product.name} />
          </React.Suspense>

          {/* Info */}
          <React.Suspense fallback={<div className="h-96 animate-pulse" />}>
            <ProductInfo
              name={product.name}
              rating={rating}
              price={product.price}
              discount={product.discount}
              description={product.description}
              colors={product.colors}
              sizes={product.sizes}
            />
          </React.Suspense>
        </div>

        {/* Tabs: Details / Reviews / FAQs */}
        <React.Suspense fallback={null}>
          <ProductTabs
            description={product.description}
            reviews={placeholderReviews}
          />
        </React.Suspense>

        {/* You Might Also Like */}
        {similarProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-integralcf text-center mb-10 uppercase">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Newsletter + Footer */}
      <NewsletterSection />
      <Footer />
    </div>
  )
}
