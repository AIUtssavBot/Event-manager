"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { BarChart2, Calendar, Users, CheckCircle, AlertCircle } from "lucide-react"

export default function SuperAdminDashboard() {
  const [pendingPermissions, setPendingPermissions] = useState([
    { id: 1, type: "Event Creation", requester: "Marketing Committee", date: "2023-05-15" },
    { id: 2, type: "Budget Increase", requester: "Technical Committee", date: "2023-05-14" },
    { id: 3, type: "New Member", requester: "Design Committee", date: "2023-05-13" },
  ])

  const handleApprove = (id: number) => {
    setPendingPermissions(pendingPermissions.filter((item) => item.id !== id))
  }

  const handleReject = (id: number) => {
    setPendingPermissions(pendingPermissions.filter((item) => item.id !== id))
  }

  return (
    <DashboardLayout role="superadmin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="opacity-70">Welcome back! Here's what's happening across all departments.</p>
      </div>

      <div className="grid mb-6">
        <div className="stats-card">
          <div className="stats-value">12</div>
          <div className="stats-label">Total Events</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">5</div>
          <div className="stats-label">Admin Users</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">24</div>
          <div className="stats-label">Committee Members</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">1,250</div>
          <div className="stats-label">Registered Attendees</div>
        </div>The css files which are made have not been applied
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <Calendar size={20} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Tech Conference 2023</h3>
                <p className="text-sm opacity-70">May 20, 2023 • Main Hall</p>
              </div>
              <span className="badge badge-primary">Approved</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Design Workshop</h3>
                <p className="text-sm opacity-70">May 25, 2023 • Room 101</p>
              </div>
              <span className="badge badge-accent">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Marketing Seminar</h3>
                <p className="text-sm opacity-70">June 2, 2023 • Auditorium</p>
              </div>
              <span className="badge badge-primary">Approved</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Department Overview</h2>
            <BarChart2 size={20} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Technical</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Marketing</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Design</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Logistics</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Pending Permissions</h2>
          <Users size={20} />
        </div>

        {pendingPermissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Requester</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPermissions.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.requester}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="btn btn-outline p-1 mr-2"
                        title="Approve"
                      >
                        <CheckCircle size={18} className="text-green-500" />
                      </button>
                      <button onClick={() => handleReject(item.id)} className="btn btn-outline p-1" title="Reject">
                        <AlertCircle size={18} className="text-secondary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center p-6 opacity-70">No pending permissions</p>
        )}
      </div>
    </DashboardLayout>
  )
}

