'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download } from "lucide-react"
import { Payment, PAYMENT_FILTER_OPTIONS } from "@/lib/types/constant"
import { FilterDropdown } from "@/components/customer-dashboard/filter-dropdown"
import { PaymentStatusBadge, PaymentStatCard, TotalCostIcon, AmountPaidIcon, OutstandingIcon, Pagination } from "@/components/customer-dashboard/payment/status"
import { EmptyState } from "@/components/customer-dashboard/empty-state"

// ── Mock Data

const MOCK_PAYMENTS: Payment[] = [
    { paymentId: "PAY-001", shipmentId: "SHP-2026-001", date: "15/01/2026", amount: "£1,250.00", status: "Completed" },
    { paymentId: "PAY-001", shipmentId: "SHP-2026-001", date: "15/01/2026", amount: "£1,250.00", status: "Completed" },
    { paymentId: "PAY-001", shipmentId: "SHP-2026-001", date: "15/01/2026", amount: "£1,250.00", status: "Pending" },
    { paymentId: "PAY-001", shipmentId: "SHP-2026-001", date: "15/01/2026", amount: "£1,250.00", status: "Completed" },
    { paymentId: "PAY-001", shipmentId: "SHP-2026-001", date: "15/01/2026", amount: "£1,250.00", status: "Pending" },
]   

interface PaymentsPageProps {
    onMakePayment?: () => void
    isEmpty?: boolean
}

export default function PaymentsPage({ onMakePayment, isEmpty = true }: Readonly<PaymentsPageProps>) {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Status")

    const filtered = isEmpty ? [] : MOCK_PAYMENTS.filter(p => {
        const matchesSearch =
            !search ||
            p.paymentId.toLowerCase().includes(search.toLowerCase()) ||
            p.shipmentId.toLowerCase().includes(search.toLowerCase())
        const matchesFilter =
            filter === "Status" || filter === "All" || p.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">
                        Payments
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        View your payment history and outstanding balances
                    </p>
                </div>
                <Button
                    className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white shrink-0"
                    onClick={onMakePayment}
                >
                    Make a Payment
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PaymentStatCard
                    amount={isEmpty ? "£0.00" : "£4,150.00"}
                    label="Total Cost"
                    icon={<TotalCostIcon />}
                />
                <PaymentStatCard
                    amount={isEmpty ? "£0.00" : "£3,050.00"}
                    label="Amount Paid"
                    icon={<AmountPaidIcon />}
                />
                <PaymentStatCard
                    amount={isEmpty ? "£0.00" : "£1,100.00"}
                    label="Outstanding Payments"
                    icon={<OutstandingIcon />}
                />
            </div>

            {/* Payment History */}
            {isEmpty ? (
                <EmptyState emptyText="No Payment Activity Found" />
            ) : (
            <Card>
                <CardContent className="p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-[#111827] mb-1">Payment History</h2>
                    <p className="text-sm text-gray-500 mb-5">
                        All payments and transactions for your shipments
                    </p>

                    {/* Search + Filter */}
                    <div className="flex gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search for payment ID or shipment ID"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <FilterDropdown options={PAYMENT_FILTER_OPTIONS} value={filter} onChange={setFilter} />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {["Payment ID", "Shipment ID", "Date", "Amount", "Status", "Receipt"].map(h => (
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
                                {filtered.map((p, i) => (
                                    <tr key={i + 1} className="border-b border-gray-100 last:border-0">
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{p.paymentId}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{p.shipmentId}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle">{p.date}</td>
                                        <td className="py-4 pr-6 text-gray-700 align-middle font-medium">{p.amount}</td>
                                        <td className="py-4 pr-6 align-middle">
                                            <PaymentStatusBadge status={p.status} />
                                        </td>
                                        <td className="py-4 align-middle">
                                            <button
                                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                                aria-label="Download receipt"
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