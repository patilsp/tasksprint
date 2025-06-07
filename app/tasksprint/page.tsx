"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Target,
  TrendingUp,
  Layers,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import TaskSprintCard from "@/components/TaskSprintCard"

// Mock data for statistics
const sprintStats = {
  totalSprints: 0,
  activeSprints: 0,
  completedSprints: 0,
  planningSprints: 0,
  totalTasks: 0,
  completedTasks: 0,
  teamVelocity: 0,
  burndownEfficiency: 0,
}

export default function TaskSprint() {
  const [allSprints, setAllSprints] = useState([])
  const [filteredSprints, setFilteredSprints] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(sprintStats)
  const [activeTab, setActiveTab] = useState("all")

  const fetchSprints = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tasksprint")
      const data = await response.json()

      const transformedSprints = data.map((sprint) => ({
        ...sprint,
        id: sprint._id.toString(),
      }))

      setAllSprints(transformedSprints)
      setFilteredSprints(transformedSprints)

      // Calculate statistics
      const active = transformedSprints.filter((s) => s.status === "In Progress").length
      const completed = transformedSprints.filter((s) => s.status === "Completed").length
      const planning = transformedSprints.filter((s) => s.status === "Planning").length

      // Mock task data (in a real app, you'd fetch this)
      const totalTasks = transformedSprints.length * 8 // Assuming average 8 tasks per sprint
      const completedTasks = Math.floor(totalTasks * 0.65) // Mock completion rate

      setStats({
        totalSprints: transformedSprints.length,
        activeSprints: active,
        completedSprints: completed,
        planningSprints: planning,
        totalTasks,
        completedTasks,
        teamVelocity: Math.floor(completedTasks / (transformedSprints.length || 1)),
        burndownEfficiency: Math.floor((completedTasks / totalTasks) * 100),
      })
    } catch (error) {
      console.error("Failed to fetch sprints:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSprints()
  }, [])

  useEffect(() => {
    // Filter sprints based on search query and status filter
    let filtered = [...allSprints]

    if (searchQuery) {
      filtered = filtered.filter(
        (sprint) =>
          sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sprint.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((sprint) => sprint.status === filterStatus)
    }

    setFilteredSprints(filtered)
  }, [searchQuery, filterStatus, allSprints])

  const handleTabChange = (value) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-amber-100 text-amber-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const statCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {/* <Link href="/welcome">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link> */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sprint Master</h1>
              <p className="text-sm text-gray-500">Manage your agile sprints efficiently</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search sprints..."
                className="pl-9 w-full sm:w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={fetchSprints} variant="outline" size="icon" className="h-10 w-10">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Link href="/tasksprint/create-sprint">
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                New Sprint
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={statCardVariants}>
            <Card className="overflow-hidden border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Sprints</p>
                    <h3 className="text-3xl font-bold">{stats.totalSprints}</h3>
                    <p className="text-xs text-gray-500 mt-1">
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
            <Card className="overflow-hidden border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Tasks</p>
                    <h3 className="text-3xl font-bold">{stats.totalTasks - stats.completedTasks}</h3>
                    <p className="text-xs text-gray-500 mt-1">
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
            <Card className="overflow-hidden border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Team Velocity</p>
                    <h3 className="text-3xl font-bold">{stats.teamVelocity}</h3>
                    <p className="text-xs text-gray-500 mt-1">Tasks per sprint average</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statCardVariants}>
            <Card className="overflow-hidden border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Burndown</p>
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
          className="bg-white rounded-xl shadow-sm border p-6 mb-8"
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
              <p className="text-sm text-gray-500">Manage and track your sprint progress</p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-100">
                <Layers className="h-4 w-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger
                value="planning"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
              >
                <Target className="h-4 w-4 mr-2" />
                Planning
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900"
              >
                <Clock className="h-4 w-4 mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <SprintGrid sprints={filteredSprints} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="planning" className="mt-0">
              <SprintGrid sprints={allSprints.filter((s) => s.status === "Planning")} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <SprintGrid sprints={allSprints.filter((s) => s.status === "In Progress")} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <SprintGrid sprints={allSprints.filter((s) => s.status === "Completed")} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Sprint Timeline */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Sprint Timeline
              </h2>
              <p className="text-sm text-gray-500">View your sprint schedule</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-3"></div>
            <div className="space-y-8">
              {filteredSprints.slice(0, 5).map((sprint, index) => (
                <motion.div
                  key={sprint.id}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center mt-1
                    ${
                      sprint.status === "Planning"
                        ? "bg-blue-100 text-blue-600"
                        : sprint.status === "In Progress"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {sprint.status === "Planning" ? (
                      <Target className="h-4 w-4" />
                    ) : sprint.status === "In Progress" ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{sprint.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(sprint.status)}>{sprint.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(sprint.startDate).toLocaleDateString()} -{" "}
                            {new Date(sprint.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Link href={`/tasksprint/${sprint.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 line-clamp-2">{sprint.description}</p>
                  </div>
                </motion.div>
              ))}

              {filteredSprints.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No sprints found</h3>
                  <p className="text-gray-500 mt-1">Create a new sprint to get started</p>
                  <Link href="/tasksprint/create-sprint" className="mt-4 inline-block">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Sprint
                    </Button>
                  </Link>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Sprint Grid Component
function SprintGrid({ sprints, isLoading }) {
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
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (sprints.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No sprints found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your filters or create a new sprint</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {sprints.map((sprint) => (
        <motion.div key={sprint.id} variants={itemVariants}>
          <TaskSprintCard sprint={sprint} />
        </motion.div>
      ))}
    </motion.div>
  )
}
