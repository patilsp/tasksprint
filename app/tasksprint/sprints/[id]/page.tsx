"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Plus, Grid3X3, UserPlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateProjectModal } from "../../components/create-project-modal"
import { TaskSprint } from "@/store/useTaskSprintStore"
import { toast } from "react-hot-toast"

export default function SprintDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const sprintId = params.id as string

  const [sprint, setSprint] = useState<TaskSprint | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const response = await fetch(`/api/tasksprint/${sprintId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch sprint')
        }
        const data = await response.json()
        setSprint(data)
      } catch (error) {
        console.error('Error fetching sprint:', error)
        toast.error('Failed to load sprint details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSprint()
  }, [sprintId])

  const handleCreateProject = async (projectData: any) => {
    setIsCreating(true)
    try {
      console.log('Sending project data:', projectData, 'for sprintId:', sprintId)
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectData,
          sprintId: sprintId
        }),
      })

      const data = await response.json()
      console.log('API Response for project creation:', response.status, data)

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project')
      }

      toast.success('Project created successfully')
      setCreateProjectOpen(false)
      // Refresh sprint data
      router.refresh()
    } catch (error) {
      console.error("Failed to create project:", error)
      toast.error('Failed to create project')
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-muted-foreground">Loading sprint details...</span>
        </div>
      </div>
    )
  }

  if (!sprint) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Sprint not found</h3>
          <p className="text-muted-foreground mt-1">The sprint you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => router.push('/tasksprint')}
            className="mt-4"
          >
            Back to Sprints
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{sprint.name}</h1>
            <p className="text-gray-600">{sprint.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite
            </Button>
            <Button
              onClick={() => setCreateProjectOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </motion.div>

        {/* Sprint Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Sprint Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{sprint.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium">{sprint.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{new Date(sprint.startDate).toLocaleDateString()}</p>
              </div>
              {sprint.dueDate && (
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{new Date(sprint.dueDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Tasks</p>
                <p className="font-medium">{sprint.tasks || 0} total</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="font-medium">{sprint.completedTasks || 0} tasks</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CreateProjectModal
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
        onSubmit={handleCreateProject}
        isLoading={isCreating}
      />
    </div>
  )
}
