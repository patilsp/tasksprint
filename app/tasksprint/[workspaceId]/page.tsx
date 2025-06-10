"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Users, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateProjectModal } from '@/components/create-project-modal'
import { InviteUserDialog } from '@/components/invite-user-dailog'
import { useProjectStore } from '@/store/useProjectStore'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProjectGrid } from '@/components/project-grid'
import { ProjectCard } from '@/components/project-card'

export default function WorkspaceOverviewPage() {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const { projects, isLoading, error, fetchProjects, createProject, setProject } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    // Set the workspace ID in the project store when the modal opens
    if (isCreateModalOpen) {
      setProject({ workspaceId: workspaceId })
    }
  }, [isCreateModalOpen, workspaceId, setProject])

  const handleCreateProject = async (projectData: any) => {
    try {
      await createProject({ ...projectData, workspaceId: workspaceId })
      toast.success('Project created successfully!')
      setIsCreateModalOpen(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create project'
      toast.error(errorMessage)
      console.error('Error creating project:', error)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sprint Details</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
          <Button
            onClick={() => setIsInviteDialogOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Invite Users
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <ProjectGrid
          projects={projects}
          onProjectClick={(projectId) => {
            console.log(`Project clicked: ${projectId}`);
            router.push(`/tasksprint/${workspaceId}/project/${projectId}`);
          }}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        workspaceId={workspaceId}
      />

      <InviteUserDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        workspaceId={workspaceId}
      />
    </div>
  )
}
