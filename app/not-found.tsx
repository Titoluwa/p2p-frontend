'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import NotFound from '@/components/not-found'

export default function NotFoundPage() {

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />

            <NotFound/>
            
            <Footer />
        </div>
    )
}