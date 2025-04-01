"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { QrCode, Download, Share2, Clipboard, CheckCircle } from "lucide-react"

export default function AttendeeQrCode() {
  const [activeTab, setActiveTab] = useState<"entry" | "exit">("entry")
  const [copied, setCopied] = useState(false)

  const handleCopyId = () => {
    // In a real app, this would copy the actual attendee ID
    navigator.clipboard.writeText("ATT-12345-ABCDE")
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <DashboardLayout role="attendee">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your QR Codes</h1>
        <p className="opacity-70">Use these QR codes for event entry and exit</p>
      </div>

      <div className="card">
        <div className="tabs mb-6">
          <button className={`tab ${activeTab === "entry" ? "tab-active" : ""}`} onClick={() => setActiveTab("entry")}>
            Entry QR Code
          </button>
          <button className={`tab ${activeTab === "exit" ? "tab-active" : ""}`} onClick={() => setActiveTab("exit")}>
            Exit QR Code
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="qr-container mb-6">
            <div className="qr-code bg-white p-4 rounded-md">
              {/* This would be a real QR code in production */}
              <div className="w-full h-full border-2 border-primary flex items-center justify-center">
                <QrCode size={200} />
              </div>
            </div>
            <p className="text-center mt-4 font-medium">
              {activeTab === "entry"
                ? "Show this QR code at the registration desk"
                : "Scan this QR code when leaving the event"}
            </p>
            {activeTab === "exit" && (
              <p className="text-center mt-2 opacity-70">You will be asked to complete a short feedback form</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn btn-primary">
              <Download size={18} className="mr-2" /> Download QR
            </button>
            <button className="btn btn-outline">
              <Share2 size={18} className="mr-2" /> Share
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-bold mb-4">Attendee Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm opacity-70">Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm opacity-70">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-sm opacity-70">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm opacity-70">Registration Date</p>
              <p className="font-medium">May 1, 2023</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-md bg-input">
            <div>
              <p className="text-sm opacity-70">Attendee ID</p>
              <p className="font-medium">ATT-12345-ABCDE</p>
            </div>
            <button className="btn btn-outline p-2" onClick={handleCopyId} title="Copy ID">
              {copied ? <CheckCircle size={18} className="text-green-500" /> : <Clipboard size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="text-lg font-bold mb-4">Important Information</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Entry Instructions</h4>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>Show your Entry QR code at the registration desk when you arrive</li>
              <li>You will receive a physical badge after check-in</li>
              <li>Keep your badge visible at all times during the event</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Exit Instructions</h4>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>Scan your Exit QR code at the exit points when leaving</li>
              <li>Complete the feedback form to help us improve future events</li>
              <li>Return your badge at the exit if requested</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">QR Code Safety</h4>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>Do not share your QR codes with others</li>
              <li>Each QR code is unique to you and cannot be reused</li>
              <li>If you have any issues with your QR codes, please contact the event staff</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

