"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Loader2,
  ArrowLeft,
  Clock,
  Flag,
  CheckCircle2,
  FileText,
  CalendarDays,
  Target,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Mock props for demonstration
const mockProps = {
  type: "Create",
  sprint: {
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    priority: "Medium",
    status: "Planning",
  },
  setSprint: () => {},
  submitting: false,
  handleSubmit: (e) => {
    e.preventDefault()
    console.log("Form submitted")
  },
  onCancel: () => console.log("Cancelled"),
}

const TaskSprintForm = ({
  type = mockProps.type,
  sprint = mockProps.sprint,
  setSprint = mockProps.sprint,
  submitting = mockProps.submitting,
  handleSubmit = mockProps.handleSubmit,
  onCancel = mockProps.onCancel,
}) => {
  const [activeField, setActiveField] = useState(null)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Planning":
        return <Target className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/tasksprint" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{type} Sprint</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/tasksprint"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Sprints</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gradient">
            <CardHeader className="text-center pb-6 lg:pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {type} Task Sprint
              </CardTitle>
              <p className="text-gray-600 mt-2">Plan and organize your project sprint with clear goals and timelines</p>
            </CardHeader>

            <CardContent className="space-y-6 lg:space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sprint Name */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name" className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Sprint Name</span>
                  </Label>
                  <Input
                    id="name"
                    value={sprint.name || ""}
                    onChange={(e) => setSprint({ ...sprint, name: e.target.value })}
                    placeholder='e.g., "Q1 Feature Development Sprint"'
                    className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    required
                  />
                </motion.div>

               

                {/* Date Range */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Start Date */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                      <CalendarDays className="h-5 w-5 text-green-600" />
                      <span>Start Date</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-2 hover:border-green-500 transition-colors",
                            !sprint.startDate && "text-muted-foreground",
                            activeField === "startDate" && "border-green-500",
                          )}
                          onFocus={() => setActiveField("startDate")}
                          onBlur={() => setActiveField(null)}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-green-600" />
                          {sprint.startDate ? (
                            <span className="text-base">{format(new Date(sprint.startDate), "PPP")}</span>
                          ) : (
                            <span className="text-base">Select start date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={sprint.startDate ? new Date(sprint.startDate) : undefined}
                          onSelect={(date) => setSprint({ ...sprint, startDate: date?.toISOString() })}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                      <CalendarDays className="h-5 w-5 text-red-600" />
                      <span>Due Date</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-2 hover:border-red-500 transition-colors",
                            !sprint.dueDate && "text-muted-foreground",
                            activeField === "dueDate" && "border-red-500",
                          )}
                          onFocus={() => setActiveField("dueDate")}
                          onBlur={() => setActiveField(null)}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-red-600" />
                          {sprint.dueDate ? (
                            <span className="text-base">{format(new Date(sprint.dueDate), "PPP")}</span>
                          ) : (
                            <span className="text-base">Select due date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={sprint.dueDate ? new Date(sprint.dueDate) : undefined}
                          onSelect={(date) => setSprint({ ...sprint, dueDate: date?.toISOString() })}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </motion.div>

                {/* Priority and Status */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Priority */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                      <Flag className="h-5 w-5 text-orange-600" />
                      <span>Priority</span>
                    </Label>
                    <Select
                      value={sprint.priority || "Medium"}
                      onValueChange={(value) => setSprint({ ...sprint, priority: value })}
                    >
                      <SelectTrigger className="h-12 text-base border-2 focus:border-orange-500">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getPriorityColor(sprint.priority)} text-xs`}>
                            {sprint.priority || "Medium"}
                          </Badge>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Low</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="Medium">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">Medium</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="High">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">High</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                      {getStatusIcon(sprint.status)}
                      <span>Status</span>
                    </Label>
                    <Select
                      value={sprint.status || "Planning"}
                      onValueChange={(value) => setSprint({ ...sprint, status: value })}
                    >
                      <SelectTrigger className="h-12 text-base border-2 focus:border-blue-500">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(sprint.status)}
                          <Badge className={`${getStatusColor(sprint.status)} text-xs`}>
                            {sprint.status || "Planning"}
                          </Badge>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Planning</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="In Progress">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                              In Progress
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="Completed">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Completed</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                 {/* Description */}
                 <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label
                    htmlFor="description"
                    className="text-base font-semibold text-gray-900 flex items-center space-x-2"
                  >
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span>Description</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={sprint.description || ""}
                    onChange={(e) => setSprint({ ...sprint, description: e.target.value })}
                    placeholder="Describe the sprint goals, objectives, and key deliverables..."
                    className="min-h-[100px] text-base border-2 focus:border-purple-500 transition-colors resize-none"
                    onFocus={() => setActiveField("description")}
                    onBlur={() => setActiveField(null)}
                    required
                  />
                </motion.div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col lg:flex-row gap-4 lg:justify-end pt-6 lg:pt-8">
              <motion.div
                className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/tasksprint" className="w-full lg:w-auto">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full lg:w-auto h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {`${type}ing Sprint...`}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      {type} Sprint
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Mobile Bottom Spacing */}
        <div className="h-8 lg:hidden" />
      </div>
    </div>
  )
}

export default TaskSprintForm
