"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Settings,
  Bell,
  Shield,
  Lock,
  Mail,
  Users,
  Save,
  Clock,
  Palette,
  Globe,
  Database
} from "lucide-react"

type SettingSection = "general" | "notifications" | "security" | "integrations"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("general")

  const handleSaveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <DashboardLayout role="admin">
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {/* Top Navigation */}
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="flex flex-col sm:flex-row items-stretch p-2 gap-2">
              <button
                onClick={() => setActiveSection("general")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                  activeSection === "general" 
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-md" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                }`}
              >
                <Settings size={20} className={`${activeSection === "general" ? "animate-pulse" : ""}`} />
                <span className="font-medium">General Settings</span>
              </button>
              <button
                onClick={() => setActiveSection("notifications")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                  activeSection === "notifications" 
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-md" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                }`}
              >
                <Bell size={20} className={`${activeSection === "notifications" ? "animate-pulse" : ""}`} />
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveSection("security")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                  activeSection === "security" 
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-md" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                }`}
              >
                <Shield size={20} className={`${activeSection === "security" ? "animate-pulse" : ""}`} />
                <span className="font-medium">Security</span>
              </button>
              <button
                onClick={() => setActiveSection("integrations")}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                  activeSection === "integrations" 
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-md" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                }`}
              >
                <Globe size={20} className={`${activeSection === "integrations" ? "animate-pulse" : ""}`} />
                <span className="font-medium">Integrations</span>
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                {activeSection === "general" ? "General Settings" :
                 activeSection === "notifications" ? "Notification Preferences" :
                 activeSection === "security" ? "Security Settings" :
                 "Integration Settings"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {activeSection === "general" ? "Configure your event management system settings" :
                 activeSection === "notifications" ? "Manage your notification preferences" :
                 activeSection === "security" ? "Secure your account and data" :
                 "Manage third-party integrations"}
              </p>
            </div>
            <button 
              className="btn bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-md w-full sm:w-auto"
              onClick={handleSaveSettings}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

          {/* Main Content */}
          <div className="grid gap-6">
            {activeSection === "general" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Settings size={20} className="text-primary" />
                    </div>
                    System Preferences
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">System Name</label>
                      <input 
                        type="text" 
                        placeholder="Event Management System"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>UTC</option>
                        <option>EST</option>
                        <option>PST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="theme" className="text-primary" />
                          <span>Light</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="theme" className="text-primary" />
                          <span>Dark</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="theme" className="text-primary" />
                          <span>System</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Bell size={20} className="text-primary" />
                    </div>
                    Notification Settings
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Reminder Frequency</h4>
                          <p className="text-sm text-gray-600">Set how often you receive reminders</p>
                        </div>
                      </div>
                      <select className="px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield size={20} className="text-primary" />
                    </div>
                    Security Settings
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Lock size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Users size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Session Management</h4>
                          <p className="text-sm text-gray-600">Manage active sessions</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "integrations" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Globe size={20} className="text-primary" />
                    </div>
                    Available Integrations
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Database size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Payment Gateway</h4>
                          <p className="text-sm text-gray-600">Connect payment processing services</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-gray-500" />
                        <div>
                          <h4 className="font-medium">Email Service</h4>
                          <p className="text-sm text-gray-600">Set up email delivery service</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 