"use client"

import { Home, FolderOpen, Users, Settings, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const workspaceData = {
  "123": {
    title: "Design System",
    icon: "D",
    color: "bg-blue-500",
    projects: [
      { id: "456", name: "Component Library", status: "In Progress" },
      { id: "789", name: "Design Tokens", status: "Completed" },
    ],
  },
  "456": {
    title: "Mobile App",
    icon: "M",
    color: "bg-green-500",
    projects: [],
  },
  "1": {
    title: "Test Workspace",
    icon: "T",
    color: "bg-orange-500",
    projects: [],
  },
}

interface WorkspaceSidebarProps {
  sprintId: string
}

export function WorkspaceSidebar({ sprintId }: WorkspaceSidebarProps) {
  const workspace = workspaceData[sprintId as keyof typeof workspaceData]

  if (!workspace) {
    return null
  }

  const navigationItems = [
    {
      title: "Overview",
      url: `/tasksprint/${sprintId}`,
      icon: Home,
    },
    {
      title: "Projects",
      url: `/tasksprint/${sprintId}`,
      icon: FolderOpen,
    },
    {
      title: "Team",
      url: `/tasksprint/${sprintId}/team`,
      icon: Users,
    },
    {
      title: "Settings",
      url: `/tasksprint/${sprintId}/settings`,
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className={`w-8 h-8 ${workspace.color} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{workspace.icon}</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{workspace.title}</h2>
            <p className="text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {workspace.projects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspace.projects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/tasksprint/${sprintId}/project/${project.id}`}>
                        <FolderOpen />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
