'use client'

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CalendarIcon, PencilLine, Trash, Users, FileText, MessageSquare, Plus } from "lucide-react";
import { updateTask, deleteTask } from '../actions';
import { Badge } from "@/components/ui/badge"

export default function KanbanCard({ task, onUpdate, onDelete, employees, projects }) {
  const [editedTask, setEditedTask] = useState(task);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const handleUpdate = async () => {
    const updatedTask = await updateTask(task._id, editedTask);
    onUpdate(updatedTask);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onDelete(task._id);
  };

  const EditDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <label htmlFor="title">Title</label>
          <Input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task Title"
          />
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
            <label htmlFor="status">Status</label>
            <Select
              value={editedTask.status}
              onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
            >
              <SelectTrigger>
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
            <label htmlFor="priority">Priority</label>
          <Select
            value={editedTask.priority}
            onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
          >
            <SelectTrigger>
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
           
          <div className="flex flex-col space-y-2">
            <label htmlFor="startDate">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!editedTask.startDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editedTask.startDate ? format(new Date(editedTask.startDate), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editedTask.startDate ? new Date(editedTask.startDate) : undefined}
                  onSelect={(date) => setEditedTask({ ...editedTask, startDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
            </div>
            <div className="space-y-2">
            <div className="flex flex-col space-y-2">
            <label htmlFor="dueDate">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!editedTask.dueDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editedTask.dueDate ? format(new Date(editedTask.dueDate), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editedTask.dueDate ? new Date(editedTask.dueDate) : undefined}
                  onSelect={(date) => setEditedTask({ ...editedTask, dueDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
            <label htmlFor="projectId">Project</label>
          <Select
            value={editedTask.projectId}
            onValueChange={(value) => setEditedTask({ ...editedTask, projectId: value })}
          >
            <SelectTrigger>
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
            <label htmlFor="assignedTo">Assigned To</label>
          <Select
            value={editedTask.assignedTo}
            onValueChange={(value) => setEditedTask({ ...editedTask, assignedTo: value })}
            multiple
          >
            <SelectTrigger>
              <SelectValue placeholder="Assign To" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee._id} value={employee._id}>{employee.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>

              <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                placeholder="Task Description"
              />

              </div>
        
         
         
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const UsersDialog = () => (
    <Dialog open={isUsersDialogOpen} onOpenChange={setIsUsersDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assigned Users</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {task.assignedTo && task.assignedTo.slice(0, 4).map((userId) => {
            const employee = employees.find(e => e._id === userId);
            return (
              <Avatar key={userId} className="cursor-pointer">
                <AvatarImage src={employee?.avatar} alt={employee?.name} />
                <AvatarFallback>{employee?.name?.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
            );
          })}
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const DocumentDialog = () => (
    <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Documents</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>No documents attached to this task.</p>
          <Button>Upload Document</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CommentDialog = () => (
    <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>No comments on this task.</p>
          <Textarea placeholder="Add a comment..." />
          <Button>Post Comment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div>    
            {task.title}
          </div>
          <div className="flex items-center justify-center gap-2" >
            <button onClick={() => setIsEditDialogOpen(true)}><PencilLine size={22} className="cursor-pointer text-white bg-green-400 hover:bg-green-500 p-1 rounded-md" /></button>
            <button variant="destructive" onClick={handleDelete}><Trash size={22} className="cursor-pointer text-white bg-red-400 hover:bg-red-500 p-1 rounded-md" /></button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: <Badge>{task.priority}</Badge></p>
        <p>Start Date: {task.startDate ? format(new Date(task.startDate), "PPP") : 'Not set'}</p>
        <p>Due Date: {task.dueDate ? format(new Date(task.dueDate), "PPP") : 'Not set'}</p>
        <p>Assigned To: {task.assignedTo}</p>
        <p>Project: {task.projectId ? projects.find(p => p._id === task.projectId)?.name : 'Not assigned'}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
         
          <div className="flex items-center justify-between gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsUsersDialogOpen(true)}>
              <Users className="h-4 w-4" />
              
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsDocumentDialogOpen(true)}>
              <FileText className="h-4 w-4" />
              
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsCommentDialogOpen(true)}>
              <MessageSquare className="h-4 w-4" />
              
            </Button>
          </div>
        </div>
      </CardFooter>
      <EditDialog />
      <UsersDialog />
      <DocumentDialog />
      <CommentDialog />
    </Card>
  );
}