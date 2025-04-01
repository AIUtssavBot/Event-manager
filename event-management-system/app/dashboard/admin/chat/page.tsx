"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Send, Paperclip, Image, Smile } from "lucide-react"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    role: "admin" | "committee"
    avatar?: string
  }
  content: string
  timestamp: Date
  attachments?: {
    type: "image" | "file"
    url: string
    name: string
  }[]
}

interface ChatMember {
  id: string
  name: string
  role: "admin" | "committee"
  department?: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: Date
}

export default function AdminChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: {
        id: "user1",
        name: "John Doe",
        role: "committee",
      },
      content: "Hi everyone! I wanted to discuss the equipment requirements for the upcoming hackathon.",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    },
    {
      id: "2",
      sender: {
        id: "user2",
        name: "Alice Smith",
        role: "committee",
      },
      content: "Sure, I think we need to make a list of all the hardware and software requirements.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "3",
      sender: {
        id: "admin1",
        name: "Admin User",
        role: "admin",
      },
      content: "Good idea. Let's also consider the budget constraints. I've allocated $2000 for equipment rental.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      id: "4",
      sender: {
        id: "user3",
        name: "Robert Johnson",
        role: "committee",
      },
      content: "That should be enough. We can rent laptops, monitors, and other peripherals within that budget.",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    },
  ])

  const [members, setMembers] = useState<ChatMember[]>([
    {
      id: "admin1",
      name: "Admin User",
      role: "admin",
      status: "online",
    },
    {
      id: "user1",
      name: "John Doe",
      role: "committee",
      department: "Technical",
      status: "online",
    },
    {
      id: "user2",
      name: "Alice Smith",
      role: "committee",
      department: "Marketing",
      status: "online",
    },
    {
      id: "user3",
      name: "Robert Johnson",
      role: "committee",
      department: "Design",
      status: "away",
      lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: "user4",
      name: "Emily Davis",
      role: "committee",
      department: "Logistics",
      status: "offline",
      lastSeen: new Date(Date.now() - 86400000), // 1 day ago
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: "admin1",
        name: "Admin User",
        role: "admin",
      },
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {}
  messages.forEach((message) => {
    const dateKey = formatDate(message.timestamp)
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = []
    }
    groupedMessages[dateKey].push(message)
  })

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Team Chat</h1>
        <p className="opacity-70">Communicate with committee members and other admins</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="chat-container">
            <div className="chat-messages">
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date}>
                  <div className="text-center my-4">
                    <span className="text-xs bg-input px-2 py-1 rounded-full">{date}</span>
                  </div>

                  {dateMessages.map((message) => {
                    const isCurrentUser = message.sender.id === "admin1"

                    return (
                      <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
                        {!isCurrentUser && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                            {message.sender.name.charAt(0)}
                          </div>
                        )}

                        <div className={`max-w-[70%]`}>
                          {!isCurrentUser && (
                            <div className="text-xs opacity-70 mb-1">
                              {message.sender.name} • {message.sender.role === "admin" ? "Admin" : message.sender.role}
                            </div>
                          )}

                          <div
                            className={`p-3 rounded-lg ${
                              isCurrentUser ? "bg-primary text-primary-foreground" : "bg-input"
                            }`}
                          >
                            <p>{message.content}</p>

                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    {attachment.type === "image" ? <Image size={16} /> : <Paperclip size={16} />}
                                    <span className="text-sm">{attachment.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div
                              className={`text-xs mt-1 ${isCurrentUser ? "text-primary-foreground opacity-70" : "opacity-50"}`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>

                        {isCurrentUser && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold ml-2">
                            A
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-container">
              <button type="button" className="btn btn-outline p-2">
                <Paperclip size={20} />
              </button>
              <button type="button" className="btn btn-outline p-2">
                <Image size={20} />
              </button>
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary p-2">
                <Send size={20} />
              </button>
              <button type="button" className="btn btn-outline p-2">
                <Smile size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Members</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-input">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      member.status === "online"
                        ? "bg-green-500"
                        : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs opacity-70">
                    {member.role === "admin" ? "Admin" : member.department}
                    {member.status !== "online" && member.lastSeen && <> • Last seen {formatTime(member.lastSeen)}</>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

