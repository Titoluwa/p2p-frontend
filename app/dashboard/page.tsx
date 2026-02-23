'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ShipmentCard } from '@/components/dashboard/shipment-card'
import { ActivityTimeline } from '@/components/dashboard/activity-timeline'
import { FileText, Truck } from 'lucide-react'

export default function DashboardPage() {
  const shipments = [
    {
      title: 'BMW 3 Series',
      route: 'Southampton, UK → Lagos, Nigeria',
      trackingId: 'PTK-UK-NG-20260115-001',
      estimatedArrival: '10/02/2026',
      status: 'in-transit' as const,
    },
    {
      title: 'Toyota Land Cruiser',
      route: 'Liverpool, UK → Dubai, UAE',
      trackingId: 'PTK-UK-AE-20260120-002',
      estimatedArrival: '15/02/2026',
      status: 'loaded' as const,
    },
  ]

  const activities = [
    { id: '1', title: 'Shipment SHP-2026-001 is now in transit', date: '28/01/2026', type: 'success' as const },
    { id: '2', title: 'Document uploaded for SHP-2026-003', date: '28/01/2026', type: 'document' as const },
    { id: '3', title: 'Vehicle received for SHP-2026-003', date: '28/01/2026', type: 'success' as const },
    { id: '4', title: 'New quote request submitted', date: '28/01/2026', type: 'info' as const },
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Welcome back, Kunle</h1>
        <p className="text-gray-600 text-sm sm:text-base">Here's what's happening with your shipments</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link href="/quote">
          <Card className="p-4 sm:p-6 bg-[#111827] text-white hover:shadow-lg transition-shadow cursor-pointer border-[#6B7280] text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <FileText className="w-10 h-10" />
              <h2 className="text-[20px] font-semibold mb-1">Request a Quote</h2>
            </div>
          </Card>
        </Link>

        <Link href="/track">
          <Card className="p-4 sm:p-6 bg-white text-black hover:shadow-lg transition-shadow cursor-pointer border-[#6B7280] text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Truck className="w-10 h-10" />
              <h2 className="text-[20px] font-semibold mb-1">Track Shipment</h2>
            </div>
          </Card>
        </Link>
      </div>

      {/* Active Shipments */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Active Shipments</h2>
          <Link href="/dashboard/shipments">
            <button className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
              View all
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.trackingId}
              title={shipment.title}
              route={shipment.route}
              trackingId={shipment.trackingId}
              estimatedArrival={shipment.estimatedArrival}
              status={shipment.status}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Activity</h2>
        <Card className="p-5 sm:p-8">
          <ActivityTimeline activities={activities} />
        </Card>
      </div>
    </div>
  )
}