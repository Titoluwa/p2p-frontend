export type ShipmentStatus =
    | "In Transit"
    | "Loaded On Vessel"
    | "Completed"
    | "Vehicle Received"
    | "Pending"
    | "Failed"

export type TabFilter = "All" | "Active" | "Pending" | "Completed" | "Failed" | "Rejected" | "Approved"

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


export interface CustomerInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface VehicleInfo {
    vehicleType: string
    vin: string
    make: string
    model: string
    year: string
    condition: 'Running' | 'Non-running' | ''
    length: string   // stored as string in form, converted to number on submit
    width: string
    height: string
    weight: string
}

export interface RouteInfo {
    originCountry: string
    originPort: string
    destinationCountry: string
    destinationPort: string
    shippingDate?: Date
}

export interface Quote {
  id: string
  _id?: string
  status: QuoteStatus
  estimatedPrice?: number
  currency?: string
  vehicle?: string
  route?: string
  estimatedArrival?: string
  createdAt?: string
  updatedAt?: string
}

export interface QuoteRequest {
  id: string
  _id?: string
  referenceId: string
  status: QuoteStatus | 'Pending' | 'Approved' | 'Rejected'
  customer?: Record<string, any>
  vehicle?: Record<string, any>
  route?: Record<string, any>
  customerInfo?: Record<string, unknown>
  vehicleInfo?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type QuoteStatus = "pending" | "reviewed" | "accepted" | "rejected" | "approved" | "Pending" | "Approved" | "Rejected" | "Reviewed" | "Accepted"


export const VEHICLE_TYPES = [
    "Cars & SUVs",
    "Vans",
    "Trucks & Motorhomes",
    "Trailers",
    "Wheeled Equipment (Agricultural Equipment)",
    "Others"
]

export const COUNTRIES = [
    "Nigeria",
    "Ghana",
    "United Arab Emirates",
    "Jamaica",
    "Kenya",
    "South Africa",
    "United States",
]

export const ORIGIN_COUNTRIES = ["United Kingdom"]