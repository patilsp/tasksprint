"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const TaskSprintForm = ({ type, sprint = {}, setSprint, submitting, handleSubmit, onCancel }) => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/images/bg/bg.png)" }}>
      <div className="w-full h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl mx-auto ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              {type} Task Sprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Sprint Name</Label>
                <Input
                  id="name"
                  value={sprint.name || ''}
                  onChange={(e) => setSprint({ ...sprint, name: e.target.value })}
                  placeholder='Enter sprint name'
                  required
                />
              </div>
              
            

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !sprint.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {sprint.startDate ? format(new Date(sprint.startDate), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={sprint.startDate ? new Date(sprint.startDate) : undefined}
                      onSelect={(date) => setSprint({ ...sprint, startDate: date?.toISOString() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !sprint.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {sprint.dueDate ? format(new Date(sprint.dueDate), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={sprint.dueDate ? new Date(sprint.dueDate) : undefined}
                      onSelect={(date) => setSprint({ ...sprint, dueDate: date?.toISOString() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={sprint.priority || 'Medium'}
                  onValueChange={(value) => setSprint({ ...sprint, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={sprint.status || 'Planning'}
                  onValueChange={(value) => setSprint({ ...sprint, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full col-span-1 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={sprint.description || ''}
                  onChange={(e) => setSprint({ ...sprint, description: e.target.value })}
                  placeholder='Enter sprint description'
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Link
              href="/tasksprint"
              className="p-2 h-9 px-4 rounded-md bg-red-400 hover:bg-red-500 text-white hover:text-white"
            >
              Cancel
            </Link>
            <Button
              type='submit'
              onClick={handleSubmit}
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
          </CardFooter>
        </Card>
    </div>
    </div>
  );
};

export default TaskSprintForm;