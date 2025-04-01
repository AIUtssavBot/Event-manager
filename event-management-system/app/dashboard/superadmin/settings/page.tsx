"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Settings,
  Save,
  Shield,
  Lock,
  Key,
  Bell,
  Clock,
  Mail
} from "lucide-react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<"security" | "notifications" | "access">("security")

  return (
    <DashboardLayout role="superadmin">
      <div className="flex-1 overflow-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm opacity-70 mt-1">Configure system settings and preferences</p>
        </div>
        <button 
            className="btn btn-primary flex items-center gap-2"
        >
          <Save size={18} />
            Save Changes
        </button>
      </div>

        <div className="flex gap-6">
          {/* Settings Navigation */}
          <div className="w-64">
            <div className="card">
              <div className="p-2">
                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "security" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Lock size={18} />
                  Security Settings
                </button>
                <button
                  onClick={() => setActiveSection("notifications")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "notifications" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Bell size={18} />
                  Notification Settings
                </button>
                    <button
                  onClick={() => setActiveSection("access")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "access" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-gray-100"
                      }`}
                    >
                  <Key size={18} />
                  Access Control
                    </button>
            </div>
          </div>
        </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="card">
              {activeSection === "security" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Two-Factor Authentication</label>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Enable two-factor authentication for all admin accounts</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Session Timeout</label>
                      <select className="form-input">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="240">4 hours</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password Policy</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Require minimum 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Require special characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Require numbers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Email Notifications</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>New permission requests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>System updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Security alerts</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notification Frequency</label>
                      <select className="form-input">
                        <option value="instant">Instant</option>
                        <option value="hourly">Hourly digest</option>
                        <option value="daily">Daily digest</option>
                        <option value="weekly">Weekly digest</option>
                      </select>
                    </div>
                  </div>
              </div>
              )}

              {activeSection === "access" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Access Control Settings</h2>
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">IP Whitelisting</label>
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter IP address"
                        />
                        <button className="btn btn-outline btn-sm">
                          Add IP Address
                </button>
              </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Access Restrictions</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Restrict access to office hours only</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Require VPN for external access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 