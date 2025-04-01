"use client"

import { useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import Header from "./header"
import Sidebar from "./sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  role: "superadmin" | "admin" | "committee" | "attendee"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check for mobile devices and automatically collapse sidebar on small screens
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarOpen(false)
      }
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Save sidebar state to localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar-state', sidebarOpen ? 'open' : 'closed')
    }
  }, [sidebarOpen, isMobile])

  // Load sidebar state from localStorage on initial render (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem('sidebar-state')
      if (savedState) {
        setSidebarOpen(savedState === 'open')
      }
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} role={role} />
      <Sidebar 
        open={sidebarOpen} 
        role={role} 
        pathname={pathname} 
        onToggle={toggleSidebar} 
      />
      <main className={`main-content ${!sidebarOpen ? "ml-0" : ""}`}>{children}</main>
    </div>
  )
}

