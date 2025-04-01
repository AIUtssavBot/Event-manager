"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Clipboard, Search, Filter, CheckCircle2, Clock, AlertCircle, MoreHorizontal, Plus, Calendar, User, ChevronDown, ChevronUp, Tag } from "lucide-react"
import styles from "./tasks.module.css"

interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  assignedTo: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'in-progress' | 'pending'
  category: string
  createdAt: string
}

export default function CommitteeTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedTask, setExpandedTask] = useState<number | null>(null)

  // Simulate fetching tasks from an API
  useEffect(() => {
    // This would be an API call in a real application
    const fetchedTasks: Task[] = [
      {
        id: 1,
        title: "Finalize venue arrangements",
        description: "Confirm booking details, payment, and logistical requirements with the venue management team.",
        dueDate: "2023-06-15",
        assignedTo: "Sarah Johnson",
        priority: "high",
        status: "completed",
        category: "Logistics",
        createdAt: "2023-05-01"
      },
      {
        id: 2,
        title: "Create social media campaign for event promotion",
        description: "Design graphics, write copy, and schedule posts across all social media platforms.",
        dueDate: "2023-06-10",
        assignedTo: "Emily Davis",
        priority: "high",
        status: "in-progress",
        category: "Marketing",
        createdAt: "2023-05-03"
      },
      {
        id: 3,
        title: "Coordinate catering services",
        description: "Finalize menu selections, confirm dietary requirements, and arrange delivery schedule.",
        dueDate: "2023-06-12",
        assignedTo: "Michael Brown",
        priority: "medium",
        status: "pending",
        category: "Logistics",
        createdAt: "2023-05-05"
      },
      {
        id: 4,
        title: "Set up registration website",
        description: "Configure registration forms, payment gateway, and confirmation emails.",
        dueDate: "2023-05-25",
        assignedTo: "John Smith",
        priority: "high",
        status: "completed",
        category: "Technical",
        createdAt: "2023-05-02"
      },
      {
        id: 5,
        title: "Organize speaker schedule",
        description: "Create timetable, coordinate with speakers for availability, and prepare introduction materials.",
        dueDate: "2023-06-05",
        assignedTo: "Sarah Johnson",
        priority: "medium",
        status: "in-progress",
        category: "Program",
        createdAt: "2023-05-07"
      },
      {
        id: 6,
        title: "Design event badges and materials",
        description: "Create designs for attendee badges, program booklets, and signage.",
        dueDate: "2023-06-08",
        assignedTo: "Emily Davis",
        priority: "low",
        status: "in-progress",
        category: "Design",
        createdAt: "2023-05-10"
      },
      {
        id: 7,
        title: "Arrange transportation for VIP guests",
        description: "Book airport transfers and local transport for keynote speakers and special guests.",
        dueDate: "2023-06-14",
        assignedTo: "Michael Brown",
        priority: "medium",
        status: "pending",
        category: "Logistics",
        createdAt: "2023-05-12"
      },
      {
        id: 8,
        title: "Prepare post-event survey",
        description: "Design feedback questionnaire to gather attendee insights and improvement suggestions.",
        dueDate: "2023-06-20",
        assignedTo: "John Smith",
        priority: "low",
        status: "pending",
        category: "Marketing",
        createdAt: "2023-05-15"
      }
    ];
    
    setTasks(fetchedTasks);
    setFilteredTasks(fetchedTasks);
  }, []);

  // Filter tasks based on search query and filters
  useEffect(() => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task => 
          task.title.toLowerCase().includes(query) || 
          task.description.toLowerCase().includes(query) ||
          task.assignedTo.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }
    
    setFilteredTasks(filtered);
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter, tasks]);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(tasks.map(task => task.category)))];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate days remaining or overdue
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'day' : 'days'} overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} remaining`;
    }
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completed':
        return styles.statusCompleted;
      case 'in-progress':
        return styles.statusInProgress;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority: string) => {
    switch(priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 size={14} />;
      case 'in-progress':
        return <Clock size={14} />;
      case 'pending':
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: number) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
    }
  };

  // Update task status (in a real app, this would call an API)
  const updateTaskStatus = (taskId: number, newStatus: 'completed' | 'in-progress' | 'pending') => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <DashboardLayout role="committee">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Task Management</h1>
          <p className={styles.description}>
            Track, manage, and update tasks for your events
          </p>
        </div>

        <div className={styles.actionBar}>
          <button className={styles.addTaskButton}>
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Clipboard size={20} />
              <span>Tasks</span>
              <span className={styles.taskCount}>{filteredTasks.length}</span>
            </div>
            
            <div className={styles.searchAndFilter}>
              <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
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
                    className={`${styles.filterOption} ${statusFilter === 'pending' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('pending')}
                  >
                    Pending
                  </button>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'in-progress' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('in-progress')}
                  >
                    In Progress
                  </button>
                  <button 
                    className={`${styles.filterOption} ${statusFilter === 'completed' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Priority</label>
                <div className={styles.filterOptions}>
                  <button 
                    className={`${styles.filterOption} ${priorityFilter === 'all' ? styles.active : ''}`}
                    onClick={() => setPriorityFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`${styles.filterOption} ${priorityFilter === 'high' ? styles.active : ''}`}
                    onClick={() => setPriorityFilter('high')}
                  >
                    High
                  </button>
                  <button 
                    className={`${styles.filterOption} ${priorityFilter === 'medium' ? styles.active : ''}`}
                    onClick={() => setPriorityFilter('medium')}
                  >
                    Medium
                  </button>
                  <button 
                    className={`${styles.filterOption} ${priorityFilter === 'low' ? styles.active : ''}`}
                    onClick={() => setPriorityFilter('low')}
                  >
                    Low
                  </button>
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Category</label>
                <div className={styles.filterOptions}>
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`${styles.filterOption} ${categoryFilter === category ? styles.active : ''}`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.taskList}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`${styles.taskItem} ${expandedTask === task.id ? styles.expanded : ''}`}
                >
                  <div 
                    className={styles.taskHeader}
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    <div className={styles.taskHeaderLeft}>
                      <div className={styles.taskTitle}>
                        <span>{task.title}</span>
                        <span className={`${styles.priorityBadge} ${getPriorityBadgeClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className={styles.taskMeta}>
                        <span className={styles.taskCategory}>
                          <Tag size={14} />
                          {task.category}
                        </span>
                        <span className={styles.taskDueDate}>
                          <Calendar size={14} />
                          {formatDate(task.dueDate)}
                        </span>
                        <span className={styles.taskAssignee}>
                          <User size={14} />
                          {task.assignedTo}
                        </span>
                      </div>
                    </div>
                    <div className={styles.taskHeaderRight}>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span>{task.status.replace('-', ' ')}</span>
                      </span>
                      <span className={styles.daysRemaining}>
                        {getDaysRemaining(task.dueDate)}
                      </span>
                      <button className={styles.taskExpandButton}>
                        {expandedTask === task.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedTask === task.id && (
                    <div className={styles.taskDetails}>
                      <div className={styles.taskDescription}>
                        <h4>Description</h4>
                        <p>{task.description}</p>
                      </div>
                      <div className={styles.taskActions}>
                        <div className={styles.statusButtons}>
                          <h4>Update Status</h4>
                          <div className={styles.statusOptions}>
                            <button 
                              className={`${styles.statusButton} ${task.status === 'pending' ? styles.active : ''}`}
                              onClick={() => updateTaskStatus(task.id, 'pending')}
                            >
                              <AlertCircle size={16} />
                              Pending
                            </button>
                            <button 
                              className={`${styles.statusButton} ${task.status === 'in-progress' ? styles.active : ''}`}
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                            >
                              <Clock size={16} />
                              In Progress
                            </button>
                            <button 
                              className={`${styles.statusButton} ${task.status === 'completed' ? styles.active : ''}`}
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                            >
                              <CheckCircle2 size={16} />
                              Completed
                            </button>
                          </div>
                        </div>
                        <div className={styles.taskMoreActions}>
                          <button className={styles.moreActionsButton}>
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                      <div className={styles.taskFooter}>
                        <span className={styles.taskCreated}>Created on {formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <Clipboard size={48} />
                <h3>No tasks found matching your filters</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 