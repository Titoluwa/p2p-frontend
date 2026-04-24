import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { QuoteStatus } from "@/lib/types/constant"

export function StatusBadge({ status }: Readonly<{ status: QuoteStatus }>) {
    const s = status.toLowerCase()
    const styles: Record<string, string> = {
        "pending": "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0",
        "reviewed": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0",
        "accepted": "bg-green-100 text-green-700 hover:bg-green-100 border-0",
        "approved": "bg-green-100 text-green-700 hover:bg-green-100 border-0",
        "rejected": "bg-red-100 text-red-700 hover:bg-red-100 border-0",
    }
    return (
        <Badge className={cn("font-medium text-xs px-2.5 py-1 capitalize", styles[s])}>
            {s}
        </Badge>
    )
}