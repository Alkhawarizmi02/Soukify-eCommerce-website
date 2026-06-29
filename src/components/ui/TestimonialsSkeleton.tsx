export default function TestimonialsSkeleton() {
  return (
    <section className="w-full py-10 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div className="h-8 sm:h-12 w-72 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[280px] w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white animate-pulse"
            >
              <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="w-5 h-5 bg-gray-200 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
