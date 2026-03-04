'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import { ShipmentDetail, ProgressStep, Document } from "@/lib/types/constant"
import { ShipmentOverview, ShipmentProgress } from "@/components/user-shipment/shipment"
import { Documents } from "@/components/user-shipment/documents"
import { useParams, useRouter } from "next/navigation"

// ── Mock Data

const MOCK_DETAIL: ShipmentDetail = {
    id: "SHP-2026-001",
    trackingNumber: "PTK-UK-NG-20260115-001",
    estimatedArrival: "10/02/2026",
    bookingDate: "15/01/2026",
    status: "In Transit",
    vehicle: {
        type: "Toyota",
        makeModel: "Camry",
        year: "2022",
        condition: "Running",
        vin: "4T1B11HK5LU123456",
    },
    route: {
        origin: "United Kingdom",
        destination: "Ghana",
    },
}

const PROGRESS_STEPS: ProgressStep[] = [
    { label: "Booking Confirmed", completed: true, date: "15/01/2026" },
    { label: "Vehicle Received", completed: true },
    { label: "Loaded on Vessel", completed: true },
    { label: "In Transit", completed: true },
    { label: "Arrival at Destination", completed: false },
    { label: "Delivery Complete", completed: false },
]

const MOCK_DOCUMENTS: Document[] = [
    { filename: "vehicle_registration_bmw.pdf", type: "Vehicle Registration", status: "Approved" },
    { filename: "vehicle_registration_bmw.pdf", type: "Vehicle Registration", status: "Approved" },
]

// ── Main Page 

interface ShipmentDetailsPageProps {
    shipmentId?: string
}

export default function ShipmentDetailsPage({
    shipmentId = "SHP-2026-001",
}: ShipmentDetailsPageProps) {

    const router = useRouter()
    function onBack() {
        router.back()
    }

    const { id } = useParams()
    // console.log(id)
    const resolvedId = (Array.isArray(id) ? id[0] : id) ?? shipmentId

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start gap-3">
                <button
                    onClick={onBack}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0 mt-0.5"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Shipment Details</h1>
                    <p className="text-gray-500 text-sm">{resolvedId}</p>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                    {[
                        { value: "overview", label: "Shipment Overview" },
                        { value: "progress", label: "Shipment Progress" },
                        { value: "documents", label: "Documents" },
                    ].map(tab => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-sm text-[#6B7280] data-[state=active]:text-[#111827] data-[state=active]:font-semibold"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <ShipmentOverview detail={MOCK_DETAIL} />
                </TabsContent>

                <TabsContent value="progress">
                    <ShipmentProgress steps={PROGRESS_STEPS} />
                </TabsContent>

                <TabsContent value="documents">
                    <Documents documents={MOCK_DOCUMENTS} />
                </TabsContent>
            </Tabs>
        </div>
    )
}