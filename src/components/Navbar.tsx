'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'
import DesktopNav from './Navs/DesktopNav'
import MobileNav from './Navs/MobileNav'
import { useState } from 'react'

const Navbar = () => {

  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      router.push(`/shop?q=${encodeURIComponent(q)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-[56px] xs:top-[38px] w-full bg-white z-40">
      <nav className=" container w-full mx-auto">
        <div className="mx-auto px-4 flex items-center justify-between py-4">

          <div className='flex items-center gap-4'>
            
            {/* MobileNav */}
            <MobileNav />
            
            {/* Logo */}
            <Logo />
            
          </div>
          {/* DesktopNav */}
          <DesktopNav />

          {/* Icons (ٍSearch & Cart & User) */}
          <div className="flex items-center gap-3.5">
            <MagnifyingGlassIcon onClick={() => setIsSearchOpen(!isSearchOpen)} className="h-6 w-6 stroke-2 cursor-pointer hover:stroke-gray-700" />
            <Link href="/cart">
              <ShoppingBagIcon className=" h-6 w-6 stroke-2 hover:stroke-gray-700" />
            </Link>
            <Link href="/account">
              <UserCircleIcon className="h-6 w-6 stroke-2 hover:stroke-gray-700" />
            </Link>
          </div>

        </div>
      </nav>

      {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'max-h-24 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          } bg-gray-200`}
        >
          <div className='container mx-auto px-4 flex items-center justify-between'>
            <div className='flex items-center gap-2 flex-1'>
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="ml-2 bg-transparent focus:outline-none placeholder-gray-500 text-base flex-1"
              />
            </div>
            <XMarkIcon onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className='h-6 w-6 text-gray-600 cursor-pointer'/>
          </div>
        </form>
    </header>
  )
}

export default Navbar
