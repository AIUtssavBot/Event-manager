"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DollarSign, Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react"

interface Reimbursement {
  id: number
  title: string
  amount: number
  date: string
  status: "pending" | "approved" | "rejected"
  receipt?: string
  description: string
}

export default function CommitteeReimbursements() {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([
    {
      id: 1,
      title: "Marketing Materials",
      amount: 250,
      date: "2023-05-10",
      status: "approved",
      description: "Posters, flyers, and banners for event promotion",
    },
    {
      id: 2,
      title: "Equipment Rental",
      amount: 500,
      date: "2023-05-12",
      status: "pending",
      description: "Projector and sound system for the main hall",
    },
    {
      id: 3,
      title: "Refreshments",
      amount: 150,
      date: "2023-05-14",
      status: "rejected",
      description: "Coffee and snacks for workshop participants",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newReimbursement, setNewReimbursement] = useState<Partial<Reimbursement>>({
    title: "",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const reimbursement: Reimbursement = {
      id: Math.max(0, ...reimbursements.map((r) => r.id)) + 1,
      title: newReimbursement.title || "",
      amount: newReimbursement.amount || 0,
      date: newReimbursement.date || new Date().toISOString().split("T")[0],
      status: "pending",
      description: newReimbursement.description || "",
      receipt: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
    }

    setReimbursements([...reimbursements, reimbursement])
    setShowModal(false)
    setNewReimbursement({
      title: "",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    })
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

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
        return <Clock size={16} className="text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout role="committee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reimbursement Requests</h1>
        <p className="opacity-70">Submit and track your reimbursement requests</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DollarSign size={20} />
            <h2 className="text-xl font-bold">Your Requests</h2>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            New Request
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Receipt</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimbursement) => (
                <tr key={reimbursement.id} className="border-t border-border">
                  <td className="p-3">
                    <div>
                      <h3 className="font-medium">{reimbursement.title}</h3>
                      <p className="text-xs opacity-70">{reimbursement.description}</p>
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
                  <td className="p-3">
                    {reimbursement.receipt ? (
                      <button className="btn btn-outline btn-sm">
                        <FileText size={16} className="mr-1" /> View
                      </button>
                    ) : (
                      <span className="text-xs opacity-70">No receipt</span>
                    )}
                  </td>
                  <td className="p-3">
                    {reimbursement.status === "pending" && <button className="btn btn-outline btn-sm">Edit</button>}
                  </td>
                </tr>
              ))}

              {reimbursements.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center opacity-70">
                    No reimbursement requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={20} />
          <h2 className="text-xl font-bold">Reimbursement Guidelines</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Eligible Expenses</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>Event-related materials and supplies</li>
              <li>Equipment rental for official events</li>
              <li>Printing and marketing materials</li>
              <li>Refreshments for workshops and meetings</li>
              <li>Transportation for official business</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>All requests must include a clear photo of the receipt</li>
              <li>Requests must be submitted within 30 days of purchase</li>
              <li>Detailed description of the purpose of the expense</li>
              <li>Approval from committee head for expenses over $200</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Process</h3>
            <ol className="list-decimal pl-5 space-y-1 opacity-70">
              <li>Submit the reimbursement request with all required information</li>
              <li>Admin will review the request (typically within 2-3 business days)</li>
              <li>If approved, reimbursement will be processed within 5-7 business days</li>
              <li>You will receive a notification when the reimbursement is processed</li>
            </ol>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">New Reimbursement Request</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-input"
                    value={newReimbursement.title}
                    onChange={(e) => setNewReimbursement({ ...newReimbursement, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount" className="form-label">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="form-input"
                    min="0"
                    step="0.01"
                    value={newReimbursement.amount}
                    onChange={(e) =>
                      setNewReimbursement({ ...newReimbursement, amount: Number.parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    Date of Purchase
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-input"
                    value={newReimbursement.date}
                    onChange={(e) => setNewReimbursement({ ...newReimbursement, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-input"
                    rows={3}
                    value={newReimbursement.description}
                    onChange={(e) => setNewReimbursement({ ...newReimbursement, description: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="receipt" className="form-label">
                    Receipt Image
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="btn btn-outline flex-1 cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      {selectedFile ? selectedFile.name : "Upload Receipt"}
                      <input
                        type="file"
                        id="receipt"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    {selectedFile && (
                      <button type="button" className="btn btn-outline p-2" onClick={() => setSelectedFile(null)}>
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs opacity-70 mt-1">Please upload a clear photo of the receipt</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

