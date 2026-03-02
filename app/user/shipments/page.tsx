'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { FILTER_OPTIONS, Shipment, TabFilter } from "@/lib/types/constant"
import { Pagination } from "@/components/user-shipment/pagination"
import { ActiveIcon, CompletedIcon, FailedIcon, PendingIcon, StatCard, StatusBadge } from "@/components/user-shipment/status-icon"
import { TabBar } from "@/components/user-shipment/bars"
import { FilterDropdown } from "@/components/customer-dashboard/filter-dropdown"
import { EmptyState } from "@/components/customer-dashboard/empty-state"

// ── Mock Data

const MOCK_SHIPMENTS: Shipment[] = [
    {
        id: "SHP-2026-001",
        vehicle: "BMW 3 Series\n2022",
        route: "Southampton, UK\n→ Lagos, Nigeria",
        status: "In Transit",
        estimatedArrival: "10/02/2026",
    },
    {
        id: "SHP-2026-002",
        vehicle: "Toyota Land\nCruiser 2023",
        route: "Liverpool, UK\n→ Dubai, UAE",
        status: "Loaded On Vessel",
        estimatedArrival: "10/02/2026",
    },
    {
        id: "SHP-2025-156",
        vehicle: "Mercedes-\nBenz Sprinter 2021",
        route: "London, UK\n→ Kingston, Jamaica",
        status: "Completed",
        estimatedArrival: "10/02/2026",
    },
    {
        id: "SHP-2025-156",
        vehicle: "Audi A4 2020",
        route: "Manchester, UK\n→ Accra, Ghana",
        status: "Vehicle Received",
        estimatedArrival: "10/02/2026",
    },
    {
        id: "SHP-2025-156",
        vehicle: "BMW 3 Series 2022",
        route: "Southampton, UK\n→ Lagos, Nigeria",
        status: "In Transit",
        estimatedArrival: "10/02/2026",
    },
    {
        id: "SHP-2025-156",
        vehicle: "Toyota Land\nCruiser 2023",
        route: "Southampton, UK\n→ Lagos, Nigeria",
        status: "In Transit",
        estimatedArrival: "10/02/2026",
    },
]

// ── Main Page
interface MyShipmentsPageProps {
    onViewDetails?: (id: string) => void
    onRequestQuote?: () => void
    isEmpty?: boolean
}

export default function MyShipmentsPage({ onViewDetails, onRequestQuote, isEmpty = false, }: Readonly<MyShipmentsPageProps>) {
    const [activeTab, setActiveTab] = useState<TabFilter>("All")
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const stats = isEmpty
        ? { active: 0, completed: 0, pending: 0, failed: 0 }
        : { active: 25, completed: 25, pending: 25, failed: 25 }

    const shipments = isEmpty ? [] : MOCK_SHIPMENTS

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">
                        My Shipments
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage and track all your vehicle shipments
                    </p>
                </div>
                <Button
                    className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white shrink-0"
                    onClick={onRequestQuote}
                >
                    Request a Quote
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard count={stats.active} label="Active Shipments" icon={<ActiveIcon />} />
                <StatCard count={stats.completed} label="Completed Shipments" icon={<CompletedIcon />} />
                <StatCard count={stats.pending} label="Pending Shipments" icon={<PendingIcon />} />
                <StatCard count={stats.failed} label="Failed Shipments" icon={<FailedIcon />} />
            </div>

            {/* Tab Bar */}
            <TabBar active={activeTab} onChange={setActiveTab} />

            {/* Content */}
            {isEmpty ? (
                <EmptyState emptyText="No Shipment Found" />
            ) : (
                <Card>
                    <CardContent className="p-5 sm:p-6">
                        <h2 className="text-lg font-bold text-[#111827] mb-5">All Shipments</h2>

                        {/* Search + Filter */}
                        <div className="flex gap-3 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search for shipment ID, route or status"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <FilterDropdown options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        {["Shipment ID", "Vehicle", "Route", "Status", "Estimated Arrival", "Action"].map(h => (
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
                                    {shipments.map((s, i) => (
                                        <tr key={i+1} className="border-b border-gray-100 last:border-0">
                                            <td className="py-4 pr-6 text-gray-700 align-top">{s.id}</td>
                                            <td className="py-4 pr-6 text-gray-700 align-top whitespace-pre-line">{s.vehicle}</td>
                                            <td className="py-4 pr-6 text-gray-700 align-top whitespace-pre-line">{s.route}</td>
                                            <td className="py-4 pr-6 align-top">
                                                <StatusBadge status={s.status} />
                                            </td>
                                            <td className="py-4 pr-6 text-gray-700 align-top">{s.estimatedArrival}</td>
                                            <td className="py-4 align-top">
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
            )}
        </div>
    )
}