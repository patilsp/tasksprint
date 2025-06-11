"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, FolderPlus, AlertTriangle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
  isOpen: boolean
  onClose: () => void
  sprintId: string
}

export function CreateProjectModal({ isOpen, onClose, sprintId }: CreateProjectModalProps) {
  const { project, setProject, createProject, isLoading, error: storeError } = useProjectStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Reset project state and form error when modal opens with a new sprintId or just opens
  useEffect(() => {
    if (isOpen) {
      setProject({ sprintId: sprintId, name: '', description: '', startDate: undefined, dueDate: undefined, status: 'Not Started', assignedTo: [], budget: 0, priority: 'Medium', tags: [], tasks: 0, progress: 0 }); // Ensure sprintId is set on open and other fields are reset
      setFormError(null); // Clear any previous form errors
    }
  }, [isOpen, sprintId, setProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsSubmitting(true)

    try {
      // Validate required fields before submission
      if (!project.name) {
        setFormError("Project Name is required.");
        return;
      }
      if (!project.sprintId) {
        setFormError("Workspace ID is required.");
        return;
      }
      if (!project.priority) {
        setFormError("Priority is required.");
        return;
      }

      // Convert Date objects to ISO strings if they exist for API submission
      const projectDataToSend = {
        ...project,
        startDate: project.startDate ? project.startDate.toISOString() : undefined,
        dueDate: project.dueDate ? project.dueDate.toISOString() : undefined,
      };

      await createProject(projectDataToSend as Project)
      toast.success("Project created successfully!")
      onClose()
    } catch (error) {
      const errorMessage = (error instanceof Error ? error.message : String(error)) || "Failed to create project";
      setFormError(errorMessage);
      toast.error(errorMessage);
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FolderPlus className="h-5 w-5 text-blue-600" />
                  Create New Project
                </DialogTitle>
                <DialogDescription>
                  Set up a new project to organize your team's work and track progress.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    value={project.name}
                    onChange={(e) => setProject({ name: e.target.value })}
                    required
                    disabled={isLoading || isSubmitting}
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
                    placeholder="Describe the project goals and objectives"
                    value={project.description || ""}
                    onChange={(e) => setProject({ description: e.target.value })}
                    rows={3}
                    disabled={isLoading || isSubmitting}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="startDate">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !project.startDate && "text-muted-foreground"
                          )}
                          disabled={isLoading || isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {project.startDate ? format(project.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={project.startDate}
                          onSelect={(date) => setProject({ startDate: date || undefined })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !project.dueDate && "text-muted-foreground"
                          )}
                          disabled={isLoading || isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {project.dueDate ? format(project.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={project.dueDate}
                          onSelect={(date) => setProject({ dueDate: date || undefined })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <Label>Priority *</Label>
                    <Select
                      value={project.priority}
                      onValueChange={(value) => setProject({ priority: value as Project['priority'] })}
                      disabled={isLoading || isSubmitting}
                    >
                      <SelectTrigger>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High Priority</SelectItem>
                        <SelectItem value="Medium">Medium Priority</SelectItem>
                        <SelectItem value="Low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="0"
                      value={project.budget || ""} // Handle 0 or undefined
                      onChange={(e) => setProject({ budget: parseFloat(e.target.value) || 0 })}
                      min="0"
                      disabled={isLoading || isSubmitting}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label>Status</Label>
                  <Select
                    value={project.status}
                    onValueChange={(value) => setProject({ status: value as Project['status'] })}
                    disabled={isLoading || isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* For Assigned To and Tags, you might want more complex components later */}
                {/* For now, leaving them simple or commented out if not critical for a 'simple' modal */}
                {/* 
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label>Assigned To</Label>
                  <Select
                    value={project.assignedTo?.[0] || ""}
                    onValueChange={(value) => setProject({ assignedTo: [value] })}
                    disabled={isLoading || isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static-user-1">Static User 1</SelectItem>
                      <SelectItem value="static-user-2">Static User 2</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="design, development, marketing"
                    value={project.tags?.join(", ") || ""}
                    onChange={(e) => setProject({ tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '') })}
                    disabled={isLoading || isSubmitting}
                  />
                </motion.div>
                */}

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {formError}
                  </motion.div>
                )}

                {storeError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Error from store: {storeError}
                  </motion.div>
                )}

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={onClose} disabled={isLoading || isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading || !project.name || !project.sprintId || !project.priority}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
