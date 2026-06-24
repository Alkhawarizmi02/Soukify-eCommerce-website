'use client'

import Link from "next/link";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function PromoBanner() {

  return (
    <div className="sticky top-0 w-full h-14 xs:h-9.5 px-4 font-satoshi bg-black text-white text-center text-sm flex items-center justify-between z-50">
      <p className="flex-1">Sign up and get 20% off to your first order. <Link href="./login" className="font-medium underline hover:text-gray-300 transition">Sign Up Now</Link></p>
      <XMarkIcon className='h-5 w-5 text-gray-100 cursor-pointer'/>
    </div>
  );
}
