"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, CheckCircle, Edit, Trash2, ArrowRight } from "lucide-react"
import type { Sprint } from "@/types/sprint"
import { SprintForm } from "./sprint-form"
import { useSprintStore } from "@/store/useSprintStore"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface SprintCardProps {
  sprint: Sprint
}

export function SprintCard({ sprint }: SprintCardProps) {
  const { deleteSprint } = useSprintStore()
  const router = useRouter()

  const getPriorityColor = (priority: Sprint["priority"]) => {
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

  const getStatusColor = (status: Sprint["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (confirm("Are you sure you want to delete this sprint?")) {
      await deleteSprint(sprint.id)
    }
  }

  const handleCardClick = () => {
    router.push(`/tasksprint/${sprint.id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleCardClick}>
        <CardHeader className="pb-3">
          <div className="flex-col md:flex-row flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors truncate max-w-[220px]">{sprint.name}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2 truncate max-w-[500px]">{sprint.description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-0 md:ml-4 py-2 md:py-0">
              <Badge className={getPriorityColor(sprint.priority)}>{sprint.priority}</Badge>
             
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{sprint.progress}%</span>
            </div>
            <Progress value={sprint.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 flex-row gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>
                {sprint.completedTasks || 0}/{sprint.tasks || 0} tasks
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>
                {sprint.projects || 0} Projects
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{sprint.teamMembers || 0} members</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span> {new Date(sprint.endDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
          <div>
          <Badge variant="secondary" className={getStatusColor(sprint.status)}>
                {sprint.status}
              </Badge>

          </div>
          </div>

          {/* <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCardClick}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="flex space-x-2">
              <div onClick={handleEditClick}>
                <SprintForm
                  sprint={sprint}
                  mode="edit"
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
          </div> */}
        </CardContent>
      </Card>
    </motion.div>
  )
}
