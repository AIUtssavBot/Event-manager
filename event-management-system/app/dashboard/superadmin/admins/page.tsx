"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Users, UserPlus, Edit, Trash2, Mail, Shield, Check, X } from "lucide-react"
import Modal from '@/components/shared/modal'
import styles from './admins.module.css'

interface Admin {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
  lastActive: string
}

export default function SuperAdminAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Chief Coordinator",
      department: "Technical",
      status: "active",
      lastActive: "2023-05-15 14:30",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Vice Coordinator",
      department: "Marketing",
      status: "active",
      lastActive: "2023-05-15 10:15",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Vice Coordinator",
      department: "Design",
      status: "active",
      lastActive: "2023-05-14 16:45",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Chief Coordinator",
      department: "Logistics",
      status: "inactive",
      lastActive: "2023-05-10 09:20",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<Partial<Admin> | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Partial<Admin> | null>(null)

  const handleAddAdmin = () => {
    setEditingAdmin({
      name: '',
      email: '',
      role: 'admin',
      department: 'Technical',
      status: 'active',
    })
    setIsAddAdminModalOpen(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin({ ...admin })
    setIsAddAdminModalOpen(true)
  }

  const handleDeleteAdmin = (id: number) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((admin) => admin.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentAdmin) return

    if (isEditing && currentAdmin.id) {
      // Update existing admin
      setAdmins(admins.map((admin) => (admin.id === currentAdmin.id ? { ...(currentAdmin as Admin) } : admin)))
    } else {
      // Add new admin
      const newAdmin: Admin = {
        ...(currentAdmin as Admin),
        id: Math.max(0, ...admins.map((a) => a.id)) + 1,
        lastActive: "Never",
      }
      setAdmins([...admins, newAdmin])
    }

    setShowModal(false)
    setCurrentAdmin(null)
  }

  const handleSaveAdmin = () => {
    if (editingAdmin) {
      if (editingAdmin.id) {
        // Update existing admin
        setAdmins(admins.map((admin) => (admin.id === editingAdmin.id ? { ...(editingAdmin as Admin) } : admin)))
      } else {
        // Add new admin
        const newAdmin: Admin = {
          ...(editingAdmin as Admin),
          id: Math.max(0, ...admins.map((a) => a.id)) + 1,
          lastActive: "Never",
        }
        setAdmins([...admins, newAdmin])
      }
      setIsAddAdminModalOpen(false)
      setEditingAdmin(null)
    }
  }

  return (
    <DashboardLayout role="superadmin">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Management</h1>
          <p className={styles.description}>
            Manage system administrators and their access levels.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Users size={20} />
              <span>System Administrators</span>
            </div>
            <button
              className={styles.addButton}
              onClick={() => setIsAddAdminModalOpen(true)}
            >
              <UserPlus size={18} />
              <span>Add Admin</span>
            </button>
          </div>

          <div style={{ padding: '1rem' }}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <div>
                        <div className={styles.adminName}>{admin.name}</div>
                        <div className={styles.adminEmail}>{admin.email}</div>
                      </div>
                    </td>
                    <td>{admin.role}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          admin.status === 'active'
                            ? styles.statusActive
                            : styles.statusInactive
                        }`}
                      >
                        {admin.status === 'active' ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        {admin.status.charAt(0).toUpperCase() +
                          admin.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={`${styles.actionButton} ${styles.editButton}`}
                          onClick={() => handleEditAdmin(admin)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.emailButton}`}
                          onClick={() => handleEmailAdmin(admin.email)}
                        >
                          <Mail size={16} />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.permissionsButton}`}
                          onClick={() => handleManagePermissions(admin.id)}
                        >
                          <Shield size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isAddAdminModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
                </h2>
                <button
                  className={styles.modalClose}
                  onClick={() => {
                    setIsAddAdminModalOpen(false)
                    setEditingAdmin(null)
                  }}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Enter full name"
                    value={editingAdmin?.name || ''}
                    onChange={(e) =>
                      setEditingAdmin({
                        ...editingAdmin!,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    className={styles.formInput}
                    type="email"
                    placeholder="Enter email address"
                    value={editingAdmin?.email || ''}
                    onChange={(e) =>
                      setEditingAdmin({
                        ...editingAdmin!,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Role</label>
                  <select
                    className={styles.formSelect}
                    value={editingAdmin?.role || 'admin'}
                    onChange={(e) =>
                      setEditingAdmin({
                        ...editingAdmin!,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    className={styles.formSelect}
                    value={editingAdmin?.status || 'active'}
                    onChange={(e) =>
                      setEditingAdmin({
                        ...editingAdmin!,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsAddAdminModalOpen(false)
                    setEditingAdmin(null)
                  }}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitButton}
                  onClick={handleSaveAdmin}
                >
                  {editingAdmin ? 'Update Admin' : 'Add Admin'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

