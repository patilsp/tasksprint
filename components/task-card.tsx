"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, Edit, Trash2, Timer, Eye } from "lucide-react"
import type { Task } from "@/types/task"
import { TaskForm } from "./task-form"
import { useTaskStore } from "@/store/task-store"
import { motion } from "framer-motion"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask } = useTaskStore()

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "In Review":
        return "bg-purple-100 text-purple-800"
      case "Todo":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString()
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date() && task.status !== "Completed"
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
              {task.description && <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <Badge variant="secondary" className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {task.assignedTo && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span className={isOverdue(task.dueDate) ? "text-red-600 font-medium" : "text-gray-600"}>
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate) && " (Overdue)"}
              </span>
            </div>
          )}

          {(task.estimatedHours || task.actualHours) && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {task.estimatedHours && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Est: {task.estimatedHours}h</span>
                </div>
              )}
              {task.actualHours && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>Actual: {task.actualHours}h</span>
                </div>
              )}
            </div>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{task.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <Link href={`/tasksprint/${task.workspaceId}/project/${task.projectId}/tasks/${task.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </Link>
            <div onClick={handleEditClick}>
              <TaskForm
                task={task}
                mode="edit"
                projectId={task.projectId}
                trigger={
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                }
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
