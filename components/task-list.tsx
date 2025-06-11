"use client"

import { useEffect } from "react"
import { useTaskStore } from "@/store/task-store"
import { TaskCard } from "./task-card"
import { CheckSquare } from "lucide-react"
import { TaskForm } from "./task-form"

interface TasksListProps {
  projectId: string
  limit?: number
}

export function TasksList({ projectId, limit }: TasksListProps) {
  const { tasks, loading, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks(projectId)
  }, [projectId, fetchTasks])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const displayTasks = limit ? tasks.slice(0, limit) : tasks

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-4">No tasks in this project yet</p>
        <TaskForm projectId={projectId} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {limit && tasks.length > limit && (
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Showing {limit} of {tasks.length} tasks
          </p>
        </div>
      )}
    </div>
  )
}
