'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, Ship, FileText, CreditCard, LogOut, X } from 'lucide-react'
import { useAuth } from '@/lib/context/auth-context'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { label: 'My Shipments', href: '/dashboard/shipments', icon: Ship },
  { label: 'Request a Quote', href: '/dashboard/quote', icon: FileText },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { label: 'Documents', href: '/dashboard/documents', icon: FileText },
]

interface DashboardSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function DashboardSidebar({ isOpen, onClose}: Readonly<DashboardSidebarProps>) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const sidebarContent = (
    <aside className="w-64 bg-[#0A2540] text-white h-full flex flex-col">
      {/* Header */}
      <div className="p-8 flex items-center justify-between">
        {/* logo placeholder */}
        <div className="w-28 h-10 bg-[#C4C4C4]" />
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#6B7280] space-y-2 mb-3">
        <button onClick={handleLogout} className="text-sm w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-all text-left">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen rounded-r-[50px] overflow-hidden z-30 w-64">
        {sidebarContent}
      </div>

      {/* Mobile: overlay drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="relative z-50 w-64 h-full rounded-r-[50px] overflow-hidden shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}