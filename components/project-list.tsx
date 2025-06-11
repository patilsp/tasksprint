"use client"

import { useEffect } from "react"
import { useProjectStore } from "@/store/project-store"
import { ProjectCard } from "./project-card"
import { FolderOpen } from "lucide-react"
import { ProjectForm } from "./project-form"

interface ProjectsListProps {
  sprintId: string
  limit?: number
}

export function ProjectsList({ sprintId, limit }: ProjectsListProps) {
  const { projects, loading, fetchProjects } = useProjectStore()

  useEffect(() => {
    fetchProjects(sprintId)
  }, [sprintId, fetchProjects])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const displayProjects = limit ? projects.slice(0, limit) : projects

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-4">No projects in this sprint yet</p>
        <ProjectForm sprintId={sprintId} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {limit && projects.length > limit && (
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Showing {limit} of {projects.length} projects
          </p>
        </div>
      )}
    </div>
  )
}
