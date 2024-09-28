import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center text-white font-bold mr-2">
            M
          </div>
          <h2 className="text-lg font-semibold">My Calendar</h2>
        </div>
        <Button variant="ghost" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">My Calendars</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox id="daily-sync" className="mr-2" />
            <label htmlFor="daily-sync">Daily Sync</label>
          </div>
          <div className="flex items-center">
            <Checkbox id="birthdays" className="mr-2" />
            <label htmlFor="birthdays">Birthdays</label>
          </div>
          <div className="flex items-center">
            <Checkbox id="tasks" className="mr-2" />
            <label htmlFor="tasks">Tasks</label>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Favorites</h3>
        <Button variant="ghost" className="w-full justify-start">
          <ChevronDown className="h-4 w-4 mr-2" />
          Favorites
        </Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Work</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Personal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Education</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar