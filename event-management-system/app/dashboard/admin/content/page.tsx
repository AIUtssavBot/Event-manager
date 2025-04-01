"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Sparkles,
  Layout,
  Clock,
  Palette,
  Calendar,
  Users,
  Target,
  MessageSquare,
  RefreshCw,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Loader2
} from "lucide-react"

type EventType = "conference" | "workshop" | "seminar" | "networking"
type RecommendationType = "theme" | "layout" | "timeline"

export default function ContentPage() {
  const [eventType, setEventType] = useState<EventType>("conference")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<RecommendationType>("theme")

  const generateRecommendation = () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <DashboardLayout role="admin">
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                AI Content Assistant
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Get intelligent recommendations for your event planning
              </p>
            </div>
            <button 
              className="btn bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-md w-full sm:w-auto"
              onClick={generateRecommendation}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              Generate Recommendations
            </button>
          </div>

          {/* Event Type Selection */}
          <div className="bg-white rounded-xl shadow-md border border-border p-4">
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <Target size={20} className="text-primary" />
              Select Event Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { type: "conference", label: "Conference", icon: Users },
                { type: "workshop", label: "Workshop", icon: Layout },
                { type: "seminar", label: "Seminar", icon: MessageSquare },
                { type: "networking", label: "Networking", icon: Target }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setEventType(item.type as EventType)}
                  className={`p-4 rounded-lg border transition-all flex items-center gap-3 ${
                    eventType === item.type
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="flex flex-col sm:flex-row items-stretch p-2 gap-2">
              {[
                { type: "theme", label: "Theme Ideas", icon: Palette },
                { type: "layout", label: "Layout Suggestions", icon: Layout },
                { type: "timeline", label: "Timeline Planning", icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type as RecommendationType)}
                  className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                    activeTab === tab.type 
                      ? "bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-md" 
                      : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                  }`}
                >
                  <tab.icon size={20} className={`${activeTab === tab.type ? "animate-pulse" : ""}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="grid gap-6">
            {/* Theme Recommendations */}
            {activeTab === "theme" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Palette size={20} className="text-primary" />
                    </div>
                    Recommended Themes
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Modern Tech Summit",
                        description: "A sleek, minimalist theme with gradient accents and modern typography",
                        colors: ["#2563EB", "#4F46E5", "#7C3AED"],
                        confidence: 92
                      },
                      {
                        title: "Innovation Hub",
                        description: "Dynamic and energetic theme with bold colors and geometric patterns",
                        colors: ["#0EA5E9", "#14B8A6", "#8B5CF6"],
                        confidence: 88
                      },
                      {
                        title: "Future Forward",
                        description: "Clean and professional with a focus on future technology",
                        colors: ["#3B82F6", "#10B981", "#6366F1"],
                        confidence: 85
                      }
                    ].map((theme, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-lg">{theme.title}</h4>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                          </div>
                          <span className="text-sm font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                            {theme.confidence}% match
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            {theme.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex gap-2 ml-auto">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <ThumbsUp size={18} className="text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <ThumbsDown size={18} className="text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Layout Recommendations */}
            {activeTab === "layout" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Layout size={20} className="text-primary" />
                    </div>
                    Suggested Layouts
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Theater Style",
                        capacity: "200-300",
                        features: ["Central stage", "Multiple screen views", "Side aisles", "Tech booth"],
                        bestFor: ["Keynote speeches", "Panel discussions", "Product launches"]
                      },
                      {
                        title: "Workshop Clusters",
                        capacity: "100-150",
                        features: ["Group tables", "Presentation areas", "Breakout spaces", "Equipment stations"],
                        bestFor: ["Interactive sessions", "Group activities", "Hands-on learning"]
                      },
                      {
                        title: "Network-Focused",
                        capacity: "150-200",
                        features: ["Standing tables", "Lounge areas", "Food stations", "Meeting pods"],
                        bestFor: ["Networking events", "Social gatherings", "Informal discussions"]
                      }
                    ].map((layout, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-lg">{layout.title}</h4>
                          <span className="text-sm bg-primary/5 text-primary px-3 py-1 rounded-full">
                            {layout.capacity} people
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Key Features:</p>
                            <div className="flex flex-wrap gap-2">
                              {layout.features.map((feature, i) => (
                                <span key={i} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Best For:</p>
                            <div className="flex flex-wrap gap-2">
                              {layout.bestFor.map((use, i) => (
                                <span key={i} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Recommendations */}
            {activeTab === "timeline" && (
              <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Clock size={20} className="text-primary" />
                    </div>
                    Suggested Timeline
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    {[
                      {
                        phase: "Pre-Event (3 months prior)",
                        tasks: [
                          { task: "Venue booking & setup planning", duration: "1 week" },
                          { task: "Speaker/presenter coordination", duration: "2 weeks" },
                          { task: "Marketing campaign launch", duration: "Ongoing" }
                        ]
                      },
                      {
                        phase: "1 Month Prior",
                        tasks: [
                          { task: "Technical equipment check", duration: "3 days" },
                          { task: "Attendee communication", duration: "1 week" },
                          { task: "Vendor coordination", duration: "2 weeks" }
                        ]
                      },
                      {
                        phase: "Event Week",
                        tasks: [
                          { task: "Final venue inspection", duration: "1 day" },
                          { task: "Staff briefing", duration: "2 hours" },
                          { task: "Setup & rehearsal", duration: "1 day" }
                        ]
                      }
                    ].map((phase, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
                        <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
                        <div className="space-y-4">
                          <h4 className="font-medium text-lg">{phase.phase}</h4>
                          <div className="space-y-3">
                            {phase.tasks.map((task, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium">{task.task}</span>
                                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                  {task.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 