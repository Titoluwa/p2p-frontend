'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronDown, FileText, Check } from "lucide-react"
import { DetailField, adminTabTriggerClass } from "@/components/admin/comp"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type ShipmentStatus =
    | "Port of Origin"
    | "In Transit"
    | "Port of Destination"
    | "Custom Clearance"
    | "Out of Delivery"
    | "Delivered"
    | "Delayed"

interface TimelineStep {
    label: string
    date?: string
    completed: boolean
}

interface Document {
    name: string
    uploadedDate: string
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const TIMELINE_STEPS: TimelineStep[] = [
    { label: "Quote Accepted", date: "Jan 25, 2026", completed: true },
    { label: "Payment Received", date: "Jan 26, 2026", completed: true },
    { label: "Port of Origin", date: "Jan 27, 2026", completed: true },
    { label: "In Transit", date: "Jan 30, 2026", completed: true },
    { label: "Port of Destination", completed: false },
    { label: "Custom Clearance", completed: false },
    { label: "Delivered", completed: false },
]

const MOCK_DOCUMENTS: Document[] = [
    { name: "Bill of Lading.pdf", uploadedDate: "Jan 28, 2026" },
    { name: "Insurance Certificate.pdf", uploadedDate: "Jan 26, 2026" },
]

const STATUS_OPTIONS: ShipmentStatus[] = [
    "Port of Origin",
    "In Transit",
    "Port of Destination",
    "Custom Clearance",
    "Out of Delivery",
    "Delivered",
    "Delayed",
]

// ── Update Status Dropdown ────────────────────────────────────────────────────

function UpdateStatusDropdown({
    value,
    onChange,
}: {
    value: string
    onChange: (v: ShipmentStatus) => void
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
                <div className="absolute right-0 z-50 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {STATUS_OPTIONS.map((opt) => (
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

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "In Transit": "bg-blue-100 text-blue-700",
        "Delivered": "bg-green-100 text-green-700",
        "Custom Clearance": "bg-purple-100 text-purple-700",
        "Delayed": "bg-red-100 text-red-700",
        "Port of Origin": "bg-gray-100 text-gray-700",
        "Port of Destination": "bg-orange-100 text-orange-700",
        "Out of Delivery": "bg-yellow-100 text-yellow-700",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0 hover:opacity-90", styles[status] ?? "bg-gray-100 text-gray-700")}>
            {status}
        </Badge>
    )
}

// ── Timeline Stepper ──────────────────────────────────────────────────────────

function TimelineStepper({ steps }: { steps: TimelineStep[] }) {
    return (
        <div className="flex flex-col">
            {steps.map((step, i) => (
                <div key={i + 1} className="flex gap-4">
                    {/* Icon + connector line */}
                    <div className="flex flex-col items-center">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10",
                                step.completed ? "bg-green-100" : "bg-gray-100"
                            )}
                        >
                            {step.completed ? (
                                <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
                            ) : (
                                <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                            )}
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className={cn(
                                    "w-0.5 my-1 flex-1",
                                    step.completed ? "bg-green-200" : "bg-gray-200"
                                )}
                                style={{ minHeight: 28 }}
                            />
                        )}
                    </div>

                    {/* Label + date */}
                    <div className="pb-6 pt-2">
                        <p className="text-sm font-semibold text-[#111827]">{step.label}</p>
                        {step.date && (
                            <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

// ── Tab: Shipment Overview ────────────────────────────────────────────────────

function ShipmentOverviewTab({ currentStatus }: { currentStatus: ShipmentStatus }) {
    return (
        <div className="space-y-4">
            {/* Shipment Information Card */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-base font-bold text-[#111827]">Shipment Information</h2>
                        <StatusBadge status={currentStatus} />
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Shipment ID" value="SH-1024" />
                        <DetailField label="Quote ID" value="QT-5429" />
                        <DetailField label="Tracking Number" value="TRK-2026-0124-JP" />
                        <DetailField label="Container Number" value="CSQU3054383" />
                    </div>

                    {/* Customer Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Customer Information</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <DetailField label="Name" value="John Anderson" />
                            <DetailField label="Email Address" value="john.anderson@email.com" />
                            <DetailField label="Phone Number" value="+1 (555) 123-4567" />
                            <DetailField label="Customer ID" value="CUST-00124" />
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Details</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <DetailField label="Type" value="Toyota" />
                            <DetailField label="Make & Model" value="Camry" />
                            <DetailField label="Year" value="2022" />
                            <DetailField label="Condition" value="Running" />
                            <DetailField label="VIN" value="4T1B11HK5LU123456" />
                            <DetailField label="Colour" value="Silver" />
                        </div>
                    </div>

                    {/* Route & Port Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Route & Port Information</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                            {/* Origin Port */}
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Origin Port</p>
                                <p className="text-sm font-semibold text-[#111827]">
                                    Port of Los Angeles{" "}
                                    <span className="text-gray-400 font-normal">Los Angeles, CA, USA</span>
                                </p>
                            </div>
                            {/* Destination Port */}
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Destination Port</p>
                                <p className="text-sm font-semibold text-[#111827]">
                                    Port of Tokyo{" "}
                                    <span className="text-gray-400 font-normal">Tokyo, Japan</span>
                                </p>
                            </div>
                            <DetailField label="Departure Date" value="January 30, 2026" />
                            <DetailField label="Expected Arrival" value="February 18, 2026" />
                            <DetailField label="Shipping Line" value="Maersk Line" />
                            <DetailField label="Vessel Name" value="MSC OSCAR" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Documents Card */}
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-base font-bold text-[#111827]">Documents</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {MOCK_DOCUMENTS.map((doc, i) => (
                            <div key={i + 1} className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Uploaded {doc.uploadedDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// ── Tab: Shipment Status ──────────────────────────────────────────────────────

function ShipmentStatusTab() {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-base font-bold text-[#111827] mb-6">Shipment Status Timeline</h2>
                <TimelineStepper steps={TIMELINE_STEPS} />
            </CardContent>
        </Card>
    )
}

// ── Tab: Payment Status ───────────────────────────────────────────────────────

function PaymentStatusTab() {
    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                <h2 className="text-base font-bold text-[#111827]">Payment Status</h2>

                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Total Amount</span>
                        <span className="text-sm font-semibold text-[#111827]">£3,473.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Amount Paid</span>
                        <span className="text-sm font-semibold text-[#111827]">£3,473.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Balance Due</span>
                        <span className="text-sm font-semibold text-[#111827]">£0.00</span>
                    </div>
                </div>

                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 font-medium text-xs px-3 py-1.5 mt-2">
                    Fully Paid
                </Badge>
            </CardContent>
        </Card>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminShipmentDetailPageProps {
    shipmentId?: string
    onBack?: () => void
}

export default function AdminShipmentDetailPage({
    shipmentId = "SH-1024",
    onBack,
}: AdminShipmentDetailPageProps) {
    const [status, setStatus] = useState<ShipmentStatus>("In Transit")

    return (
        <div className="space-y-6 lg:space-y-8">
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                            Shipment #{shipmentId}
                        </h1>
                        <p className="text-gray-500 text-sm">Manage shipment details and status</p>
                    </div>
                </div>

                <UpdateStatusDropdown value={status} onChange={setStatus} />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                    <TabsTrigger value="overview" className={adminTabTriggerClass}>
                        Shipment Overview
                    </TabsTrigger>
                    <TabsTrigger value="status" className={adminTabTriggerClass}>
                        Shipment Status
                    </TabsTrigger>
                    <TabsTrigger value="payment" className={adminTabTriggerClass}>
                        Payment Status
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <ShipmentOverviewTab currentStatus={status} />
                </TabsContent>

                <TabsContent value="status">
                    <ShipmentStatusTab />
                </TabsContent>

                <TabsContent value="payment">
                    <PaymentStatusTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}