"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Search, Filter, ArrowLeft, Zap, CheckSquare } from "lucide-react"
import { useTaskStore } from "@/store/task-store"
import { useProjectStore } from "@/store/useProjectStore"
import { TaskCard } from "@/components/task-card"
import { TaskForm } from "@/components/task-form"
import type { Task } from "@/types/task"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function TasksPage() {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  const projectId = params.projectId as string

  const { tasks, loading, error, fetchTasks, clearError, clearTasks } = useTaskStore()
  const { currentProject, fetchProject } = useProjectStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("title")

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId)
      fetchProject(projectId)
    }

    return () => {
      clearTasks()
    }
  }, [projectId, fetchTasks, fetchProject, clearTasks])

  // Filter and search logic
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority":
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const handleRefresh = () => {
    clearError()
    fetchTasks(projectId)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setSortBy("title")
  }

  const handleBack = () => {
    router.push(`/tasksprint/${workspaceId}/project`)
  }

  const getStatusCount = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status).length
  }

  const getPriorityCount = (priority: Task["priority"]) => {
    return tasks.filter((task) => task.priority === priority).length
  }

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 mb-4">Error: {error}</div>
            <Button onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <TaskForm projectId={projectId} />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                <CheckSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Tasks Yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first task in{" "}
                <span className="font-semibold">{currentProject?.name || "this project"}</span>
              </p>
              <TaskForm projectId={projectId} />
            </div>
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {/* Page Title and Stats */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Tasks in {currentProject?.name || "Project"}</h1>
                  <p className="text-gray-600">Manage tasks within this project</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Badge variant="secondary" className="text-sm">
                    {tasks.length} Total Tasks
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {tasks.filter((t) => t.status === "In Progress").length} Active
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">{getStatusCount("Todo")}</div>
                  <div className="text-sm text-gray-600">Todo</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{getStatusCount("In Progress")}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{getStatusCount("In Review")}</div>
                  <div className="text-sm text-gray-600">In Review</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{getStatusCount("Completed")}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div variants={fadeInUp} className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search tasks by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Todo">Todo</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="dueDate">Due Date</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || statusFilter !== "all" || priorityFilter !== "all") && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {searchTerm && <Badge variant="secondary">Search: "{searchTerm}"</Badge>}
                  {statusFilter !== "all" && <Badge variant="secondary">Status: {statusFilter}</Badge>}
                  {priorityFilter !== "all" && <Badge variant="secondary">Priority: {priorityFilter}</Badge>}
                </div>
              )}
            </motion.div>

            {/* Results Count */}
            <motion.div variants={fadeInUp} className="mb-6">
              <p className="text-gray-600">
                Showing {filteredTasks.length} of {tasks.length} tasks
                {filteredTasks.length !== tasks.length && " (filtered)"}
              </p>
            </motion.div>

            {/* Tasks Grid */}
            {filteredTasks.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task, index) => (
                  <motion.div key={task.id} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
