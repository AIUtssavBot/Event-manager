"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Users, Search, Filter, Mail, BadgeCheck, UserX, UserPlus, ChevronDown, ChevronUp } from "lucide-react"
import styles from "./attendees.module.css"

interface Attendee {
  id: number
  name: string
  email: string
  registrationDate: string
  ticketType: string
  status: "checked-in" | "registered" | "cancelled"
  eventInterests: string[]
}

export default function CommitteeAttendees() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [filteredAttendees, setFilteredAttendees] = useState<Attendee[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [ticketFilter, setTicketFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Simulate fetching attendees from an API
  useEffect(() => {
    // This would be an API call in a real application
    const fetchedAttendees: Attendee[] = [
      {
        id: 1,
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        registrationDate: "2023-05-10",
        ticketType: "VIP",
        status: "checked-in",
        eventInterests: ["Workshops", "Networking"]
      },
      {
        id: 2,
        name: "Maria Garcia",
        email: "maria.garcia@example.com",
        registrationDate: "2023-05-12",
        ticketType: "Standard",
        status: "registered",
        eventInterests: ["Presentations", "Workshops"]
      },
      {
        id: 3,
        name: "James Smith",
        email: "james.smith@example.com",
        registrationDate: "2023-05-08",
        ticketType: "Standard",
        status: "registered",
        eventInterests: ["Networking"]
      },
      {
        id: 4,
        name: "Sophia Lee",
        email: "sophia.lee@example.com",
        registrationDate: "2023-05-15",
        ticketType: "VIP",
        status: "cancelled",
        eventInterests: ["Presentations", "Workshops", "Networking"]
      },
      {
        id: 5,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        registrationDate: "2023-05-05",
        ticketType: "Standard",
        status: "checked-in",
        eventInterests: ["Workshops"]
      },
      {
        id: 6,
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        registrationDate: "2023-05-11",
        ticketType: "Premium",
        status: "registered",
        eventInterests: ["Presentations", "Networking"]
      },
      {
        id: 7,
        name: "Daniel Martinez",
        email: "daniel.martinez@example.com",
        registrationDate: "2023-05-09",
        ticketType: "Premium",
        status: "checked-in",
        eventInterests: ["Presentations"]
      },
      {
        id: 8,
        name: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        registrationDate: "2023-05-14",
        ticketType: "Standard",
        status: "cancelled",
        eventInterests: ["Workshops", "Networking"]
      }
    ];
    
    setAttendees(fetchedAttendees);
    setFilteredAttendees(fetchedAttendees);
  }, []);

  // Filter attendees based on search query and filters
  useEffect(() => {
    let filtered = [...attendees];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        attendee => 
          attendee.name.toLowerCase().includes(query) || 
          attendee.email.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(attendee => attendee.status === statusFilter);
    }
    
    // Apply ticket filter
    if (ticketFilter !== "all") {
      filtered = filtered.filter(attendee => attendee.ticketType === ticketFilter);
    }
    
    setFilteredAttendees(filtered);
  }, [searchQuery, statusFilter, ticketFilter, attendees]);

  // Get unique ticket types
  const ticketTypes = ["all", ...Array.from(new Set(attendees.map(a => a.ticketType)))];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'checked-in':
        return styles.statusCheckedIn;
      case 'registered':
        return styles.statusRegistered;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'checked-in':
        return <BadgeCheck size={14} />;
      case 'registered':
        return <UserPlus size={14} />;
      case 'cancelled':
        return <UserX size={14} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="committee">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Attendee Management</h1>
          <p className={styles.description}>
            View and manage attendees for your events
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Users size={20} />
              <span>Attendees</span>
              <span className={styles.attendeeCount}>{filteredAttendees.length}</span>
            </div>
            
            <div className={styles.searchAndFilter}>
              <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search attendees..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                className={styles.filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span>Filters</span>
                {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className={styles.filtersContainer}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Status</label>
                <div className={styles.filterOptions}>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'all' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'checked-in' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('checked-in')}
                  >
                    Checked In
                  </button>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'registered' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('registered')}
                  >
                    Registered
                  </button>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'cancelled' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('cancelled')}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Ticket Type</label>
                <div className={styles.filterOptions}>
                  {ticketTypes.map(type => (
                    <button 
                      key={type}
                      className={`${styles.filterOption} ${ticketFilter === type ? styles.active : ''}`}
                      onClick={() => setTicketFilter(type)}
                    >
                      {type === 'all' ? 'All' : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.tableContainer}>
            <table className={styles.attendeesTable}>
              <thead>
                <tr>
                  <th>Attendee</th>
                  <th>Registration Date</th>
                  <th>Ticket Type</th>
                  <th>Status</th>
                  <th>Interests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.length > 0 ? (
                  filteredAttendees.map(attendee => (
                    <tr key={attendee.id}>
                      <td data-label="Attendee">
                        <div className={styles.attendeeInfo}>
                          <div className={styles.attendeeAvatar}>
                            {getInitials(attendee.name)}
                          </div>
                          <div>
                            <div className={styles.attendeeName}>{attendee.name}</div>
                            <div className={styles.attendeeEmail}>{attendee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Registration Date">{formatDate(attendee.registrationDate)}</td>
                      <td data-label="Ticket Type">
                        <span className={styles.ticketType}>{attendee.ticketType}</span>
                      </td>
                      <td data-label="Status">
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(attendee.status)}`}>
                          {getStatusIcon(attendee.status)}
                          <span>{attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}</span>
                        </span>
                      </td>
                      <td data-label="Interests">
                        <div className={styles.interestTags}>
                          {attendee.eventInterests.map(interest => (
                            <span key={interest} className={styles.interestTag}>
                              {interest}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td data-label="Actions">
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.actionButton}
                            title="Email Attendee"
                          >
                            <Mail size={16} />
                          </button>
                          {attendee.status === "registered" ? (
                            <button
                              className={`${styles.actionButton} ${styles.checkInButton}`}
                              title="Check In Attendee"
                            >
                              <BadgeCheck size={16} />
                            </button>
                          ) : attendee.status === "cancelled" ? (
                            <button
                              className={`${styles.actionButton} ${styles.restoreButton}`}
                              title="Restore Registration"
                            >
                              <UserPlus size={16} />
                            </button>
                          ) : (
                            <button
                              className={`${styles.actionButton} ${styles.cancelButton}`}
                              title="Cancel Registration"
                            >
                              <UserX size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noResults}>
                      No attendees found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 