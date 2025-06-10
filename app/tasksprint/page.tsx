"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Target,
  TrendingUp,
  Layers,
  RefreshCw,
  ChevronDown,
  Loader2,
  Users,
  Calendar,
  FolderOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TaskSprintCard } from "@/components/task-sprint-card"
import { CreateSprintDialog } from "@/components/create-sprint-dialog"
import { toast } from "react-hot-toast"
import { WorkspaceCard } from "@/components/workspace-card"
import { useSprintStore } from "@/store/useSprintStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const sprintStats = {
  totalSprints: 24,
  activeSprints: 8,
  completedSprints: 12,
  planningSprints: 4,
  totalTasks: 192,
  completedTasks: 124,
  teamVelocity: 8,
  burndownEfficiency: 85,
}

// Mock sprint data
const mockSprints = [
  {
    id: "1",
    name: "User Authentication Sprint",
    description: "Implement user login, registration, and password reset functionality",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    progress: 65,
    tasks: 12,
    completedTasks: 8,
    teamMembers: 4,
    priority: "High",
  },
  {
    id: "2",
    name: "Dashboard Analytics",
    description: "Build comprehensive analytics dashboard with charts and metrics",
    status: "Planning",
    startDate: "2024-02-01",
    endDate: "2024-02-14",
    progress: 0,
    tasks: 15,
    completedTasks: 0,
    teamMembers: 6,
    priority: "Medium",
  },
  {
    id: "3",
    name: "Mobile Responsive Design",
    description: "Optimize application for mobile devices and tablets",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-01-14",
    progress: 100,
    tasks: 10,
    completedTasks: 10,
    teamMembers: 3,
    priority: "High",
  },
  {
    id: "4",
    name: "API Integration",
    description: "Integrate third-party APIs for enhanced functionality",
    status: "In Progress",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    progress: 40,
    tasks: 18,
    completedTasks: 7,
    teamMembers: 5,
    priority: "Medium",
  },
  {
    id: "5",
    name: "Performance Optimization",
    description: "Improve application performance and loading times",
    status: "Planning",
    startDate: "2024-02-15",
    endDate: "2024-02-28",
    progress: 0,
    tasks: 8,
    completedTasks: 0,
    teamMembers: 2,
    priority: "Low",
  },
  {
    id: "6",
    name: "Security Enhancements",
    description: "Implement advanced security measures and vulnerability fixes",
    status: "In Progress",
    startDate: "2024-01-25",
    endDate: "2024-02-10",
    progress: 75,
    tasks: 14,
    completedTasks: 10,
    teamMembers: 4,
    priority: "High",
  },
]

const ITEMS_PER_PAGE = 6

export default function TaskSprintPage() {
  const [allSprints, setAllSprints] = useState(mockSprints)
  const [filteredSprints, setFilteredSprints] = useState(mockSprints)
  const [displayedSprints, setDisplayedSprints] = useState(mockSprints.slice(0, ITEMS_PER_PAGE))
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [stats, setStats] = useState(sprintStats)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [createSprintOpen, setCreateSprintOpen] = useState(false)
  const { sprints, error, fetchSprints, createSprint } = useSprintStore()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    dueDate: new Date(),
    priority: "Medium",
    status: "Planning",
    project: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadMoreSprints = async () => {
    setIsLoadingMore(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const nextPage = currentPage + 1
      const startIndex = 0
      const endIndex = nextPage * ITEMS_PER_PAGE

      setDisplayedSprints(filteredSprints.slice(startIndex, endIndex))
      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Failed to load more sprints:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleCreateSprint = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate dates
      if (formData.startDate > formData.dueDate) {
        toast.error("Start date cannot be after due date")
        return
      }

      // Format dates to ISO string
      const sprintData = {
        ...formData,
        startDate: formData.startDate.toISOString(),
        dueDate: formData.dueDate.toISOString(),
      }

      await createSprint(sprintData)
      toast.success("Sprint created successfully!")
      setCreateSprintOpen(false)
      setFormData({
        name: "",
        description: "",
        startDate: new Date(),
        dueDate: new Date(),
        priority: "Medium",
        status: "Planning",
        project: "",
      })
    } catch (error) {
      console.error("Failed to create sprint:", error)
      toast.error("Failed to create sprint. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const applyFilters = (sprints: any[], search: string, status: string, priority: string) => {
    let filtered = [...sprints]

    if (search) {
      filtered = filtered.filter(
        (sprint) =>
          sprint.name.toLowerCase().includes(search.toLowerCase()) ||
          sprint.description?.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((sprint) => sprint.status === status)
    }

    if (priority !== "all") {
      filtered = filtered.filter((sprint) => sprint.priority === priority)
    }

    setFilteredSprints(filtered)
    setDisplayedSprints(filtered.slice(0, ITEMS_PER_PAGE))
    setCurrentPage(1)
  }

  useEffect(() => {
    applyFilters(allSprints, searchQuery, filterStatus, filterPriority)
  }, [searchQuery, filterStatus, filterPriority, allSprints])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "all") {
      setFilterStatus("all")
    } else if (value === "active") {
      setFilterStatus("In Progress")
    } else if (value === "planning") {
      setFilterStatus("Planning")
    } else if (value === "completed") {
      setFilterStatus("Completed")
    }
  }

  const hasMoreItems = displayedSprints.length < filteredSprints.length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const statCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const handleCreateWorkspace = async (data: any) => {
    try {
      console.log("Creating workspace:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Workspace created successfully!")
    } catch (error) {
      console.error("Failed to create workspace:", error)
      throw error
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Sprint</h1>
          <p className="text-muted-foreground">Manage your team workspaces and projects</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setCreateSprintOpen(true)} className="w-fit">
            <Target className="mr-2 h-4 w-4" />
            Create Sprint
          </Button>
          
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={statCardVariants}>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sprints</p>
                  <h3 className="text-3xl font-bold">{stats.totalSprints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.activeSprints} active, {stats.planningSprints} planning
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Layers className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statCardVariants}>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                  <h3 className="text-3xl font-bold">{stats.totalTasks - stats.completedTasks}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.completedTasks} of {stats.totalTasks} completed
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statCardVariants}>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Velocity</p>
                  <h3 className="text-3xl font-bold">{stats.teamVelocity}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Tasks per sprint average</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statCardVariants}>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Burndown</p>
                  <h3 className="text-3xl font-bold">{stats.burndownEfficiency}%</h3>
                  <div className="w-full mt-2">
                    <Progress value={stats.burndownEfficiency} className="h-1" />
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Sprint Board */}
      <motion.div
        className="bg-card rounded-xl border p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-600" />
              Sprint Board
            </h2>
            <p className="text-sm text-muted-foreground">Manage and track your sprint progress</p>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">
              <Layers className="h-4 w-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="planning">
              <Target className="h-4 w-4 mr-2" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="active">
              <Clock className="h-4 w-4 mr-2" />
              Active
            </TabsTrigger>
            <TabsTrigger value="completed">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Completed
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-muted/50 rounded-lg"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sprints..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[140px]">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchSprints} variant="outline" size="icon" disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </motion.div>

          <TabsContent value="all" className="mt-0">
            <SprintGrid
              sprints={displayedSprints}
              isLoading={isLoading}
              hasMoreItems={hasMoreItems}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMoreSprints}
            />
          </TabsContent>
          <TabsContent value="planning" className="mt-0">
            <SprintGrid
              sprints={displayedSprints.filter((s) => s.status === "Planning")}
              isLoading={isLoading}
              hasMoreItems={false}
              isLoadingMore={false}
              onLoadMore={() => {}}
            />
          </TabsContent>
          <TabsContent value="active" className="mt-0">
            <SprintGrid
              sprints={displayedSprints.filter((s) => s.status === "In Progress")}
              isLoading={isLoading}
              hasMoreItems={false}
              isLoadingMore={false}
              onLoadMore={() => {}}
            />
          </TabsContent>
          <TabsContent value="completed" className="mt-0">
            <SprintGrid
              sprints={displayedSprints.filter((s) => s.status === "Completed")}
              isLoading={isLoading}
              hasMoreItems={false}
              isLoadingMore={false}
              onLoadMore={() => {}}
            />
          </TabsContent>
        </Tabs>
      </motion.div>

     

      {/* Create Sprint Dialog */}
      <Dialog open={createSprintOpen} onOpenChange={setCreateSprintOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Sprint</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSprint} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sprint Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter sprint name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter sprint description"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date: Date) => setFormData({ ...formData, startDate: date })}
                  className="w-full p-2 border rounded-md"
                  dateFormat="MM/dd/yyyy"
                  minDate={new Date()}
                />
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={(date: Date) => setFormData({ ...formData, dueDate: date })}
                  className="w-full p-2 border rounded-md"
                  dateFormat="MM/dd/yyyy"
                  minDate={formData.startDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project ID</Label>
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Enter project ID"
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Sprint"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sprint Grid Component
interface SprintGridProps {
  sprints: any[]
  isLoading: boolean
  hasMoreItems: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
}

function SprintGrid({ sprints, isLoading, hasMoreItems, isLoadingMore, onLoadMore }: SprintGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-muted-foreground">Loading sprints...</span>
        </div>
      </div>
    )
  }

  if (sprints.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No sprints found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your filters or create a new sprint</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {sprints.map((sprint, index) => (
            <motion.div
              key={sprint.id}
              variants={itemVariants}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <WorkspaceCard
                workspace={{
                  id: sprint.id,
                  title: sprint.name,
                  description: sprint.description,
                  members: sprint.teamMembers.length,
                  projects: 1,
                  lastActivity: new Date(sprint.updatedAt).toLocaleDateString(),
                  color: getPriorityColor(sprint.priority),
                }}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {hasMoreItems && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center pt-6">
          <Button onClick={onLoadMore} disabled={isLoadingMore} variant="outline" className="min-w-[140px]">
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Load More
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High':
      return 'bg-red-500'
    case 'Medium':
      return 'bg-yellow-500'
    case 'Low':
      return 'bg-green-500'
    default:
      return 'bg-blue-500'
  }
}
