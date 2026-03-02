export type ShipmentStatus =
    | "In Transit"
    | "Loaded On Vessel"
    | "Completed"
    | "Vehicle Received"
    | "Pending"
    | "Failed"

export type TabFilter = "All" | "Active" | "Pending" | "Completed"

export interface Shipment {
    id: string
    vehicle: string
    route: string
    status: ShipmentStatus
    estimatedArrival: string
}


export const FILTER_OPTIONS = [
    "All Shipments",
    "Active Shipments",
    "Pending Shipments",
    "Completed Shipments",
]

export const TABS: TabFilter[] = ["All", "Active", "Pending", "Completed"]


export interface ShipmentDetail {
    id: string
    trackingNumber: string
    estimatedArrival: string
    bookingDate: string
    status: ShipmentStatus
    vehicle: {
        type: string
        makeModel: string
        year: string
        condition: string
        vin: string
    }
    route: {
        origin: string
        destination: string
    }
}

export interface ProgressStep {
    label: string
    completed: boolean
    date?: string
}

export interface Document {
    filename: string
    type: string
    status: "Approved" | "Pending" | "Rejected"
}

export type DocumentStatus = "Approved" | "Pending" | "Rejected"

export interface MainDocument {
    filename: string
    type: string
    shipment: string
    uploadDate: string
    status: DocumentStatus
}

export const DOC_FILTER_OPTIONS = ["All", "Approved", "Pending", "Rejected"]


export type PaymentStatus = "Completed" | "Pending" | "Failed"

export interface Payment {
    paymentId: string
    shipmentId: string
    date: string
    amount: string
    status: PaymentStatus
}

export const PAYMENT_FILTER_OPTIONS = ["All", "Completed", "Pending", "Failed"]