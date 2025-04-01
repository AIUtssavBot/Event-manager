"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  FileText,
  DollarSign,
  ShoppingBag,
  Award,
  HelpCircle,
  QrCode,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  open: boolean
  role: "superadmin" | "admin" | "committee" | "attendee"
  pathname: string
  onToggle: () => void
}

export default function Sidebar({ open, role, pathname, onToggle }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(false)

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show backdrop on mobile when sidebar is open
  useEffect(() => {
    if (isMobile) {
      setShowBackdrop(open)
    } else {
      setShowBackdrop(false)
    }
  }, [open, isMobile])

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (role) {
      case "superadmin":
        return [
          { href: "/dashboard/superadmin", label: "Dashboard", icon: Home },
          { href: "/dashboard/superadmin/calendar", label: "Calendar", icon: Calendar },
          { href: "/dashboard/superadmin/admins", label: "Admins", icon: Users },
          { href: "/dashboard/superadmin/committees", label: "Committees", icon: Users },
          { href: "/dashboard/superadmin/permissions", label: "Permissions", icon: FileText },
          { href: "/dashboard/superadmin/reports", label: "Reports", icon: BarChart2 },
          { href: "/dashboard/superadmin/settings", label: "Settings", icon: Settings },
        ]
      case "admin":
        return [
          { href: "/dashboard/admin", label: "Dashboard", icon: Home },
          { href: "/dashboard/admin/calendar", label: "Calendar", icon: Calendar },
          { href: "/dashboard/admin/committees", label: "Committees", icon: Users },
          { href: "/dashboard/admin/attendees", label: "Attendees", icon: Users },
          { href: "/dashboard/admin/marketing", label: "Marketing", icon: Award },
          { href: "/dashboard/admin/chat", label: "Chat", icon: MessageSquare },
          { href: "/dashboard/admin/reimbursements", label: "Reimbursements", icon: DollarSign },
          { href: "/dashboard/admin/content", label: "Content", icon: FileText },
          { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
        ]
      case "committee":
        return [
          { href: "/dashboard/committee", label: "Dashboard", icon: Home },
          { href: "/dashboard/committee/calendar", label: "Calendar", icon: Calendar },
          { href: "/dashboard/committee/attendees", label: "Attendees", icon: Users },
          { href: "/dashboard/committee/chat", label: "Chat", icon: MessageSquare },
          { href: "/dashboard/committee/tasks", label: "Tasks", icon: FileText },
          { href: "/dashboard/committee/reimbursements", label: "Reimbursements", icon: DollarSign },
        ]
      case "attendee":
        return [
          { href: "/dashboard/attendee", label: "Dashboard", icon: Home },
          { href: "/dashboard/attendee/events", label: "Events", icon: Calendar },
          { href: "/dashboard/attendee/stalls", label: "Stalls", icon: ShoppingBag },
          { href: "/dashboard/attendee/qr-code", label: "QR Code", icon: QrCode },
          { href: "/dashboard/attendee/puzzles", label: "Puzzles", icon: HelpCircle },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  // Handle backdrop click (close sidebar on mobile)
  const handleBackdropClick = () => {
    if (isMobile && open) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      {showBackdrop && (
        <div 
          className={`sidebar-backdrop ${open ? 'active' : ''}`} 
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${!open ? "sidebar-collapsed" : "sidebar-expanded"}`}>
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Event Manager</h2>
              {isMobile && (
                <button 
                  className="p-1 rounded-full hover:bg-white/20" 
                  onClick={onToggle}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <div className="user-role-box">
              <p className="text-sm font-medium">Logged in as</p>
              <p className="font-bold">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
            </div>
          </div>

          <nav className="flex-1">
            <ul>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive ? "active" : ""}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-6">
            <Link
              href="/login"
            >
              <Settings size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Toggle button (only visible on desktop) */}
      {!isMobile && (
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          <Menu size={22} />
        </button>
      )}
    </>
  )
}

