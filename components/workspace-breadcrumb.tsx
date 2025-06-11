"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const workspaceData = {
  "123": { title: "Design System" },
  "456": { title: "Mobile App" },
  "1": { title: "Test Workspace" },
}

const projectData = {
  "456": { name: "Component Library" },
  "789": { name: "Design Tokens" },
}

const taskData = {
  "101": { title: "Button Component" },
  "102": { title: "Input Component" },
  "201": { title: "Color Tokens" },
}

interface WorkspaceBreadcrumbProps {
  sprintId: string
}

export function WorkspaceBreadcrumb({ sprintId }: WorkspaceBreadcrumbProps) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const workspace = workspaceData[sprintId as keyof typeof workspaceData]

  const breadcrumbItems = [
    { label: "Task Sprint", href: "/tasksprint" },
    { label: workspace?.title || "Workspace", href: `/tasksprint/${sprintId}` },
  ]

  // Add project breadcrumb if we're in a project
  const projectIndex = segments.indexOf("project")
  if (projectIndex !== -1 && segments[projectIndex + 1]) {
    const projectId = segments[projectIndex + 1]
    const project = projectData[projectId as keyof typeof projectData]
    breadcrumbItems.push({
      label: project?.name || "Project",
      href: `/tasksprint/${sprintId}/project/${projectId}`,
    })

    // Add task breadcrumb if we're in a task
    const taskIndex = segments.indexOf("task")
    if (taskIndex !== -1 && segments[taskIndex + 1]) {
      const taskId = segments[taskIndex + 1]
      const task = taskData[taskId as keyof typeof taskData]
      breadcrumbItems.push({
        label: task?.title || "Task",
        href: `/tasksprint/${sprintId}/project/${projectId}/task/${taskId}`,
      })
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
