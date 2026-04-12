'use client'

import { useState } from "react"
import { CheckCircle2, Ship, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type StatusStep = {
    label: string
    date: string
    description: string
    icon: "check" | "anchor" | "pin"
    completed: boolean
}

type ShipmentData = {
    trackingNumber: string
    status: string
    origin: string
    destination: string
    departureDate: string
    estArrival: string
    steps: StatusStep[]
}


const mockShipment: ShipmentData = {
    trackingNumber: "UK 12345",
    status: "In Transit",
    origin: "Southampton, UK",
    destination: "Mombasa, Kenya",
    departureDate: "Jan 15, 2026",
    estArrival: "Feb 10, 2026",
    steps: [
        {
            label: "Vehicle Collected",
            date: "Jan 12, 2026",
            description: "Vehicle collected from customer location in Manchester",
            icon: "check",
            completed: true,
        },
        {
            label: "At UK Port",
            date: "Jan 12, 2026",
            description: "Vehicle arrived at Southampton port facility",
            icon: "check",
            completed: true,
        },
        {
            label: "In Transit",
            date: "Jan 12, 2026",
            description: "Loaded on vessel MV Ocean Express, en route to destination",
            icon: "anchor",
            completed: true,
        },
        {
            label: "Arrival at Destination",
            date: "Expected Feb 10, 2026",
            description: "Estimated arrival at Mombasa port",
            icon: "pin",
            completed: false,
        },
    ],
}


function StepIcon({ icon, completed }: Readonly<{ icon: StatusStep["icon"]; completed: boolean }>) {
    const base = `w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
        completed ? "bg-[#2563EB] text-white" : "bg-[#D1D5DB] text-[#6B7280]"
    }`

    return (
        <div className={base}>
            {icon === "check" && <CheckCircle2 size={18} />}
            {icon === "anchor" && <Ship size={18} />}
            {icon === "pin" && <MapPin size={18} />}
        </div>
    )
}

export function TrackShipment() {
    const [trackingInput, setTrackingInput] = useState("")
    const [shipment, setShipment] = useState<ShipmentData | null>()

    const handleTrack = (e: React.SubmitEvent) => {
        e.preventDefault()
        // In production: fetch shipment data by trackingInput
        setShipment(mockShipment)
    }

    return (
        <section className="min-screen bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-5">

                {/* ── Tracking Input Card ── */}
                <div className="bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-10 sm:px-12 py-6 sm:py-8">
                    <h2 className="font-sans text-xl font-bold text-[#0A2540] mb-5">Tracking Number</h2>

                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-3 mb-4 border border-[#6B7280] p-2 rounded-md bg-[#F0F1F2]">
                        <Input type="text" placeholder="Enter your tracking number (e.g. UK-12345)" value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)}
                            className="flex-1 h-12 rounded-xl border-none bg-transparent placeholder:text-[#9CA3AF] focus-visible:ring-none"
                        />
                        <Button type="submit" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-md h-11 px-8 sm:w-auto w-full">
                            Track
                        </Button>
                    </form>

                    <p className="text-sm text-[#111827] italic">
                        You can find your tracking number in your booking confirmation email
                    </p>
                </div>

                {shipment && (
                    <>
                        {/* ── Shipment Details Card ── */}
                        <div className="font-sans bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-10 sm:px-12 py-6 sm:py-8">
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-[#0A2540]">Shipment Details</h2>
                                    <p className="text-sm text-[#6B7280] mt-0.5">
                                        Tracking #: {shipment.trackingNumber}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-[400] text-[#2563EB] bg-[#E9EFFD] px-4 py-1.5 rounded-md">
                                    {shipment.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-1">Origin</p>
                                    <p className="text-base font-semibold text-[#111827]">{shipment.origin}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-1">Destination</p>
                                <p className="text-base font-semibold text-[#111827]">{shipment.destination}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-1">Departure Date</p>
                                    <p className="text-base font-semibold text-[#111827]">{shipment.departureDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B7280] mb-1">Est. Arrival</p>
                                    <p className="text-base font-semibold text-[#111827]">{shipment.estArrival}</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Shipment Status Card ── */}
                        <div className="bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-10 sm:px-12 py-6 sm:py-8">
                            <h2 className="text-xl font-bold text-[#0A2540] mb-6">Shipment Status</h2>

                            <div className="flex flex-col space-y-4">
                                {shipment.steps.map((step, i) => {
                                    const isLast = i === shipment.steps.length - 1
                                    return (
                                        <div key={step.label} className="flex gap-4">
                                            {/* Icon + vertical line */}
                                            <div className="flex flex-col items-center">
                                                <StepIcon icon={step.icon} completed={step.completed} />
                                                {!isLast && (
                                                    <div className="w-0.5 flex-1 mb-1 pb-2 bg-[#2563EB] min-h-[32px]" />
                                                )}
                                            </div>

                                            {/* Step content */}
                                            <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
                                                <p className="text-sm font-bold text-[#0A2540] leading-snug">{step.label}</p>
                                                <p className="text-xs text-[#6B7280] mt-0.5 mb-1">{step.date}</p>
                                                <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}