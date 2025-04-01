"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Calendar, Users, CheckCircle, Clock, FileText } from "lucide-react"

export default function CommitteeDashboard() {
  const [department, setDepartment] = useState("Technical")
  const [attendeeStats, setAttendeeStats] = useState({
    registered: 1250,
    checkedIn: 850,
    checkedOut: 720,
  })

  const [tasks, setTasks] = useState([
    { id: 1, title: "Prepare equipment list", deadline: "2023-05-15", status: "completed" },
    { id: 2, title: "Contact speakers", deadline: "2023-05-18", status: "in-progress" },
    { id: 3, title: "Test AV equipment", deadline: "2023-05-20", status: "pending" },
    { id: 4, title: "Prepare workshop materials", deadline: "2023-05-22", status: "pending" },
  ])

  return (
    <DashboardLayout role="committee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Committee Dashboard</h1>
        <p className="opacity-70">Welcome to the {department} Committee dashboard</p>
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
          <div className="stats-value">68%</div>
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
                <h3 className="font-medium">Hackathon</h3>
                <p className="text-sm opacity-70">June 10, 2023 • Lab Building</p>
              </div>
              <span className="badge badge-accent">Pending</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Task Progress</h2>
            <FileText size={20} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Overall Progress</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Equipment Setup</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Speaker Coordination</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Workshop Preparation</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-input rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Tasks</h2>
            <Clock size={20} />
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-md bg-input">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.status === "completed"
                        ? "bg-green-500 text-white"
                        : task.status === "in-progress"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {task.status === "completed" && <CheckCircle size={14} />}
                    {task.status === "in-progress" && <Clock size={14} />}
                  </div>
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-xs opacity-70">Due: {task.deadline}</p>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">{task.status === "completed" ? "View" : "Update"}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Team Members</h2>
            <Users size={20} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-xs opacity-70">Equipment Coordinator</p>
                </div>
              </div>
              <span className="badge badge-primary">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  AS
                </div>
                <div>
                  <h3 className="font-medium">Alice Smith</h3>
                  <p className="text-xs opacity-70">Speaker Liaison</p>
                </div>
              </div>
              <span className="badge badge-primary">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-input">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                  RJ
                </div>
                <div>
                  <h3 className="font-medium">Robert Johnson</h3>
                  <p className="text-xs opacity-70">Workshop Facilitator</p>
                </div>
              </div>
              <span className="badge badge-secondary">Offline</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

