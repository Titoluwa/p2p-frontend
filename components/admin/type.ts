
export interface ActionItem {
    message: string
    href?: string
}

export interface ActivityItemType {
    message: string
    timeAgo: string
}

export type QuoteStatus = "Pending" | "Rejected" | "Approved" | "In Review" | "Sent" | "Accepted" | "New" | "Reviewed"

export interface Quote {
    id: string
    referenceId: string
    customerName: string
    vehicle: string
    route: string
    status: QuoteStatus
}

export const FILTER_OPTIONS = [
    "All Quotes",
    "New Quotes",
    "Accepted Quotes",
    "Sent Quotes",
    "Quotes In Review",
]

export interface QuoteDetail {
    id: string
    referenceId: string
    customer: {
        name: string
        email: string
        phone: string
        company: string
    }
    vehicle: {
        type: string
        makeModel: string
        year: string
        condition: string
    }
    route: {
        origin: string
        destination: string
        shippingMethod: string
        transitTime: string
    }
    quoteInfo: {
        submitted: string
        validUntil: string
    }
    attachments: { name: string; size: string }[]
}