"use client"

import React, { useState, useEffect } from 'react'
import { PermissionRequest } from '@/types/calendar'
import { 
  CalendarDays, Check, Clock, Edit, MoreHorizontal, Shield, X, 
  Calendar, User, FileText, MessageSquare, AlertTriangle, Eye
} from 'lucide-react'
import styles from './permission-requests.module.css'

interface PermissionRequestsProps {
  selectedDate: Date | null
  onEditRequest: (request: PermissionRequest) => void
  onUpdateStatus: (requestId: string, status: 'approved' | 'denied', comments?: string) => void
  viewOnly?: boolean
  role?: 'superadmin' | 'admin' | 'committee' | 'attendee'
}

export default function PermissionRequests({ 
  selectedDate, 
  onEditRequest, 
  onUpdateStatus,
  viewOnly = false,
  role = 'admin'
}: PermissionRequestsProps) {
  const [requests, setRequests] = useState<PermissionRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<PermissionRequest[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null)
  const [commentInput, setCommentInput] = useState<{[key: string]: string}>({})
  const [mounted, setMounted] = useState(false)

  // Mark component as mounted on the client side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Generate sample data
  useEffect(() => {
    if (!mounted) return;
    
    const now = new Date()
    
    // Generate sample requests for the current month
    const sampleRequests: PermissionRequest[] = [
      {
        id: '1',
        eventId: '101',
        eventTitle: 'Annual Conference Access',
        requestedBy: 'John Smith',
        requestedDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        startDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        reason: 'Need access to set up vendor booth and promotional materials',
        status: 'pending'
      },
      {
        id: '2',
        eventId: '102',
        eventTitle: 'Team Workshop Permission',
        requestedBy: 'Emily Johnson',
        requestedDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        reason: 'Requesting permission to host a team-building workshop',
        status: 'approved',
        reviewedBy: 'Admin User',
        reviewedDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        comments: 'Approved as requested. Please coordinate with facilities team.'
      },
      {
        id: '3',
        eventId: '103',
        eventTitle: 'Tech Meetup Room Reservation',
        requestedBy: 'Michael Chen',
        requestedDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        startDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        reason: 'Need permission to use conference room A for monthly tech meetup',
        status: 'denied',
        reviewedBy: 'Admin User',
        reviewedDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        comments: 'Room unavailable due to scheduled maintenance. Please reschedule.'
      },
      {
        id: '4',
        eventId: '104',
        eventTitle: 'Multi-day Event Setup',
        requestedBy: 'Sarah Williams',
        requestedDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        startDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        reason: 'Requesting early access to set up for the multi-day event',
        status: 'pending'
      }
    ]
    
    // Add some committee-specific requests if role is committee
    if (role === 'committee') {
      sampleRequests.push({
        id: '5',
        eventId: '105',
        eventTitle: 'Committee Room Access',
        requestedBy: 'Current User',
        requestedDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
        reason: 'Need access to reserve committee room for planning session',
        status: 'pending'
      });
    }
    
    setRequests(sampleRequests)
  }, [mounted, role])

  // Filter requests based on selected date and status filter
  useEffect(() => {
    if (!mounted) return;
    
    let filtered = [...requests]
    
    // Filter by selected date if provided
    if (selectedDate) {
      const dateToCheck = new Date(selectedDate)
      dateToCheck.setHours(0, 0, 0, 0)
      
      filtered = filtered.filter(request => {
        const startDate = new Date(request.startDate)
        startDate.setHours(0, 0, 0, 0)
        
        const endDate = new Date(request.endDate)
        endDate.setHours(0, 0, 0, 0)
        
        return dateToCheck >= startDate && dateToCheck <= endDate
      })
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter)
    }
    
    setFilteredRequests(filtered)
  }, [requests, selectedDate, statusFilter, mounted])

  // Format date for display
  const formatDate = (date: Date) => {
    if (!mounted) return '';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Handle toggle expanded view for a request
  const toggleExpandRequest = (requestId: string) => {
    if (expandedRequestId === requestId) {
      setExpandedRequestId(null)
    } else {
      setExpandedRequestId(requestId)
      
      // Initialize comment input if not yet present
      if (!commentInput[requestId]) {
        setCommentInput(prev => ({
          ...prev,
          [requestId]: ''
        }))
      }
    }
  }

  // Handle comment input change
  const handleCommentChange = (requestId: string, value: string) => {
    setCommentInput(prev => ({
      ...prev,
      [requestId]: value
    }))
  }

  // Handle status update with comments
  const handleUpdateStatus = (requestId: string, status: 'approved' | 'denied') => {
    onUpdateStatus(requestId, status, commentInput[requestId])
    
    // Update local state for immediate feedback
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? {
              ...req, 
              status, 
              reviewedBy: `${role.charAt(0).toUpperCase() + role.slice(1)} User`, 
              reviewedDate: new Date(),
              comments: commentInput[requestId]
            } 
          : req
      )
    )
    
    // Reset expanded state
    setExpandedRequestId(null)
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return styles.statusApproved
      case 'denied':
        return styles.statusDenied
      default:
        return styles.statusPending
    }
  }

  // Get status icon
  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'approved':
        return <Check size={16} />
      case 'denied':
        return <X size={16} />
      default:
        return <Clock size={16} />
    }
  }

  // Get section title based on role
  const getSectionTitle = () => {
    switch (role) {
      case 'superadmin':
        return 'System Permission Requests'
      case 'admin':
        return 'Permission Requests'
      case 'committee':
        return 'My Permission Requests'
      default:
        return 'Permission Requests'
    }
  }

  if (!mounted) {
    // Return a placeholder while client-side hydration is happening
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Shield size={20} />
            {getSectionTitle()}
          </h2>
        </div>
        <div className={styles.loadingState}>
          <p>Loading permission requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Shield size={20} />
          {getSectionTitle()}
          {selectedDate && (
            <span className={styles.dateFilter}>
              for {formatDate(selectedDate)}
            </span>
          )}
        </h2>
        
        <div className={styles.filters}>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className={styles.emptyState}>
          <CalendarDays size={48} strokeOpacity={0.5} />
          <p>
            {selectedDate 
              ? `No permission requests for ${formatDate(selectedDate)}` 
              : 'No permission requests match your filters'}
          </p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><div className={styles.thContent}><Calendar size={14} />Event</div></th>
                <th><div className={styles.thContent}><User size={14} />Requested By</div></th>
                <th><div className={styles.thContent}><CalendarDays size={14} />Date Range</div></th>
                <th><div className={styles.thContent}><AlertTriangle size={14} />Status</div></th>
                <th><div className={styles.thContent}>Actions</div></th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <React.Fragment key={request.id}>
                  <tr className={expandedRequestId === request.id ? styles.expandedRow : ''}>
                    <td>{request.eventTitle}</td>
                    <td>{request.requestedBy}</td>
                    <td>
                      {formatDate(request.startDate)}
                      {!isSameDay(request.startDate, request.endDate) && (
                        <> - {formatDate(request.endDate)}</>
                      )}
                    </td>
                    <td>
                      <div className={`${styles.statusBadge} ${getStatusBadgeClass(request.status)}`}>
                        <StatusIcon status={request.status} />
                        <span>{capitalizeFirstLetter(request.status)}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {!viewOnly && (
                          <button 
                            onClick={() => onEditRequest(request)} 
                            className={`${styles.actionButton} ${styles.editButton}`}
                            aria-label="Edit request"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                        <button 
                          onClick={() => toggleExpandRequest(request.id)}
                          className={styles.actionButton}
                          aria-label="Show details"
                        >
                          {viewOnly ? <Eye size={14} /> : <MoreHorizontal size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedRequestId === request.id && (
                    <tr className={styles.detailsRow}>
                      <td colSpan={5}>
                        <div className={styles.requestDetails}>
                          <div className={styles.detailItem}>
                            <h4><FileText size={14} /> Reason for Request</h4>
                            <p>{request.reason}</p>
                          </div>
                          
                          <div className={styles.detailItem}>
                            <h4><Clock size={14} /> Request Timeline</h4>
                            <p>
                              Requested on: {formatDate(request.requestedDate)}
                              {request.reviewedDate && (
                                <>
                                  <br />
                                  Reviewed on: {formatDate(request.reviewedDate)}
                                  {request.reviewedBy && <span> by {request.reviewedBy}</span>}
                                </>
                              )}
                            </p>
                          </div>
                          
                          {request.comments && (
                            <div className={styles.detailItem}>
                              <h4><MessageSquare size={14} /> Comments</h4>
                              <p>{request.comments}</p>
                            </div>
                          )}
                          
                          {!viewOnly && request.status === 'pending' && (role === 'admin' || role === 'superadmin') && (
                            <div className={styles.reviewSection}>
                              <h4>Review Request</h4>
                              <textarea
                                value={commentInput[request.id] || ''}
                                onChange={(e) => handleCommentChange(request.id, e.target.value)}
                                placeholder="Add comments (optional)"
                                className={styles.commentInput}
                              />
                              <div className={styles.reviewButtons}>
                                <button 
                                  onClick={() => handleUpdateStatus(request.id, 'approved')}
                                  className={`${styles.reviewButton} ${styles.approveButton}`}
                                >
                                  <Check size={14} />
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleUpdateStatus(request.id, 'denied')}
                                  className={`${styles.reviewButton} ${styles.denyButton}`}
                                >
                                  <X size={14} />
                                  Deny
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {viewOnly && request.status === 'pending' && role === 'committee' && (
                            <div className={styles.pendingMessage}>
                              <p>This request is pending review by an administrator.</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
} 