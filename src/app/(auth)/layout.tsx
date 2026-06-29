import React from 'react'
import '../(frontend)/globals.css'
import PromoBanner from '@/components/PromoBanner'
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/lib/CartContext'
import { AuthProvider } from '@/lib/AuthContext'

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Login - Soukify',
  description: 'Sign in to your Soukify account',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Login - Soukify',
    description: 'Sign in to your Soukify account',
    siteName: 'Soukify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - Soukify',
    description: 'Sign in to your Soukify account',
  },
}

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <PromoBanner />
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
