import React from 'react'
import './globals.css'
import PromoBanner from '@/components/PromoBanner'
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/lib/CartContext'
import { AuthProvider } from '@/lib/AuthContext'
import Footer from '@/components/Footer'
import NewsletterSection from '@/components/NewsletterSection'

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Soukify',
  description: 'Soukify is a modern and scalable e-commerce platform built with Next.js and Payload CMS, designed for seamless online shopping.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Soukify',
    description: 'Soukify is a modern and scalable e-commerce platform built with Next.js and Payload CMS, designed for seamless online shopping.',
    siteName: 'Soukify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soukify',
    description: 'Soukify is a modern and scalable e-commerce platform built with Next.js and Payload CMS, designed for seamless online shopping.',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <PromoBanner />
            <Navbar />
            <main>{children}</main>
            <NewsletterSection />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
