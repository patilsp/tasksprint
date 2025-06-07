"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import dayjs from 'dayjs';

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserStore } from '@/store/useUserStore'
import { AttendanceDialog } from '@/components/AttendanceDialog'


const recentTasks = [
  {
    id: "TSK-001",
    title: "Implement user authentication",
    description: "Add OAuth integration and secure login flow",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    dueDate: "2024-01-15",
    project: "TaskSprint Core",
  },
  {
    id: "TSK-002",
    title: "Fix responsive layout issues",
    description: "Mobile view needs optimization for better UX",
    status: "To Do",
    priority: "Medium",
    assignee: "Jane Smith",
    dueDate: "2024-01-18",
    project: "UI/UX Improvements",
  },
  {
    id: "TSK-003",
    title: "Database optimization",
    description: "Improve query performance and indexing",
    status: "Done",
    priority: "High",
    assignee: "Mike Johnson",
    dueDate: "2024-01-12",
    project: "Backend",
  },
]

const activities = [
  {
    id: 1,
    type: "task_created",
    user: "John Doe",
    action: "created task",
    target: "TSK-004: API Documentation",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    type: "task_completed",
    user: "Jane Smith",
    action: "completed task",
    target: "TSK-003: Database optimization",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    type: "comment",
    user: "Mike Johnson",
    action: "commented on",
    target: "TSK-001: User authentication",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    type: "task_assigned",
    user: "Sarah Wilson",
    action: "assigned task",
    target: "TSK-005: Mobile app testing",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const projects = [
  {
    name: "TaskSprint Core",
    tasks: { total: 24, completed: 18, inProgress: 4, todo: 2 },
    progress: 75,
    color: "bg-blue-500",
  },
  {
    name: "UI/UX Improvements",
    tasks: { total: 12, completed: 8, inProgress: 3, todo: 1 },
    progress: 67,
    color: "bg-green-500",
  },
  {
    name: "Backend Services",
    tasks: { total: 18, completed: 12, inProgress: 4, todo: 2 },
    progress: 67,
    color: "bg-purple-500",
  },
]

export default function TaskSprintDashboard() {

  const router = useRouter()
 const { user, fetchUser, logout } = useUserStore()

  
  const [currentDateTime, setCurrentDateTime] = useState(dayjs().format('D MMM, YYYY h:mm A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs().format('D MMM, YYYY h:mm A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    fetchUser()
  }, [fetchUser])




  const userId = user?._id;
  const userName = user?.name || 'Guest';
  const userEmail = user?.email || 'Guest';
  const userRole = user?.role || 'Guest';
  const userImage = user?.image || '/avatar.png';

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "done":
        return "bg-green-100 text-green-800 border-green-200"
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "to do":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_created":
        return <Plus className="h-4 w-4 text-blue-600" />
      case "task_completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      case "task_assigned":
        return <Users className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen">
     

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                      <p className="text-3xl font-bold text-gray-900">54</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +12% from last week
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-gray-900">38</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        70% completion rate
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold text-gray-900">11</p>
                      <p className="text-sm text-blue-600 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        Active sprints
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overdue</p>
                      <p className="text-3xl font-bold text-gray-900">5</p>
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Needs attention
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Get started with common tasks and workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/tasks/new">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-blue-300">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Plus className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Create Task</h3>
                          <p className="text-sm text-gray-600">Add a new task to your project</p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link href="/projects/new">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-green-300">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">New Project</h3>
                          <p className="text-sm text-gray-600">Start a new project sprint</p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link href="/reports">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-purple-300">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
                          <p className="text-sm text-gray-600">Analyze team performance</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projects Overview */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Active Projects</CardTitle>
                    <CardDescription>Track progress across your projects</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${project.color}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900">{project.name}</h4>
                            <p className="text-sm text-gray-600">
                              {project.tasks.completed}/{project.tasks.total} tasks completed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {project.tasks.inProgress} in progress
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.tasks.todo} to do
                            </Badge>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${project.color}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12">{project.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>Your latest task updates and assignments</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-mono text-gray-500">{task.id}</span>
                            <Badge className={`text-xs ${getStatusColor(task.status)}`}>{task.status}</Badge>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {task.assignee}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {task.dueDate}
                            </span>
                            <span className="flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {task.project}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <Link href="/tasks">View All Tasks</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Right Sidebar - Activity Feed */}
        <aside className="hidden lg:block w-80 bg-white border-l border-gray-200 p-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {/* <span className="font-medium">{activity.user}</span>{" "} */}
                      <span className="text-gray-600">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Notifications */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Bell className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Sprint Review Meeting</p>
                    <p className="text-xs text-blue-700">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">5 tasks overdue</p>
                    <p className="text-xs text-yellow-700">Requires immediate attention</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Sprint completed</p>
                    <p className="text-xs text-green-700">Great job on the milestone!</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              View All Notifications
            </Button>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}
