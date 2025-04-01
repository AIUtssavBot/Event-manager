"use client"

import { useState, useEffect } from 'react'
import { X, Trash2, Clock, MapPin, Calendar as CalendarIcon, Type, AlignLeft, Tag } from 'lucide-react'
import { Event } from '@/types/calendar'
import styles from './event-modal.module.css'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: Event) => void
  onDelete: (eventId: string) => void
  selectedDate: Date | null
  event: Event | null
}

export default function EventModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  selectedDate, 
  event 
}: EventModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [color, setColor] = useState('#4f46e5')
  const [allDay, setAllDay] = useState(false)
  const [eventType, setEventType] = useState<Event['type']>('event')
  
  // Set up initial values when modal opens
  useEffect(() => {
    if (event) {
      // Editing an existing event
      setTitle(event.title)
      setDescription(event.description || '')
      setStartDate(formatDateForInput(event.start))
      setStartTime(formatTimeForInput(event.start))
      setEndDate(formatDateForInput(event.end))
      setEndTime(formatTimeForInput(event.end))
      setLocation(event.location || '')
      setColor(event.color || '#4f46e5')
      setAllDay(event.allDay)
      setEventType(event.type)
    } else if (selectedDate) {
      // Creating a new event
      const date = new Date(selectedDate)
      setTitle('')
      setDescription('')
      setStartDate(formatDateForInput(date))
      setStartTime(formatTimeForInput(date))
      
      // Set end time to be 1 hour after start time
      const endDateTime = new Date(date.getTime())
      endDateTime.setHours(endDateTime.getHours() + 1)
      setEndDate(formatDateForInput(endDateTime))
      setEndTime(formatTimeForInput(endDateTime))
      
      setLocation('')
      setColor('#4f46e5')
      setAllDay(false)
      setEventType('event')
    }
  }, [event, selectedDate])
  
  // Format date for input fields
  const formatDateForInput = (date: Date) => {
    try {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error('Invalid date provided:', date)
        return ''
      }
      
      const d = new Date(date.getTime())
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    } catch (error) {
      console.error('Error formatting date for input:', error)
      return ''
    }
  }
  
  // Format time for input fields
  const formatTimeForInput = (date: Date) => {
    try {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error('Invalid date provided for time formatting:', date)
        return '00:00'
      }
      
      const d = new Date(date.getTime())
      const hours = String(d.getHours()).padStart(2, '0')
      const minutes = String(d.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    } catch (error) {
      console.error('Error formatting time for input:', error)
      return '00:00'
    }
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Create start and end Date objects
      const start = new Date(`${startDate}T${allDay ? '00:00' : startTime}`)
      const end = new Date(`${endDate}T${allDay ? '23:59' : endTime}`)
      
      // Validate dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid dates:', { start, end, startDate, endDate, startTime, endTime })
        alert('Please enter valid dates and times')
        return
      }
      
      // Create the event object
      const newEvent: Event = {
        id: event?.id || '',
        title,
        description: description || undefined,
        start,
        end,
        location: location || undefined,
        color,
        allDay,
        type: eventType
      }
      
      onSave(newEvent)
    } catch (error) {
      console.error('Error creating event:', error)
      alert('An error occurred while creating the event. Please try again.')
    }
  }
  
  // Handle modal closing
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  // Available colors for events
  const colorOptions = [
    { value: '#4f46e5', label: 'Indigo' },
    { value: '#0ea5e9', label: 'Blue' },
    { value: '#f43f5e', label: 'Red' },
    { value: '#10b981', label: 'Green' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#64748b', label: 'Slate' }
  ]
  
  // Available event types
  const eventTypeOptions = [
    { value: 'conference', label: 'Conference' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'event', label: 'Event' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'other', label: 'Other' }
  ]

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Type size={16} className={styles.inputIcon} />
              <span>Event Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <AlignLeft size={16} className={styles.inputIcon} />
              <span>Description</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              className={styles.textarea}
              rows={3}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Tag size={16} className={styles.inputIcon} />
                <span>Event Type</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as Event['type'])}
                className={styles.select}
              >
                {eventTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Color</span>
              </label>
              <div className={styles.colorOptions}>
                {colorOptions.map(option => (
                  <div
                    key={option.value}
                    className={`${styles.colorOption} ${color === option.value ? styles.colorSelected : ''}`}
                    style={{ backgroundColor: option.value }}
                    onClick={() => setColor(option.value)}
                    title={option.label}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <CalendarIcon size={16} className={styles.inputIcon} />
                <span>Start</span>
              </label>
              <div className={styles.dateTimeInputs}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className={styles.dateInput}
                />
                {!allDay && (
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className={styles.timeInput}
                  />
                )}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <CalendarIcon size={16} className={styles.inputIcon} />
                <span>End</span>
              </label>
              <div className={styles.dateTimeInputs}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className={styles.dateInput}
                />
                {!allDay && (
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className={styles.timeInput}
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className={styles.checkbox}
              />
              <Clock size={16} className={styles.inputIcon} />
              <span>All day</span>
            </label>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <MapPin size={16} className={styles.inputIcon} />
              <span>Location</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className={styles.input}
            />
          </div>
          
          <div className={styles.modalFooter}>
            {event && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className={styles.deleteButton}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            )}
            
            <div className={styles.actionButtons}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveButton}
              >
                {event ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 