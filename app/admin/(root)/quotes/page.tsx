'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StatCard, QuoteIcon, AllQuotesIcon, AcceptedIcon, PendingIcon, QuoteStatusBadge, SearchFilterBar, Pagination,} from "@/components/admin/comp"
import { Quote, FILTER_OPTIONS } from "@/components/admin/type"

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_QUOTES: Quote[] = [
    { id: "QT-5429", customerName: "John Anderson", vehicle: "Toyota Camry 2020", route: "Los Angeles → Tokyo", status: "New" },
    { id: "QT-5428", customerName: "Maria Santos", vehicle: "WilliamsMercedes C-...", route: "New York → London", status: "In Review" },
    { id: "QT-5427", customerName: "Sarah Williams", vehicle: "Honda CR-V 2021", route: "Miami → Dubai", status: "New" },
    { id: "QT-5426", customerName: "David Park", vehicle: "BMW X5 2022", route: "Seattle → Sydney", status: "In Review" },
    { id: "QT-5425", customerName: "Robert Chen", vehicle: "Mercedes C-Class 2019", route: "San Francisco → Seoul", status: "Accepted" },
    { id: "QT-5424", customerName: "Emma Johnson", vehicle: "Audi A4 2020", route: "Chicago → Hamburg", status: "Sent" },
    { id: "QT-5423", customerName: "Michael Brown", vehicle: "Ford F-150 2021", route: "Houston → Rotterdam", status: "New" },
    { id: "QT-5422", customerName: "Lisa Garcia", vehicle: "Nissan Altima 2022", route: "Phoenix → Barcelona", status: "Pending" },
]   

// ── Main Page ─────────────────────────────────────────────────────────────────

interface AdminQuotesPageProps {
    onViewDetails?: (quoteId: string) => void
}

export default function AdminQuotesPage({ onViewDetails }: AdminQuotesPageProps) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState(FILTER_OPTIONS[0])

    const filtered = MOCK_QUOTES.filter(q => {
        const matchesSearch =
            !search ||
            q.id.toLowerCase().includes(search.toLowerCase()) ||
            q.customerName.toLowerCase().includes(search.toLowerCase()) ||
            q.vehicle.toLowerCase().includes(search.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Quotes</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Review and manage customer quote requests
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard count={25} label="New Quotes" icon={<QuoteIcon />} />
                <StatCard count={25} label="All Quotes" icon={<AllQuotesIcon />} />
                <StatCard count={25} label="Accepted Quotes" icon={<AcceptedIcon />} />
                <StatCard count={25} label="Pending Quotes" icon={<PendingIcon />} />
            </div>

            {/* Quotes Table */}
            <Card className="bg-[#F8FAFC] border-[0.5px] border-[#999999]">
                <CardContent className="p-5 sm:p-6">
                    {/* Search + Filter */}
                    <div className="mb-6">
                        <SearchFilterBar
                            search={search}
                            onSearchChange={setSearch}
                            filterValue={filter}
                            onFilterChange={setFilter}
                            searchPlaceholder="Search by customer, vehicle or quote ID"
                            filterOptions={FILTER_OPTIONS}
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-[0.5px] border-[#6B7280]">
                                    {["Quote ID", "Customer Name", "Vehicle", "Route", "Status", "Action"].map(h => (
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
                                {filtered.map((q, i) => (
                                    <tr key={i + 1} className="border-b-[0.5px] border-[#BFBFBF] last:border-0">
                                        <td className="py-4 pr-6 text-[#6B7280] align-middle">{q.id}</td>
                                        <td className="py-4 pr-6 text-[#6B7280] align-middle">{q.customerName}</td>
                                        <td className="py-4 pr-6 text-[#6B7280] align-middle">{q.vehicle}</td>
                                        <td className="py-4 pr-6 text-[#6B7280] align-middle">{q.route}</td>
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

                    <Pagination current={1} total={40} />
                </CardContent>
            </Card>
        </div>
    )
}