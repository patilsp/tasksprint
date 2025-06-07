"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  DollarSign,
  FileText,
  Users,
  CalendarIcon,
  Plus,
  Edit3,
  Save,
  X,
  Target,
  CheckCircle2,
  TrendingUp,
  Activity,
  MoreHorizontal,
  Loader2,
} from "lucide-react"

// Mock data for statistics
const sprintStats = {
  totalSprints: 0,
  activeSprints: 0,
  completedSprints: 0,
  planningSprints: 0,
  totalTasks: 0,
  completedTasks: 0,
  teamVelocity: 0,
  burndownEfficiency: 0,
}

// Mock data - replace with your actual data
const mockSprint = {
  id: "1",
  name: "Q1 Feature Development Sprint",
  description:
    "Developing core features for the Q1 release including user authentication, dashboard improvements, and mobile optimization.",
  status: "In Progress",
  priority: "High",
  startDate: "2024-01-01",
  dueDate: "2024-01-31",
  budget: 15000,
  budgetSpent: 8500,
}

const SprintDetails = ({ params = { id: "1" } }) => {
  const { id } = params
  const router = useRouter()

  const [sprint, setSprint] = useState(mockSprint)
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [progress, setProgress] = useState(65)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  // Form states for different tabs
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    budget: "",
    dueDate: "",
    status: "Planning",
    priority: "Medium",
  })

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do",
  })

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  })

  const contributors = [
    {
      id: 1,
      name: "Emma Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 12,
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Melody Macy",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 18,
      role: "Backend Developer",
    },
    {
      id: 3,
      name: "Max Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 8,
      role: "UI/UX Designer",
    },
    {
      id: 4,
      name: "Sean Bean",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 15,
      role: "DevOps Engineer",
    },
    {
      id: 5,
      name: "Brian Cox",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 10,
      role: "Product Manager",
    },
  ]

  const mockTasks = [
    {
      id: 1,
      title: "User Authentication System",
      description: "Implement OAuth and JWT authentication",
      dueDate: "2024-01-15",
      assignee: "Emma Smith",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      name: "Dashboard UI Redesign",
      description: "Create modern dashboard interface",
      dueDate: "2024-01-20",
      assignee: "Max Smith",
      status: "To Do",
      priority: "Medium",
    },
    {
      id: 3,
      name: "API Performance Optimization",
      description: "Optimize database queries and API responses",
      dueDate: "2024-01-25",
      assignee: "Melody Macy",
      status: "Done",
      priority: "High",
    },
    {
      id: 4,
      name: "Mobile App Testing",
      description: "Comprehensive testing on iOS and Android",
      dueDate: "2024-01-30",
      assignee: "Sean Bean",
      status: "In Progress",
      priority: "Medium",
    },
  ]

  const mockProjects = [
    {
      id: 1,
      name: "User Management System",
      description: "Complete user management with roles and permissions",
      budget: 5000,
      progress: 75,
      status: "In Progress",
      dueDate: "2024-01-20",
      team: [{ name: "Emma" }, { name: "Max" }],
    },
    {
      id: 2,
      name: "Payment Integration",
      description: "Stripe and PayPal payment gateway integration",
      budget: 3000,
      progress: 45,
      status: "In Progress",
      dueDate: "2024-01-25",
      team: [{ name: "Melody" }, { name: "Brian" }],
    },
    {
      id: 3,
      name: "Mobile App",
      description: "React Native mobile application",
      budget: 7000,
      progress: 30,
      status: "Planning",
      dueDate: "2024-02-15",
      team: [{ name: "Sean" }, { name: "Emma" }],
    },
  ]

  useEffect(() => {
    setTasks(mockTasks)
    setProjects(mockProjects)
    setEditForm(sprint)
  }, [])

  const handleSaveSprintDetails = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSprint(editForm)
      setIsEditing(false)
      toast.success("Sprint details updated successfully!")
    } catch (error) {
      toast.error("Failed to update sprint details")
    } finally {
      setSaving(false)
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const project = {
        id: Date.now(),
        ...newProject,
        budget: Number.parseInt(newProject.budget),
        progress: 0,
        team: [{ name: "You" }],
      }
      setProjects([...projects, project])
      setNewProject({ name: "", description: "", budget: "", dueDate: "", status: "Planning", priority: "Medium" })
      toast.success("Project added successfully!")
    } catch (error) {
      toast.error("Failed to add project")
    } finally {
      setSaving(false)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const task = {
        id: Date.now(),
        ...newTask,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", assignee: "", dueDate: "", priority: "Medium", status: "To Do" })
      toast.success("Task added successfully!")
    } catch (error) {
      toast.error("Failed to add task")
    } finally {
      setSaving(false)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = {
        id: Date.now(),
        ...newUser,
        avatar: "/placeholder.svg?height=40&width=40",
        tasksCompleted: 0,
      }
      // Add to contributors list (in real app, this would be handled by the API)
      setNewUser({ name: "", email: "", role: "" })
      toast.success("User added successfully!")
    } catch (error) {
      toast.error("Failed to add user")
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-amber-100 text-amber-800"
      case "Done":
      case "Completed":
        return "bg-green-100 text-green-800"
      case "To Do":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/tasksprint" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 truncate">{sprint.name}</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <motion.div
        className="container mx-auto p-4 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Desktop Header */}
        <motion.div className="hidden lg:flex items-center justify-between mb-8" variants={itemVariants}>
          <div className="flex items-center space-x-4">
            <Link href="/tasksprint">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Sprints</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Sprint Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Sprint"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export Sprint Report</DropdownMenuItem>
                <DropdownMenuItem>Duplicate Sprint</DropdownMenuItem>
                <DropdownMenuItem>Archive Sprint</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Sprint</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Sprint Overview Card */}
        <motion.div variants={itemVariants}>
          <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={sprint.name} />
                    <AvatarFallback className="text-2xl font-bold bg-white/20">{sprint.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="text-2xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/70"
                          placeholder="Sprint name"
                        />
                        <Textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                          placeholder="Sprint description"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <CardTitle className="text-2xl lg:text-3xl font-bold">{sprint.name}</CardTitle>
                        <p className="text-white/90 mt-2 max-w-2xl">{sprint.description}</p>
                      </>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button variant="secondary" onClick={() => setIsEditing(false)} disabled={saving}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button variant="secondary" onClick={handleSaveSprintDetails} disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">
                        {format(new Date(sprint.startDate), "MMM dd")} -{" "}
                        {format(new Date(sprint.dueDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <Badge className={getStatusColor(sprint.status)}>{sprint.status}</Badge>
                    <Badge className={getPriorityColor(sprint.priority)}>{sprint.priority}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">${sprint.budgetSpent.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">of ${sprint.budget.toLocaleString()} spent</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{contributors.length} Members</p>
                        <p className="text-xs text-gray-500">{projects.length} Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sprint Progress</span>
                    <span className="text-sm font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex -space-x-2">
                    {contributors.slice(0, 5).map((contributor, index) => (
                      <Avatar key={index} className="border-2 border-white w-8 h-8">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                        <AvatarFallback className="text-xs">{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {contributors.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                        +{contributors.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
              <TabsTrigger value="overview" className="flex items-center space-x-2 py-3">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2 py-3">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center space-x-2 py-3">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center space-x-2 py-3">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2 py-3">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span>Sprint Metrics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {tasks.filter((t) => t.status === "Done").length}
                            </div>
                            <div className="text-sm text-gray-600">Completed Tasks</div>
                          </div>
                          <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <div className="text-2xl font-bold text-amber-600">
                              {tasks.filter((t) => t.status === "In Progress").length}
                            </div>
                            <div className="text-sm text-gray-600">In Progress</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{Math.round(progress)}%</div>
                            <div className="text-sm text-gray-600">Sprint Progress</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{contributors.length}</div>
                            <div className="text-sm text-gray-600">Team Members</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-green-600" />
                          <span>Top Contributors</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {contributors.slice(0, 4).map((contributor, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{contributor.name}</p>
                                  <p className="text-sm text-gray-500">{contributor.role}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{contributor.tasksCompleted}</p>
                                <p className="text-xs text-gray-500">tasks</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span>Add New Project</span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddProject} className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="projectName">Project Name</Label>
                            <Input
                              id="projectName"
                              value={newProject.name}
                              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                              placeholder="Enter project name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="projectBudget">Budget ($)</Label>
                            <Input
                              id="projectBudget"
                              type="number"
                              value={newProject.budget}
                              onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                              placeholder="Enter budget"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectDescription">Description</Label>
                          <Textarea
                            id="projectDescription"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Enter project description"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="projectDueDate">Due Date</Label>
                            <Input
                              id="projectDueDate"
                              type="date"
                              value={newProject.dueDate}
                              onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="projectStatus">Status</Label>
                            <Select
                              value={newProject.status}
                              onValueChange={(value) => setNewProject({ ...newProject, status: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Planning">Planning</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="projectPriority">Priority</Label>
                            <Select
                              value={newProject.priority}
                              onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                          {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4 mr-2" />
                          )}
                          Add Project
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{project.name}</CardTitle>
                              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{project.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                                  <p className="text-xs text-gray-500">Budget</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{format(new Date(project.dueDate), "MMM dd")}</p>
                                  <p className="text-xs text-gray-500">Due date</p>
                                </div>
                              </div>
                              <div className="flex -space-x-2">
                                {project.team.map((member, i) => (
                                  <Avatar key={i} className="w-8 h-8 border-2 border-white">
                                    <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Add New Task</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddTask} className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="taskTitle">Task Title</Label>
                            <Input
                              id="taskTitle"
                              value={newTask.title}
                              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                              placeholder="Enter task title"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taskAssignee">Assignee</Label>
                            <Select
                              value={newTask.assignee}
                              onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select assignee" />
                              </SelectTrigger>
                              <SelectContent>
                                {contributors.map((contributor) => (
                                  <SelectItem key={contributor.id} value={contributor.name}>
                                    {contributor.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskDescription">Description</Label>
                          <Textarea
                            id="taskDescription"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            placeholder="Enter task description"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="taskDueDate">Due Date</Label>
                            <Input
                              id="taskDueDate"
                              type="date"
                              value={newTask.dueDate}
                              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taskStatus">Status</Label>
                            <Select
                              value={newTask.status}
                              onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="To Do">To Do</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Done">Done</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taskPriority">Priority</Label>
                            <Select
                              value={newTask.priority}
                              onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                          {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4 mr-2" />
                          )}
                          Add Task
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-semibold">{task.title}</h3>
                                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    Due {format(new Date(task.dueDate), "MMM dd")}
                                  </span>
                                  <span className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {task.assignee}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <span>Add Team Member</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="userName">Name</Label>
                            <Input
                              id="userName"
                              value={newUser.name}
                              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                              placeholder="Enter user's name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userEmail">Email</Label>
                            <Input
                              id="userEmail"
                              type="email"
                              value={newUser.email}
                              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                              placeholder="Enter user's email"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userRole">Role</Label>
                            <Input
                              id="userRole"
                              value={newUser.role}
                              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                              placeholder="Enter user's role"
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                          {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4 mr-2" />
                          )}
                          Add Team Member
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {contributors.map((contributor) => (
                      <motion.div
                        key={contributor.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                                <AvatarFallback className="text-lg">{contributor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{contributor.name}</h3>
                                <p className="text-gray-600">{contributor.role}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">{contributor.tasksCompleted}</p>
                                    <p className="text-xs text-gray-500">Tasks Completed</p>
                                  </div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Assign Task</DropdownMenuItem>
                                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Remove from Sprint</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-orange-600" />
                        <span>Recent Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          {
                            action: "Task completed",
                            user: "Emma Smith",
                            task: "User Authentication System",
                            time: "2 hours ago",
                            type: "completed",
                          },
                          {
                            action: "New task created",
                            user: "Max Smith",
                            task: "Dashboard UI Redesign",
                            time: "4 hours ago",
                            type: "created",
                          },
                          {
                            action: "Project updated",
                            user: "Melody Macy",
                            task: "Payment Integration",
                            time: "6 hours ago",
                            type: "updated",
                          },
                          {
                            action: "User added to sprint",
                            user: "Sean Bean",
                            task: "",
                            time: "1 day ago",
                            type: "user",
                          },
                          { action: "Sprint started", user: "Brian Cox", task: "", time: "3 days ago", type: "sprint" },
                        ].map((activity, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                activity.type === "completed"
                                  ? "bg-green-100"
                                  : activity.type === "created"
                                    ? "bg-blue-100"
                                    : activity.type === "updated"
                                      ? "bg-yellow-100"
                                      : activity.type === "user"
                                        ? "bg-purple-100"
                                        : "bg-gray-100"
                              }`}
                            >
                              {activity.type === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                              {activity.type === "created" && <Plus className="h-5 w-5 text-blue-600" />}
                              {activity.type === "updated" && <Edit3 className="h-5 w-5 text-yellow-600" />}
                              {activity.type === "user" && <Users className="h-5 w-5 text-purple-600" />}
                              {activity.type === "sprint" && <Target className="h-5 w-5 text-gray-600" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">
                                <span className="text-blue-600">{activity.user}</span> {activity.action}
                                {activity.task && <span className="font-semibold"> "{activity.task}"</span>}
                              </p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SprintDetails
