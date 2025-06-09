"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Target, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { TaskSprint } from "@/store/useTaskSprintStore"

interface TaskSprintCardProps {
  sprint: TaskSprint
}

const statusColors = {
  Planning: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-amber-100 text-amber-800 border-amber-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
}

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-gray-100 text-gray-800 border-gray-200",
}

export function TaskSprintCard({ sprint }: TaskSprintCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Planning":
        return <Target className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <Link href={`/tasksprint/sprints/${sprint._id}`}>
      <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{sprint.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={statusColors[sprint.status as keyof typeof statusColors]}>
                    {getStatusIcon(sprint.status)}
                    <span className="ml-1">{sprint.status}</span>
                  </Badge>
                  <Badge variant="outline" className={priorityColors[sprint.priority as keyof typeof priorityColors]}>
                    {sprint.priority}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Sprint</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete Sprint</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm line-clamp-2">{sprint.description}</p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{sprint.progress || 0}%</span>
              </div>
              <Progress value={sprint.progress || 0} className="h-2" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {sprint.completedTasks || 0}/{sprint.tasks || 0} tasks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{sprint.teamMembers || 0} members</span>
              </div>
            </div>

            {/* Dates */}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDate(sprint.startDate)} - {sprint.dueDate ? formatDate(sprint.dueDate) : 'No due date'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
