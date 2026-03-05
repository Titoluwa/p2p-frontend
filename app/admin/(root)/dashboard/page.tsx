'use client'

import { Card, CardContent } from "@/components/ui/card"
import { StatCard, QuoteIcon, ShipmentIcon, PendingIcon, FailedIcon, ActionRequiredItem, ActivityItem } from "@/components/admin/comp"
import { ActionItem, ActivityItemType } from "@/components/admin/type"
import { EmptyState } from "@/components/customer-dashboard/empty-state"

// Mock Data
const ACTION_ITEMS: ActionItem[] = [
    { message: "Quote QT-5429 awaiting review" },
    { message: "Document pending approval for shipment #SHP-2026-003" },
    { message: "3 payments require confirmation" },
    { message: "2 support ticket awaiting response" },
]

const ACTIVITY_ITEMS: ActivityItemType[] = [
    { message: "New quote submitted by John Anderson", timeAgo: "5 minutes ago" },
    { message: "Document uploaded for shipment #SH-1024", timeAgo: "12 minutes ago" },
    { message: 'Shipment #SH-1019 status updated to "In Transit"', timeAgo: "28 minutes ago" },
    { message: "Payment received for shipment #SH-1015", timeAgo: "1 hour ago" },
    { message: "Quote #QT-5423 accepted by Maria Santos", timeAgo: "2 hours ago" },
]

interface AdminDashboardPageProps {
    onViewDetails?: (item: ActionItem) => void
    isEmpty?: boolean
}

export default function AdminDashboardPage({ onViewDetails, isEmpty = false  }: AdminDashboardPageProps) {
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Dashboard</h1>
                <p className="text-gray-600 text-sm sm:text-base">Overview of system operations</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard count={isEmpty? 0 : 5} label="New Quote Requests" icon={<QuoteIcon />} />
                <StatCard count={isEmpty? 0 : 10} label="Active Shipments" icon={<ShipmentIcon />} />
                <StatCard count={isEmpty? 0 : 11} label="Pending Documents" icon={<PendingIcon />} />
                <StatCard count={isEmpty? 0 : 3} label="Failed Payments" icon={<FailedIcon />} />
            </div>

            {isEmpty ? (
                <EmptyState emptyText="No Activity Yet"/>
            ) : (
                <>

                    {/* Action Required */}
                    <Card className="bg-[#F8FAFC] border-[0.5px] border-[#999999]">
                        <CardContent className="p-5 sm:p-6">
                            <h2 className="text-[20px] font-bold text-[#111827] mb-2">Action Required</h2>
                            <div>
                                {ACTION_ITEMS.map((item, i) => (
                                    <ActionRequiredItem
                                        key={i + 1}
                                        message={item.message}
                                        onViewDetails={() => onViewDetails?.(item)}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="bg-[#F8FAFC] border-[0.5px] border-[#999999]">
                        <CardContent className="p-5 sm:p-6">
                            <h2 className="text-[20px] font-bold text-[#111827] mb-2">Recent Activity</h2>
                            <div>
                                {ACTIVITY_ITEMS.map((item, i) => (
                                    <ActivityItem key={i + 1} message={item.message} timeAgo={item.timeAgo} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

        </div>
    )
}