import React from "react"
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
              <span className="font-medium text-gray-900">Kunle Remi</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
