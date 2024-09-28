"use client"

import React, { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Task = {
  _id: string
  title: string
  dueDate: Date
  status: string
  priority: string
}

interface TaskCalendarProps {
  tasks: Task[]
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-yellow-200 text-yellow-800'
      case 'inProgress':
        return 'bg-blue-200 text-blue-800'
      case 'done':
        return 'bg-green-200 text-green-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h1>
        <div className="flex space-x-2">
          <Button onClick={handlePrevMonth}><ChevronLeft className="h-4 w-4" /></Button>
          <Button onClick={handleNextMonth}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {days.map(day => (
          <Card
            key={day.toString()}
            className={`min-h-[100px] ${!isSameMonth(day, currentDate) ? 'bg-gray-100' : ''}`}
          >
            <CardContent className="p-2">
              <div className="text-right">{format(day, 'd')}</div>
              {tasks
                .filter(task => isSameDay(new Date(task.dueDate), day))
                .map(task => (
                  <TooltipProvider key={task._id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={`${getStatusColor(task.status)} p-1 mb-1 rounded text-xs truncate`}
                        >
                          {task.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{task.title}</p>
                        <p>Status: {task.status}</p>
                        <p>Priority: {task.priority}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TaskCalendar