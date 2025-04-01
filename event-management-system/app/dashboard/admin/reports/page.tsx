"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Calendar,
  Users,
  DollarSign,
  Filter,
  TrendingUp,
  Clock,
  MapPin,
  Search
} from "lucide-react"

type DateRange = "today" | "week" | "month" | "year"
type ReportType = "events" | "attendance" | "revenue" | "demographics"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("month")
  const [reportType, setReportType] = useState<ReportType>("events")

  return (
    <DashboardLayout role="admin">
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                Analytics & Reports
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View detailed insights and analytics about your events
              </p>
            </div>
            <button 
              className="btn bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-md w-full sm:w-auto"
            >
              <Download size={18} />
              Export Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md border border-border p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <select 
                  className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as ReportType)}
                >
                  <option value="events">Events Analysis</option>
                  <option value="attendance">Attendance Tracking</option>
                  <option value="revenue">Revenue Analytics</option>
                  <option value="demographics">Demographics</option>
                </select>
                <select 
                  className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as DateRange)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp size={14} />
                    +12% from last month
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Attendees</p>
                  <h3 className="text-2xl font-bold">1,234</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp size={14} />
                    +18% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <DollarSign size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <h3 className="text-2xl font-bold">$12,345</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp size={14} />
                    +25% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Duration</p>
                  <h3 className="text-2xl font-bold">2.5 hrs</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    No significant change
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BarChart3 size={20} className="text-primary" />
                </div>
                Event Analytics
              </h3>
            </div>
            <div className="p-6">
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Chart will be rendered here
              </div>
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Events */}
            <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <TrendingUp size={20} className="text-primary" />
                  </div>
                  Top Events
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/5 w-10 h-10 rounded-lg flex items-center justify-center">
                          #{item}
                        </div>
                        <div>
                          <h4 className="font-medium">Tech Conference {item}</h4>
                          <p className="text-sm text-gray-600">250 attendees</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$2,500</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <PieChart size={20} className="text-primary" />
                  </div>
                  Attendee Demographics
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[
                    { category: "Students", percentage: 35 },
                    { category: "Professionals", percentage: 45 },
                    { category: "Others", percentage: 20 }
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location Analysis */}
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MapPin size={20} className="text-primary" />
                </div>
                Event Locations
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[
                  { city: "New York", events: 8, revenue: "$12,000" },
                  { city: "Los Angeles", events: 6, revenue: "$9,500" },
                  { city: "Chicago", events: 5, revenue: "$7,800" },
                  { city: "Miami", events: 5, revenue: "$6,500" }
                ].map((location) => (
                  <div key={location.city} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-400" />
                      <div>
                        <h4 className="font-medium">{location.city}</h4>
                        <p className="text-sm text-gray-600">{location.events} events</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{location.revenue}</p>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 