'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard, SearchFilterBar, Pagination } from "@/components/admin/comp"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type TicketStatus = "Open" | "In Progress" | "Closed"
type TicketPriority = "High" | "Medium" | "Low"

interface Ticket {
    id: string
    customerName: string
    subject: string
    priority: TicketPriority
    status: TicketStatus
}

interface Message {
    sender: string
    isAdmin: boolean
    timestamp: string
    content: string
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_TICKETS: Ticket[] = [
    { id: "TKT-1024", customerName: "John Anderson", subject: "Question about shipme...", priority: "Medium", status: "Open" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Need update on custom...", priority: "Medium", status: "Open" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Request for delivery confi...", priority: "Low", status: "Open" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Payment receipt not re...", priority: "High", status: "In Progress" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Inquiry about insuranc...", priority: "Low", status: "Closed" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Delayed shipment concern", priority: "Medium", status: "Closed" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Quote revision request", priority: "Low", status: "Closed" },
    { id: "TKT-1024", customerName: "John Anderson", subject: "Question about shipme...", priority: "Medium", status: "Closed" },
]

const FILTER_OPTIONS = ["All", "Open Ticket", "In Progress", "Closed Ticket"]

// ── Stat Icons ────────────────────────────────────────────────────────────────

function OpenTicketsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 8h1a4 4 0 010 8h-1" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 1v3M10 1v3M14 1v3" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function ClosedTicketsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 8h1a4 4 0 010 8h-1" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 1v3M10 1v3M14 1v3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

function PendingTicketsIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

// ── Priority Badge ────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: TicketPriority }) {
    const styles: Record<TicketPriority, string> = {
        High: "bg-red-100 text-red-700 hover:bg-red-100",
        Medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        Low: "bg-green-100 text-green-700 hover:bg-green-100",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0", styles[priority])}>
            {priority}
        </Badge>
    )
}

// ── Ticket Status Badge ───────────────────────────────────────────────────────

function TicketStatusBadge({ status }: { status: TicketStatus }) {
    const styles: Record<TicketStatus, string> = {
        Open: "bg-blue-100 text-blue-700 hover:bg-blue-100",
        "In Progress": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        Closed: "bg-gray-100 text-gray-600 hover:bg-gray-100",
    }
    return (
        <Badge className={cn("font-medium text-xs px-3 py-1 border-0", styles[status])}>
            {status}
        </Badge>
    )
}

// ── Support List Page ─────────────────────────────────────────────────────────

interface AdminSupportPageProps {
    onViewDetails?: (ticketId: string) => void
}

export default function AdminSupportPage({ onViewDetails }: AdminSupportPageProps) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = MOCK_TICKETS.filter(
        (t) =>
            !search ||
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.customerName.toLowerCase().includes(search.toLowerCase()) ||
            t.subject.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Support</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Manage customer enquiries and support tickets
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard count={25} label="Open Tickets" icon={<OpenTicketsIcon />} />
                <StatCard count={25} label="Closed Tickets" icon={<ClosedTicketsIcon />} />
                <StatCard count={25} label="Pending Tickets" icon={<PendingTicketsIcon />} />
            </div>

            {/* Tickets Table */}
            <Card>
                <CardContent className="p-5 sm:p-6">
                    <div className="mb-6">
                        <SearchFilterBar
                            search={search}
                            onSearchChange={setSearch}
                            filterValue={filter}
                            onFilterChange={setFilter}
                            searchPlaceholder="Search by customer, subject or ticket ID"
                            filterOptions={FILTER_OPTIONS}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {["Ticket ID", "Customer Name", "Subject", "Priority", "Status", "Action"].map((h) => (
                                        <th key={h} className="text-left font-semibold text-[#111827] pb-3 pr-6 last:pr-0">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((t) => (
                                    <tr key={t.id} className="border-b border-gray-100 last:border-0">
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{t.id}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{t.customerName}</td>
                                        <td className="py-4 pr-6 text-gray-500 align-middle max-w-[180px] truncate">
                                            {t.subject}
                                        </td>
                                        <td className="py-4 pr-6 align-middle">
                                            <PriorityBadge priority={t.priority} />
                                        </td>
                                        <td className="py-4 pr-6 align-middle">
                                            <TicketStatusBadge status={t.status} />
                                        </td>
                                        <td className="py-4 align-middle">
                                            <button
                                                onClick={() => onViewDetails?.(t.id)}
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