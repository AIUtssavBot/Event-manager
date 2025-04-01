"use client"

import { useState, useEffect } from 'react'
import { Event } from '@/types/calendar'
import styles from './calendar.module.css'

interface CalendarProps {
  currentDate: Date
  events: Event[]
  onDateClick: (date: Date) => void
  onEventClick: (event: Event) => void
}

export default function Calendar({ currentDate, events, onDateClick, onEventClick }: CalendarProps) {
  const [calendarDays, setCalendarDays] = useState<Array<{ date: Date, isCurrentMonth: boolean }>>([])
  const [mounted, setMounted] = useState(false)
  
  // Mark component as mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Update calendar when currentDate changes
  useEffect(() => {
    if (!mounted) return;
    setCalendarDays(generateCalendarDays(currentDate))
  }, [currentDate, mounted])
  
  // Generate all days needed to display a month (including days from prev/next month)
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()
    
    // Calculate the number of weeks needed
    const totalDaysInMonth = lastDay.getDate()
    const daysFromPrevMonth = firstDayOfWeek
    const totalDaysDisplayed = daysFromPrevMonth + totalDaysInMonth
    
    // Calculate how many days we need from the next month
    // If the total days can fit in 5 weeks (35 days), use 5 weeks, otherwise use 6 weeks
    const totalWeeks = Math.ceil(totalDaysDisplayed / 7)
    const totalCells = totalWeeks * 7
    const daysFromNextMonth = totalCells - totalDaysDisplayed
    
    const days = []
    
    // Add days from previous month to fill the first week
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const prevMonthDay = new Date(year, month, -i)
      days.push({
        date: prevMonthDay,
        isCurrentMonth: false
      })
    }
    
    // Add all days from current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }
    
    // Add days from next month to complete the grid
    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    
    return days
  }
  
  // Check if a date is today
  const isToday = (date: Date) => {
    if (!mounted) return false;
    
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  
  // Filter events for a specific date
  const getEventsForDate = (date: Date) => {
    if (!mounted) return [];
    
    return events.filter(event => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const checkDate = new Date(date)
      
      // Reset hours to compare just the dates
      checkDate.setHours(0, 0, 0, 0)
      const startDate = new Date(eventStart)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(eventEnd)
      endDate.setHours(0, 0, 0, 0)
      
      // Check if the date is between start and end (inclusive)
      return checkDate >= startDate && checkDate <= endDate
    })
  }

  // Day names for header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Format date for display
  const formatDateLabel = (date: Date) => {
    return date.getDate()
  }
  
  // Format time for display
  const formatEventTime = (date: Date) => {
    if (!mounted) return '';
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Simple loading placeholder for server-side rendering
  if (!mounted) {
    return (
      <div className={styles.calendar}>
        <div className={styles.header}>
          {dayNames.map(day => (
            <div key={day} className={styles.headerCell}>{day}</div>
          ))}
        </div>
        <div className={styles.loadingGrid}>
          <div className={styles.loadingMessage}>Loading calendar...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      {/* Header with day names */}
      <div className={styles.header}>
        {dayNames.map(day => (
          <div key={day} className={styles.headerCell}>
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className={styles.grid}>
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={`${styles.cell} ${day.isCurrentMonth ? styles.currentMonth : styles.otherMonth} ${isToday(day.date) ? styles.today : ''}`}
            onClick={() => onDateClick(day.date)}
          >
            <div className={styles.dateLabel}>
              {formatDateLabel(day.date)}
            </div>
            
            <div className={styles.events}>
              {getEventsForDate(day.date).slice(0, 3).map(event => (
                <div 
                  key={event.id}
                  className={styles.event}
                  style={{ backgroundColor: event.color || '#4f46e5' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onEventClick(event)
                  }}
                >
                  {!event.allDay && (
                    <span className={styles.eventTime}>
                      {formatEventTime(event.start)}
                    </span>
                  )}
                  <span className={styles.eventTitle}>{event.title}</span>
                </div>
              ))}
              
              {/* More indicator if there are more than 3 events */}
              {getEventsForDate(day.date).length > 3 && (
                <div className={styles.moreEvents}>
                  +{getEventsForDate(day.date).length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 