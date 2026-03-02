import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ShipmentStatus } from "@/lib/types/constant"

export function ActiveIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M9 12l2 2 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export function CompletedIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export function PendingIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export function FailedIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M12 8v4M12 16v.5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

export function StatCard({ count, label, icon, }: Readonly<{ count: number; label: string; icon: React.ReactNode }>) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4">
                {icon}
                <div>
                    <p className="text-2xl font-bold text-[#111827]">{count}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </CardContent>
        </Card>
    )
}


// ── Status Badge ──────────────────────────────────────────────────────────────

export function StatusBadge({ status }: Readonly<{ status: ShipmentStatus }>) {
    const styles: Record<ShipmentStatus, string> = {
        "In Transit": "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0",
        "Loaded On Vessel": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0",
        "Completed": "bg-green-100 text-green-700 hover:bg-green-100 border-0",
        "Vehicle Received": "bg-gray-100 text-gray-700 hover:bg-gray-100 border border-gray-300",
        "Pending": "bg-orange-100 text-orange-700 hover:bg-orange-100 border-0",
        "Failed": "bg-red-100 text-red-700 hover:bg-red-100 border-0",
    }
    return (
        <Badge className={cn("font-medium text-xs px-2.5 py-1", styles[status])}>
            {status}
        </Badge>
    )
}