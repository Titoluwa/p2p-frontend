"use client"

import React, { useEffect, useState } from "react"
import { DashboardSidebar } from '@/components/customer-dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Settings, Menu } from 'lucide-react'
import { useAuth } from '@/lib/context/auth-context'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset by sidebar width on desktop only */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between">
          {/* Hamburger — mobile only */}
          <div className="flex space-x-5">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 transition-colors border border-[#E5E7EB] rounded-sm p-2"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* logo placeholder */}
            <div className="w-28 h-10 bg-[#C4C4C4] md:hidden" />
          </div>

          {/* Spacer on desktop */}
          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Link href="/user/account-settings">
              <Button
                variant="ghost"
                className="text-[#6B7280] hover:bg-gray-100 sm:border border-0 border-[#6B7280] h-[48px] w-[48px] p-0"
              >
                <Settings className="w-6 h-6" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg sm:border border-0 border-[#6B7280]">
              <img src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} className="w-8 h-8 rounded-full" />
              <span className="font-medium text-[#6B7280] hidden sm:inline">{user?.firstName} {user?.lastName}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}