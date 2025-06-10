
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Rocket } from "lucide-react"
import { SprintForm } from "./sprint-form"

export function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 text-blue-600" />
          </div>

          <h3 className="text-xl font-semibold mb-2">No Sprints Yet</h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first sprint to organize and track your project tasks.
          </p>

          <SprintForm />
        </CardContent>
      </Card>
    </div>
  )
}
