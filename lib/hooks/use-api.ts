import React, { useState, useCallback } from 'react'
import { ApiError } from '@/lib/types/api'

interface UseApiOptions<T> {
    onSuccess?: (data: T) => void
    onError?: (error: ApiError) => void
    initialData?: T
}

interface UseApiState<T> {
    data: T | null
    isLoading: boolean
    error: ApiError | null
}

/**
 * Custom hook for handling API calls with loading and error states
 * 
 * @example
 * const { data, isLoading, error, execute } = useApi<UserData>(
 *   () => apiClient.get('/user'),
 *   { onSuccess: (user) => console.log('User:', user) }
 * )
 * 
 * return (
 *   <>
 *     {isLoading && <p>Loading...</p>}
 *     {error && <p>Error: {error.message}</p>}
 *     {data && <p>User: {data.name}</p>}
 *     <button onClick={() => execute()}>Fetch</button>
 *   </>
 * )
 */
export function useApi<T>( apiCall: () => Promise<T>, options: UseApiOptions<T> = {}
    ) {

    const [state, setState] = useState<UseApiState<T>>({
        data: options.initialData ?? null,
        isLoading: false,
        error: null,
    })

    const execute = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        try {
            const result = await apiCall()
            setState((prev) => ({ ...prev, data: result, isLoading: false }))
            options.onSuccess?.(result)
            return result
        } catch (err) {
            const error = err instanceof ApiError ? err : new ApiError(500, String(err))
            setState((prev) => ({ ...prev, error, isLoading: false }))
            options.onError?.(error)
            throw error
        }
    }, [apiCall, options])

    const reset = useCallback(() => {
        setState({
            data: options.initialData ?? null,
            isLoading: false,
            error: null,
        })
    }, [options.initialData])

    return {
        ...state,
        execute,
        reset,
    }
}

/**
 * Hook for fetching data on component mount
 * 
 * @example
 * const { data: shipments, isLoading, error } = useFetch(
 *   () => apiClient.get('/shipments')
 * )
 */
export function useFetch<T>( apiCall: () => Promise<T>, options: UseApiOptions<T> = {}
    ) {
    const apiHook = useApi(apiCall, options)
    const [hasMounted, setHasMounted] = useState(false)

    const { execute } = apiHook

    // Fetch on mount
    React.useEffect(() => {
        if (!hasMounted) {
            setHasMounted(true)
            execute()
        }
    }, [execute, hasMounted])

    return apiHook
}
