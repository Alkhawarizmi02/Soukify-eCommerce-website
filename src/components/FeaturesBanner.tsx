import { Box, CircleDollarSign, Headphones, CreditCard } from 'lucide-react'

export default function FeaturesBanner() {
  const features = [
    {
      icon: Box,
      title: 'Free Shipping',
      description: 'Free shipping for order above $150',
    },
    {
      icon: CircleDollarSign,
      title: 'Money Guarantee',
      description: 'Within 30 days for an exchange',
    },
    {
      icon: Headphones,
      title: 'Online Support',
      description: '24 hours a day, 7 days a week',
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Pay with multiple credit cards',
    },
  ]

  return (
    <div className="border-t border-gray-100 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="flex flex-col items-start text-left font-satoshi">
                <div className="p-2 bg-gray-50 rounded-full mb-3 text-black">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
