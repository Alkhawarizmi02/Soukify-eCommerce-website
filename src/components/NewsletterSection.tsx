import { Mail } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 -mb-24 z-10">
      <div className="mx-auto max-w-7xl bg-black rounded-[20px] px-6 py-9 sm:px-16 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Title */}
        <h2 className="text-white text-3xl sm:text-[40px] leading-tight font-extrabold font-integralcf max-w-[550px] text-center lg:text-left">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-3 w-full max-w-[350px]">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-sm font-satoshi focus:outline-none"
            />
          </div>
          <button className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-100 transition-colors font-satoshi text-sm">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  )
}
