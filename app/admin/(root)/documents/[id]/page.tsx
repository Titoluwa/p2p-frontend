'use client'
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, FileText, Download, CheckCircle2, ChevronDown } from "lucide-react"
import { DetailField } from "@/components/admin/comp"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// ── Types ─────────────────────────────────────────────────────────────────────

type DocStatus = "Approved" | "Pending" | "Rejected"

interface Document {
    id: string
    name: string
    customerName: string
    shipmentId: string
    uploadDate: string
    status: DocStatus
}

const CHECKLIST_ITEMS = [
    "Document is legible",
    "All required fields completed",
    "Signatures present",
    "Dates are valid",
    "Information matches shipment",
]

// ── Update Status Dropdown ────────────────────────────────────────────────────

function UpdateStatusDropdown({
    value,
    onChange,
}: {
    value: string
    onChange: (v: DocStatus) => void
}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-300 min-w-[180px] justify-between text-gray-500"
            >
                <span>{value || "Update Status"}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {open && (
                <div className="absolute right-0 z-50 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {(["Approved", "Pending", "Rejected"] as DocStatus[]).map((opt) => (
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


// ── Reject Document Dialog ────────────────────────────────────────────────────

function RejectDocumentDialog({
    open,
    shipmentId,
    onClose,
    onConfirm,
}: {
    open: boolean
    shipmentId: string
    onClose: () => void
    onConfirm: (reason: string) => void
}) {
    const [reason, setReason] = useState("")

    const handleConfirm = () => {
        onConfirm(reason)
        setReason("")
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <DialogContent className="sm:max-w-sm rounded-2xl px-8 py-8">
                {/* Trash icon */}
                <div className="flex justify-center mb-4">
                    <div className="text-4xl">🗑️</div>
                </div>

                <DialogTitle className="text-xl font-bold text-[#111827] text-center mb-2">
                    Reject Document
                </DialogTitle>
                <p className="text-sm text-gray-500 text-center mb-6">
                    You about to reject a document for Shipment {shipmentId}. Please state your reason
                </p>

                <div className="space-y-1.5 mb-6">
                    <p className="text-sm font-semibold text-[#111827]">Reason for Rejection</p>
                    <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="kunle.remi25@gmail.com"
                        className="min-h-[120px] resize-none text-sm"
                    />
                </div>

                <div className="space-y-3">
                    <Button
                        className="w-full bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                        onClick={handleConfirm}
                    >
                        Reject Document
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// ── Document Approved Dialog ──────────────────────────────────────────────────

function ApprovedDialog({
    open,
    shipmentId,
    onClose,
}: {
    open: boolean
    shipmentId: string
    onClose: () => void
}) {
    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <DialogContent className="sm:max-w-sm rounded-2xl px-8 py-10 text-center">
                {/* Success icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-500 stroke-[1.5]" />
                    </div>
                </div>

                <DialogTitle className="text-xl font-bold text-[#111827] mb-2">
                    Document Approved!
                </DialogTitle>
                <p className="text-sm text-gray-500">
                    This document for shipment {shipmentId} has been approved successfully
                </p>
            </DialogContent>
        </Dialog>
    )
}

// ── Document Status Badge ─────────────────────────────────────────────────────

function DocStatusBadge({ status }: { status: DocStatus }) {
    const styles: Record<DocStatus, string> = {
        Approved: "bg-green-100 text-green-700 hover:bg-green-100",
        Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        Rejected: "bg-red-100 text-red-700 hover:bg-red-100",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0", styles[status])}>
            {status}
        </Badge>
    )
}

// ── Document Review Detail Page ───────────────────────────────────────────────

interface AdminDocumentReviewPageProps {
    documentId?: string
    onBack?: () => void
    onViewCustomer?: () => void
    onViewShipment?: () => void
}

export default function AdminDocumentReviewPage({
    documentId = "DOC-1024",
    onBack,
    onViewCustomer,
    onViewShipment,
}: AdminDocumentReviewPageProps) {
    const [docStatus, setDocStatus] = useState<DocStatus>("Pending")
    const [checklist, setChecklist] = useState<Record<string, boolean>>(
        Object.fromEntries(CHECKLIST_ITEMS.map((item) => [item, false]))
    )
    const [showRejectDialog, setShowRejectDialog] = useState(false)
    const [showApprovedDialog, setShowApprovedDialog] = useState(false)

    const toggleCheck = (item: string) =>
        setChecklist((prev) => ({ ...prev, [item]: !prev[item] }))

    const handleApprove = () => {
        setDocStatus("Approved")
        setShowApprovedDialog(true)
    }

    const handleRejectConfirm = (_reason: string) => {
        setDocStatus("Rejected")
        setShowRejectDialog(false)
    }


    return (
        <div className="space-y-4 pb-24">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <button
                        onClick={onBack}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0 mt-0.5"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Document Review</h1>
                        <p className="text-gray-500 text-sm">{documentId}</p>
                    </div>
                </div>
                <UpdateStatusDropdown value={docStatus} onChange={setDocStatus} />
            </div>

            {/* Document Preview Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-[#111827]">Document Preview</h2>
                        <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white gap-2">
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </div>

                    {/* Preview area */}
                    <div className="bg-gray-100 rounded-xl h-[280px] flex flex-col items-center justify-center gap-2 border border-gray-200">
                        <FileText className="w-8 h-8 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Bill of Lading Preview</p>
                        <p className="text-xs text-gray-400">PDF Document - 2.4 MB</p>
                    </div>
                </CardContent>
            </Card>

            {/* Document Details Card */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <h2 className="text-base font-bold text-[#111827]">Document Details</h2>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Document Type" value="Bill of Lading" />
                        <DetailField label="Upload Date" value="January 30, 2026 at 2:15 PM" />
                        <DetailField label="File Size" value="2.4 MB" />
                        <DetailField label="File Format" value="PDF" />
                    </div>

                    {/* Document Status */}
                    <div>
                        <p className="text-sm text-gray-500 mb-1.5">Document Status</p>
                        <DocStatusBadge status={docStatus} />
                    </div>

                    {/* Related Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Related Information</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {/* Customer — clickable link */}
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Customer</p>
                                <button
                                    onClick={onViewCustomer}
                                    className="text-sm font-semibold text-[#2563EB] hover:underline"
                                >
                                    John Anderson
                                </button>
                            </div>
                            {/* Shipment ID — clickable link */}
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Shipment ID</p>
                                <button
                                    onClick={onViewShipment}
                                    className="text-sm font-semibold text-[#2563EB] hover:underline"
                                >
                                    SH-1024
                                </button>
                            </div>
                            <DetailField label="Vehicle" value="Toyota Camry 2020" />
                            <DetailField label="Route" value="Los Angeles → Tokyo" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Review History Card — shown when status is Approved */}
            {docStatus === "Approved" && (
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-base font-bold text-[#111827]">Review History</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <DetailField label="Submitted by customer" value="Jan 30, 2026 at 2:15 PM" />
                            <DetailField label="Reviewed" value="Jan 30, 2026 at 2:20 PM" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Review Checklist Card — shown when status is Pending */}
            {docStatus !== "Approved" && (
                <Card>
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-base font-bold text-[#111827]">Review Checklist</h2>
                        <div className="space-y-3 pt-1">
                            {CHECKLIST_ITEMS.map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <Checkbox
                                        id={item}
                                        checked={checklist[item]}
                                        onCheckedChange={() => toggleCheck(item)}
                                        className="rounded-sm border-gray-300 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
                                    />
                                    <label
                                        htmlFor={item}
                                        className="text-sm text-gray-600 cursor-pointer select-none"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sticky footer action buttons */}
            <div className="max-w-6xl mx-auto px-6 py-4 pt-10 flex gap-8 z-40">
                <Button variant="outline" onClick={() => setShowRejectDialog(true)}
                    className="flex-1 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 h-[52px]" 
                >
                    Reject Document
                </Button>
                <Button className="flex-1 bg-[#2563EB] hover:bg-[#2563EB]/80 text-white h-[52px]" onClick={handleApprove}>
                    Approve Document
                </Button>
            </div>

            {/* Reject Dialog */}
            <RejectDocumentDialog
                open={showRejectDialog}
                shipmentId="SH-1024"
                onClose={() => setShowRejectDialog(false)}
                onConfirm={handleRejectConfirm}
            />

            {/* Approved Success Dialog */}
            <ApprovedDialog
                open={showApprovedDialog}
                shipmentId="SH-1024"
                onClose={() => setShowApprovedDialog(false)}
            />
        </div>
    )
}