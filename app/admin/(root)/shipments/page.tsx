'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard, SearchFilterBar, Pagination } from "@/components/admin/comp"
// import { QuoteStatus } from "@/components/admin/type"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type ShipmentStatus = "In Transit" | "Delivered" | "Custom Clearance" | "Delayed" | "Port of Origin" | "Port of Destination"

interface Shipment {
    id: string
    customerName: string
    vehicle: string
    route: string
    status: ShipmentStatus
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_SHIPMENTS: Shipment[] = [
    { id: "QT-5429", customerName: "John Anderson", vehicle: "Toyota Camry 2020", route: "Los Angeles → Tokyo", status: "In Transit" },
    { id: "QT-5428", customerName: "Maria Santos", vehicle: "WilliamsMercedes C-...", route: "New York → London", status: "In Transit" },
    { id: "QT-5427", customerName: "Sarah Williams", vehicle: "Honda CR-V 2021", route: "Miami → Dubai", status: "Delivered" },
    { id: "QT-5426", customerName: "David Park", vehicle: "BMW X5 2022", route: "Seattle → Sydney", status: "Custom Clearance" },
    { id: "QT-5425", customerName: "Robert Chen", vehicle: "Mercedes C-Class 2019", route: "San Francisco → Seoul", status: "Delivered" },
    { id: "QT-5424", customerName: "Emma Johnson", vehicle: "Audi A4 2020", route: "Chicago → Hamburg", status: "Delayed" },
    { id: "QT-5423", customerName: "Michael Brown", vehicle: "Ford F-150 2021", route: "Houston → Rotterdam", status: "Delayed" },
    { id: "QT-5422", customerName: "Lisa Garcia", vehicle: "Nissan Altima 2022", route: "Phoenix → Barcelona", status: "Delivered" },
]

const FILTER_OPTIONS = ["All", "Active", "Completed", "Delayed"]

// ── Stat Icons ────────────────────────────────────────────────────────────────

function AllShipmentsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function ActiveShipmentsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function CompletedShipmentsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function DelayedShipmentsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

// ── Shipment Status Badge ─────────────────────────────────────────────────────

function ShipmentStatusBadge({ status }: { status: ShipmentStatus }) {
    const styles: Record<ShipmentStatus, string> = {
        "In Transit": "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0",
        "Delivered": "bg-green-100 text-green-700 hover:bg-green-100 border-0",
        "Custom Clearance": "bg-purple-100 text-purple-700 hover:bg-purple-100 border-0",
        "Delayed": "bg-red-100 text-red-700 hover:bg-red-100 border-0",
        "Port of Origin": "bg-gray-100 text-gray-700 hover:bg-gray-100 border-0",
        "Port of Destination": "bg-orange-100 text-orange-700 hover:bg-orange-100 border-0",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1", styles[status])}>
            {status}
        </Badge>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminShipmentsPageProps {
    onViewDetails?: (shipmentId: string) => void
}

export default function AdminShipmentsPage({ onViewDetails }: AdminShipmentsPageProps) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_SHIPMENTS.filter((s) => {
        const matchesSearch =
            !search ||
            s.id.toLowerCase().includes(search.toLowerCase()) ||
            s.customerName.toLowerCase().includes(search.toLowerCase()) ||
            s.vehicle.toLowerCase().includes(search.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Shipments</h1>
                <p className="text-gray-600 text-sm sm:text-base">Create and manage active shipments</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard count={25} label="All Shipments" icon={<AllShipmentsIcon />} />
                <StatCard count={25} label="Active Shipments" icon={<ActiveShipmentsIcon />} />
                <StatCard count={25} label="Completed Shipments" icon={<CompletedShipmentsIcon />} />
                <StatCard count={25} label="Delayed Shipments" icon={<DelayedShipmentsIcon />} />
            </div>

            {/* Shipments Table */}
            <Card>
                <CardContent className="p-5 sm:p-6">
                    {/* Search + Filter */}
                    <div className="mb-6">
                        <SearchFilterBar
                            search={search}
                            onSearchChange={setSearch}
                            filterValue={filter}
                            onFilterChange={setFilter}
                            searchPlaceholder="Search by customer, vehicle or shipment ID"
                            filterOptions={FILTER_OPTIONS}
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {["Shipment ID", "Customer Name", "Vehicle", "Route", "Status", "Action"].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((s, i) => (
                                    <tr key={i + 1} className="border-b border-gray-100 last:border-0">
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

                    <Pagination current={1} total={40} />
                </CardContent>
            </Card>
        </div>
    )
}