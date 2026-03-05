import { PaymentStatus } from "@/lib/types/constant"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PaymentStatusBadge({ status }: Readonly<{ status: PaymentStatus }>) {
    const styles: Record<PaymentStatus, string> = {
        Completed: "bg-green-100 text-green-700 hover:bg-green-100 border-0",
        Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0",
        Failed: "bg-red-100 text-red-700 hover:bg-red-100 border-0",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1", styles[status])}>
            {status}
        </Badge>
    )
}

export function PaymentStatCard({ amount, label, icon, }: Readonly<{ amount: string; label: string; icon: React.ReactNode }>) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                {icon}
                <div>
                    <p className="text-xl sm:text-2xl font-bold text-[#111827]">{amount}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export function TotalCostIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M2 10h20" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M6 15h4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export function AmountPaidIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#DCF1E4] flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M2 10h20" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M6 15h4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export function OutstandingIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#FDE8E8] flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="1.5" />
                <path d="M12 8v4M12 16v.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    )
}

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