import { apiClient } from '@/lib/api/client'
// import { CustomerInfo, VehicleInfo } from '@/lib/types/constant'
import { ApiResponse, CreateQuotePayload } from '@/lib/types/api'


export interface Quote {
  id: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  estimatedPrice?: number
  currency?: string
  createdAt: string
  updatedAt: string
}

export interface CreateQuoteResponse extends ApiResponse<Quote> {
  data: Quote
}

export interface GetQuotesResponse extends ApiResponse<Quote[]> {
  data: Quote[]
}

export const quoteApi = {
    /** Submit a new quote request */
    createQuote(payload: CreateQuotePayload): Promise<CreateQuoteResponse> {
        return apiClient.post<CreateQuoteResponse>('/quotes/request', payload)
    },

    /** Fetch all quotes for the authenticated user */
    getAllQuotes(): Promise<GetQuotesResponse> {
        return apiClient.get<GetQuotesResponse>('/quotes/requests')
    },

    /** Fetch a single quote by ID */
    getQuoteById(id: string): Promise<CreateQuoteResponse> {
        return apiClient.get<CreateQuoteResponse>(`/quotes/requests/${id}`)
    },

    trackQuote(trackingNumber: string): Promise<CreateQuoteResponse> {
        return apiClient.get<CreateQuoteResponse>(`/quotes/track/${trackingNumber}`)
    },

    // /** Delete/cancel a pending quote */
    // deleteQuote(id: string): Promise<ApiResponse<null>> {
    //     return apiClient.delete<ApiResponse<null>>(`/quotes/${id}`)
    // },
}