"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, CheckCircle, Edit, Trash2, DollarSign, Code, ArrowRight } from "lucide-react"
import type { Project } from "@/types/project"
import { ProjectForm } from "./project-form"
import { useProjectStore } from "@/store/useProjectStore"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { deleteProject } = useProjectStore()
  const router = useRouter()

  const getPriorityColor = (priority: Project["priority"]) => {
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

  const getStatusColor = (status: Project["status"]) => {
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
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(project.id)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleViewTasks = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/tasksprint/${project.sprintId}/project/${project.id}/tasks`)
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
              <Badge variant="secondary" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>
                {project.completedTasks}/{project.tasks} tasks
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{project.assignedMembers} members</span>
            </div>
          </div>

          {project.budget && project.budget > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>Budget: ${project.budget.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {project.startDate} - {project.endDate}
            </span>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Code className="w-4 h-4" />
                <span>Technologies:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewTasks}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              View Tasks
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="flex space-x-2">
              <div onClick={handleEditClick}>
                <ProjectForm
                  project={project}
                  mode="edit"
                  sprintId={project.sprintId}
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
