import Link from "next/link"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "COMPANY",
      links: [
        { label: "About", href: "#" },
        { label: "Features", href: "#" },
        { label: "Works", href: "#" },
        { label: "Career", href: "#" },
      ],
    },
    {
      title: "HELP",
      links: [
        { label: "Customer Support", href: "#" },
        { label: "Delivery Details", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "FAQ",
      links: [
        { label: "Account", href: "#" },
        { label: "Manage Deliveries", href: "#" },
        { label: "Orders", href: "#" },
        { label: "Payments", href: "#" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Free eBooks", href: "#" },
        { label: "Development Tutorial", href: "#" },
        { label: "How to - Blog", href: "#" },
        { label: "Youtube Playlist", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-[#F0F0F0] pt-40 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold font-integralcf mb-6">SOUKIFY</h2>
            <p className="text-gray-600 text-sm font-satoshi mb-8 max-w-[250px]">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium tracking-widest font-satoshi mb-6 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-600 hover:text-black transition-colors font-satoshi text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-satoshi">
            Soukify © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-4 items-center grayscale opacity-80">
            {/* Using text placeholders/icons for payment methods as images aren't provided */}
             <img src="/assets/payment-methods.png" alt="Payment Methods" className="h-8 hidden" />
             <div className="flex gap-2">
                <div className="bg-white px-2 py-1 rounded border border-gray-100 text-[10px] font-bold">VISA</div>
                <div className="bg-white px-2 py-1 rounded border border-gray-100 text-[10px] font-bold">MasterCard</div>
                <div className="bg-white px-2 py-1 rounded border border-gray-100 text-[10px] font-bold">PayPal</div>
                <div className="bg-white px-2 py-1 rounded border border-gray-100 text-[10px] font-bold">Apple Pay</div>
                <div className="bg-white px-2 py-1 rounded border border-gray-100 text-[10px] font-bold">Google Pay</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
