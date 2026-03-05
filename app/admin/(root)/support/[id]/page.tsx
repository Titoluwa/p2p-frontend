"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { DetailField, adminTabTriggerClass } from "@/components/admin/comp"

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

const MOCK_MESSAGES: Message[] = [
    {
        sender: "John Anderson",
        isAdmin: false,
        timestamp: "Jan 30, 2026 at 2:45 PM",
        content:
            "Hi, I submitted my shipment documents yesterday and I'm wondering when they will be reviewed? I need to know the status as soon as possible.",
    },
    {
        sender: "Sarah Mitchell",
        isAdmin: true,
        timestamp: "Jan 30, 2026 at 3:15 PM",
        content:
            "Hello John, thank you for reaching out. I can see your documents for shipment SH-1024 were received. Our team is currently reviewing them and you should receive an update within the next 24 hours.",
    },
    {
        sender: "John Anderson",
        isAdmin: false,
        timestamp: "Jan 30, 2026 at 2:45 PM",
        content: "Thank you for the quick response! Is there any way to track the shipment once it's approved?",
    },
]

const TICKET_STATUS_OPTIONS: TicketStatus[] = ["Open", "In Progress", "Closed"]

// ── Update Status Dropdown ────────────────────────────────────────────────────

function UpdateStatusDropdown({
    value,
    onChange,
}: {
    value: TicketStatus | ""
    onChange: (v: TicketStatus) => void
}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-300 min-w-[180px] justify-between text-gray-500"
            >
                <span>{value || "Update Status"}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {open && (
                <div className="absolute right-0 z-50 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {TICKET_STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setOpen(false) }}
                            className="w-full text-left px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Chat Bubble ───────────────────────────────────────────────────────────────

function ChatBubble({ message }: { message: Message }) {
    const isAdmin = message.isAdmin

    if (isAdmin) {
        return (
            <div className="flex flex-col items-end gap-1.5 mb-5">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#111827]">{message.sender}</span>
                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="4" stroke="#2563EB" strokeWidth="1.5" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tr-none px-4 py-3 max-w-xl">
                    <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-start gap-1.5 mb-5">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="#6b7280" strokeWidth="1.5" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="text-sm font-semibold text-[#111827]">{message.sender}</span>
                <span className="text-xs text-gray-400">{message.timestamp}</span>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xl">
                <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
            </div>
        </div>
    )
}


interface AdminSupportTicketDetailPageProps {
    ticketId?: string
    onBack?: () => void
    onViewProfile?: () => void
}

export default function AdminSupportTicketDetailPage({
    ticketId = "TKT-1024",
    onBack,
    onViewProfile,
}: AdminSupportTicketDetailPageProps) {
    const [status, setStatus] = useState<TicketStatus | "">("")
    const [reply, setReply] = useState("")

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <button
                        onClick={onBack}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0 mt-0.5"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Support Ticket</h1>
                        <p className="text-gray-500 text-sm">{ticketId}</p>
                    </div>
                </div>
                <UpdateStatusDropdown value={status} onChange={setStatus} />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="ticket">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                    <TabsTrigger value="ticket" className={adminTabTriggerClass}>
                        Ticket Information
                    </TabsTrigger>
                    <TabsTrigger value="conversation" className={adminTabTriggerClass}>
                        Conversation History
                    </TabsTrigger>
                </TabsList>

                {/* ── Ticket Information ── */}
                <TabsContent value="ticket">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-base font-bold text-[#111827]">Ticket Details</h2>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 font-medium text-xs px-3 py-1">
                                    Open
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <DetailField label="Subject" value="Question about shipment tracking" />
                                <DetailField label="Shipment ID" value="SH-5429" />
                                <div>
                                    <p className="text-sm text-gray-500 mb-0.5">Customer</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-[#111827]">John Anderson</p>
                                        <button
                                            onClick={onViewProfile}
                                            className="text-sm text-[#2563EB] font-medium hover:underline"
                                        >
                                            View full profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-[#111827] mb-4">Ticket History</h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <DetailField label="Created" value="Jan 30, 2026 at 2:45 PM" />
                                    <DetailField label="Last Updated" value="Jan 30, 2026 at 3:20 PM" />
                                    <DetailField label="Responded By" value="Sarah Mitchell" />
                                    <DetailField label="Response Time" value="30 minutes" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Conversation History ── */}
                <TabsContent value="conversation">
                    <div className="space-y-4">
                        {/* Conversation thread */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-base font-bold text-[#111827] mb-6">Conversation</h2>
                                <div>
                                    {MOCK_MESSAGES.map((msg, i) => (
                                        <ChatBubble key={i + 1} message={msg} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Admin response box */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-base font-bold text-[#111827]">Admin Response</h2>
                                <Textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your response to your customer..."
                                    className="min-h-[140px] resize-none text-sm text-gray-500"
                                />
                                <div className="flex items-center justify-between pt-1">
                                    <p className="text-xs text-gray-400">
                                        Response will be sent to: john.anderson@email.com
                                    </p>
                                    <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                        Send Reply
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}