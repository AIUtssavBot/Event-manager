"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Mail, FileText, Send, Plus, Download, Trash2 } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface EmailTemplate {
  id: number
  name: string
  subject: string
  body: string
}

interface Contact {
  id: number
  name: string
  email: string
  company: string
  type: "sponsor" | "partner" | "media"
}

export default function AdminMarketing() {
  const [activeTab, setActiveTab] = useState("email")
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: 1,
      name: "Sponsorship Request",
      subject: "Sponsorship Opportunity for Tech Conference 2023",
      body: "Dear [Company],\n\nWe are excited to invite you to sponsor our upcoming Tech Conference 2023, which will take place on May 20, 2023 at the Main Hall.\n\nAs a sponsor, you will have the opportunity to showcase your brand to over 1,000 attendees, including students, professionals, and industry leaders.\n\nPlease let us know if you are interested in this opportunity.\n\nBest regards,\nEvent Management Team",
    },
    {
      id: 2,
      name: "Media Partnership",
      subject: "Media Partnership for Tech Conference 2023",
      body: "Dear [Media Partner],\n\nWe would like to invite you to be a media partner for our upcoming Tech Conference 2023, which will take place on May 20, 2023 at the Main Hall.\n\nAs a media partner, you will have exclusive access to our speakers and attendees for interviews and coverage.\n\nPlease let us know if you are interested in this partnership.\n\nBest regards,\nEvent Management Team",
    },
  ])

  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Acme Inc", email: "sponsorships@acme.com", company: "Acme Inc", type: "sponsor" },
    { id: 2, name: "Tech Media", email: "partnerships@techmedia.com", company: "Tech Media", type: "media" },
    { id: 3, name: "Innovate Corp", email: "marketing@innovate.com", company: "Innovate Corp", type: "sponsor" },
    { id: 4, name: "Design Partners", email: "info@designpartners.com", company: "Design Partners", type: "partner" },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate | null>(null)
  const [generatingEmail, setGeneratingEmail] = useState(false)

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
  }

  const handleSelectContact = (contactId: number) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const handleSelectAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id))
    }
  }

  const handleCustomizeTemplate = () => {
    if (selectedTemplate) {
      setCurrentTemplate({ ...selectedTemplate })
      setCustomizeModalOpen(true)
    }
  }

  const handleSaveTemplate = () => {
    if (currentTemplate) {
      if (currentTemplate.id) {
        // Update existing template
        setEmailTemplates(
          emailTemplates.map((template) => (template.id === currentTemplate.id ? currentTemplate : template)),
        )
      } else {
        // Add new template
        const newTemplate = {
          ...currentTemplate,
          id: Math.max(0, ...emailTemplates.map((t) => t.id)) + 1,
        }
        setEmailTemplates([...emailTemplates, newTemplate])
      }
      setCustomizeModalOpen(false)
    }
  }

  const handleDeleteTemplate = (id: number) => {
    setEmailTemplates(emailTemplates.filter((template) => template.id !== id))
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null)
    }
  }

  const handleNewTemplate = () => {
    setCurrentTemplate({
      id: 0,
      name: "New Template",
      subject: "",
      body: "",
    })
    setCustomizeModalOpen(true)
  }

  const handleGenerateAIEmail = async () => {
    if (!currentTemplate) return

    setGeneratingEmail(true)

    try {
      const prompt = `Generate a professional email for ${currentTemplate.name} with the following context:
      - Event: Tech Conference 2023
      - Date: May 20, 2023
      - Location: Main Hall
      - Expected Attendees: 1,000+
      - Target: ${currentTemplate.name === "Sponsorship Request" ? "Potential sponsors" : "Media partners"}
      
      The email should have a compelling subject line and a professional body that explains the benefits of participating in our event.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      // Extract subject and body from the generated text
      const subjectMatch = text.match(/Subject: (.*?)(?:\n|$)/)
      const subject = subjectMatch ? subjectMatch[1] : currentTemplate.subject

      // Remove the subject line from the body
      const body = text.replace(/Subject: (.*?)(?:\n|$)/, "").trim()

      setCurrentTemplate({
        ...currentTemplate,
        subject: subject,
        body: body,
      })
    } catch (error) {
      console.error("Error generating email:", error)
    } finally {
      setGeneratingEmail(false)
    }
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Marketing & PR</h1>
        <p className="opacity-70">Manage email campaigns, brochures, and marketing materials</p>
      </div>

      <div className="tabs mb-6">
        <button className={`tab ${activeTab === "email" ? "tab-active" : ""}`} onClick={() => setActiveTab("email")}>
          Email Campaigns
        </button>
        <button
          className={`tab ${activeTab === "brochures" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("brochures")}
        >
          Brochures
        </button>
        <button
          className={`tab ${activeTab === "analytics" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {activeTab === "email" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Email Templates</h2>
              <button className="btn btn-outline p-2" onClick={handleNewTemplate}>
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {emailTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                    selectedTemplate?.id === template.id ? "bg-primary text-primary-foreground" : "bg-input"
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm opacity-70">{template.subject}</p>
                  </div>
                  <button
                    className="btn btn-outline p-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTemplate(template.id)
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Contacts</h2>
              <div className="flex items-center gap-2">
                <button className="btn btn-outline p-2">
                  <Plus size={18} />
                </button>
                <button className="btn btn-outline p-2" onClick={handleSelectAllContacts}>
                  {selectedContacts.length === contacts.length ? "Deselect All" : "Select All"}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-3 rounded-md bg-input flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                  />
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm opacity-70">{contact.email}</p>
                  </div>
                  <span className="ml-auto badge badge-primary">{contact.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Campaign</h2>
              <Mail size={20} />
            </div>

            {selectedTemplate ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Template</label>
                  <p className="p-2 bg-input rounded-md">{selectedTemplate.name}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <p className="p-2 bg-input rounded-md">{selectedTemplate.subject}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Selected Contacts</label>
                  <p className="p-2 bg-input rounded-md">{selectedContacts.length} contacts selected</p>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="btn btn-outline flex-1" onClick={handleCustomizeTemplate}>
                    <FileText size={18} className="mr-2" /> Customize
                  </button>
                  <button className="btn btn-primary flex-1" disabled={selectedContacts.length === 0}>
                    <Send size={18} className="mr-2" /> Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 opacity-70">
                <Mail size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a template to start your campaign</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "brochures" && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Brochures & Materials</h2>
            <button className="btn btn-primary">
              <Plus size={18} className="mr-2" /> Upload New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card">
              <div className="aspect-[3/4] bg-input rounded-md mb-3 flex items-center justify-center">
                <FileText size={48} className="opacity-50" />
              </div>
              <h3 className="font-medium">Event Brochure</h3>
              <p className="text-sm opacity-70 mb-3">PDF • 2.5 MB</p>
              <div className="flex gap-2">
                <button className="btn btn-outline flex-1">
                  <Download size={16} className="mr-1" /> Download
                </button>
                <button className="btn btn-outline p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="card">
              <div className="aspect-[3/4] bg-input rounded-md mb-3 flex items-center justify-center">
                <FileText size={48} className="opacity-50" />
              </div>
              <h3 className="font-medium">Sponsorship Package</h3>
              <p className="text-sm opacity-70 mb-3">PDF • 1.8 MB</p>
              <div className="flex gap-2">
                <button className="btn btn-outline flex-1">
                  <Download size={16} className="mr-1" /> Download
                </button>
                <button className="btn btn-outline p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="card">
              <div className="aspect-[3/4] bg-input rounded-md mb-3 flex items-center justify-center">
                <FileText size={48} className="opacity-50" />
              </div>
              <h3 className="font-medium">Media Kit</h3>
              <p className="text-sm opacity-70 mb-3">ZIP • 5.2 MB</p>
              <div className="flex gap-2">
                <button className="btn btn-outline flex-1">
                  <Download size={16} className="mr-1" /> Download
                </button>
                <button className="btn btn-outline p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Marketing Analytics</h2>
            <div className="flex gap-2">
              <select className="form-input w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="btn btn-outline">
                <Download size={18} className="mr-2" /> Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card">
              <h3 className="text-sm opacity-70">Email Open Rate</h3>
              <p className="text-3xl font-bold">68%</p>
              <p className="text-sm text-green-500">+5% from last period</p>
            </div>
            <div className="card">
              <h3 className="text-sm opacity-70">Click-through Rate</h3>
              <p className="text-3xl font-bold">24%</p>
              <p className="text-sm text-green-500">+2% from last period</p>
            </div>
            <div className="card">
              <h3 className="text-sm opacity-70">Conversion Rate</h3>
              <p className="text-3xl font-bold">12%</p>
              <p className="text-sm text-red-500">-1% from last period</p>
            </div>
          </div>

          <div className="h-64 bg-input rounded-md flex items-center justify-center mb-6">
            <p className="opacity-70">Email Campaign Performance Chart</p>
          </div>

          <h3 className="text-xl font-bold mb-4">Recent Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3">Campaign</th>
                  <th className="text-left p-3">Sent</th>
                  <th className="text-left p-3">Opens</th>
                  <th className="text-left p-3">Clicks</th>
                  <th className="text-left p-3">Conversions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3">Sponsorship Request</td>
                  <td className="p-3">50</td>
                  <td className="p-3">35 (70%)</td>
                  <td className="p-3">12 (24%)</td>
                  <td className="p-3">5 (10%)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Media Partnership</td>
                  <td className="p-3">25</td>
                  <td className="p-3">18 (72%)</td>
                  <td className="p-3">7 (28%)</td>
                  <td className="p-3">3 (12%)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3">Event Announcement</td>
                  <td className="p-3">1000</td>
                  <td className="p-3">650 (65%)</td>
                  <td className="p-3">230 (23%)</td>
                  <td className="p-3">120 (12%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {customizeModalOpen && currentTemplate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{currentTemplate.id ? "Edit Template" : "New Template"}</h3>
              <button className="modal-close" onClick={() => setCustomizeModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="templateName" className="form-label">
                  Template Name
                </label>
                <input
                  type="text"
                  id="templateName"
                  className="form-input"
                  value={currentTemplate.name}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="templateSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="templateSubject"
                  className="form-input"
                  value={currentTemplate.subject}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="templateBody" className="form-label">
                  Body
                </label>
                <textarea
                  id="templateBody"
                  className="form-input min-h-[200px]"
                  value={currentTemplate.body}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, body: e.target.value })}
                />
              </div>

              <div className="form-group">
                <p className="text-sm opacity-70 mb-2">Available placeholders:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline">[Company]</span>
                  <span className="badge badge-outline">[Name]</span>
                  <span className="badge badge-outline">[Event]</span>
                  <span className="badge badge-outline">[Date]</span>
                  <span className="badge badge-outline">[Location]</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => handleGenerateAIEmail()} disabled={generatingEmail}>
                {generatingEmail ? "Generating..." : "Generate with AI"}
              </button>
              <button className="btn btn-primary" onClick={handleSaveTemplate}>
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

