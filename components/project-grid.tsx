import { ProjectCard } from "./project-card"

interface ProjectGridProps {
  projects: Array<{
    _id: string
    name: string
    description?: string
    startDate?: string
    dueDate?: string
    status: "Not Started" | "In Progress" | "Completed"
    priority: "High" | "Medium" | "Low"
    assignedTo?: string[]
    budget?: number
    tags?: string[]
    progress?: number
  }>
  onProjectClick?: (projectId: string) => void
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onClick={() => onProjectClick?.(project._id)}
        />
      ))}
    </div>
  )
} 