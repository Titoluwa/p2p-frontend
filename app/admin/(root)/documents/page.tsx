'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard, SearchFilterBar, Pagination } from "@/components/admin/comp"
import { cn } from "@/lib/utils"

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

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_DOCUMENTS: Document[] = [
    { id: "DOC-1024", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
    { id: "DOC-1025", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
    { id: "DOC-1026", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Rejected" },
    { id: "DOC-1027", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Pending" },
    { id: "DOC-1028", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
    { id: "DOC-1029", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
    { id: "DOC-1030", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
    { id: "DOC-1031", name: "Bill of Lading", customerName: "John Anderson", shipmentId: "SH-1024", uploadDate: "Jan 30, 2026", status: "Approved" },
]

const FILTER_OPTIONS = ["All", "Approved", "Pending", "Rejected"]

// ── Stat Icons ────────────────────────────────────────────────────────────────

function AllDocsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="3" width="14" height="18" rx="2" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function ApprovedDocsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="3" width="14" height="18" rx="2" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

function PendingDocsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function RejectedDocsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M12 8v4M12 16v.5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
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

// ── Admin Documents List Page ─────────────────────────────────────────────────

interface AdminDocumentsPageProps {
    onViewDetails?: (documentId: string) => void
}

export default function AdminDocumentsPage({ onViewDetails }: AdminDocumentsPageProps) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_DOCUMENTS.filter((d) => {
        const matchesSearch =
            !search ||
            d.id.toLowerCase().includes(search.toLowerCase()) ||
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.customerName.toLowerCase().includes(search.toLowerCase()) ||
            d.shipmentId.toLowerCase().includes(search.toLowerCase())
        const matchesFilter =
            filter === "Status" || filter === "All" || d.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Documents</h1>
                <p className="text-gray-600 text-sm sm:text-base">Review and approve customer documents</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard count={25} label="All Documents" icon={<AllDocsIcon />} />
                <StatCard count={25} label="Approved Documents" icon={<ApprovedDocsIcon />} />
                <StatCard count={25} label="Pending Documents" icon={<PendingDocsIcon />} />
                <StatCard count={25} label="Rejected Documents" icon={<RejectedDocsIcon />} />
            </div>

            {/* Documents Table */}
            <Card>
                <CardContent className="p-5 sm:p-6">
                    <div className="mb-6">
                        <SearchFilterBar
                            search={search}
                            onSearchChange={setSearch}
                            filterValue={filter}
                            onFilterChange={setFilter}
                            searchPlaceholder="Search by document name, customer or shipment ID"
                            filterOptions={FILTER_OPTIONS}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {["Document Name", "Customer Name", "Shipment ID", "Upload Date", "Status", "Action"].map((h) => (
                                        <th key={h} className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((d, i) => (
                                    <tr key={i + d.id} className="border-b border-gray-100 last:border-0">
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{d.name}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{d.customerName}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{d.shipmentId}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{d.uploadDate}</td>
                                        <td className="py-4 pr-6 align-middle">
                                            <DocStatusBadge status={d.status} />
                                        </td>
                                        <td className="py-4 align-middle">
                                            <button
                                                onClick={() => onViewDetails?.(d.id)}
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