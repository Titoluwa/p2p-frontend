import { CheckCircle, FileText, Package, FileQuestion } from 'lucide-react'

interface ActivityItem {
  id: string
  title: string
  date: string
  type: 'success' | 'document' | 'package' | 'info'
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600',
  },
  document: {
    icon: FileText,
    color: 'bg-blue-100 text-blue-600',
  },
  package: {
    icon: Package,
    color: 'bg-purple-100 text-purple-600',
  },
  info: {
    icon: FileQuestion,
    color: 'bg-gray-100 text-gray-600',
  },
}

interface ActivityTimelineProps {
  activities: ActivityItem[]
}

export function ActivityTimeline({ activities }: Readonly<ActivityTimelineProps>) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type]
        const Icon = config.icon

        return (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${config.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-200 mt-2" />
              )}
            </div>

            <div className="pt-2 pb-4">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
