import Link from "next/link"
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard, { Product } from "./ProductCard"

export default async function NewArrivalsSection() {
  let products: Product[] = []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'products',
      where: { isNewArrival: { equals: true } },
      limit: 4,
      sort: '-createdAt',
    })
    products = res.docs as Product[]
  } catch (err) {
    console.error("Failed to fetch new arrivals:", err)
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Title */}
        <h2 id="new-arrivals" className="text-center text-2xl sm:text-3xl font-extrabold font-integralcf">
          NEW ARRIVALS
        </h2>

        {/* Responsive Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link
            href="/shop"
            className="rounded-full border border-gray-300 px-6 sm:px-8 py-2.5 text-sm font-medium hover:bg-gray-50 font-satoshi"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}
