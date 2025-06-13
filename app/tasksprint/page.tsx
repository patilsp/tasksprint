"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Search, Filter, Zap } from "lucide-react"
import { useSprintStore } from "@/store/useSprintStore"
import { SprintCard } from "@/components/sprint-card"
import { SprintForm } from "@/components/sprint-form"
import { EmptyState } from "@/components/empty-state"
import type { Sprint } from "@/types/sprint"
import { motion } from "framer-motion"
import { UserNav } from "@/components/user-nav"

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

export default function SprintsPage() {
  const { sprints, loading, error, fetchSprints, clearError } = useSprintStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  useEffect(() => {
    fetchSprints()
  }, [fetchSprints])

  // Filter and search logic
  const filteredSprints = sprints
    .filter((sprint) => {
      const matchesSearch =
        sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sprint.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || sprint.status === statusFilter
      const matchesPriority = priorityFilter === "all" || sprint.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "progress":
          return b.progress - a.progress
        case "startDate":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "priority":
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        default:
          return 0
      }
    })

  const handleRefresh = () => {
    clearError()
    fetchSprints()
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setSortBy("name")
  }

  const getStatusCount = (status: Sprint["status"]) => {
    return sprints.filter((sprint) => sprint.status === status).length
  }

  const getPriorityCount = (priority: Sprint["priority"]) => {
    return sprints.filter((sprint) => sprint.priority === priority).length
  }

  if (loading && sprints.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <div className="flex items-center space-x-2">
              <Link href="/" target="_blank"className="flex item-center">
              <Image src="/images/logo.png" height={35} width={35} alt="logo" className="object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </Link>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading sprints...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
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
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <Link href="/" target="_blank"className="flex item-center">
              <Image src="/images/logo.png" height={35} width={35} alt="logo" className="object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-3">           
            <SprintForm />
          </div>

        <div>
            <UserNav />
          </div>
         
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {sprints.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {/* Page Title and Stats */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold mb-2">Sprint Dashboard</h1>
                  <p className="text-gray-600">Manage and track your project sprints</p>
                </div>
                {/* <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Badge variant="secondary" className="text-sm">
                    {sprints.length} Total Sprints
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {sprints.filter((s) => s.status === "In Progress").length} Active
                  </Badge>
                </div> */}
               <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search sprints here..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                    <Filter className="w-4 h-4" />
                    
                  </Button>
                </div>
              </div>

          
              </div>

             
            </motion.div>

            {filteredSprints.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No sprints found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </motion.div>
            ) : (
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSprints.map((sprint, index) => (
                  <motion.div key={sprint.id} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                    <SprintCard sprint={sprint} />
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
