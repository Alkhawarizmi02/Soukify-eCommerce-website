import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 pt-10 mt-10">
      <button className="flex gap-2 items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-satoshi text-sm font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="hidden sm:flex gap-2">
        {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-satoshi text-sm font-medium transition-all ${
              page === 1 ? 'bg-black/5 text-black' : 'text-gray-400 hover:text-black hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="flex gap-2 items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-satoshi text-sm font-medium transition-colors">
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
