"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Users, Plus, Edit, Trash2, Mail, Eye, User, ChevronDown, ChevronUp } from "lucide-react"
import styles from "./committees.module.css"

interface Member {
  id: number
  name: string
  email: string
  role: string
  department: string
  joinDate: string
}

interface Committee {
  id: number
  name: string
  department: string
  head: string
  members: number
  events: number
  status: "active" | "inactive"
}

export default function SuperAdminCommittees() {
  const [committees, setCommittees] = useState<Committee[]>([
    {
      id: 1,
      name: "Technical Committee",
      department: "Technical",
      head: "John Smith",
      members: 12,
      events: 3,
      status: "active",
    },
    {
      id: 2,
      name: "Marketing Committee",
      department: "Marketing",
      head: "Sarah Johnson",
      members: 8,
      events: 2,
      status: "active",
    },
    {
      id: 3,
      name: "Design Committee",
      department: "Design",
      head: "Michael Brown",
      members: 6,
      events: 1,
      status: "active",
    },
    {
      id: 4,
      name: "Logistics Committee",
      department: "Logistics",
      head: "Emily Davis",
      members: 10,
      events: 4,
      status: "inactive",
    },
  ])

  // Sample members data for departments
  const [members, setMembers] = useState<Member[]>([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@example.com", 
      role: "Head", 
      department: "Technical",
      joinDate: "2023-01-15" 
    },
    { 
      id: 2, 
      name: "Lisa Johnson", 
      email: "lisa.johnson@example.com", 
      role: "Developer", 
      department: "Technical",
      joinDate: "2023-02-01" 
    },
    { 
      id: 3, 
      name: "Robert Chen", 
      email: "robert.chen@example.com", 
      role: "Designer", 
      department: "Technical",
      joinDate: "2023-01-20" 
    },
    { 
      id: 4, 
      name: "Sarah Johnson", 
      email: "sarah.johnson@example.com", 
      role: "Head", 
      department: "Marketing",
      joinDate: "2023-01-10" 
    },
    { 
      id: 5, 
      name: "Mark Wilson", 
      email: "mark.wilson@example.com", 
      role: "Marketer", 
      department: "Marketing",
      joinDate: "2023-02-05" 
    },
    { 
      id: 6, 
      name: "Michael Brown", 
      email: "michael.brown@example.com", 
      role: "Head", 
      department: "Design",
      joinDate: "2023-01-12" 
    },
    { 
      id: 7, 
      name: "Emily Davis", 
      email: "emily.davis@example.com", 
      role: "Head", 
      department: "Logistics",
      joinDate: "2023-01-18" 
    },
    { 
      id: 8, 
      name: "Alex Morgan", 
      email: "alex.morgan@example.com", 
      role: "Coordinator", 
      department: "Logistics",
      joinDate: "2023-02-10" 
    },
  ]);

  // State for expanded department sections
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>(['Technical']);

  const [showModal, setShowModal] = useState(false)
  const [currentCommittee, setCurrentCommittee] = useState<Partial<Committee> | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleAddCommittee = () => {
    setCurrentCommittee({
      name: "",
      department: "Technical",
      head: "",
      members: 0,
      events: 0,
      status: "active",
    })
    setIsEditing(false)
    setShowModal(true)
  }

  const handleEditCommittee = (committee: Committee) => {
    setCurrentCommittee({ ...committee })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDeleteCommittee = (id: number) => {
    if (confirm("Are you sure you want to delete this committee?")) {
      setCommittees(committees.filter((committee) => committee.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentCommittee) return

    if (isEditing && currentCommittee.id) {
      // Update existing committee
      setCommittees(
        committees.map((committee) =>
          committee.id === currentCommittee.id ? { ...(currentCommittee as Committee) } : committee,
        ),
      )
    } else {
      // Add new committee
      const newCommittee: Committee = {
        ...(currentCommittee as Committee),
        id: Math.max(0, ...committees.map((c) => c.id)) + 1,
        members: 0,
        events: 0,
      }
      setCommittees([...committees, newCommittee])
    }

    setShowModal(false)
    setCurrentCommittee(null)
  }

  const toggleDepartmentExpansion = (department: string) => {
    setExpandedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department) 
        : [...prev, department]
    );
  }

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2); // Limit to 2 characters for better appearance
  }

  // Get unique departments
  const departments = Array.from(new Set(committees.map(committee => committee.department)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  return (
    <DashboardLayout role="superadmin">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Committee Management</h1>
          <p className={styles.description}>
            Manage committees and their members across your organization
          </p>
      </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
            <Users size={20} />
              <span>Committees</span>
          </div>
            <button
              className={styles.addButton}
              onClick={handleAddCommittee}
            >
              <Plus size={18} />
              <span>Add Committee</span>
          </button>
        </div>

          <div className={styles.tableContainer}>
            <table className={styles.committeesTable}>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Head</th>
                  <th>Members</th>
                  <th>Events</th>
                  <th>Status</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {committees.map((committee) => (
                  <tr key={committee.id}>
                    <td data-label="Name" className={styles.committeeName}>{committee.name}</td>
                    <td data-label="Department">{committee.department}</td>
                    <td data-label="Head">{committee.head}</td>
                    <td data-label="Members">{committee.members}</td>
                    <td data-label="Events">{committee.events}</td>
                    <td data-label="Status">
                      <span className={`${styles.statusBadge} ${committee.status === "active" ? styles.statusActive : styles.statusInactive}`}>
                      {committee.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                    <td data-label="Actions">
                      <div className={styles.actionButtons}>
                      <button
                          className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => handleEditCommittee(committee)}
                          title="Edit Committee"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteCommittee(committee.id)}
                          title="Delete Committee"
                      >
                        <Trash2 size={16} />
                      </button>
                        <button
                          className={`${styles.actionButton} ${styles.emailButton}`}
                          title="Email Committee"
                        >
                        <Mail size={16} />
                      </button>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          title="View Details"
                        >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {committees.length === 0 && (
                <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                    No committees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

        {/* Department Members Section */}
        <h2 className={styles.title} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Committee Members</h2>
        
        {departments.map(department => {
          const departmentMembers = members.filter(member => member.department === department);
          const isExpanded = expandedDepartments.includes(department);
          
          return (
            <div key={department} className={styles.card}>
              <div 
                className={styles.cardHeader} 
                style={{ cursor: 'pointer' }}
                onClick={() => toggleDepartmentExpansion(department)}
              >
                <div className={styles.cardTitle}>
                  <Users size={20} />
                  <span>{department} Department</span>
                  <span className={styles.membersBadge}>{departmentMembers.length}</span>
                </div>
                <div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div className={styles.tableContainer}>
                  <table className={styles.membersTable}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentMembers.map(member => (
                        <tr key={member.id}>
                          <td data-label="Name">
                            <div className={styles.memberName}>
                              <div className={styles.memberAvatar}>
                                {getInitials(member.name)}
                              </div>
                              <span className={styles.memberNameText}>{member.name}</span>
                              {member.role === 'Head' && (
                                <span className={styles.memberRoleBadge}>Head</span>
                              )}
                            </div>
                          </td>
                          <td data-label="Email" className={styles.memberEmail}>{member.email}</td>
                          <td data-label="Role">{member.role}</td>
                          <td data-label="Joined">{formatDate(member.joinDate)}</td>
                          <td data-label="Actions">
                            <div className={styles.actionButtons}>
                              <button
                                className={`${styles.actionButton} ${styles.editButton}`}
                                title="Edit Member"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                title="Remove Member"
                              >
                                <Trash2 size={16} />
                              </button>
                              <button
                                className={`${styles.actionButton} ${styles.emailButton}`}
                                title="Email Member"
                              >
                                <Mail size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        {showModal && currentCommittee && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{isEditing ? "Edit Committee" : "Add New Committee"}</h3>
                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                  &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                    Committee Name
                  </label>
                  <input
                    type="text"
                    id="name"
                      className={styles.formInput}
                    value={currentCommittee.name}
                    onChange={(e) => setCurrentCommittee({ ...currentCommittee, name: e.target.value })}
                    required
                  />
                </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department" className={styles.formLabel}>
                    Department
                  </label>
                  <select
                    id="department"
                      className={styles.formSelect}
                    value={currentCommittee.department}
                    onChange={(e) => setCurrentCommittee({ ...currentCommittee, department: e.target.value })}
                    required
                  >
                    <option value="Technical">Technical</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="head" className={styles.formLabel}>
                    Committee Head
                  </label>
                  <input
                    type="text"
                    id="head"
                      className={styles.formInput}
                    value={currentCommittee.head}
                    onChange={(e) => setCurrentCommittee({ ...currentCommittee, head: e.target.value })}
                    required
                  />
                </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status" className={styles.formLabel}>
                    Status
                  </label>
                  <select
                    id="status"
                      className={styles.formSelect}
                    value={currentCommittee.status}
                    onChange={(e) =>
                      setCurrentCommittee({ ...currentCommittee, status: e.target.value as "active" | "inactive" })
                    }
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
                <div className={styles.modalFooter}>
                  <button 
                    type="button" 
                    className={styles.cancelButton} 
                    onClick={() => setShowModal(false)}
                  >
                  Cancel
                </button>
                  <button type="submit" className={styles.submitButton}>
                  {isEditing ? "Update Committee" : "Add Committee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  )
}

