'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import KanbanColumn from './components/KanbanColumn';
import TaskList from './task-list';
import TaskCalendar from './TaskCalendar';
import ActivityFeed from './ActivityFeed';
import { getTasks, createTask, updateTask, deleteTask, getEmployees, getProjects } from './actions';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    startDate: new Date(),
    dueDate: null,
    assignedTo: [],
    project: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await getEmployees();
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        startDate: new Date(),
        dueDate: null,
        assignedTo: [],
        project: null,
      });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Task created successfully.",
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const result = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map(task => task._id === result._id ? result : task));
      toast({
        title: "Success",
        description: "Task updated successfully.",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast({
        title: "Success",
        description: "Task deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
            <DialogHeader className="border-b pb-4">
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="startDate"
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!newTask.startDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.startDate ? format(newTask.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTask.startDate}
                        onSelect={(date) => setNewTask({ ...newTask, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dueDate"
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!newTask.dueDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.dueDate ? format(newTask.dueDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTask.dueDate}
                        onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">Project</label>
                <Select
                  value={newTask.project ? newTask.project._id : ""}
                  onValueChange={(value) => setNewTask({ ...newTask, project: projects.find(p => p._id === value) })}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project._id} value={project._id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="assignedTo" className="text-sm font-medium">Assign To</label>
                <Select
                  value={newTask.assignedTo.map(e => e._id).join(',')}
                  onValueChange={(value) => {
                    const selectedIds = value.split(',');
                    const selectedEmployees = employees.filter(e => selectedIds.includes(e._id));
                    setNewTask({ ...newTask, assignedTo: selectedEmployees });
                  }}
                >
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Assign To" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  placeholder="Task Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full max-w-[150px]">
                    Cancel
                </Button>
                <Button type="submit" className="w-full max-w-[150px]" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Task'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="board" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="board" className="mt-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <KanbanColumn
              title="To Do"
              tasks={tasks.filter(task => task.status === 'todo')}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              employees={employees}
              projects={projects}
            />
            <KanbanColumn
              title="In Progress"
              tasks={tasks.filter(task => task.status === 'inProgress')}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              employees={employees}
              projects={projects}
            />
            <KanbanColumn
              title="Done"
              tasks={tasks.filter(task => task.status === 'done')}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              employees={employees}
              projects={projects}
            />
          </div>
        </TabsContent>
        <TabsContent value="table" className="mt-4">
          <TaskList />
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <TaskCalendar tasks={tasks} />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <ActivityFeed tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}