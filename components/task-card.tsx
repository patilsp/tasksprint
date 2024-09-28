import React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Lock } from "lucide-react"

const tasks = [
  { name: "Research", progress: 60, color: "bg-blue-500", icon: <Users className="h-4 w-4" />, text: "Meeting" },
  { name: "Phase 2.6 QA", progress: 47, color: "bg-green-500", icon: <Lock className="h-4 w-4" />, text: "Testing" },
  { name: "UI Design", progress: 55, color: "bg-pink-500", icon: <Users className="h-4 w-4" />, text: "Landing page" },
  { name: "Development", progress: 75, color: "bg-purple-500", icon: <Users className="h-4 w-4" />, text: "Products module" },
]

export default function TaskCard() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
        <Tabs defaultValue="day" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="day" className="text-xs">Day</TabsTrigger>
            <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
            <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            <TabsTrigger value="year" className="text-xs">2022</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{task.name}</p>
                <div className="flex items-center pt-2">
                  <div className={`flex items-center justify-center rounded-full p-1 ${task.color} text-white mr-2`}>
                    {task.icon}
                  </div>
                  <span className="text-xs text-muted-foreground">{task.text}</span>
                </div>
              </div>
              <div className="ml-auto font-medium">{task.progress}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}