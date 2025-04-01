"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { ShoppingBag, MapPin, Info, ExternalLink, Search, Filter } from "lucide-react"

interface Stall {
  id: number
  name: string
  category: "food" | "tech" | "merchandise" | "sponsor" | "game"
  location: string
  description: string
  items?: string[]
  logo?: string
  website?: string
}

export default function AttendeeStalls() {
  const [stalls, setStalls] = useState<Stall[]>([
    {
      id: 1,
      name: "TechCorp",
      category: "sponsor",
      location: "Main Hall - Booth A1",
      description: "Leading technology company showcasing the latest innovations.",
      items: ["Product demos", "Career opportunities", "Free swag"],
      website: "https://example.com/techcorp",
    },
    {
      id: 2,
      name: "Code Café",
      category: "food",
      location: "Food Court - Stall F3",
      description: "Specialty coffee and snacks for developers.",
      items: ["Coffee", "Pastries", "Sandwiches", "Energy drinks"],
    },
    {
      id: 3,
      name: "Dev Gear",
      category: "merchandise",
      location: "Exhibition Hall - Booth M2",
      description: "Cool tech merchandise and apparel.",
      items: ["T-shirts", "Stickers", "Mugs", "Laptop sleeves"],
      website: "https://example.com/devgear",
    },
    {
      id: 4,
      name: "VR Experience",
      category: "game",
      location: "Gaming Zone - Area G1",
      description: "Try out the latest VR games and experiences.",
      items: ["VR headsets", "Interactive demos", "Gaming competitions"],
    },
    {
      id: 5,
      name: "Cloud Solutions",
      category: "sponsor",
      location: "Main Hall - Booth A2",
      description: "Cloud computing services and solutions.",
      items: ["Cloud demos", "Free credits", "Technical consultations"],
      website: "https://example.com/cloudsolutions",
    },
    {
      id: 6,
      name: "Bytes & Bites",
      category: "food",
      location: "Food Court - Stall F1",
      description: "Gourmet food for hungry attendees.",
      items: ["Burgers", "Salads", "Smoothies", "Desserts"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value)
  }

  const handleViewStall = (stall: Stall) => {
    setSelectedStall(stall)
    setShowModal(true)
  }

  const filteredStalls = stalls.filter((stall) => {
    // Apply search filter
    const matchesSearch =
      stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply category filter
    const matchesCategory = filterCategory === "all" || stall.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "food":
        return <span className="badge badge-primary">Food</span>
      case "tech":
        return <span className="badge badge-accent">Tech</span>
      case "merchandise":
        return <span className="badge badge-secondary">Merchandise</span>
      case "sponsor":
        return (
          <span className="badge" style={{ backgroundColor: "#6366f1" }}>
            Sponsor
          </span>
        )
      case "game":
        return (
          <span className="badge" style={{ backgroundColor: "#10b981" }}>
            Game
          </span>
        )
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return "🍔"
      case "tech":
        return "💻"
      case "merchandise":
        return "👕"
      case "sponsor":
        return "🏢"
      case "game":
        return "🎮"
      default:
        return ""
    }
  }

  return (
    <DashboardLayout role="attendee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Stalls & Sponsors</h1>
        <p className="opacity-70">Explore stalls and sponsors at the event</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search stalls..."
            className="form-input pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select className="form-input w-auto" value={filterCategory} onChange={handleFilterChange}>
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="tech">Tech</option>
            <option value="merchandise">Merchandise</option>
            <option value="sponsor">Sponsors</option>
            <option value="game">Games</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredStalls.map((stall) => (
          <div key={stall.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-input flex items-center justify-center text-2xl">
                  {getCategoryIcon(stall.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{stall.name}</h3>
                  <div>{getCategoryBadge(stall.category)}</div>
                </div>
              </div>
              <button className="btn btn-outline p-2" onClick={() => handleViewStall(stall)}>
                <Info size={18} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="opacity-70" />
                <span>{stall.location}</span>
              </div>
              <p className="opacity-70">{stall.description}</p>
            </div>

            {stall.website && (
              <a
                href={stall.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary"
              >
                <ExternalLink size={16} />
                <span>Visit Website</span>
              </a>
            )}
          </div>
        ))}

        {filteredStalls.length === 0 && (
          <div className="col-span-full text-center p-12 opacity-70">
            <ShoppingBag size={48} className="mx-auto mb-4" />
            <p>No stalls found matching your search criteria</p>
          </div>
        )}
      </div>

      {showModal && selectedStall && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{selectedStall.name}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="flex items-center gap-2 mb-4">
                {getCategoryBadge(selectedStall.category)}
                <span className="text-2xl">{getCategoryIcon(selectedStall.category)}</span>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Location</p>
                <p className="font-medium">{selectedStall.location}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm opacity-70">Description</p>
                <p>{selectedStall.description}</p>
              </div>

              {selectedStall.items && selectedStall.items.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm opacity-70">Available Items</p>
                  <ul className="list-disc pl-5 mt-2">
                    {selectedStall.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedStall.logo && (
                <div className="mb-4">
                  <img
                    src={selectedStall.logo || "/placeholder.svg"}
                    alt={`${selectedStall.name} logo`}
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedStall.website ? (
                <>
                  <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <a href={selectedStall.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} className="mr-2" /> Visit Website
                  </a>
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

