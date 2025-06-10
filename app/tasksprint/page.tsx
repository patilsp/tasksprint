"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Users, Calendar, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkspaceCard } from "@/components/workspace-card"

const workspaces = [
  {
    id: "123",
    title: "Design System",
    description: "Building a comprehensive design system for our products",
    members: 8,
    projects: 12,
    lastActivity: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    id: "456",
    title: "Mobile App",
    description: "Cross-platform mobile application development",
    members: 6,
    projects: 8,
    lastActivity: "1 day ago",
    color: "bg-green-500",
  },
]

const stats = [
  {
    title: "Total Workspaces",
    value: "2",
    icon: FolderOpen,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Team Members",
    value: "14",
    icon: Users,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Active Projects",
    value: "20",
    icon: Calendar,
    color: "text-purple-600 dark:text-purple-400",
  },
]

export default function TaskSprintPage() {
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)

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
        <Button onClick={() => setCreateWorkspaceOpen(true)} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Create Workspace
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="bg-card rounded-lg border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Workspaces Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {workspaces.map((workspace, index) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} index={index} />
        ))}
      </motion.div>

    </div>
  )
}
