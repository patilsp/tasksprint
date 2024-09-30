"use client"
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, ChevronDown, DollarSign, FileText, Users, ArrowLeftIcon, CalendarIcon  } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SprintDetails = ({ params }) => {
  const { id } = params
  const router = useRouter()

  const [sprint, setSprint] = useState(null)
  // const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [progress, setProgress] = useState(0); 

  const fetchSprintDetails = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/tasksprint/${id}`);
      if (!response.ok) throw new Error('Failed to fetch sprint details');

      const data = await response.json();
      setSprint(data);

      // Calculate dynamic progress
      if (data.startDate && data.dueDate) {
        const startDate = new Date(data.startDate);
        const dueDate = new Date(data.dueDate);
        const now = new Date();

        const totalDuration = dueDate - startDate; // Total sprint duration
        const timePassed = now - startDate; // Time passed since sprint started
        const progressPercentage = Math.min((timePassed / totalDuration) * 100, 100); // Clamp to max 100%
        
        setProgress(progressPercentage);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  // const fetchTasks = async () => {
  //   try {
  //     const response = await fetch(`/api/tasks`)
  //     if (!response.ok) throw new Error('Failed to fetch tasks')
  //     const data = await response.json()
  //     setTasks(data)
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects`)
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    Promise.all([fetchSprintDetails(), fetchProjects()]).then(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  if (!sprint) return <div className="flex justify-center items-center h-screen">Sprint not found</div>


  const contributors = [
    { name: 'Emma Smith', avatar: '/avatars/01.png?height=40&width=40', tasksCompleted: 5 },
    { name: 'Melody Macy', avatar: '/avatars/02.png?height=40&width=40', tasksCompleted: 8 },
    { name: 'Max Smith', avatar: '/avatars/03.png?height=40&width=40', tasksCompleted: 3 },
    { name: 'Sean Bean', avatar: '/avatars/04.png?height=40&width=40', tasksCompleted: 3 },
    { name: 'Brian Cox', avatar: '/avatars/05.png?height=40&width=40', tasksCompleted: 4 },
  ];

  const tasks = [
    { name: 'Create Frostbite branding logo', dueDate: '2023-06-14', assignee: 'Emma Smith' },
    { name: 'Schedule a meeting with FireStee CTO John', dueDate: '2023-06-14', assignee: 'Melody Macy' },
    { name: '9 Degree Project Estimation', dueDate: '2023-06-14', assignee: 'Max Smith' },
    { name: 'Dashboard UI & UX for Leafr CRM', dueDate: '2023-06-14', assignee: 'Sean Bean' },
    { name: 'Mivy App R&D, Meeting with clients', dueDate: '2023-06-14', assignee: 'Brian Cox' },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.status === activeFilter)

  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 min-h-screen bg-background"
      >

      <div className="flex items-center justify-between mb-6">
        <motion.h1 
          initial={{ x: -20 }} 
          animate={{ x: 0 }} 
          className="text-3xl font-bold text-primary"
        >
          Sprint Details
        </motion.h1>
        <Link href="/tasksprint">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sprints</span>
          </Button>
        </Link>
      </div>

      <Card className="mb-8 overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 sm:w-24 sm:h-24">
              <AvatarImage src="/images/4.png" alt={sprint.name} />
              <AvatarFallback>{sprint.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">{sprint.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {sprint.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add User to Sprint</DialogTitle>
                  <DialogDescription>Enter the details of the new user to add to this sprint.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter user's name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter user's email" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Enter user's role" />
                  </div>
                  <Button type="submit">Add User</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Add Target</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Target to Sprint</DialogTitle>
                  <DialogDescription>Set a new target for this sprint.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="targetName">Target Name</Label>
                    <Input id="targetName" placeholder="Enter target name" />
                  </div>
                  <div>
                    <Label htmlFor="targetValue">Target Value</Label>
                    <Input id="targetValue" type="number" placeholder="Enter target value" />
                  </div>
                  <div>
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input id="targetDate" type="date" />
                  </div>
                  <Button type="submit">Add Target</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>{format(new Date(sprint.dueDate), 'dd MMM, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Badge>{sprint.status}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>$500 Budget Spent</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span>{projects.length} Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-500" />
                <span>{tasks.length} Tasks</span>
              </div>
            </div>
            <div className="flex -space-x-2">
              {contributors.map((contributor, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Sprint Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>
     

     
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>New Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{contributor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contributor.tasksCompleted} Tasks Completed
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{contributor.tasksCompleted}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{task.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Due on {format(new Date(task.dueDate), 'dd MMM')} • {task.assignee}
                        </p>
                      </div>
                      <Button variant="ghost" className="ml-auto">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="projects">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">My Projects</h3>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {activeFilter} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setActiveFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveFilter('In Progress')}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveFilter('Pending')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveFilter('Completed')}>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm">New Project</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(project.dueDate), 'MMM dd, yyyy')}</p>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Budget</p>
                    </div>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <Avatar key={i} className="w-8 h-8 border-2 border-background">
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle>{task.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</p>
                  <p>Assignee: {task.assignee}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </motion.div>
  )
}

export default SprintDetails