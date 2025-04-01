"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Calendar,
  Search,
  Filter,
  MapPin,
  Users,
  Heart,
  Share2,
  Ticket,
  Building2,
  Coffee,
  Gamepad2,
  Cloud,
  ShoppingBag,
  Info
} from "lucide-react"
import styles from './events.module.css'

type EventCategory = "all" | "tech" | "business" | "design" | "marketing" | "food" | "game"
type EventType = "in-person" | "virtual" | "hybrid"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: EventType
  category: Exclude<EventCategory, "all">
  price: number
  capacity: number
  registered: number
  image: string
  icon?: React.ReactNode
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("all")
  const [selectedType, setSelectedType] = useState<EventType | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Check if we need to apply dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  useEffect(() => {
    // Check if the user prefers dark mode or has set it in localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark' || (!storedTheme && prefersDark))
    
    // Listen for theme changes
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  // Define icons for categories
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'tech':
        return <Building2 size={20} className={isDarkMode ? "text-blue-300" : "text-blue-600"} />;
      case 'food':
        return <Coffee size={20} className={isDarkMode ? "text-orange-300" : "text-orange-500"} />;
      case 'game':
        return <Gamepad2 size={20} className={isDarkMode ? "text-purple-300" : "text-purple-600"} />;
      case 'business':
        return <Cloud size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />;
      case 'marketing':
        return <ShoppingBag size={20} className={isDarkMode ? "text-pink-300" : "text-pink-500"} />;
      default:
        return <Info size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />;
    }
  };

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "TechCorp",
      description: "Leading technology company showcasing the latest innovations.",
      date: "2024-04-15",
      time: "09:00 AM",
      location: "Main Hall - Booth A1",
      type: "in-person",
      category: "tech",
      price: 299,
      capacity: 500,
      registered: 342,
      image: "/images/events/tech-corp.jpg",
      icon: <Building2 size={20} className="text-blue-600" />
    },
    {
      id: "2",
      title: "Code Café",
      description: "Specialty coffee and snacks for developers.",
      date: "2024-04-20",
      time: "10:00 AM",
      location: "Food Court - Stall F3",
      type: "in-person",
      category: "food",
      price: 0,
      capacity: 200,
      registered: 98,
      image: "/images/events/code-cafe.jpg",
      icon: <Coffee size={20} className="text-orange-500" />
    },
    {
      id: "3",
      title: "Dev Gear",
      description: "Cool tech merchandise and apparel.",
      date: "2024-04-25",
      time: "09:30 AM",
      location: "Exhibition Hall - Booth M2",
      type: "in-person",
      category: "marketing",
      price: 0,
      capacity: 300,
      registered: 245,
      image: "/images/events/dev-gear.jpg",
      icon: <ShoppingBag size={20} className="text-pink-500" />
    },
    {
      id: "4",
      title: "VR Experience",
      description: "Try out the latest VR games and experiences.",
      date: "2024-04-22",
      time: "11:00 AM",
      location: "Gaming Zone - Area G1",
      type: "in-person",
      category: "game",
      price: 25,
      capacity: 150,
      registered: 120,
      image: "/images/events/vr-experience.jpg",
      icon: <Gamepad2 size={20} className="text-purple-600" />
    },
    {
      id: "5",
      title: "Cloud Solutions",
      description: "Enterprise cloud computing and infrastructure services.",
      date: "2024-04-18",
      time: "10:30 AM",
      location: "Main Hall - Booth B2",
      type: "hybrid",
      category: "business",
      price: 199,
      capacity: 250,
      registered: 180,
      image: "/images/events/cloud-solutions.jpg",
      icon: <Cloud size={20} className="text-gray-700" />
    },
    {
      id: "6",
      title: "Bytes & Bites",
      description: "Food truck specializing in programmer-themed dishes.",
      date: "2024-04-19",
      time: "12:00 PM",
      location: "Food Court - Zone F1",
      type: "in-person",
      category: "food",
      price: 0,
      capacity: 100,
      registered: 75,
      image: "/images/events/bytes-bites.jpg",
      icon: <Coffee size={20} className="text-orange-500" />
    }
  ])

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesType = selectedType === "all" || event.type === selectedType
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <DashboardLayout role="attendee">
      <div className={styles.eventsContainer}>
        <div className={styles.contentWrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.headerTitle}>Events & Exhibitors</h1>
              <p className={styles.headerSubtitle}>
                Discover and connect with exhibitors at the event
              </p>
            </div>
            <div className={styles.headerButtons}>
              <button className={styles.filterButton}>
                <Filter size={18} />
                Filters
              </button>
              <button className={styles.myEventsButton}>
                <Calendar size={18} />
                My Exhibitors
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={styles.searchFiltersContainer}>
            <div className={styles.searchWrapper}>
              <div className={styles.searchInputContainer}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text"
                  placeholder="Search exhibitors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.filterSelects}>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as EventCategory)}
                  className={styles.select}
                >
                  <option value="all">All Categories</option>
                  <option value="tech">Technology</option>
                  <option value="business">Business</option>
                  <option value="food">Food</option>
                  <option value="game">Gaming</option>
                  <option value="marketing">Merchandise</option>
                </select>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as EventType | "all")}
                  className={styles.select}
                >
                  <option value="all">All Types</option>
                  <option value="in-person">Sponsor</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImageContainer}>
                  <div className={styles.eventImageOverlay} />
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className={styles.eventImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/events/fallback.jpg";
                    }}
                  />
                  <div className={styles.eventActions}>
                    <button className={styles.actionButton}>
                      <Info size={18} />
                    </button>
                  </div>
                  <div className={styles.eventBadges}>
                    <div className={styles.categoryIconContainer}>
                      {event.icon || getCategoryIcon(event.category)}
                    </div>
                    {event.type === "in-person" && (
                      <span className={`${styles.badge} badge-primary`}>
                        Sponsor
                      </span>
                    )}
                    {event.type === "virtual" && (
                      <span className={`${styles.badge} badge-accent`}>
                        Food
                      </span>
                    )}
                    {event.type === "hybrid" && (
                      <span className={`${styles.badge} badge-secondary`}>
                        Game
                      </span>
                    )}
                  </div>
                  <div className={styles.eventLocationContainer}>
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className={styles.eventDetails}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>
                  
                  <div className={styles.eventFooter}>
                    {event.price > 0 ? (
                      <div className={styles.priceContainer}>
                        <span>Price</span>
                        <p className={styles.price}>${event.price}</p>
                      </div>
                    ) : (
                      <div className={styles.priceContainer}>
                        <p className={styles.price}>Free</p>
                      </div>
                    )}
                    <a href="#" className={`${styles.registerButton} btn-primary`}>
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className={styles.emptyState}>
              <Calendar className={styles.emptyStateIcon} size={48} />
              <h3 className={styles.emptyStateTitle}>No Exhibitors Found</h3>
              <p className={styles.emptyStateText}>
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
} 