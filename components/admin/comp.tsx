'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronLeft, ChevronRight, FileText, Ship, Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActivityItemType, QuoteStatus } from "./type"

// Stat Card

interface StatCardProps {
    count: number
    label: string
    icon: React.ReactNode
}

export function StatCard({ count, label, icon }: Readonly<StatCardProps>) {
    return (
        <Card className="bg-[#F8FAFC] border-[0.5px] border-[#999999]">
            <CardContent className="flex items-center gap-4 p-4">
                {icon}
                <div>
                    <p className="text-2xl font-bold text-[#111827]">{count}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
            </CardContent>
        </Card>
    )
}

// Stat Icon Variants

export function QuoteIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#DADEE2] flex items-center justify-center shrink-0">
            <FileText className="text-[#6B7280]" />
        </div>
    )
}

export function ShipmentIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#DCF1E4] flex items-center justify-center shrink-0">
            <Ship className="text-[#16A34A]" />
        </div>
    )
}

export function PendingIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#FEF0DA] flex items-center justify-center shrink-0">
            <Loader className="text-[#F2A900]" />
        </div>
    )
}

export function FailedIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#FDE8E8] flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="1.5" />
                <path d="M12 8v4M12 16v.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export function AllQuotesIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#DEE8FC] flex items-center justify-center shrink-0">
            <FileText className="text-[#2563EB]" />
        </div>
    )
}

export function AcceptedIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-[#DCF1E4] flex items-center justify-center shrink-0">
            <FileText className="text-[#16A34A]" />
        </div>
    )
}

// Quote Status Badge

export function QuoteStatusBadge({ status }: Readonly<{ status: QuoteStatus }>) {
    const styles: Record<QuoteStatus, string> = {
        New: "bg-[#DEE8FC] text-[#2563EB] hover:bg-[#DEE8FC]/90 border-0",
        "In Review": "bg-[#FEF0DA] text-[#F2A900] hover:bg-[#FEF0DA]/90 border-0",
        Sent: "bg-[#DADEE2] text-[#6B7280] hover:bg-[#DADEE2]/90 border-0",
        Accepted: "bg-[#DCF1E4] text-[#16A34A] hover:bg-[#DCF1E4]/90 border-0",
        Pending: "bg-[#FEF0DA] text-[#F2A900] hover:bg-[#FEF0DA]/90 border-0",
    }
    return (
        <Badge className={cn("font-medium rounded-sm text-xs px-3 py-1", styles[status])}>
            {status}
        </Badge>
    )
}

// Action Required Item

export function ActionRequiredItem({ message, onViewDetails }: Readonly<{ message: string; onViewDetails?: () => void }>) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                {/* Alert icon */}
                <div className="w-9 h-9 rounded-full bg-[#FADEDE] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="1.5" />
                        <path d="M12 8v4M12 16v.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <p className="text-sm text-[#111827]">{message}</p>
            </div>
            <button
                onClick={onViewDetails}
                className="text-[#2563EB] text-sm font-medium hover:underline whitespace-nowrap ml-4"
            >
                View Details
            </button>
        </div>
    )
}

// Recent Activity Item

export function ActivityItem({ message, timeAgo }: Readonly<ActivityItemType>) {
    return (
        <div className="flex items-start gap-3 py-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
            <div>
                <p className="text-sm font-medium text-[#111827]">{message}</p>
                <p className="text-xs text-gray-400 mt-0.5">{timeAgo}</p>
            </div>
        </div>
    )
}

// Search + Filter Bar

interface SearchFilterBarProps {
    search: string
    onSearchChange: (v: string) => void
    filterValue: string
    onFilterChange: (v: string) => void
    searchPlaceholder?: string
    filterOptions: string[]
}

export function SearchFilterBar({
    search,
    onSearchChange,
    filterValue,
    onFilterChange,
    searchPlaceholder = "Search...",
    filterOptions,
}: Readonly<SearchFilterBarProps>) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex gap-3 items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder={searchPlaceholder} value={search} onChange={e => onSearchChange(e.target.value)} className="pl-9 bg-[#F8FAFC] border-[0.5px] border-[#999999]" />
            </div>

            <div className="relative">
                <button type="button" onClick={() => setOpen(p => !p)}
                    className="flex items-center gap-2 border-[0.5px] border-[#999999] rounded-lg px-4 py-2.5 text-sm bg-[#F8FAFC] hover:border-[#6B7280] min-w-[200px] justify-between"
                >
                    <span>
                        <span className="text-gray-500">Filter by: </span>
                        <span className="text-gray-800 font-medium">{filterValue}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-800" />
                </button>

                {open && (
                    <div className="absolute right-0 z-50 mt-1 w-52 bg-[#F8FAFC] border-[0.5px] border-[#999999] rounded-lg shadow-lg overflow-hidden">
                        {filterOptions.map(opt => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onFilterChange(opt); setOpen(false) }}
                                className="w-full text-left px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// Pagination 

interface PaginationProps {
    current?: number
    total?: number
    resultCount?: string
}

export function Pagination({
    current = 1,
    total = 40,
    resultCount = "Showing 1–12 of 100 results",
}: Readonly<PaginationProps>) {
    const pages = [1, 2, 3, 4]
    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">{resultCount}</p>
            <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                {pages.map(p => (
                    <button
                        key={p}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors",
                            p === current
                                ? "bg-[#2563EB] text-white"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        {p}
                    </button>
                ))}
                <span className="px-1 text-gray-400 text-sm">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                    {total}
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

// Detail Field 

export function DetailField({ label, value }: Readonly<{ label: string; value: string }>) {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-[#111827]">{value}</p>
        </div>
    )
}

// Shared Tab Trigger Class

export const adminTabTriggerClass =
    "rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-sm text-[#6B7280] data-[state=active]:text-[#111827] data-[state=active]:font-semibold"