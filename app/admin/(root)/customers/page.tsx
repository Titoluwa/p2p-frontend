'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard, SearchFilterBar, Pagination } from "@/components/admin/comp"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type CustomerStatus = "Active" | "Inactive"

interface Customer {
    id: string
    name: string
    email: string
    shipments: number
    status: CustomerStatus
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_CUSTOMERS: Customer[] = [
    { id: "CUST-00124", name: "John Anderson", email: "john.anderson@gmail.com", shipments: 3, status: "Active" },
    { id: "CUST-00125", name: "Maria Santos", email: "maria.santos@gmail.com", shipments: 5, status: "Active" },
    { id: "CUST-00126", name: "Sarah Williams", email: "sarah.williams@gmail.com", shipments: 10, status: "Active" },
    { id: "CUST-00127", name: "David Park", email: "david.park@gmail.com", shipments: 1, status: "Active" },
    { id: "CUST-00128", name: "Robert Chen", email: "robert.chen@gmail.com", shipments: 0, status: "Inactive" },
    { id: "CUST-00129", name: "Emma Johnson", email: "emma.johnson@gmail.com", shipments: 20, status: "Active" },
    { id: "CUST-00130", name: "Michael Brown", email: "michael.brown@gmail.com", shipments: 12, status: "Active" },
    { id: "CUST-00131", name: "Lisa Garcia", email: "lisa.garcia@gmail.com", shipments: 7, status: "Active" },
]

const FILTER_OPTIONS = ["Active", "Inactive"]

// ── Stat Icons ────────────────────────────────────────────────────────────────

function InactiveCustomersIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function ActiveCustomersIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

// ── Customer Status Badge ─────────────────────────────────────────────────────

function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
    return (
        <Badge
            className={cn(
                "font-medium text-xs px-3 py-1 border-0 hover:opacity-90",
                status === "Active"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
            )}
        >
            {status}
        </Badge>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminCustomersPageProps {
    onViewDetails?: (customerId: string) => void
}

export default function AdminCustomersPage({ onViewDetails }: AdminCustomersPageProps) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_CUSTOMERS.filter((c) => {
        const matchesSearch =
            !search ||
            c.id.toLowerCase().includes(search.toLowerCase()) ||
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        const matchesFilter =
            filter === "Status" || c.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Customers</h1>
                <p className="text-gray-600 text-sm sm:text-base">View and manage customer accounts</p>
            </div>

            {/* Stat Cards — 2 columns */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard count={25} label="Inactive Customers" icon={<InactiveCustomersIcon />} />
                <StatCard count={25} label="Active Customers" icon={<ActiveCustomersIcon />} />
            </div>

            {/* Customers Table */}
            <Card>
                <CardContent className="p-5 sm:p-6">
                    {/* Search + Filter */}
                    <div className="mb-6">
                        <SearchFilterBar
                            search={search}
                            onSearchChange={setSearch}
                            filterValue={filter}
                            onFilterChange={setFilter}
                            searchPlaceholder="Search by name, email or customer ID"
                            filterOptions={FILTER_OPTIONS}
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {["Customer ID", "Customer Name", "Email Address", "Number of Shipments", "Status", "Action"].map((h) => (
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
                                {filtered.map((c, i) => (
                                    <tr key={i+1} className="border-b border-gray-100 last:border-0">
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{c.id}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{c.name}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{c.email}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{c.shipments}</td>
                                        <td className="py-4 pr-6 align-middle">
                                            <CustomerStatusBadge status={c.status} />
                                        </td>
                                        <td className="py-4 align-middle">
                                            <button
                                                onClick={() => onViewDetails?.(c.id)}
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