"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import toast from 'react-hot-toast';

const UpdateProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    assignedTo: '',
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast.success('Project has been updated! 🔥');
        router.push('/projects');
      } else {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      toast.error(`Failed to update project! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProjectForm
      type='Edit'
      project={project}
      setProject={setProject}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

export default UpdateProject;
