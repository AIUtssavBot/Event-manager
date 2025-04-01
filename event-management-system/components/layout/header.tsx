"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Bell, Sun, Moon, User } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

interface HeaderProps {
  toggleSidebar: () => void
  role: "superadmin" | "admin" | "committee" | "attendee"
}

export default function Header({ toggleSidebar, role }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])
  
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getRoleName = () => {
    switch (role) {
      case "superadmin":
        return "Super Admin"
      case "admin":
        return "Admin"
      case "committee":
        return "Committee Member"
      case "attendee":
        return "Attendee"
      default:
        return "User"
    }
  }

  return (
    <header className="header">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="btn btn-outline p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <Link href={`/dashboard/${role}`} className="text-xl font-bold truncate">
          {isMobile ? "EM System" : "Event Management"}
        </Link>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme} 
          className="btn btn-outline p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            // Use a consistent icon during server rendering to avoid hydration mismatch
            <Sun size={20} />
          )}
        </button>

        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setProfileOpen(false)
            }} 
            className="btn btn-outline p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 card z-50 shadow-lg animation-fade-in">
              <div className="p-2 border-b border-border">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-border hover:bg-input cursor-pointer">
                  <p className="font-medium">New event scheduled</p>
                  <p className="text-sm opacity-70">Tech Conference has been approved</p>
                  <p className="text-xs opacity-50 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 border-b border-border hover:bg-input cursor-pointer">
                  <p className="font-medium">Reimbursement approved</p>
                  <p className="text-sm opacity-70">Your request for $250 has been approved</p>
                  <p className="text-xs opacity-50 mt-1">Yesterday</p>
                </div>
                <div className="p-3 hover:bg-input cursor-pointer">
                  <p className="font-medium">New committee member</p>
                  <p className="text-sm opacity-70">John Doe has joined the Marketing team</p>
                  <p className="text-xs opacity-50 mt-1">3 days ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-border">
                <Link href="/notifications" className="text-sm text-primary block text-center">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotificationsOpen(false)
            }} 
            className="flex items-center gap-2 btn btn-outline hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="User profile"
          >
            <User size={20} />
            <span className="hidden md:inline">{getRoleName()}</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 card z-50 shadow-lg animation-fade-in">
              <div className="p-3 border-b border-border">
                <p className="font-medium">John Doe</p>
                <p className="text-sm opacity-70">john.doe@example.com</p>
              </div>
              <div>
                <Link href="/profile" className="block p-3 hover:bg-input transition-colors">
                  Profile Settings
                </Link>
                <Link href="/login" className="block p-3 hover:bg-input text-secondary transition-colors">
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

