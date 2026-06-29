import React, { Suspense } from 'react'
import client from '@/lib/graphql-client'
import { GET_PRODUCTS } from '@/lib/queries'
import FilterSidebar from '@/components/FilterSidebar'
import ProductGrid from '@/components/ProductGrid'
import ProductGridHeader from '@/components/ProductGridHeader'
import Pagination from '@/components/Pagination'
import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ProductsResponse {
  Products: {
    docs: any[]
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  console.log('ShopPage Render with params:', params)
  let products = []

  // Build the 'where' clause for filtering
  const where: any = {}

  if (params.category) {
    where.category = { equals: params.category }
  }

  if (params.style) {
    where.style = { equals: params.style }
  }

  if (params.minPrice || params.maxPrice) {
    where.price = {}
    if (params.minPrice) where.price.greater_than_equal = Number(params.minPrice)
    if (params.maxPrice) where.price.less_than_equal = Number(params.maxPrice)
  }

  if (params.colors) {
    const colors = Array.isArray(params.colors) ? params.colors : [params.colors]
    where.colors = { in: colors }
  }

  if (params.sizes) {
    const sizes = Array.isArray(params.sizes) ? params.sizes : [params.sizes]
    where.sizes = { in: sizes }
  }

  if (params.q) {
    where.name = { contains: params.q }
  }

  console.log('Built Where Clause:', JSON.stringify(where, null, 2))

  try {
    const res = await client.request<ProductsResponse>(GET_PRODUCTS, {
      limit: 100,
      where,
    })
    products = res.Products.docs
    console.log(`Fetched ${products?.length || 0} products`)
  } catch (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-satoshi">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">Shop</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <Suspense fallback={<div>Loading Filters...</div>}>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ProductGridHeader category="Shop" />
            <Suspense fallback={<ProductGridSkeleton count={9} />}>
              <ProductGrid products={products} />
            </Suspense>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}
