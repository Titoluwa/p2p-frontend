import { apiClient, authApi } from './client'
import {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    AuthUser,
    RefreshTokenResponse,
    ApiError,
} from '@/lib/types/api'

export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                '/auth/login',
                credentials
            )

            if (response.token) {
                authApi.setToken(response.token)
            }

            if (response.refreshToken) {
                authApi.setRefreshToken(response.refreshToken)
            }

            return response
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async register(data: RegisterRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                '/auth/create',
                data
            )

            if (response.token) {
                authApi.setToken(response.token)
            }

            if (response.refreshToken) {
                authApi.setRefreshToken(response.refreshToken)
            }

            return response
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async refreshToken(): Promise<RefreshTokenResponse> {
        try {
            const refreshToken = authApi.getRefreshToken()

            if (!refreshToken) {
                throw new Error('No refresh token available')
            }

            const response = await apiClient.post<RefreshTokenResponse>(
                '/auth/refresh',
                { refreshToken }
            )

            if (response.token) {
                authApi.setToken(response.token)
            }

            return response
        } catch (error) {
            authApi.removeToken()
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            authApi.removeToken()
        }
    },

    async getCurrentUser(): Promise<AuthUser> {
        try {
            return await apiClient.get<AuthUser>('/auth/me')
        } catch (error) {
            authApi.removeToken()
            throw error
        }
    },

    async changePassword( oldPassword: string, newPassword: string ): Promise<void> {
        try {
            await apiClient.post('/auth/change-password', {
                oldPassword,
                newPassword,
            })
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async forgotPassword(email: string): Promise<void> {
        try {
            await apiClient.post('/auth/forgot-password', { email })
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async resetPassword( token: string, newPassword: string ): Promise<void> {
        try {
            await apiClient.post('/auth/reset-password', { token, newPassword })
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async activateAccount(token: string): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                '/auth/activate',
                { token }
            )

            if (response.token) {
                authApi.setToken(response.token)
            }

            return response
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    async verifyAccount(token: string): Promise<any> {
        try {
            const response = await apiClient.patch(
                `/auth/verify-email/${token}`,
            )
            console.log(response)
            return response
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message)
            }
            throw error
        }
    },

    getToken(): string | null {
        return authApi.getToken()
    },

    isAuthenticated(): boolean {
        return !!authApi.getToken()
    },

    logout_sync(): void {
        authApi.removeToken()
    },
}
