"use client"

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import Calendar from '@/components/calendar/calendar'
import EventModal from '@/components/calendar/event-modal'
import PermissionRequests from '@/components/calendar/permission-requests'
import { Event, PermissionRequest } from '@/types/calendar'
import styles from './calendar.module.css'

export default function CommitteeCalendarPage() {
  // State for calendar
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [selectedPermissionRequest, setSelectedPermissionRequest] = useState<PermissionRequest | null>(null)

  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric'
    })
  }

  // Load sample events
  useEffect(() => {
    // In a real app, you would fetch these from an API
    const now = new Date()
    
    // Create dates with clones to avoid reference issues
    const tomorrow = new Date(now.getTime())
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const nextWeek = new Date(now.getTime())
    nextWeek.setDate(nextWeek.getDate() + 7)
    
    const meeting = new Date(now.getTime())
    meeting.setHours(10, 0, 0, 0)
    
    const meetingEnd = new Date(now.getTime())
    meetingEnd.setHours(11, 30, 0, 0)
    
    const sampleEvents: Event[] = [
      {
        id: uuidv4(),
        title: 'Committee Meeting',
        description: 'Weekly committee meeting to discuss upcoming events',
        start: tomorrow,
        end: tomorrow,
        location: 'Conference Room A',
        color: '#4f46e5',
        allDay: false,
        type: 'meeting'
      },
      {
        id: uuidv4(),
        title: 'Budget Planning',
        description: 'Session to plan budget for the next quarter',
        start: meeting,
        end: meetingEnd,
        location: 'Finance Room',
        color: '#0ea5e9',
        allDay: false,
        type: 'meeting'
      },
      {
        id: uuidv4(),
        title: 'Volunteer Orientation',
        description: 'Introduction session for new event volunteers',
        start: nextWeek,
        end: nextWeek,
        location: 'Training Room',
        color: '#8b5cf6',
        allDay: true,
        type: 'workshop'
      }
    ]
    
    // Add more sample events that span multiple days
    const multiDayStart = new Date(now.getTime())
    multiDayStart.setDate(multiDayStart.getDate() + 3)
    
    const multiDayEnd = new Date(multiDayStart.getTime())
    multiDayEnd.setDate(multiDayEnd.getDate() + 1)
    
    sampleEvents.push({
      id: uuidv4(),
      title: 'Event Setup',
      description: 'Preparation and setup for the upcoming conference',
      start: multiDayStart,
      end: multiDayEnd,
      location: 'Main Hall',
      color: '#f43f5e',
      allDay: true,
      type: 'event'
    })
    
    setEvents(sampleEvents)
  }, [])

  // Navigation functions
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    setCurrentDate(prevMonth)
  }

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentDate(nextMonth)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Handle date and event clicks
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setShowModal(true)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setSelectedDate(null)
    setShowModal(true)
  }

  // Handle saving events
  const handleSaveEvent = (event: Event) => {
    // For new events
    if (!event.id) {
      const newEvent = {
        ...event,
        id: uuidv4()
      }
      setEvents([...events, newEvent])
    } else {
      // For editing existing events
      const updatedEvents = events.map(e => 
        e.id === event.id ? event : e
      )
      setEvents(updatedEvents)
    }
    setShowModal(false)
  }

  // Handle deleting events
  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(e => e.id !== eventId)
    setEvents(updatedEvents)
    setShowModal(false)
  }

  // Handle permission request editing
  const handleEditPermissionRequest = (request: PermissionRequest) => {
    setSelectedPermissionRequest(request)
    setShowPermissionModal(true)
  }

  // Handle permission request status update
  const handleUpdatePermissionStatus = (requestId: string, status: 'approved' | 'denied', comments?: string) => {
    console.log(`Permission request ${requestId} ${status} with comments: ${comments}`)
    // In a real app, you would make an API call to update the status
  }

  return (
    <DashboardLayout role="committee">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Committee Calendar</h1>
          <p className={styles.description}>
            Plan and schedule committee activities and events
          </p>
          
          <div className={styles.controls}>
            <div className={styles.navigation}>
              <button 
                onClick={goToPreviousMonth} 
                className={styles.navButton}
                aria-label="Previous Month"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={goToToday}
                className={styles.todayButton}
              >
                Today
              </button>
              
              <button 
                onClick={goToNextMonth}
                className={styles.navButton}
                aria-label="Next Month"
              >
                <ChevronRight size={20} />
              </button>
              
              <span className={styles.currentMonth}>
                {formatMonthYear(currentDate)}
              </span>
            </div>
            
            <button 
              onClick={() => {
                setSelectedDate(new Date())
                setSelectedEvent(null)
                setShowModal(true)
              }}
              className={styles.addButton}
            >
              <Plus size={16} />
              <span>Add Event</span>
            </button>
          </div>
        </div>
        
        <div className={styles.calendarWrapper}>
          <Calendar
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>
        
        {/* Permission Requests Section - View Only */}
        <PermissionRequests
          selectedDate={selectedDate}
          onEditRequest={handleEditPermissionRequest}
          onUpdateStatus={handleUpdatePermissionStatus}
          viewOnly={true}
          role="committee"
        />
      </div>
      
      <EventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
      />
    </DashboardLayout>
  )
}

