'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useCart } from '@/lib/CartContext'
import CheckoutForm from '@/components/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { ChevronRight, Loader2, CheckCircle } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function CheckoutPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/checkout')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!authLoading && user && items.length === 0 && !success) {
      router.push('/cart')
    }
  }, [user, authLoading, items, router, success])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    )
  }

  if (!user) return null

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-integralcf mb-2">Order Placed!</h1>
          <p className="text-gray-500 font-satoshi mb-8">
            Your order has been placed successfully. You can view it in your account.
          </p>
          <Link
            href="/account?tab=orders"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-satoshi font-semibold hover:bg-gray-800 transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-satoshi">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">Checkout</span>
        </nav>

        <h1 className="text-3xl sm:text-[40px] font-extrabold font-integralcf mb-8 sm:mb-12">CHECKOUT</h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={() => setSuccess(true)} />
        </Elements>
      </div>
    </div>
  )
}
