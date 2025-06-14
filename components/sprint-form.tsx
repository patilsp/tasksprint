"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"
import { useSprintStore } from "@/store/useSprintStore"
import type { CreateSprintData, Sprint } from "@/types/sprint"

interface SprintFormProps {
  sprint?: Sprint
  mode?: "create" | "edit"
  trigger?: React.ReactNode
}

export function SprintForm({ sprint, mode = "create", trigger }: SprintFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CreateSprintData>({
    name: sprint?.name || "",
    description: sprint?.description || "",
    status: sprint?.status || "PLANNING",
    startDate: sprint?.startDate || "",
    endDate: sprint?.endDate || "",
    progress: sprint?.progress || 0,
    priority: sprint?.priority || "MEDIUM"
  })

  const { createSprint, updateSprint, loading } = useSprintStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (mode === "create") {
        await createSprint(formData)
      } else if (sprint) {
        await updateSprint(sprint.id, formData)
      }

      setOpen(false)
      // Reset form for create mode
      if (mode === "create") {
        setFormData({
          name: "",
          description: "",
          status: "PLANNING",
          startDate: "",
          endDate: "",
          progress: 0,
          priority: "MEDIUM"
        })
      }
    } catch (error) {
      console.error("Failed to save sprint:", error)
    }
  }

  const handleInputChange = (field: keyof CreateSprintData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const defaultTrigger = (
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Add New Sprint
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Sprint" : "Edit Sprint"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sprint Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter sprint name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value as CreateSprintData["priority"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
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
              placeholder="Enter sprint description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value as CreateSprintData["status"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNING">Planning</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamMembers">Team Members</Label>
              <Input
                id="teamMembers"
                type="number"
                min="1"
                value={formData.teamMembers}
                onChange={(e) => handleInputChange("teamMembers", Number.parseInt(e.target.value) || 1)}
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

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div> */}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name.trim()}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "create" ? "Create Sprint" : "Update Sprint"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
