"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { 
  Bell, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Plus, 
  Save, 
  Trash, 
  Shield,
  Settings,
  FileText,
  Users,
  BarChart,
  CheckCircle2,
  XCircle
} from "lucide-react"
import styles from "./permissions.module.css"

type Permission = {
  id: string
  name: string
  description: string
  roles: ("superadmin" | "admin" | "committee" | "attendee")[]
}

type PermissionGroup = {
  id: string
  name: string
  permissions: Permission[]
  expanded: boolean
}

type PermissionRequest = {
  id: string
  name: string
  description: string
  requestedBy: {
    id: string
    name: string
    role: "admin" | "committee"
  }
  requestedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState<"manage" | "requests">("manage")
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      id: "1",
      name: "Event Management",
      expanded: true,
      permissions: [
        {
          id: "1-1",
          name: "Create Event",
          description: "Ability to create new events",
          roles: ["superadmin", "admin"]
        },
        {
          id: "1-2",
          name: "Edit Event",
          description: "Ability to edit existing events",
          roles: ["superadmin", "admin"]
        },
        {
          id: "1-3",
          name: "Delete Event",
          description: "Ability to delete events",
          roles: ["superadmin"]
        }
      ]
    },
    {
      id: "2",
      name: "User Management",
      expanded: false,
      permissions: [
        {
          id: "2-1",
          name: "Create User",
          description: "Ability to create new users",
          roles: ["superadmin", "admin"]
        },
        {
          id: "2-2",
          name: "Edit User",
          description: "Ability to edit existing users",
          roles: ["superadmin", "admin"]
        },
        {
          id: "2-3",
          name: "Delete User",
          description: "Ability to delete users",
          roles: ["superadmin"]
        }
      ]
    },
    {
      id: "3",
      name: "Financial Management",
      expanded: false,
      permissions: [
        {
          id: "3-1",
          name: "Approve Payments",
          description: "Ability to approve payments",
          roles: ["superadmin", "admin"]
        },
        {
          id: "3-2",
          name: "View Financial Reports",
          description: "Ability to view financial reports",
          roles: ["superadmin", "admin"]
        }
      ]
    }
  ])
  
  const [permissionRequests, setPermissionRequests] = useState<PermissionRequest[]>([
    {
      id: "req-1",
      name: "Delete User",
      description: "Need to remove spam accounts",
      requestedBy: {
        id: "admin-2",
        name: "John Smith",
        role: "admin"
      },
      requestedAt: "2023-03-28T14:30:00Z",
      status: "pending"
    },
    {
      id: "req-2",
      name: "View Financial Reports",
      description: "Need to prepare quarterly summary",
      requestedBy: {
        id: "admin-3",
        name: "Sarah Wilson",
        role: "admin"
      },
      requestedAt: "2023-03-30T09:15:00Z",
      status: "pending"
    },
    {
      id: "req-3",
      name: "Edit Event",
      description: "Need to update details for Tech Conference",
      requestedBy: {
        id: "comm-1",
        name: "Mike Johnson",
        role: "committee"
      },
      requestedAt: "2023-03-29T16:45:00Z",
      status: "pending"
    }
  ])

  const toggleGroup = (groupId: string) => {
    setPermissionGroups(permissionGroups.map(group => 
      group.id === groupId ? { ...group, expanded: !group.expanded } : group
    ))
  }

  const toggleRole = (groupId: string, permissionId: string, role: "superadmin" | "admin" | "committee" | "attendee") => {
    setPermissionGroups(permissionGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          permissions: group.permissions.map(permission => {
            if (permission.id === permissionId) {
              const hasRole = permission.roles.includes(role)
              return {
                ...permission,
                roles: hasRole 
                  ? permission.roles.filter(r => r !== role)
                  : [...permission.roles, role]
              }
            }
            return permission
          })
        }
      }
      return group
    }))
  }

  const savePermissions = () => {
    // In a real application, this would save to a backend
    alert("Permissions saved successfully!")
  }
  
  const handleRequestAction = (requestId: string, action: "approve" | "reject") => {
    setPermissionRequests(permissionRequests.map(request => 
      request.id === requestId
        ? { ...request, status: action === "approve" ? "approved" : "rejected" }
        : request
    ))
    
    // In a real application, this would also update the permissions if approved
    if (action === "approve") {
      // Find the request
      const request = permissionRequests.find(r => r.id === requestId)
      if (request) {
        // Implementation would depend on how permissions are structured
        alert(`Permission "${request.name}" has been granted to ${request.requestedBy.name}`)
      }
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <DashboardLayout role="superadmin">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Permission Management</h1>
          <p className={styles.description}>
            Manage user permissions and access control across the platform
          </p>
          
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === "manage" ? styles.active : ""}`}
              onClick={() => setActiveTab("manage")}
            >
              <Shield size={18} />
              Manage Permissions
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "requests" ? styles.active : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              <Users size={18} />
              Permission Requests
              {permissionRequests.filter(r => r.status === "pending").length > 0 && (
                <span className={styles.notificationBadge}>{permissionRequests.filter(r => r.status === "pending").length}</span>
              )}
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {activeTab === "manage" ? (
            <>
              {permissionGroups.map((group) => (
                <div key={group.id} className={styles.permissionGroup}>
                  <div 
                    className={styles.permissionGroupHeader}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <div className={styles.permissionGroupTitle}>
                      <Shield size={20} />
                      {group.name}
                    </div>
                    {group.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {group.expanded && (
                    <div className={styles.permissionsList}>
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className={styles.permissionItem}>
                          <div className={styles.permissionInfo}>
                            <div className={styles.permissionName}>{permission.name}</div>
                            <div className={styles.permissionDescription}>
                              {permission.description}
                            </div>
                          </div>
                          
                          <div className={styles.permissionRoles}>
                            <button
                              className={`${styles.roleToggle} ${permission.roles.includes("admin") ? styles.active : ""}`}
                              onClick={() => toggleRole(group.id, permission.id, "admin")}
                            >
                              Admin
                            </button>
                            <button
                              className={`${styles.roleToggle} ${permission.roles.includes("committee") ? styles.active : ""}`}
                              onClick={() => toggleRole(group.id, permission.id, "committee")}
                            >
                              Committee
                            </button>
                            <button
                              className={`${styles.roleToggle} ${permission.roles.includes("attendee") ? styles.active : ""}`}
                              onClick={() => toggleRole(group.id, permission.id, "attendee")}
                            >
                              Attendee
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className={styles.actionsBar}>
                <button className={styles.saveButton} onClick={savePermissions}>
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <table className={styles.requestsTable}>
              <thead>
                <tr>
                  <th>Permission Request</th>
                  <th>Requested By</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {permissionRequests.filter(request => request.status === "pending").map((request) => (
                  <tr key={request.id}>
                    <td data-label="Permission Request">
                      <div className={styles.requestInfo}>
                        <div className={styles.requestName}>{request.name}</div>
                        <div className={styles.requestDescription}>{request.description}</div>
                      </div>
                    </td>
                    <td data-label="Requested By">
                      <div className={styles.requestedBy}>
                        {request.requestedBy.name}
                        <span className={request.requestedBy.role === "admin" ? styles.adminBadge : styles.committeeBadge}>
                          {request.requestedBy.role === "admin" ? "Admin" : "Committee"}
                        </span>
                      </div>
                    </td>
                    <td data-label="Date">{formatDate(request.requestedAt)}</td>
                    <td data-label="Actions">
                      <div className={styles.requestActions}>
                        <button
                          className={styles.approveButton}
                          onClick={() => handleRequestAction(request.id, "approve")}
                          aria-label="Approve request"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          className={styles.rejectButton}
                          onClick={() => handleRequestAction(request.id, "reject")}
                          aria-label="Reject request"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {permissionRequests.filter(request => request.status === "pending").length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>
                      No pending permission requests
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
 