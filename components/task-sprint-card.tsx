"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, Users, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Sprint } from "@/types/sprint"

interface TaskSprintCardProps {
  sprint: Sprint
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export function TaskSprintCard({ sprint }: TaskSprintCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/tasksprint/${sprint._id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLANNING":
        return "bg-blue-100 text-blue-800"
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "COMPLETED":
        return "bg-purple-100 text-purple-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div variants={fadeInUp}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={handleClick}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">{sprint.name}</CardTitle>
            <Badge className={getStatusColor(sprint.status)}>
              {sprint.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 line-clamp-2">{sprint.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(sprint.startDate).toLocaleDateString()} -{" "}
                  {new Date(sprint.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{sprint.teamMembers} members</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{sprint.progress}%</span>
              </div>
              <Progress value={sprint.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(sprint.priority)}>
                  {sprint.priority}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {sprint.completedTasks} of {sprint.tasks} tasks
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 