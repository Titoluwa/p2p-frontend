'use client'

import { Footer } from '@/components/footer'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="min-h-screen flex flex-col">
            {children}
            <Footer />
        </div>
    )
}
