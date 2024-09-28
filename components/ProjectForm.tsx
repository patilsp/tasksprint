"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ProjectForm = ({ type, project, setProject, submitting, handleSubmit, onCancel }) => {
  const [employees, setEmployees] = useState([]);
  const [taskSprints, setTaskSprints] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingSprints, setLoadingSprints] = useState(true);

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const response = await fetch("/api/employee");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to load employees. Please try again.");
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchTaskSprints = async () => {
    setLoadingSprints(true);
    try {
      const response = await fetch("/api/tasksprint");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTaskSprints(data);
    } catch (error) {
      toast.error("Failed to load Task Sprints. Please try again.");
    } finally {
      setLoadingSprints(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTaskSprints();
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
     
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
      <h1 className="text-3xl font-bold text-center text-primary my-5">
        {type} Project
      </h1>
       <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
 
    
      
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              placeholder="Enter project name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !project.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {project.startDate ? format(project.startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={project.startDate}
                  onSelect={(date) => setProject({ ...project, startDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select
              value={project.assignedTo}
              onValueChange={(value) => setProject({ ...project, assignedTo: value })}
              disabled={loadingEmployees}
            >
              <SelectTrigger id="assignedTo">
                <SelectValue
                  placeholder={
                    loadingEmployees ? "Loading employees..." : "Select Employee"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No employees available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>



        <div className="space-y-4">
        <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={project.status}
              onValueChange={(value) => setProject({ ...project, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !project.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {project.endDate ? format(project.endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={project.endDate}
                  onSelect={(date) => setProject({ ...project, endDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
         
          <div>
            <Label htmlFor="taskSprint">Select Task Sprint</Label>
            <Select
              value={project.sprintId}
              onValueChange={(value) => setProject({ ...project, sprintId: value })}
              disabled={loadingSprints}
            >
              <SelectTrigger id="sprintId">
                <SelectValue
                  placeholder={loadingSprints ? "Loading task sprints..." : "Select Sprint"}
                />
              </SelectTrigger>
              <SelectContent>
                {taskSprints.length > 0 ? (
                  taskSprints.map((sprint) => (
                    <SelectItem key={sprint._id} value={sprint._id}>
                      {sprint.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No task sprints available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="w-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              placeholder="Enter project description"
              required
              className="h-32"
            />
          </div>
        <div className="col-span-full flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {`${type}ing...`}
              </>
            ) : (
              type
            )}
          </Button>
        </div>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;