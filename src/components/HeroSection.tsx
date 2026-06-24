import Image from 'next/image'
import Link from 'next/link'

function HeroAndBrands() {
  const brands = [
    { name: 'Versace', logo: '/assets/versace-logo.svg' },
    { name: 'Zara', logo: '/assets/zara-logo.svg' },
    { name: 'Gucci', logo: '/assets/gucci-logo.svg' },
    { name: 'Prada', logo: '/assets/prada-logo.svg' },
    { name: 'Calvin Klein', logo: '/assets/calvin-klein-logo.svg' },
  ]

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#f1ecee] pt-10 lg:pt-0 lg:pb-0 min-h-[calc(100vh-60px)] lg:min-h-0 lg:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Hero Content Grid */}
        <div className="relative container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 items-center gap-10 lg:gap-0 h-full">
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <h1 className="font-integralcf text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-12 lg:leading-18 mb-4">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            <p className="mt-3 font-satoshi text-base text-gray-700 max-w-lg mb-8">
              Browse through our diverse range of meticulously crafted garments, designed to bring
              out your individuality and cater to your sense of style.
            </p>
            <Link href="/shop" passHref>
              <button className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-md shadow-lg hover:bg-zinc-800 transition duration-300">
                Shop Now
              </button>
            </Link>

            {/* Stats Section */}
            <div className="mt-10 font-satoshi grid grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-md lg:max-w-none justify-items-center lg:justify-items-start">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-zinc-900">200+</p>
                <p className="text-sm text-gray-600">International Brands</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-zinc-900">2,000+</p>
                <p className="text-sm text-gray-600">High-Quality Products</p>
              </div>
              <div className="text-center lg:text-left col-span-2 lg:col-span-1">
                <p className="text-2xl font-bold text-zinc-900">30,000+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative w-full h-screen lg:h-[775px] flex items-center justify-center lg:justify-end overflow-hidden">
            <Image
              src="/assets/hero-img2.png"
              alt="Fashion models showcasing style"
              fill
              priority
              className="object-cover"
            />
            {/* Black star shapes*/}
            <div className="absolute top-[5%] right-[5%] lg:top-[10%] lg:right-[5%] z-20 animate-upDown">
              <Image src="/assets/star-1.svg" alt="Star decoration 1" width={68} height={68} />
            </div>
            <div className="absolute bottom-[1%] left-[10%] lg:bottom-[40%] lg:left-[8%] z-20 animate-downUp">
              <Image src="/assets/star-2.svg" alt="Star decoration 2" width={52} height={52} />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Slider Section */}
      <div className="bg-zinc-900 py-6">
        <div className="container mx-auto px-4 overflow-hidden whitespace-nowrap">
          {/* Duplicate the content for seamless scrolling */}
          <div className="flex items-center justify-between gap-10 sm:gap-20 md:gap-32 lg:gap-40 xl:gap-52 min-w-max animate-marquee  hover:[animation-play-state:paused]">
            {brands.map((brand) => (
              <div key={brand.name + '-1'} className="flex-shrink-0">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
            {/* Second instance of the brands for looping */}
            {brands.map((brand) => (
              <div key={brand.name + '-2'} className="flex-shrink-0">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroAndBrands
