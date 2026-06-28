'use client'

import Logo from "@/components/Logo"
import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/AuthContext"
import { useRouter, useSearchParams } from "next/navigation"

function Page() {
  const { user, login, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push(redirect)
    }
  }, [user, authLoading, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const res = await login(email, password)
      if (res.success) {
        router.push(redirect)
      } else {
        setError(res.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-106px)] bg-white grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-start lg:justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md flex flex-1 flex-col justify-center items-center gap-6">
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 font-integralcf">Login to your account</h1>
            <p className="text-sm text-gray-600 font-satoshi">
              Enter your email below to login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 font-satoshi">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm font-medium text-zinc-950 hover:text-zinc-800 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 font-satoshi">
            Don&apos;t have an account?{' '}
            <Link href={`/register${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-medium text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block w-full h-full relative min-h-[500px]">
        <Image
          src="/assets/login-img.jpg"
          alt="fashion image"
          className="object-cover"
          fill
          priority
        />
      </div>
    </div>
  )
}

export default Page