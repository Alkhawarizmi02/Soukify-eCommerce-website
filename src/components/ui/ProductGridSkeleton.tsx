export default function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="h-8 sm:h-9 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="bg-gray-200 rounded-2xl aspect-square sm:aspect-[4/5]" />
              <div className="mt-2 sm:mt-3 h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-1 h-3 bg-gray-200 rounded w-1/3" />
              <div className="mt-2 h-5 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
