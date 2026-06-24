'use client'

import { Bars3BottomLeftIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Facebook, Twitter, Instagram, Youtube  } from 'lucide-react';
import { useState, useEffect } from "react"
import Link from "next/link"

function MobileNav() {

    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isShopOpen, setIsShopOpen] = useState(false)

    useEffect(() => {

      if (isOpenMenu) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }

      return () => {
        document.body.classList.remove('overflow-hidden')
      }

    } , [isOpenMenu])


    return (
        <div className="md:hidden z-50">
          {/* Mobile Menu Open Btn */}
            <button
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
                setIsShopOpen(false);
              }}
              className="relative w-7 h-7"
            >
              <Bars3BottomLeftIcon
                className={`
                  absolute inset-0 w-7 h-7 stroke-2 translate-y-1.25 
                  transform transition-all duration-300
                  ${isOpenMenu ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
                `}
              />
              <XMarkIcon
                className={`
                  absolute inset-0 w-7 h-7 stroke-2 translate-y-1.25 
                  transform transition-all duration-300
                  ${isOpenMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                `}
              />
            </button>

            {/* Mobile Menu */}
            {isOpenMenu && (
                <div className="absolute left-0 right-0 bottom-0 top-16 h-[calc(100vh-68px-38px)] pl-6 pt-8 pb-10 flex flex-col gap-4 border-t-2 border-gray-300 bg-white drop-shadow-[100px_0px_0px_#00000094]"
                >
                  <ul className="h-full flex flex-col justify-between gap-16 font-satoshi text-lg font-bold overflow-y-scroll">
                      <div className="flex flex-col gap-8">
                      <div>
                          {/* Shop Dropdown */}
                          <button onClick={() => setIsShopOpen(!isShopOpen)} className="flex items-center gap-1">
                            <span>Shop</span>
                            <ChevronDownIcon
                              className={`w-5 stroke-2 translate-y-0.5 transition-transform duration-300 ${isShopOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                          </button>

                          <div
                            className={`
                              transition-all duration-300 overflow-hidden
                              ${isShopOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                            `}
                          >
                            <ul className="flex flex-col gap-3 w-fit pl-4 pt-4 font-integralcf">
                              <Link href="/shop?category=tshirts" className="hover:text-gray-600">
                                T-Shirts
                              </Link>
                              <Link href="/shop?category=shorts" className="hover:text-gray-600">
                                Shorts
                              </Link>
                              <Link href="/shop?category=shirts" className="hover:text-gray-600">
                                Shirts
                              </Link>
                              <Link href="/shop?category=jeans" className="hover:text-gray-600">
                                Jeans
                              </Link>
                            </ul>
                          </div>
                        </div>


                        {/* Other Links */}
                        <Link href="/shop" className="hover:text-gray-600">
                        On Sale
                        </Link>
                        <Link href="/#new-arrivals" className="hover:text-gray-600">
                        New Arrivals
                        </Link>
                        <Link href="/shop" className="hover:text-gray-600">
                        Brands
                        </Link>
                      </div>


                      <div className="flex flex-col gap-6">
                        {/* Socials Icons */}
                        <div className="flex flex-col gap-4">
                          <p className="text-sm text-gray-900 ">Social :</p>
                          <div className="flex items-center gap-8">
                            <button className="group p-2 border-2 border-gray-400 hover:border-white rounded-full hover:bg-black transition-colors duration-300">
                              <Facebook className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" />
                            </button>
                            <button className="group p-2 border-2 border-gray-400 hover:border-white rounded-full hover:bg-black transition-colors duration-300">
                              <Twitter className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" />
                            </button>
                            <button className="group p-2 border-2 border-gray-400 hover:border-white rounded-full hover:bg-black transition-colors duration-300">
                              <Instagram className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" />
                            </button>
                            <button className="group p-2 border-2 border-gray-400 hover:border-white rounded-full hover:bg-black transition-colors duration-300">
                              <Youtube className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" />
                            </button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className=" flex flex-col gap-3">
                        <p className="text-sm text-gray-900 ">Info :</p>
                        <div className="flex items-center gap-8 *:cursor-pointer *:text-base">
                          <p className=" hover:text-gray-800">Legal & Privacy</p>
                          <p className=" hover:text-gray-800"> Shipping</p>
                          <p className=" hover:text-gray-800"> Returns</p>
                        </div>
                        </div>
                      </div>
                  </ul>
                </div>
                
            )}
        </div>

    )
}

export default MobileNav