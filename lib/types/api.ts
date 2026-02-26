// API Response Types
export interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
    error?: string
}

// Auth Types
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    isAgreedToTermsAndConditions: boolean
    isSubscribedToNewsletter: boolean
}

export interface LoginResponse {
    token: string
    refreshToken?: string
    user: {
        id: string
        email: string
        firstName: string
        lastName: string
        fullName: string
        role: string
        status: string
    }
}

export interface VerifyAccountResponse {
    success: boolean
    message: string
}

export interface AuthUser {
    id: string
    email: string
    firstName: string
    lastName: string
    fullName: string
    role: string
    status: string
    avatar?: string
}

export interface RefreshTokenResponse {
    token: string
}

// Shipment Types
export interface Shipment {
    id: string
    vehicleType: string
    route: {
        origin: string
        destination: string
    }
    status: string
    trackingNumber: string
    estimatedArrival: string
}

export interface Quote {
    id: string
    vehicleType: string
    originPort: string
    destinationPort: string
    amount: number
    currency: string
    createdAt: string
}

// Error Types
export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: unknown
    ) {
        super(message)
        this.name = 'ApiError'
    }
}
