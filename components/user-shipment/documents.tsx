import { Document } from "@/lib/types/constant"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function DocumentStatusBadge({ status }: Readonly<{ status: Document["status"] }>) {
    const styles = {
        Approved: "text-green-600",
        Pending: "text-yellow-600",
        Rejected: "text-red-600",
    }
    return (
        <span className={cn("text-xs font-medium", styles[status])}>
            {status}
        </span>
    )
}

export function Documents({ documents }: Readonly<{ documents: Document[] }>) {
    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#111827]">Documents</h2>

                <div className="space-y-3">
                    {documents.map((doc, i) => (
                        <div
                            key={i + 1}
                            className="bg-gray-50 rounded-lg p-4 space-y-1"
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                                <span className="text-sm font-medium text-gray-800">{doc.filename}</span>
                            </div>
                            <p className="text-sm text-gray-500 pl-6">{doc.type}</p>
                            <div className="pl-6">
                                <DocumentStatusBadge status={doc.status} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                    <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                        Upload Document
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}