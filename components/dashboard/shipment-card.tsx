import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

interface ShipmentCardProps {
  title: string
  route: string
  trackingId: string
  estimatedArrival: string
  status: 'in-transit' | 'loaded' | 'delivered' | 'pending'
}

const statusConfig = {
  'in-transit': {
    label: 'In Transit',
    color: 'bg-blue-100 text-blue-800',
  },
  'loaded': {
    label: 'Loaded on the vessel',
    color: 'bg-yellow-100 text-yellow-800',
  },
  'delivered': {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
  },
  'pending': {
    label: 'Pending',
    color: 'bg-gray-100 text-gray-800',
  },
}

export function ShipmentCard({
  title,
  route,
  trackingId,
  estimatedArrival,
  status,
}: Readonly<ShipmentCardProps>) {
  const statusInfo = statusConfig[status]

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{route}</p>
        </div>
        <Badge className={statusInfo.color}>
          {statusInfo.label}
        </Badge>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500">Tracking:</p>
          <p className="font-mono text-gray-900">{trackingId}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Est. arrival: {estimatedArrival}</span>
        </div>
      </div>
    </Card>
  )
}
