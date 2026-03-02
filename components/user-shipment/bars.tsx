import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { TabFilter, FILTER_OPTIONS, TABS } from "@/lib/types/constant"

// ── Filter Dropdown ───────────────────────────────────────────────────────────

export function FilterDropdown({ value, onChange, }: Readonly<{ value: string; onChange: (v: string) => void }>) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button type="button" onClick={() => setOpen(p => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-300 min-w-[180px] justify-between"
            >
                <span>
                    <span className="text-gray-500">Filter by: </span>
                    <span className="text-gray-800 font-medium">{value}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {FILTER_OPTIONS.map(opt => (
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


// ── Empty State ───────────────────────────────────────────────────────────────

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div>
                {/* <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="15" y="12" width="42" height="50" rx="4" fill="#d1d5db" />
                    <rect x="20" y="20" width="28" height="3" rx="1.5" fill="#9ca3af" />
                    <rect x="20" y="27" width="22" height="3" rx="1.5" fill="#9ca3af" />
                    <rect x="20" y="34" width="25" height="3" rx="1.5" fill="#9ca3af" />
                    <circle cx="57" cy="18" r="12" fill="#e5e7eb" />
                    <path d="M57 13v6M57 22v1" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
                </svg> */}
                <img src="/images/images-none.png" alt="" width={160} height={160} className='grayscale' />
            </div>
            <p className="text-xl font-bold text-[#111827]">No Shipment Found</p>
        </div>
    )
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────

export function TabBar({ active, onChange, }: Readonly<{ active: TabFilter; onChange: (t: TabFilter) => void }>) {
    return (
        <div className="flex border-b border-gray-200">
            {TABS.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={cn(
                        "px-4 py-2.5 text-sm border-b-2 transition-colors",
                        active === tab
                            ? "border-[#2563EB] text-[#111827] font-semibold"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}