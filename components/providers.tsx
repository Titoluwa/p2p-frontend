'use client'

import React from 'react'
import { AuthProvider } from '@/lib/context/auth-context'

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return <AuthProvider>{children}</AuthProvider>
}
