'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronDown, FileText } from "lucide-react"
import { DetailField, adminTabTriggerClass, type QuoteStatus } from "@/components/admin/comp"

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuoteDetail {
    id: string
    customer: {
        name: string
        email: string
        phone: string
        company: string
    }
    vehicle: {
        type: string
        makeModel: string
        year: string
        condition: string
    }
    route: {
        origin: string
        destination: string
        shippingMethod: string
        transitTime: string
    }
    quoteInfo: {
        submitted: string
        validUntil: string
    }
    attachments: { name: string; size: string }[]
}

interface AdminPricing {
    shippingCost: number
    insurance: number
    handlingFees: number
    customsDocumentation: number
    notes: string
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_QUOTE: QuoteDetail = {
    id: "5429",
    customer: {
        name: "John Anderson",
        email: "john.anderson@email.com",
        phone: "+1 (555) 123-4567",
        company: "Anderson Motors LLC",
    },
    vehicle: {
        type: "Toyota",
        makeModel: "Camry",
        year: "2022",
        condition: "Running",
    },
    route: {
        origin: "United Kingdom",
        destination: "Ghana",
        shippingMethod: "Container (20ft)",
        transitTime: "18-22 days",
    },
    quoteInfo: {
        submitted: "Jan 28, 2026 at 2:45 PM",
        validUntil: "Feb 28, 2026",
    },
    attachments: [
        { name: "vehicle_registration_bmw.pdf", size: "2.4 MB" },
        { name: "vehicle_registration_bmw.pdf", size: "2.4 MB" },
    ],
}

const STATUS_OPTIONS: QuoteStatus[] = ["New", "In Review", "Sent", "Accepted"]

// ── Update Status Dropdown ────────────────────────────────────────────────────

function UpdateStatusDropdown({
    value,
    onChange,
}: {
    value: string
    onChange: (v: QuoteStatus) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(p => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-300 min-w-[180px] justify-between text-gray-500"
            >
                <span>{value || "Update Status"}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {STATUS_OPTIONS.map(opt => (
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

// ── Number Spinner Input ──────────────────────────────────────────────────────

function SpinnerInput({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (v: number) => void
}) {
    return (
        <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-[#111827]">{label}</Label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <span className="pl-3 text-sm text-gray-400 select-none">£</span>
                <input
                    type="number"
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="flex-1 px-2 py-3 text-sm text-gray-800 outline-none bg-transparent"
                />
                <div className="flex flex-col border-l border-gray-200">
                    <button
                        type="button"
                        onClick={() => onChange(value + 1)}
                        className="px-2 py-1 text-gray-400 hover:bg-gray-50 text-xs leading-none"
                    >
                        ▲
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange(Math.max(0, value - 1))}
                        className="px-2 py-1 text-gray-400 hover:bg-gray-50 text-xs leading-none border-t border-gray-200"
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Customer Tab ──────────────────────────────────────────────────────────────

function CustomerTab({ detail, onNewQuote }: { detail: QuoteDetail; onNewQuote?: () => void }) {
    return (
        <div className="space-y-4">
            {/* Customer Information */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-base font-bold text-[#111827]">Customer Information</h2>
                        <Button
                            variant="outline"
                            className="text-[#2563EB] border-blue-100 bg-[#DEE8FC] hover:bg-blue-100 text-sm h-8 px-3"
                            onClick={onNewQuote}
                        >
                            New Quote
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Name" value={detail.customer.name} />
                        <DetailField label="Email Address" value={detail.customer.email} />
                        <DetailField label="Phone Number" value={detail.customer.phone} />
                        <DetailField label="Company" value={detail.customer.company} />
                    </div>

                    {/* Vehicle Details */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Details</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <DetailField label="Type" value={detail.vehicle.type} />
                            <DetailField label="Make & Model" value={detail.vehicle.makeModel} />
                            <DetailField label="Year" value={detail.vehicle.year} />
                            <DetailField label="Condition" value={detail.vehicle.condition} />
                        </div>
                    </div>

                    {/* Route Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Route Information</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <DetailField label="Origin" value={detail.route.origin} />
                            <DetailField label="Destination" value={detail.route.destination} />
                            <DetailField label="Shipping Method" value={detail.route.shippingMethod} />
                            <DetailField label="Estimated Transit Time" value={detail.route.transitTime} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quote Information */}
            <Card>
                <CardContent className="p-6 space-y-5">
                    <h2 className="text-base font-bold text-[#111827]">Quote Information</h2>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Submitted" value={detail.quoteInfo.submitted} />
                        <DetailField label="Valid Until" value={detail.quoteInfo.validUntil} />
                    </div>

                    {/* Attachments */}
                    <div>
                        <h3 className="text-base font-bold text-[#111827] mb-4">Attachments</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {detail.attachments.map((att, i) => (
                                <div key={i + 1} className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{att.name}</p>
                                        <p className="text-xs text-gray-400">{att.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// ── Admin Tab ─────────────────────────────────────────────────────────────────

function AdminTab({
    pricing,
    onPricingChange,
    onSendQuote,
    onConvertToShipment,
}: {
    pricing: AdminPricing
    onPricingChange: (p: AdminPricing) => void
    onSendQuote?: () => void
    onConvertToShipment?: () => void
}) {
    const total =
        pricing.shippingCost +
        pricing.insurance +
        pricing.handlingFees +
        pricing.customsDocumentation

    return (
        <div className="space-y-4">
            {/* Admin Pricing */}
            <Card>
                <CardContent className="p-6 space-y-5">
                    <h2 className="text-base font-bold text-[#111827]">Admin Pricing</h2>

                    <SpinnerInput
                        label="Shipping Cost"
                        value={pricing.shippingCost}
                        onChange={v => onPricingChange({ ...pricing, shippingCost: v })}
                    />
                    <SpinnerInput
                        label="Insurance"
                        value={pricing.insurance}
                        onChange={v => onPricingChange({ ...pricing, insurance: v })}
                    />
                    <SpinnerInput
                        label="Handling Fees"
                        value={pricing.handlingFees}
                        onChange={v => onPricingChange({ ...pricing, handlingFees: v })}
                    />
                    <SpinnerInput
                        label="Customs & Documentation"
                        value={pricing.customsDocumentation}
                        onChange={v => onPricingChange({ ...pricing, customsDocumentation: v })}
                    />

                    {/* Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-sm font-semibold text-[#111827]">Total Cost</span>
                        <span className="text-lg font-bold text-[#111827]">
                            £ {total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Internal Notes */}
            <Card>
                <CardContent className="p-6 space-y-3">
                    <h2 className="text-base font-bold text-[#111827]">Internal Notes</h2>
                    <Textarea
                        value={pricing.notes}
                        onChange={e => onPricingChange({ ...pricing, notes: e.target.value })}
                        placeholder="Add internal notes here..."
                        className="min-h-[120px] resize-none text-sm text-gray-500"
                    />
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
                <Button
                    variant="outline"
                    className="flex-1 border-[#2563EB] text-[#2563EB] hover:bg-[#DEE8FC]"
                    onClick={onConvertToShipment}
                >
                    Convert to Shipment
                </Button>
                <Button
                    className="flex-1 bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                    onClick={onSendQuote}
                >
                    Send Quote
                </Button>
            </div>
        </div>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminQuoteDetailPageProps {
    quoteId?: string
    onBack?: () => void
}

export default function AdminQuoteDetailPage({
    quoteId = "5429",
    onBack,
}: AdminQuoteDetailPageProps) {
    const [status, setStatus] = useState<QuoteStatus>("New")
    const [pricing, setPricing] = useState<AdminPricing>({
        shippingCost: 2500,
        insurance: 2500,
        handlingFees: 2500,
        customsDocumentation: 2500,
        notes: "Customer requires expedited shipping. Vehicle has minor cosmetic damage on rear bumper.",
    })

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
                            Quote Requests #{quoteId}
                        </h1>
                        <p className="text-gray-500 text-sm">Review and respond to quote request</p>
                    </div>
                </div>

                <UpdateStatusDropdown value={status} onChange={setStatus} />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="customer">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                    <TabsTrigger value="customer" className={adminTabTriggerClass}>
                        Customer
                    </TabsTrigger>
                    <TabsTrigger value="admin" className={adminTabTriggerClass}>
                        Admin
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="customer">
                    <CustomerTab detail={MOCK_QUOTE} />
                </TabsContent>

                <TabsContent value="admin">
                    <AdminTab
                        pricing={pricing}
                        onPricingChange={setPricing}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}