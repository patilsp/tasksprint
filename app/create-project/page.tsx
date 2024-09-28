"use client";

import { useState } from 'react';
import ProjectForm from '@/components/ProjectForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreateProject = () => {
  const router = useRouter();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    assignedTo: '',
    sprintId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const createProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/project/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast.success('Project has been created! 🔥');
        router.push('/projects');
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      toast.error(`Failed to create project! ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProjectForm
      type='Create'
      project={project}
      setProject={setProject}
      submitting={submitting}
      handleSubmit={createProject}
    />
  );
};

export default CreateProject;
