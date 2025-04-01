"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Users, Search, Filter, Download, Eye, Mail, UserPlus } from "lucide-react"

interface Attendee {
  id: number
  name: string
  email: string
  phone: string
  registrationDate: string
  checkedIn: boolean
  checkedOut: boolean
  feedback?: {
    rating: number
    comments?: string
  }
}

export default function AdminAttendees() {
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      registrationDate: "2023-05-01",
      checkedIn: true,
      checkedOut: true,
      feedback: {
        rating: 4,
        comments: "Great event! Would attend again.",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      registrationDate: "2023-05-02",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      registrationDate: "2023-05-03",
      checkedIn: false,
      checkedOut: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 789-0123",
      registrationDate: "2023-05-04",
      checkedIn: true,
      checkedOut: true,
      feedback: {
        rating: 5,
        comments: "Excellent organization and content!",
      },
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 321-6547",
      registrationDate: "2023-05-05",
      checkedIn: true,
      checkedOut: true,
      feedback: {
        rating: 3,
        comments: "Good event, but could use better refreshments.",
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [currentAttendee, setCurrentAttendee] = useState<Attendee | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value)
  }

  const handleViewAttendee = (attendee: Attendee) => {
    setCurrentAttendee(attendee)
    setShowModal(true)
  }

  const filteredAttendees = attendees.filter((attendee) => {
    // Apply search filter
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.phone.includes(searchTerm)

    // Apply status filter
    let matchesStatus = true
    if (filterStatus === "checked-in") {
      matchesStatus = attendee.checkedIn
    } else if (filterStatus === "checked-out") {
      matchesStatus = attendee.checkedOut
    } else if (filterStatus === "registered") {
      matchesStatus = !attendee.checkedIn
    }

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (attendee: Attendee) => {
    if (attendee.checkedOut) {
      return <span className="badge badge-primary">Checked Out</span>
    } else if (attendee.checkedIn) {
      return <span className="badge badge-accent">Checked In</span>
    } else {
      return <span className="badge badge-outline">Registered</span>
    }
  }

  const getRatingStars = (rating?: number) => {
    if (!rating) return null

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Attendee Management</h1>
        <p className="opacity-70">View and manage event attendees</p>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h2 className="text-xl font-bold">Attendees</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search attendees..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} />
              <select className="form-input w-auto" value={filterStatus} onChange={handleFilterChange}>
                <option value="all">All Attendees</option>
                <option value="registered">Registered Only</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
              </select>
            </div>

            <button className="btn btn-outline">
              <Download size={18} className="mr-2" /> Export
            </button>

            <button className="btn btn-primary">
              <UserPlus size={18} className="mr-2" /> Add Attendee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Registration Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Feedback</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee) => (
                <tr key={attendee.id} className="border-t border-border">
                  <td className="p-3 font-medium">{attendee.name}</td>
                  <td className="p-3">{attendee.email}</td>
                  <td className="p-3">{attendee.phone}</td>
                  <td className="p-3">{attendee.registrationDate}</td>
                  <td className="p-3">{getStatusBadge(attendee)}</td>
                  <td className="p-3">
                    {attendee.feedback ? getRatingStars(attendee.feedback.rating) : "No feedback"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="btn btn-outline p-2"
                        onClick={() => handleViewAttendee(attendee)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-outline p-2" title="Send Email">
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAttendees.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center opacity-70">
                    No attendees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm opacity-70">
            Showing {filteredAttendees.length} of {attendees.length} attendees
          </p>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" disabled>
              Previous
            </button>
            <button className="btn btn-outline btn-sm">Next</button>
          </div>
        </div>
      </div>

      {showModal && currentAttendee && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Attendee Details</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm opacity-70">Name</p>
                  <p className="font-medium">{currentAttendee.name}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-medium">{currentAttendee.email}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Phone</p>
                  <p className="font-medium">{currentAttendee.phone}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Registration Date</p>
                  <p className="font-medium">{currentAttendee.registrationDate}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Status</p>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={currentAttendee.checkedIn} readOnly />
                    <span>Checked In</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={currentAttendee.checkedOut} readOnly />
                    <span>Checked Out</span>
                  </div>
                </div>
              </div>

              {currentAttendee.feedback && (
                <div className="mb-4">
                  <p className="text-sm opacity-70">Feedback</p>
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <span>Rating:</span>
                      {getRatingStars(currentAttendee.feedback.rating)}
                      <span>({currentAttendee.feedback.rating}/5)</span>
                    </div>
                    {currentAttendee.feedback.comments && (
                      <div className="mt-2">
                        <p className="text-sm opacity-70">Comments:</p>
                        <p className="p-2 bg-input rounded-md mt-1">{currentAttendee.feedback.comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm opacity-70">QR Code</p>
                <div className="mt-2 p-4 bg-input rounded-md flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-primary flex items-center justify-center">
                    <p className="text-xs text-center">Attendee QR Code</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn btn-primary">
                <Mail size={16} className="mr-2" /> Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

