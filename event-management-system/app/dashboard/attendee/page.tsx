"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Calendar, MapPin, Clock, Users, QrCode } from "lucide-react"
import Link from "next/link"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  committee: string
  description: string
  image?: string
}

export default function AttendeeDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "May 20, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "Main Hall",
      committee: "Technical Committee",
      description: "Join us for a day of tech talks, workshops, and networking opportunities.",
    },
    {
      id: 2,
      title: "Design Workshop",
      date: "May 25, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Room 101",
      committee: "Design Committee",
      description: "Learn the latest design trends and tools in this hands-on workshop.",
    },
    {
      id: 3,
      title: "Marketing Seminar",
      date: "June 2, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Auditorium",
      committee: "Marketing Committee",
      description: "Discover effective marketing strategies for the digital age.",
    },
    {
      id: 4,
      title: "Hackathon",
      date: "June 10, 2023",
      time: "9:00 AM - 9:00 PM",
      location: "Lab Building",
      committee: "Technical Committee",
      description: "24-hour coding challenge with prizes for the best projects.",
    },
  ])

  const [showQrModal, setShowQrModal] = useState(false)
  const [qrType, setQrType] = useState<"entry" | "exit">("entry")

  const openQrCode = (type: "entry" | "exit") => {
    setQrType(type)
    setShowQrModal(true)
  }

  return (
    <DashboardLayout role="attendee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, Attendee!</h1>
        <p className="opacity-70">Discover events, check in, and explore stalls</p>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Your QR Codes</h2>
            <p className="opacity-70">Use these QR codes for entry and exit</p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-primary" onClick={() => openQrCode("entry")}>
              <QrCode size={18} className="mr-2" /> Entry QR
            </button>
            <button className="btn btn-outline" onClick={() => openQrCode("exit")}>
              <QrCode size={18} className="mr-2" /> Exit QR
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-input mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} />
            <h3 className="font-medium">Quick Tips</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1 opacity-70">
            <li>Show your Entry QR code at the registration desk when you arrive</li>
            <li>Complete the feedback form when scanning your Exit QR code</li>
            <li>Visit the Stalls page to discover sponsors and activities</li>
            <li>Check out the Puzzles page for interactive challenges</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="card">
              <div className="aspect-video bg-input rounded-md mb-4 flex items-center justify-center">
                {event.image ? (
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Calendar size={48} className="opacity-50" />
                )}
              </div>
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="opacity-70" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="opacity-70" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="opacity-70" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="opacity-70" />
                  <span>{event.committee}</span>
                </div>
              </div>
              <p className="opacity-70 mb-4">{event.description}</p>
              <Link href={`/dashboard/attendee/events/${event.id}`} className="btn btn-primary w-full">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {showQrModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{qrType === "entry" ? "Entry" : "Exit"} QR Code</h3>
              <button className="modal-close" onClick={() => setShowQrModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="qr-container">
                <div className="qr-code bg-white p-4 rounded-md">
                  {/* This would be a real QR code in production */}
                  <div className="w-full h-full border-2 border-primary flex items-center justify-center">
                    <QrCode size={120} />
                  </div>
                </div>
                <p className="text-center mt-4 font-medium">
                  {qrType === "entry"
                    ? "Show this QR code at the registration desk"
                    : "Scan this QR code when leaving the event"}
                </p>
                {qrType === "exit" && (
                  <p className="text-center mt-2 opacity-70">You will be asked to complete a short feedback form</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowQrModal(false)}>
                Close
              </button>
              <button className="btn btn-primary">Download QR Code</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

