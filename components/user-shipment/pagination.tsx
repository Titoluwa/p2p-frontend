import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({ current = 1, total = 40 }: Readonly<{ current?: number; total?: number }>) {
    const pages = [1, 2, 3, 4]

    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">Showing 1–12 of 100 results</p>
            <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                {pages.map(p => (
                    <button
                        key={p}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors",
                            p === current
                                ? "bg-[#2563EB] text-white"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        {p}
                    </button>
                ))}
                <span className="px-1 text-gray-400 text-sm">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                    {total}
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
