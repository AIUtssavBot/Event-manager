"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DollarSign, CheckCircle, XCircle, Eye, Filter } from "lucide-react"

interface Reimbursement {
  id: number
  requester: string
  committee: string
  title: string
  amount: number
  date: string
  status: "pending" | "approved" | "rejected"
  receipt?: string
  description: string
}

export default function AdminReimbursements() {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([
    {
      id: 1,
      requester: "John Doe",
      committee: "Technical",
      title: "Equipment Rental",
      amount: 500,
      date: "2023-05-12",
      status: "pending",
      description: "Projector and sound system for the main hall",
    },
    {
      id: 2,
      requester: "Alice Smith",
      committee: "Marketing",
      title: "Marketing Materials",
      amount: 250,
      date: "2023-05-10",
      status: "approved",
      description: "Posters, flyers, and banners for event promotion",
    },
    {
      id: 3,
      requester: "Robert Johnson",
      committee: "Design",
      title: "Design Software",
      amount: 350,
      date: "2023-05-08",
      status: "rejected",
      description: "Annual subscription for design software",
    },
    {
      id: 4,
      requester: "Emily Davis",
      committee: "Logistics",
      title: "Refreshments",
      amount: 150,
      date: "2023-05-14",
      status: "pending",
      description: "Coffee and snacks for workshop participants",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [currentReimbursement, setCurrentReimbursement] = useState<Reimbursement | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const handleViewReimbursement = (reimbursement: Reimbursement) => {
    setCurrentReimbursement(reimbursement)
    setShowModal(true)
  }

  const handleApprove = (id: number) => {
    setReimbursements(reimbursements.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))

    if (currentReimbursement?.id === id) {
      setCurrentReimbursement({ ...currentReimbursement, status: "approved" })
    }
  }

  const handleReject = (id: number) => {
    setReimbursements(reimbursements.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))

    if (currentReimbursement?.id === id) {
      setCurrentReimbursement({ ...currentReimbursement, status: "rejected" })
    }
  }

  const filteredReimbursements =
    filterStatus === "all" ? reimbursements : reimbursements.filter((item) => item.status === filterStatus)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="badge badge-primary">Approved</span>
      case "rejected":
        return <span className="badge badge-secondary">Rejected</span>
      case "pending":
        return <span className="badge badge-accent">Pending</span>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="text-green-500" />
      case "rejected":
        return <XCircle size={16} className="text-red-500" />
      case "pending":
        return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
      default:
        return null
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reimbursement Requests</h1>
        <p className="opacity-70">Review and manage reimbursement requests from committee members</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DollarSign size={20} />
            <h2 className="text-xl font-bold">Reimbursement Requests</h2>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <select
              className="form-input w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3">Requester</th>
                <th className="text-left p-3">Committee</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReimbursements.map((reimbursement) => (
                <tr key={reimbursement.id} className="border-t border-border">
                  <td className="p-3 font-medium">{reimbursement.requester}</td>
                  <td className="p-3">{reimbursement.committee}</td>
                  <td className="p-3">
                    <div>
                      <p>{reimbursement.title}</p>
                      <p className="text-xs opacity-70">{reimbursement.description.substring(0, 30)}...</p>
                    </div>
                  </td>
                  <td className="p-3">${reimbursement.amount.toFixed(2)}</td>
                  <td className="p-3">{reimbursement.date}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reimbursement.status)}
                      {getStatusBadge(reimbursement.status)}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="btn btn-outline p-2"
                        onClick={() => handleViewReimbursement(reimbursement)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {reimbursement.status === "pending" && (
                        <>
                          <button
                            className="btn btn-outline p-2"
                            onClick={() => handleApprove(reimbursement.id)}
                            title="Approve"
                          >
                            <CheckCircle size={16} className="text-green-500" />
                          </button>
                          <button
                            className="btn btn-outline p-2"
                            onClick={() => handleReject(reimbursement.id)}
                            title="Reject"
                          >
                            <XCircle size={16} className="text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredReimbursements.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center opacity-70">
                    No reimbursement requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && currentReimbursement && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Reimbursement Details</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm opacity-70">Requester</p>
                  <p className="font-medium">{currentReimbursement.requester}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Committee</p>
                  <p className="font-medium">{currentReimbursement.committee}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Amount</p>
                  <p className="font-medium">${currentReimbursement.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Date</p>
                  <p className="font-medium">{currentReimbursement.date}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Title</p>
                <p className="font-medium">{currentReimbursement.title}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Description</p>
                <p>{currentReimbursement.description}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(currentReimbursement.status)}
                  {getStatusBadge(currentReimbursement.status)}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Receipt</p>
                {currentReimbursement.receipt ? (
                  <div className="mt-2 p-4 bg-input rounded-md flex items-center justify-center">
                    <img
                      src={currentReimbursement.receipt || "/placeholder.svg"}
                      alt="Receipt"
                      className="max-w-full max-h-64"
                    />
                  </div>
                ) : (
                  <p className="italic mt-1">No receipt uploaded</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {currentReimbursement.status === "pending" ? (
                <>
                  <button className="btn btn-outline" onClick={() => handleReject(currentReimbursement.id)}>
                    Reject
                  </button>
                  <button className="btn btn-primary" onClick={() => handleApprove(currentReimbursement.id)}>
                    Approve
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

