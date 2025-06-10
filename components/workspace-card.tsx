"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Users, Calendar, MoreHorizontal, FolderOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Workspace {
  id: string
  title: string
  description: string
  members: number
  projects: number
  lastActivity: string
  color: string
}

interface WorkspaceCardProps {
  workspace: Workspace
  index: number
}

export function WorkspaceCard({ workspace, index }: WorkspaceCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/tasksprint/${workspace.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${workspace.color}`} />
              <h3 className="font-semibold text-lg">{workspace.title}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Workspace</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Workspace</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm line-clamp-2">{workspace.description}</p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                {workspace.members}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <FolderOpen className="h-4 w-4" />
                {workspace.projects}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">Last activity: {workspace.lastActivity}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
