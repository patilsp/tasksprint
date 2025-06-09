"use client"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TaskSprintCard } from "./components/task-sprint-card"
import { useTaskSprintStore, TaskSprint } from "@/store/useTaskSprintStore"

const ITEMS_PER_PAGE = 6

export default function TaskSprintPage() {
  const [allSprints, setAllSprints] = useState<TaskSprint[]>([])
  const [filteredSprints, setFilteredSprints] = useState<TaskSprint[]>([])
  const [displayedSprints, setDisplayedSprints] = useState<TaskSprint[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [stats, setStats] = useState({
    totalSprints: 0,
    activeSprints: 0,
    completedSprints: 0,
    planningSprints: 0,
    totalTasks: 0,
    completedTasks: 0,
    teamVelocity: 0,
    burndownEfficiency: 0
  })
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const fetchSprints = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/tasksprint')
      const data = await response.json()
      
      console.log('API Response:', data) // Debug log
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch sprints')
      }

      // Ensure we're getting the correct data structure
      const sprints = Array.isArray(data) ? data : (data.sprints || [])
      console.log('Processed sprints:', sprints) // Debug log

      setAllSprints(sprints)
      setFilteredSprints(sprints)
      setDisplayedSprints(sprints.slice(0, ITEMS_PER_PAGE))
      setCurrentPage(1)

      // Update stats
      const statsData = {
        totalSprints: sprints.length,
        activeSprints: sprints.filter(s => s.status === 'In Progress').length,
        completedSprints: sprints.filter(s => s.status === 'Completed').length,
        planningSprints: sprints.filter(s => s.status === 'Planning').length,
        totalTasks: sprints.reduce((acc, sprint) => acc + (sprint.tasks || 0), 0),
        completedTasks: sprints.reduce((acc, sprint) => acc + (sprint.completedTasks || 0), 0),
        teamVelocity: data.stats?.teamVelocity || 0,
        burndownEfficiency: data.stats?.burndownEfficiency || 0
      }
      console.log('Stats data:', statsData) // Debug log
      setStats(statsData)
    } catch (error) {
      console.error("Failed to fetch sprints:", error)
      setAllSprints([])
      setFilteredSprints([])
      setDisplayedSprints([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadMoreSprints = async () => {
    setIsLoadingMore(true)
    try {
      const nextPage = currentPage + 1
      const startIndex = 0
      const endIndex = nextPage * ITEMS_PER_PAGE

      const newDisplayedSprints = filteredSprints?.slice(startIndex, endIndex) || []
      setDisplayedSprints(newDisplayedSprints)
      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Failed to load more sprints:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleCreateSprint = async (sprintData: any) => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/tasksprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sprintData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create sprint')
      }

      const newSprint = data.sprint
      const updatedSprints = [newSprint, ...allSprints]
      setAllSprints(updatedSprints)
      applyFilters(updatedSprints, searchQuery, filterStatus, filterPriority)
      setCreateModalOpen(false)
    } catch (error) {
      console.error("Failed to create sprint:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const applyFilters = (sprints: TaskSprint[], search: string, status: string, priority: string) => {
    let filtered = [...(sprints || [])]

    if (search) {
      filtered = filtered.filter(
        (sprint) =>
          sprint?.name?.toLowerCase().includes(search.toLowerCase()) ||
          sprint?.description?.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((sprint) => sprint?.status === status)
    }

    if (priority !== "all") {
      filtered = filtered.filter((sprint) => sprint?.priority === priority)
    }

    setFilteredSprints(filtered)
    setDisplayedSprints(filtered.slice(0, ITEMS_PER_PAGE))
    setCurrentPage(1)
  }

  useEffect(() => {
    applyFilters(allSprints, searchQuery, filterStatus, filterPriority)
  }, [searchQuery, filterStatus, filterPriority, allSprints])

  useEffect(() => {
    fetchSprints()
  }, [])

  // Add debug log for filtered sprints
  useEffect(() => {
    console.log('Current filtered sprints:', filteredSprints)
    console.log('Current displayed sprints:', displayedSprints)
  }, [filteredSprints, displayedSprints])

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

  const hasMoreItems = Array.isArray(displayedSprints) && Array.isArray(filteredSprints) 
    ? displayedSprints.length < filteredSprints.length 
    : false

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
          <p className="text-muted-foreground">Manage and track your sprint progress</p>
        </div>
        <Link href="/tasksprint/create-sprint" className="mt-4 inline-block">
                    
                  
        <Button disabled={isCreating} className="w-fit">
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create New Sprint
            </>
          )}
        </Button>
        </Link>
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
            className="flex flex-col sm:flex-row gap-4 mb-6 p-4"
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

    </div>
  )
}

// Sprint Grid Component
interface SprintGridProps {
  sprints: TaskSprint[]
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
      
        <div>
        <Link href="/tasksprint/create-sprint" className="mt-4 inline-block">   
            <Button className="w-fit">                     
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Sprint                       
            </Button>
          </Link>

        </div>
      
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
          {sprints.map((sprint) => (
            <motion.div
              key={sprint._id}
              variants={itemVariants}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.05 }}
            >
              <TaskSprintCard sprint={sprint} />
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
