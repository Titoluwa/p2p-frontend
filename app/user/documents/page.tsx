'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Download } from "lucide-react"
import { FILTER_OPTIONS, MainDocument } from "@/lib/types/constant" 
import { EmptyState } from "@/components/customer-dashboard/empty-state"
import { DocStatusBadge, Pagination } from "@/components/customer-dashboard/documentation/status"
import { FilterDropdown } from "@/components/customer-dashboard/filter-dropdown"

// ── Mock Data 

const MOCK_DOCUMENTS: MainDocument[] = [
    {
        filename: "vehicle_registration_bmw.pdf",
        type: "Vehicle Registration",
        shipment: "SHP-2026-001",
        uploadDate: "14/01/2026",
        status: "Approved",
    },
    {
        filename: "passport_copy.pdf",
        type: "ID Document",
        shipment: "SHP-2026-001",
        uploadDate: "14/01/2026",
        status: "Approved",
    },
    {
        filename: "insurance_certificate.pdf",
        type: "Insurance Certificate",
        shipment: "SHP-2026-002",
        uploadDate: "19/01/2026",
        status: "Approved",
    },
    {
        filename: "bill_of_sale_audi.pdf",
        type: "Bill of Sale",
        shipment: "SHP-2026-003",
        uploadDate: "26/01/2026",
        status: "Pending",
    },
    {
        filename: "export_certificate.pdf",
        type: "Export Certificate",
        shipment: "SHP-2026-003",
        uploadDate: "27/01/2026",
        status: "Pending",
    },
]

const REQUIREMENTS = [
    "All documents must be clear and legible",
    "Accepted formats: PDF, JPG, PNG",
    "Maximum file size: 10MB",
    "Required documents: Vehicle Registration, ID Document, Bill of Sale",
]

interface DocumentsPageProps {
    isEmpty?: boolean
    onUpload?: () => void
}

export default function DocumentsPage({ isEmpty = true, onUpload }: Readonly<DocumentsPageProps>) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const documents = isEmpty ? [] : MOCK_DOCUMENTS

    const filtered = documents.filter(doc => {
        const matchesSearch =
            !search ||
            doc.filename.toLowerCase().includes(search.toLowerCase()) ||
            doc.type.toLowerCase().includes(search.toLowerCase()) ||
            doc.shipment.toLowerCase().includes(search.toLowerCase())
        const matchesFilter =
            filter === "Status" || filter === "All" || doc.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">
                        Documents
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Upload and manage your shipping documents
                    </p>
                </div>
                <Button
                    className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white shrink-0"
                    onClick={onUpload}
                >
                    Upload Document
                </Button>
            </div>

            {/* Document Requirements */}
            <Card>
                <CardContent className="p-5 sm:p-6">
                    <h2 className="text-base font-bold text-[#111827] mb-3">
                        Document Requirements
                    </h2>
                    <ul className="space-y-1.5">
                        {REQUIREMENTS.map((req, i) => (
                            <li key={i + 1} className="text-sm text-gray-600">
                                • {req}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Your Documents or Empty State */}
            {isEmpty ? (
                <EmptyState emptyText="No Document Found" />
            ) : (
                <Card>
                    <CardContent className="p-5 sm:p-6">
                        <h2 className="text-lg font-bold text-[#111827] mb-1">Your Documents</h2>
                        <p className="text-sm text-gray-500 mb-5">
                            All uploaded documents and their verification status
                        </p>

                        {/* Search + Filter */}
                        <div className="flex gap-3 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search for file name, type or shipment ID"
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
                                        {["File Name", "Type", "Shipment", "Upload Date", "Status", "Action"].map(h => (
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
                                    {filtered.map((doc, i) => (
                                        <tr key={i + 1} className="border-b border-gray-100 last:border-0">
                                            {/* File Name */}
                                            <td className="py-4 pr-6 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                                                        <FileText className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                    <span className="text-gray-700 break-all max-w-[140px]">
                                                        {doc.filename}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-6 text-gray-700 align-middle">{doc.type}</td>
                                            <td className="py-4 pr-6 text-gray-700 align-middle">{doc.shipment}</td>
                                            <td className="py-4 pr-6 text-gray-700 align-middle">{doc.uploadDate}</td>
                                            <td className="py-4 pr-6 align-middle">
                                                <DocStatusBadge status={doc.status} />
                                            </td>
                                            <td className="py-4 align-middle">
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                                    aria-label="Download document"
                                                >
                                                    <Download className="w-5 h-5" />
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