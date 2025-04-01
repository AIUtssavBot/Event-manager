"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  BarChart,
  PieChart,
  LineChart,
  Download,
  Calendar,
  Users,
  DollarSign,
  Filter
} from "lucide-react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30")
  const [reportType, setReportType] = useState<"events" | "users" | "revenue">("events")

  return (
    <DashboardLayout role="superadmin">
      <div className="flex-1 overflow-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm opacity-70 mt-1">View and analyze system data</p>
          </div>
          <button 
            className="btn btn-outline flex items-center gap-2"
          >
            <Download size={18} />
            Export Data
          </button>
      </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Report Type</label>
              <select 
                className="form-input" 
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
              >
                <option value="events">Event Analytics</option>
                <option value="users">User Analytics</option>
                <option value="revenue">Revenue Analytics</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Date Range</label>
              <select 
                className="form-input"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="last-7">Last 7 Days</option>
                <option value="last-30">Last 30 Days</option>
                <option value="this-month">This Month</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Additional Filters</label>
              <button className="btn btn-outline w-full flex items-center justify-center gap-2">
                <Filter size={16} />
                More Filters
        </button>
      </div>
          </div>
                </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Calendar size={24} className="text-primary" />
              </div>
                    <div>
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-sm opacity-70">Total Events</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              +12.5% from last month
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Users size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">2,451</h3>
                <p className="text-sm opacity-70">Total Users</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              +8.2% from last month
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <DollarSign size={24} className="text-primary" />
            </div>
              <div>
                <h3 className="text-2xl font-bold">$12,845</h3>
                <p className="text-sm opacity-70">Total Revenue</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              +15.8% from last month
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="card mb-6">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Trend Analysis</h2>
          </div>
          <div className="p-4 aspect-[2/1] bg-gray-50 flex items-center justify-center">
            {/* Placeholder for actual chart component */}
            <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Top Events</h2>
            </div>
            <div className="p-4">
            <table className="w-full">
              <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2">Event Name</th>
                    <th className="text-right p-2">Attendees</th>
                    <th className="text-right p-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                  <tr className="border-b border-border">
                    <td className="p-2">Tech Conference 2024</td>
                    <td className="text-right">450</td>
                    <td className="text-right">$4,500</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2">Summer Music Festival</td>
                    <td className="text-right">1200</td>
                    <td className="text-right">$3,600</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2">Business Workshop</td>
                    <td className="text-right">180</td>
                    <td className="text-right">$2,700</td>
                  </tr>
              </tbody>
            </table>
            </div>
          </div>

          <div className="card">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold">User Demographics</h2>
            </div>
            <div className="p-4 aspect-square bg-gray-50 flex items-center justify-center">
              {/* Placeholder for actual chart component */}
              <p className="text-gray-500">Demographics chart will be displayed here</p>
            </div>
          </div>
        </div>
    </div>
    </DashboardLayout>
  )
} 