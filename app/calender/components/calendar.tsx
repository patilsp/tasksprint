"use client"

import React, { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  id: string
  title: string
  start: Date
  end: Date
  link: string
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    start: new Date(),
    end: new Date(),
    link: ''
  })

  useEffect(() => {
    fetchEvents()
  }, [currentDate])

  const fetchEvents = async () => {
    const response = await fetch('/api/events')
    const data = await response.json()
    setEvents(data.map((event: any) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    })))
  }

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setNewEvent(prev => ({ ...prev, start: date, end: date }))
    setIsDialogOpen(true)
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
    if (response.ok) {
      fetchEvents()
      setIsDialogOpen(false)
      setNewEvent({ title: '', start: new Date(), end: new Date(), link: '' })
    }
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

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
            onClick={() => handleDateClick(day)}
          >
            <CardContent className="p-2">
              <div className="text-right">{format(day, 'd')}</div>
              {events
                .filter(event => isSameDay(event.start, day))
                .map(event => (
                  <div
                    key={event.id}
                    className={`${event.color} p-1 mb-1 rounded text-xs truncate`}
                  >
                    {event.title}
                  </div>
                ))
              }
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="datetime-local"
                value={format(newEvent.start || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={e => setNewEvent(prev => ({ ...prev, start: new Date(e.target.value) }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="datetime-local"
                value={format(newEvent.end || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={e => setNewEvent(prev => ({ ...prev, end: new Date(e.target.value) }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="color">Meeting Link</Label>
              <Input
                id="link"
                value={newEvent.link}
                onChange={e => setNewEvent(prev => ({ ...prev, link: e.target.value }))}
                required
              />
            </div>
            <Button type="submit">Save Event</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendar