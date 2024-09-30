
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { getProjects } from '@/lib/actions/project.actions'

export default async function Projects() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link href="/projects/new">
        <Button>Create New Project</Button>
      </Link>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>
            <Link href={`/projects/${project._id}`}>
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}