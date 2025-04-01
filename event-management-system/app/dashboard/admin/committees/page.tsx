"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Users,
  UserPlus,
  Settings,
  Calendar,
  Mail,
  Phone,
  Search,
  Edit,
  Trash,
  ChevronDown
} from "lucide-react"

type Committee = {
  id: string
  name: string
  lead: string
  members: number
  email: string
  phone: string
  status: "active" | "inactive"
}

export default function CommitteesPage() {
  const [committees] = useState<Committee[]>([
    {
      id: "1",
      name: "Technical Committee",
      lead: "John Doe",
      members: 8,
      email: "tech@event.com",
      phone: "+1 234 567 8900",
      status: "active"
    },
    {
      id: "2",
      name: "Marketing Committee",
      lead: "Jane Smith",
      members: 6,
      email: "marketing@event.com",
      phone: "+1 234 567 8901",
      status: "active"
    },
    {
      id: "3",
      name: "Logistics Committee",
      lead: "Mike Johnson",
      members: 10,
      email: "logistics@event.com",
      phone: "+1 234 567 8902",
      status: "inactive"
    }
  ])

  return (
    <DashboardLayout role="admin">
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                Committees
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage event committees and their members
              </p>
            </div>
            <button 
              className="btn bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-md w-full sm:w-auto"
            >
              <UserPlus size={18} />
              Add Committee
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md border border-border p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search committees..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Committees List */}
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users size={20} className="text-primary" />
                </div>
                Committee List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left p-4">Committee Name</th>
                    <th className="text-left p-4">Lead</th>
                    <th className="text-center p-4">Members</th>
                    <th className="text-left p-4">Contact</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {committees.map(committee => (
                    <tr key={committee.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">{committee.name}</div>
                      </td>
                      <td className="p-4">{committee.lead}</td>
                      <td className="p-4 text-center">{committee.members}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} />
                            {committee.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} />
                            {committee.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            committee.status === "active" 
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {committee.status.charAt(0).toUpperCase() + committee.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronDown size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 