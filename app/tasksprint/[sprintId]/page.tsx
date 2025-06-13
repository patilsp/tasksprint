"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  Edit,
  Trash2,
  Zap,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  FolderOpen,
  ArrowRight,
  Settings,
} from "lucide-react"
import { useSprintStore } from "@/store/useSprintStore"
import { SprintForm } from "@/components/sprint-form"
import { motion } from "framer-motion"
import type { Sprint } from "@/types/sprint"
import { ProjectForm } from "@/components/project-form"
import { ProjectsList } from "@/components/project-list"
import InviteUserDialog from "@/components/InviteUserDialog"


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function SprintDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { currentSprint, loading, error, fetchSprint, deleteSprint, clearCurrentSprint } = useSprintStore()

  const sprintId = params.sprintId as string

  useEffect(() => {
    if (!sprintId) {
      router.push("/tasksprint")
      return
    }

    fetchSprint(sprintId)

    return () => {
      clearCurrentSprint()
    }
  }, [sprintId, fetchSprint, clearCurrentSprint, router])

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this sprint?")) {
      await deleteSprint(sprintId)
      router.push("/tasksprint")
    }
  }

  const handleBack = () => {
    router.push("/tasksprint")
  }

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

  const getStatusIcon = (status: Sprint["status"]) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "In Progress":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "On Hold":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "Not Started":
        return <Clock className="w-5 h-5 text-gray-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading sprint details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentSprint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <div className="text-red-600 mb-4">{error || "Sprint not found"}</div>
            <Button onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sprints
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const daysRemaining = calculateDaysRemaining(currentSprint.endDate)

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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
            <Link href="/" target="_blank"className="flex item-center">
              <Image src="/images/logo.png" height={35} width={35} alt="logo" className="object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </Link>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sprints
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <SprintForm
              sprint={currentSprint}
              mode="edit"
              trigger={
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Sprint
                </Button>
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Sprint Header */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-xl font-bold mb-2">{currentSprint.name}</h1>
                <p className="text-gray-600 text-lg">{currentSprint.description}</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <Badge className={getPriorityColor(currentSprint.priority)}>{currentSprint.priority} Priority</Badge>
                <Badge variant="secondary" className={getStatusColor(currentSprint.status)}>
                  {getStatusIcon(currentSprint.status)}
                  <span className="ml-2">{currentSprint.status}</span>
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Sprint Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{currentSprint.progress}%</span>
                    <span className="text-sm text-gray-600">
                      {currentSprint.completedTasks} of {currentSprint.tasks} tasks completed
                    </span>
                  </div>
                  <Progress value={currentSprint.progress} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 mt-2">
                  <motion.div variants={fadeInUp}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-semibold">
                              {new Date(currentSprint.startDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })} - {new Date(currentSprint.endDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Team Size</p>
                            <p className="font-semibold">{currentSprint.teamMembers} members</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${daysRemaining > 0 ? "bg-orange-100" : "bg-red-100"}`}>
                            <Clock className={`w-6 h-6 ${daysRemaining > 0 ? "text-orange-600" : "text-red-600"}`} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Time Remaining</p>
                            <p className="font-semibold">{daysRemaining > 0 ? `${daysRemaining} days` : "Overdue"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Task Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">{currentSprint.completedTasks}</div>
                    <div className="text-sm text-gray-600">Completed Tasks</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {(currentSprint.tasks || 0) - (currentSprint.completedTasks || 0)}
                    </div>
                    <div className="text-sm text-gray-600">Remaining Tasks</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{currentSprint.tasks}</div>
                    <div className="text-sm text-gray-600">Total Tasks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={fadeInUp} className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FolderOpen className="w-5 h-5 mr-2 text-purple-600" />
                    Projects in this Sprint
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <InviteUserDialog sprintId={sprintId} />
                    <ProjectForm sprintId={sprintId} />
                    <Link href={`/tasksprint/${sprintId}/settings`}>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ProjectsList sprintId={sprintId} limit={3} />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
