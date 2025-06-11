"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Loader2, X } from "lucide-react"
import { useProjectStore } from "@/store/useProjectStore"
import type { CreateProjectData, Project } from "@/types/project"

interface ProjectFormProps {
  project?: Project
  mode?: "create" | "edit"
  trigger?: React.ReactNode
  sprintId: string
}

export function ProjectForm({ project, mode = "create", trigger, sprintId }: ProjectFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CreateProjectData>({
    name: project?.name || "",
    description: project?.description || "",
    status: project?.status || "Not Started",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    tasks: project?.tasks || 0,
    completedTasks: project?.completedTasks || 0,
    assignedMembers: project?.assignedMembers || 1,
    priority: project?.priority || "Medium",
    sprintId: project?.sprintId || sprintId,
    budget: project?.budget || 0,
    technologies: project?.technologies || [],
  })

  const [newTechnology, setNewTechnology] = useState("")
  const { createProject, updateProject, loading } = useProjectStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (mode === "create") {
        await createProject(formData)
      } else if (project) {
        await updateProject(project.id, formData)
      }

      setOpen(false)
      // Reset form for create mode
      if (mode === "create") {
        setFormData({
          name: "",
          description: "",
          status: "Not Started",
          startDate: "",
          endDate: "",
          tasks: 0,
          completedTasks: 0,
          assignedMembers: 1,
          priority: "Medium",
          sprintId,
          budget: 0,
          technologies: [],
        })
        setNewTechnology("")
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleInputChange = (field: keyof CreateProjectData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies?.includes(newTechnology.trim())) {
      const updatedTechnologies = [...(formData.technologies || []), newTechnology.trim()]
      handleInputChange("technologies", updatedTechnologies)
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    const updatedTechnologies = formData.technologies?.filter((t) => t !== tech) || []
    handleInputChange("technologies", updatedTechnologies)
  }

  const defaultTrigger = (
    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
      <Plus className="w-4 h-4 mr-2" />
      Add New Project
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Project" : "Edit Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value as CreateProjectData["priority"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter project description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value as CreateProjectData["status"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedMembers">Assigned Members</Label>
              <Input
                id="assignedMembers"
                type="number"
                min="1"
                value={formData.assignedMembers}
                onChange={(e) => handleInputChange("assignedMembers", Number.parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tasks">Total Tasks</Label>
              <Input
                id="tasks"
                type="number"
                min="0"
                value={formData.tasks}
                onChange={(e) => handleInputChange("tasks", Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completedTasks">Completed Tasks</Label>
              <Input
                id="completedTasks"
                type="number"
                min="0"
                max={formData.tasks}
                value={formData.completedTasks}
                onChange={(e) => handleInputChange("completedTasks", Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                step="0.01"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Technologies Section */}
          <div className="space-y-2">
            <Label>Technologies</Label>
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} variant="outline">
                Add
              </Button>
            </div>
            {formData.technologies && formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "create" ? "Create Project" : "Update Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
