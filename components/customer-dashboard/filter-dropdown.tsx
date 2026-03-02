import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FilterDropdown({ options, value, onChange }: Readonly<{ options: string[]; value: string; onChange: (v: string) => void }>) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(p => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-300 min-w-[200px] justify-between"
            >
                <span>
                    <span className="text-gray-500">Filter by: </span>
                    <span className="text-gray-800 font-medium">{value}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-gray-800" />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {options.map(opt => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setOpen(false) }}
                            className="w-full text-left px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}