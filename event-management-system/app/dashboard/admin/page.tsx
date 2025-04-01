"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { BarChart2, Calendar, MessageSquare, FileText } from "lucide-react"

export default function AdminDashboard() {
  const [attendeeStats, setAttendeeStats] = useState({
    registered: 1250,
    checkedIn: 850,
    checkedOut: 720,
    satisfaction: 85,
  })

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="opacity-70">Manage events, committees, and attendees</p>
      </div>

      <div className="grid mb-6">
        <div className="stats-card">
          <div className="stats-value">{attendeeStats.registered}</div>
          <div className="stats-label">Registered Attendees</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{attendeeStats.checkedIn}</div>
          <div className="stats-label">Checked In</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{attendeeStats.checkedOut}</div>
          <div className="stats-label">Checked Out</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{attendeeStats.satisfaction}%</div>
          <div className="stats-label">Satisfaction Rate</div>
        </div>
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
            <h2 className="text-xl font-bold">Committee Performance</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Reimbursement Requests</h2>
            <FileText size={20} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Marketing Materials</h3>
                <p className="text-sm opacity-70">$250 • Marketing Committee</p>
              </div>
              <button className="btn btn-primary btn-sm">Review</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Equipment Rental</h3>
                <p className="text-sm opacity-70">$500 • Technical Committee</p>
              </div>
              <button className="btn btn-primary btn-sm">Review</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div>
                <h3 className="font-medium">Refreshments</h3>
                <p className="text-sm opacity-70">$150 • Logistics Committee</p>
              </div>
              <button className="btn btn-primary btn-sm">Review</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Messages</h2>
            <MessageSquare size={20} />
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-input">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-xs opacity-70">Technical Committee</p>
                </div>
              </div>
              <p className="text-sm">Can we discuss the equipment requirements for the upcoming hackathon?</p>
            </div>
            <div className="p-3 rounded-md bg-input">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  AS
                </div>
                <div>
                  <h3 className="font-medium">Alice Smith</h3>
                  <p className="text-xs opacity-70">Marketing Committee</p>
                </div>
              </div>
              <p className="text-sm">The sponsorship email templates are ready for review.</p>
            </div>
            <div className="p-3 rounded-md bg-input">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                  RJ
                </div>
                <div>
                  <h3 className="font-medium">Robert Johnson</h3>
                  <p className="text-xs opacity-70">Design Committee</p>
                </div>
              </div>
              <p className="text-sm">I've uploaded the new event banners and logos to the shared drive for approval.</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-outline">View All Messages</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

