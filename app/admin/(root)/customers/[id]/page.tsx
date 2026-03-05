'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, FileText } from "lucide-react"
import {
    StatCard,
    SearchFilterBar,
    DetailField,
    QuoteStatusBadge,
    adminTabTriggerClass,
} from "@/components/admin/comp"
import { QuoteStatus } from "@/components/admin/type"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type ShipmentStatus =
    | "In Transit"
    | "Delivered"
    | "Custom Clearance"
    | "Delayed"
    | "Port of Origin"
    | "Port of Destination"

type DocStatus = "Approved" | "Pending" | "Rejected"
type PaymentStatus = "Paid" | "Pending" | "Failed"

interface ShipmentRow {
    id: string
    customerName: string
    vehicle: string
    route: string
    status: ShipmentStatus
}

interface QuoteRow {
    id: string
    customerName: string
    vehicle: string
    route: string
    status: QuoteStatus
}

interface DocumentRow {
    name: string
    uploadedDate: string
    status: DocStatus
}

interface PaymentRow {
    shipmentId: string
    amount: string
    date: string
    status: PaymentStatus
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_SHIPMENTS: ShipmentRow[] = [
    { id: "QT-5429", customerName: "John Anderson", vehicle: "Toyota Camry 2020", route: "Los Angeles → Tokyo", status: "Port of Origin" },
    { id: "QT-5428", customerName: "Maria Santos", vehicle: "WilliamsMercedes C-...", route: "New York → London", status: "In Transit" },
    { id: "QT-5427", customerName: "Sarah Williams", vehicle: "Honda CR-V 2021", route: "Miami → Dubai", status: "Delivered" },
    { id: "QT-5426", customerName: "David Park", vehicle: "BMW X5 2022", route: "Seattle → Sydney", status: "Custom Clearance" },
    { id: "QT-5425", customerName: "Robert Chen", vehicle: "Mercedes C-Class 2019", route: "San Francisco → Seoul", status: "Delivered" },
    { id: "QT-5424", customerName: "Emma Johnson", vehicle: "Audi A4 2020", route: "Chicago → Hamburg", status: "Delayed" },
    { id: "QT-5423", customerName: "Michael Brown", vehicle: "Ford F-150 2021", route: "Houston → Rotterdam", status: "Delayed" },
    { id: "QT-5422", customerName: "Lisa Garcia", vehicle: "Nissan Altima 2022", route: "Phoenix → Barcelona", status: "Delivered" },
]

const MOCK_QUOTES: QuoteRow[] = [
    { id: "QT-5429", customerName: "John Anderson", vehicle: "Toyota Camry 2020", route: "Los Angeles → Tokyo", status: "New" },
    { id: "QT-5428", customerName: "Maria Santos", vehicle: "WilliamsMercedes C-...", route: "New York → London", status: "In Review" },
    { id: "QT-5427", customerName: "Sarah Williams", vehicle: "Honda CR-V 2021", route: "Miami → Dubai", status: "Accepted" },
    { id: "QT-5426", customerName: "David Park", vehicle: "BMW X5 2022", route: "Seattle → Sydney", status: "New" },
    { id: "QT-5425", customerName: "Robert Chen", vehicle: "Mercedes C-Class 2019", route: "San Francisco → Seoul", status: "New" },
    { id: "QT-5424", customerName: "Emma Johnson", vehicle: "Audi A4 2020", route: "Chicago → Hamburg", status: "New" },
    { id: "QT-5423", customerName: "Michael Brown", vehicle: "Ford F-150 2021", route: "Houston → Rotterdam", status: "New" },
    { id: "QT-5422", customerName: "Lisa Garcia", vehicle: "Nissan Altima 2022", route: "Phoenix → Barcelona", status: "New" },
]

const MOCK_DOCUMENTS: DocumentRow[] = [
    { name: "Bill of Lading.pdf", uploadedDate: "Jan 28, 2026", status: "Approved" },
    { name: "Insurance Certificate.pdf", uploadedDate: "Jan 26, 2026", status: "Approved" },
    { name: "Insurance Certificate.pdf", uploadedDate: "Jan 26, 2026", status: "Approved" },
]

const MOCK_PAYMENTS: PaymentRow[] = [
    { shipmentId: "SH-5429", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5428", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5427", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5426", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5425", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5424", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5423", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
    { shipmentId: "SH-5422", amount: "£3,500.00", date: "Jan 26, 2026", status: "Paid" },
]

const SHIPMENT_FILTER_OPTIONS = ["All", "In Transit", "Delivered", "Custom Clearance", "Delayed", "Port of Origin"]
const QUOTE_FILTER_OPTIONS = ["All Quotes", "New Quotes", "Accepted Quotes", "Sent Quotes", "Quotes In Review"]
const PAYMENT_FILTER_OPTIONS = ["All", "Paid", "Pending", "Failed"]

// ── Stat Icons ────────────────────────────────────────────────────────────────

function TotalShipmentsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function TotalQuotesIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="3" width="14" height="18" rx="2" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function TotalSpentIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M2 10h20" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M6 15h4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

// ── Shipment Status Badge ─────────────────────────────────────────────────────

function ShipmentStatusBadge({ status }: { status: ShipmentStatus }) {
    const styles: Record<ShipmentStatus, string> = {
        "In Transit": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        "Delivered": "bg-green-100 text-green-700 hover:bg-green-100",
        "Custom Clearance": "bg-purple-100 text-purple-700 hover:bg-purple-100",
        "Delayed": "bg-red-100 text-red-700 hover:bg-red-100",
        "Port of Origin": "bg-gray-100 text-gray-700 hover:bg-gray-100",
        "Port of Destination": "bg-orange-100 text-orange-700 hover:bg-orange-100",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0", styles[status])}>
            {status}
        </Badge>
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

// ── Payment Status Badge ──────────────────────────────────────────────────────

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
    const styles: Record<PaymentStatus, string> = {
        Paid: "bg-green-100 text-green-700 hover:bg-green-100",
        Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        Failed: "bg-red-100 text-red-700 hover:bg-red-100",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0", styles[status])}>
            {status}
        </Badge>
    )
}

// ── Tab: Profile Information ──────────────────────────────────────────────────

function ProfileInformationTab() {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-base font-semibold text-[#111827]">Profile Information</h2>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 font-medium text-xs px-3 py-1">
                        Active
                    </Badge>
                </div>

                {/* Avatar */}
                <Avatar className="w-16 h-16">
                    <AvatarImage src="/avatars/john.jpg" alt="John Anderson" />
                    <AvatarFallback className="bg-gray-200 text-gray-500 text-lg font-medium">
                        JA
                    </AvatarFallback>
                </Avatar>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <DetailField label="Name" value="John Anderson" />
                    <DetailField label="Email Address" value="john.anderson@email.com" />
                    <DetailField label="Phone Number" value="+1 (555) 123-4567" />
                    <DetailField label="Company" value="Anderson Motors LLC" />
                    <DetailField label="Customer Since" value="November 1, 2025" />
                </div>
            </CardContent>
        </Card>
    )
}

// ── Tab: Shipment History ─────────────────────────────────────────────────────

function ShipmentHistoryTab({ onViewDetails }: { onViewDetails?: (id: string) => void }) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_SHIPMENTS.filter(
        (s) =>
            !search ||
            s.id.toLowerCase().includes(search.toLowerCase()) ||
            s.customerName.toLowerCase().includes(search.toLowerCase()) ||
            s.vehicle.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card>
            <CardContent className="p-5 sm:p-6">
                <div className="mb-6">
                    <SearchFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        filterValue={filter}
                        onFilterChange={setFilter}
                        searchPlaceholder="Search by customer, vehicle or shipment ID"
                        filterOptions={SHIPMENT_FILTER_OPTIONS}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {["Shipment ID", "Customer Name", "Vehicle", "Route", "Status", "Action"].map((h) => (
                                    <th key={h} className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id} className="border-b border-gray-100 last:border-0">
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{s.id}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{s.customerName}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{s.vehicle}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{s.route}</td>
                                    <td className="py-4 pr-6 align-middle">
                                        <ShipmentStatusBadge status={s.status} />
                                    </td>
                                    <td className="py-4 align-middle">
                                        <button
                                            onClick={() => onViewDetails?.(s.id)}
                                            className="text-[#2563EB] text-sm font-medium hover:underline whitespace-nowrap"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Tab: Quote History ────────────────────────────────────────────────────────

function QuoteHistoryTab({ onViewDetails }: { onViewDetails?: (id: string) => void }) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_QUOTES.filter(
        (q) =>
            !search ||
            q.id.toLowerCase().includes(search.toLowerCase()) ||
            q.customerName.toLowerCase().includes(search.toLowerCase()) ||
            q.vehicle.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card>
            <CardContent className="p-5 sm:p-6">
                <div className="mb-6">
                    <SearchFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        filterValue={filter}
                        onFilterChange={setFilter}
                        searchPlaceholder="Search by customer, vehicle or quote ID"
                        filterOptions={QUOTE_FILTER_OPTIONS}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {["Quote ID", "Customer Name", "Vehicle", "Route", "Status", "Action"].map((h) => (
                                    <th key={h} className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((q, i) => (
                                <tr key={q.id} className="border-b border-gray-100 last:border-0">
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{q.id}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{q.customerName}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{q.vehicle}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{q.route}</td>
                                    <td className="py-4 pr-6 align-middle">
                                        <QuoteStatusBadge status={q.status} />
                                    </td>
                                    <td className="py-4 align-middle">
                                        <button
                                            onClick={() => onViewDetails?.(q.id)}
                                            className="text-[#2563EB] text-sm font-medium hover:underline whitespace-nowrap"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Tab: Documents Uploaded ───────────────────────────────────────────────────

function DocumentsUploadedTab() {
    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                <h2 className="text-base font-bold text-[#111827]">Documents</h2>

                <div className="space-y-1">
                    {MOCK_DOCUMENTS.map((doc, i) => (
                        <div
                            key={i + 1}
                            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#111827]">{doc.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Uploaded {doc.uploadedDate}</p>
                                </div>
                            </div>
                            <DocStatusBadge status={doc.status} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// ── Tab: Payment History ──────────────────────────────────────────────────────

function PaymentHistoryTab({ onViewDetails }: { onViewDetails?: (id: string) => void }) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_PAYMENTS.filter(
        (p) =>
            !search ||
            p.shipmentId.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card>
            <CardContent className="p-5 sm:p-6">
                <div className="mb-6">
                    <SearchFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        filterValue={filter}
                        onFilterChange={setFilter}
                        searchPlaceholder="Search by customer, vehicle or shipment ID"
                        filterOptions={PAYMENT_FILTER_OPTIONS}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {["Shipment ID", "Amount", "Date", "Status", "Action"].map((h) => (
                                    <th key={h} className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p, i) => (
                                <tr key={p.shipmentId} className="border-b border-gray-100 last:border-0">
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{p.shipmentId}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{p.amount}</td>
                                    <td className="py-4 pr-6 text-gray-700 align-middle">{p.date}</td>
                                    <td className="py-4 pr-6 align-middle">
                                        <PaymentStatusBadge status={p.status} />
                                    </td>
                                    <td className="py-4 align-middle">
                                        <button
                                            onClick={() => onViewDetails?.(p.shipmentId)}
                                            className="text-[#2563EB] text-sm font-medium hover:underline whitespace-nowrap"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminCustomerDetailPageProps {
    customerId?: string
    onBack?: () => void
    onContactCustomer?: () => void
    onViewShipmentDetails?: (id: string) => void
    onViewQuoteDetails?: (id: string) => void
    onViewPaymentDetails?: (id: string) => void
}

export default function AdminCustomerDetailPage({
    customerId = "CUST-00124",
    onBack,
    onContactCustomer,
    onViewShipmentDetails,
    onViewQuoteDetails,
    onViewPaymentDetails,
}: AdminCustomerDetailPageProps) {
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Customer Details</h1>
                        <p className="text-gray-500 text-sm">{customerId}</p>
                    </div>
                </div>

                <Button
                    className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white shrink-0"
                    onClick={onContactCustomer}
                >
                    Contact Customer
                </Button>
            </div>

            {/* Stat Cards — 3 columns */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard count={25} label="Total Shipments" icon={<TotalShipmentsIcon />} />
                <StatCard count={25} label="Total Quotes" icon={<TotalQuotesIcon />} />
                <StatCard count={25} label="Total Spent" icon={<TotalSpentIcon />} />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6 overflow-x-auto">
                    <TabsTrigger value="profile" className={adminTabTriggerClass}>
                        Profile Information
                    </TabsTrigger>
                    <TabsTrigger value="shipments" className={adminTabTriggerClass}>
                        Shipment History
                    </TabsTrigger>
                    <TabsTrigger value="quotes" className={adminTabTriggerClass}>
                        Quote History
                    </TabsTrigger>
                    <TabsTrigger value="documents" className={adminTabTriggerClass}>
                        Document Uploaded
                    </TabsTrigger>
                    <TabsTrigger value="payments" className={adminTabTriggerClass}>
                        Payment History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileInformationTab />
                </TabsContent>

                <TabsContent value="shipments">
                    <ShipmentHistoryTab onViewDetails={onViewShipmentDetails} />
                </TabsContent>

                <TabsContent value="quotes">
                    <QuoteHistoryTab onViewDetails={onViewQuoteDetails} />
                </TabsContent>

                <TabsContent value="documents">
                    <DocumentsUploadedTab />
                </TabsContent>

                <TabsContent value="payments">
                    <PaymentHistoryTab onViewDetails={onViewPaymentDetails} />
                </TabsContent>
            </Tabs>
        </div>
    )
}