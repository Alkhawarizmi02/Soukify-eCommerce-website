import React from 'react'
import './globals.css'
import PromoBanner from '@/components/PromoBanner'
import Navbar from '@/components/Navbar'
import { CartProvider } from '@/lib/CartContext'
import Footer from '@/components/Footer'

export const metadata = {
  description: 'Soukify is a modern and scalable e-commerce platform built with Next.js and Payload CMS, designed for seamless online shopping.',
  title: 'Soukify',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <PromoBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
