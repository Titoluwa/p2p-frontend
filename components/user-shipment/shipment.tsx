import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/user-shipment/status-icon"
import { ShipmentDetail, ProgressStep } from "@/lib/types/constant"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

function DetailField({ label, value }: Readonly<{ label: string; value: string }>) {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-[#111827]">{value}</p>
        </div>
    )
}
export function ShipmentOverview({ detail }: Readonly<{ detail: ShipmentDetail }>) {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                {/* Header row */}
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-[#111827]">Shipment Overview</h2>
                    <StatusBadge status={detail.status} />
                </div>

                {/* Top info grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <DetailField label="Shipment ID" value={detail.id} />
                    <DetailField label="Tracking Number" value={detail.trackingNumber} />
                    <DetailField label="Estimated Arrival" value={detail.estimatedArrival} />
                    <DetailField label="Booking Date" value={detail.bookingDate} />
                </div>

                {/* Vehicle Details */}
                <div>
                    <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Type" value={detail.vehicle.type} />
                        <DetailField label="Make & Model" value={detail.vehicle.makeModel} />
                        <DetailField label="Year" value={detail.vehicle.year} />
                        <DetailField label="Condition" value={detail.vehicle.condition} />
                        <DetailField label="VIN" value={detail.vehicle.vin} />
                    </div>
                </div>

                {/* Route Information */}
                <div>
                    <h3 className="text-base font-bold text-[#111827] mb-4">Route Information</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <DetailField label="Origin" value={detail.route.origin} />
                        <DetailField label="Destination" value={detail.route.destination} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function ShipmentProgress({ steps }: Readonly<{ steps: ProgressStep[] }>) {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#111827] mb-6">Shipment Progress</h2>

                <div className="flex flex-col gap-0">
                    {steps.map((step, i) => (
                        <div key={i + 1} className="flex gap-4">
                            {/* Icon + connector */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10",
                                        step.completed
                                            ? "bg-green-100"
                                            : "bg-gray-100"
                                    )}
                                >
                                    {step.completed ? (
                                        <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
                                    ) : (
                                        <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                                    )}
                                </div>
                                {/* Vertical line */}
                                {i < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "w-0.5 flex-1 my-1",
                                            step.completed ? "bg-green-200" : "bg-gray-200"
                                        )}
                                        style={{ minHeight: 24 }}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="pb-6 pt-2">
                                <p className="text-sm font-semibold text-[#111827]">{step.label}</p>
                                {step.date && (
                                    <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}