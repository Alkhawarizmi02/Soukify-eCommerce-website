'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useCart } from '@/lib/CartContext'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Loader2 } from 'lucide-react'

const DELIVERY_FEE = 15

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Satoshi, sans-serif',
      color: '#1a1a1a',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444' },
  },
}

interface CheckoutFormProps {
  onSuccess: () => void
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [paymentError, setPaymentError] = useState('')

  const [shipping, setShipping] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  })

  const total = subtotal - 0 + (subtotal > 0 ? DELIVERY_FEE : 0)

  const handleShippingChange = (field: string, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPaymentError('')

    if (!stripe || !elements) return

    if (!shipping.fullName || !shipping.addressLine1 || !shipping.city || !shipping.state || !shipping.postalCode || !shipping.country) {
      setError('Please fill in all required shipping fields')
      return
    }

    setIsSubmitting(true)

    try {
      const piRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })

      if (!piRes.ok) {
        const piErr = await piRes.json()
        throw new Error(piErr.error || 'Failed to create payment')
      }

      const { clientSecret } = await piRes.json()

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shipping.fullName,
            email: user?.email,
          },
        },
      })

      if (stripeError) {
        setPaymentError(stripeError.message || 'Payment failed')
        setIsSubmitting(false)
        return
      }

      if (paymentIntent?.status !== 'succeeded') {
        setPaymentError('Payment was not successful')
        setIsSubmitting(false)
        return
      }

      const orderData = {
        user: user?.id,
        total,
        paymentIntent: paymentIntent.id,
        shippingAddress: shipping,
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          price: item.price,
        })),
      }

      const orderRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData),
      })

      if (!orderRes.ok) {
        const orderErr = await orderRes.json()
        throw new Error(orderErr.error || 'Failed to create order')
      }

      clearCart()
      onSuccess()
      router.push('/account?tab=orders')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Left Column — Shipping + Payment */}
      <div className="lg:col-span-3 space-y-8">
        {/* Shipping Address */}
        <div className="p-6 rounded-[20px] border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold font-satoshi mb-6">Shipping Address</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={shipping.fullName}
                onChange={(e) => handleShippingChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="John Doe"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1 *</label>
              <input
                type="text"
                required
                value={shipping.addressLine1}
                onChange={(e) => handleShippingChange('addressLine1', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="123 Main Street"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2</label>
              <input
                type="text"
                value={shipping.addressLine2}
                onChange={(e) => handleShippingChange('addressLine2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Apt, suite, etc. (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
              <input
                type="text"
                required
                value={shipping.city}
                onChange={(e) => handleShippingChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State / Province *</label>
              <input
                type="text"
                required
                value={shipping.state}
                onChange={(e) => handleShippingChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code *</label>
              <input
                type="text"
                required
                value={shipping.postalCode}
                onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="10001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
              <input
                type="text"
                required
                value={shipping.country}
                onChange={(e) => handleShippingChange('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="United States"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={shipping.phone}
                onChange={(e) => handleShippingChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="+1 (555) 123-4567 (optional)"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="p-6 rounded-[20px] border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold font-satoshi mb-6">Payment Details</h2>

          <div className="p-4 border border-gray-200 rounded-xl">
            <CardElement options={cardElementOptions} />
          </div>

          {paymentError && (
            <p className="text-red-500 text-sm mt-3">{paymentError}</p>
          )}
        </div>
      </div>

      {/* Right Column — Order Summary */}
      <div className="lg:col-span-2">
        <div className="p-6 rounded-[20px] border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold font-satoshi mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.cartKey} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} loading="lazy" className="object-contain w-full h-full p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.color}{item.color && item.size ? ' / ' : ''}{item.size} × {item.quantity}
                  </p>
                  <p className="font-bold text-sm mt-1">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-base sm:text-lg">
              <span className="text-gray-500 font-satoshi">Subtotal</span>
              <span className="font-bold font-satoshi">${subtotal}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg">
              <span className="text-gray-500 font-satoshi">Delivery Fee</span>
              <span className="font-bold font-satoshi">${DELIVERY_FEE}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 mb-6 flex justify-between items-center text-xl sm:text-2xl font-bold font-satoshi">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || isSubmitting}
            className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-satoshi font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${total}`
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
