import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({ 
    current = 1, 
    total = 1, 
    onChange 
}: Readonly<{ 
    current?: number; 
    total?: number; 
    onChange?: (page: number) => void 
}>) {
    const pages = Array.from({ length: Math.min(5, total) }, (_, i) => i + 1)

    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
                Page {current} of {total}
            </p>
            <div className="flex items-center gap-1">
                <button 
                    onClick={() => current > 1 && onChange?.(current - 1)}
                    disabled={current === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                {pages.map(p => (
                    <button
                        key={p}
                        onClick={() => onChange?.(p)}
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
                {total > 5 && <span className="px-1 text-gray-400 text-sm">...</span>}
                {total > 5 && (
                    <button 
                        onClick={() => onChange?.(total)}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50",
                            current === total && "bg-[#2563EB] text-white border-[#2563EB]"
                        )}
                    >
                        {total}
                    </button>
                )}
                <button 
                    onClick={() => current < total && onChange?.(current + 1)}
                    disabled={current === total}
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
