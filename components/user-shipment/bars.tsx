import { cn } from "@/lib/utils"
import { TabFilter, SHIPMENT_TABS, QUOTE_TABS } from "@/lib/types/constant"

export function ShipmentTab({ active, onChange, }: Readonly<{ active: TabFilter; onChange: (t: TabFilter) => void }>) {
    return (
        <div className="flex border-b border-gray-200">
            {SHIPMENT_TABS.map(tab => (
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

export function QuoteTab({ active, onChange, }: Readonly<{ active: TabFilter; onChange: (t: TabFilter) => void }>) {
    return (
        <div className="flex border-b border-gray-200">
            {QUOTE_TABS.map(tab => (
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