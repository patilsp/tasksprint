import { motion } from "framer-motion"
import { Calendar, Clock, Users, AlertTriangle, Tag, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  project: {
    name: string
    description?: string
    startDate?: string
    dueDate?: string
    status: "Not Started" | "In Progress" | "Completed"
    priority: "High" | "Medium" | "Low"
    assignedTo?: string[]
    budget?: number
    tags?: string[]
    progress?: number
  }
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          {project.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
          )}
        </div>
        <Badge className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(project.status))}>
          {project.status}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {project.startDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(project.startDate), "MMM dd, yyyy")}</span>
            </div>
          )}
          {project.dueDate && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(project.dueDate), "MMM dd, yyyy")}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {project.assignedTo && project.assignedTo.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{project.assignedTo.length} members</span>
            </div>
          )}
          {project.budget && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>${project.budget.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Badge className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getPriorityColor(project.priority))}>
            <AlertTriangle className="h-3 w-3 mr-1" />
            {project.priority} Priority
          </Badge>
          {project.tags && project.tags.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Tag className="h-4 w-4" />
              <span>{project.tags.join(", ")}</span>
            </div>
          )}
        </div>

        {project.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}
      </div>
    </motion.div>
  )
} 