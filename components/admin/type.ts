//types

export interface ActionItem {
    message: string
    href?: string
}

export interface ActivityItemType {
    message: string
    timeAgo: string
}

export type QuoteStatus = "New" | "In Review" | "Sent" | "Accepted" | "Pending"

export interface Quote {
    id: string
    customerName: string
    vehicle: string
    route: string
    status: QuoteStatus
}

// constant
export const FILTER_OPTIONS = [
    "All Quotes",
    "New Quotes",
    "Accepted Quotes",
    "Sent Quotes",
    "Quotes In Review",
]