"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, FolderPlus, AlertTriangle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useProjectStore, Project } from "@/store/useProjectStore"
import { toast } from "react-hot-toast"

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Project) => void
  isLoading: boolean
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export function CreateProjectModal({ open, onOpenChange, onSubmit, isLoading }: CreateProjectModalProps) {
  const { project, setProject, resetProject, validateProject } = useProjectStore()
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
          toast.error("Failed to load users for assignment.");
        } finally {
          setLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateProject()
    if (validationErrors) {
      validationErrors.errors.forEach(err => toast.error(err.message))
      return
    }
    onSubmit(project)
  }

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false)
      resetProject()
    }
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setProject({ tags: tagsArray });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FolderPlus className="h-5 w-5 text-blue-600" />
                  Create Project
                </DialogTitle>
                <DialogDescription>
                  Make a new project to start tracking progress.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Project Title *</Label>
                  <Input
                    id="name"
                    placeholder="Test Project"
                    value={project.name}
                    onChange={(e) => setProject({ name: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Testing"
                    value={project.description || ""}
                    onChange={(e) => setProject({ description: e.target.value })}
                    rows={3}
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label>Status</Label>
                  <Select
                    value={project.status}
                    onValueChange={(value: "Not Started" | "In Progress" | "Completed") => setProject({ status: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Planning" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !project.startDate && "text-muted-foreground"
                          )}
                          disabled={isLoading}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {project.startDate ? format(new Date(project.startDate), "MMM dd, yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={project.startDate ? new Date(project.startDate) : undefined}
                          onSelect={(date) => setProject({ startDate: date?.toISOString() })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !project.dueDate && "text-muted-foreground"
                          )}
                          disabled={isLoading}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {project.dueDate ? format(new Date(project.dueDate), "MMM dd, yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={project.dueDate ? new Date(project.dueDate) : undefined}
                          onSelect={(date) => setProject({ dueDate: date?.toISOString() })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="coding, web dev, backend"
                    value={project.tags?.join(', ') || ''}
                    onChange={handleTagsChange}
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="members">Members</Label>
                  <Select
                    value={project.assignedTo?.[0] || ""} 
                    onValueChange={(value) => setProject({ assignedTo: [value] })}
                    disabled={isLoading || loadingUsers}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select members" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingUsers ? (
                        <SelectItem value="" disabled>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading users...
                        </SelectItem>
                      ) : users.length > 0 ? (
                        users.map(user => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>No users found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0"
                    value={project.budget || 0}
                    onChange={(e) => setProject({ budget: parseFloat(e.target.value) || 0 })}
                    min="0"
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-end gap-3 pt-4 border-t"
                >
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !project.name || !project.startDate || !project.priority}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Project...
                      </>
                    ) : (
                      <>
                        <FolderPlus className="mr-2 h-4 w-4" />
                        Create Project
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
