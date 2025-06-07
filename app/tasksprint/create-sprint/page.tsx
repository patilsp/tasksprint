"use client";

import { useState, useEffect } from "react";
import TaskSprintForm from '@/components/TaskSprintForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/useUserStore'

const CreateSprint = () => {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  const [taskSprint, setTaskSprint] = useState({
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: 'Low',
    status: 'Planning',
    project: '',
  });
  
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await fetchUser();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load user data');
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [fetchUser]);

  const createSprint = async (e) => {
    e.preventDefault();
    
    if (!user?._id) {
      toast.error('User data not available. Please try again.');
      return;
    }

    if (!taskSprint.project) {
      toast.error('Please select a project');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasksprint/new', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          ...taskSprint,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create task sprint');
      }

      toast.success('Your Sprint has been created! 🎉');
      router.push('/tasksprint');
    } catch (error) {
      toast.error(`Failed to create task sprint! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <TaskSprintForm
      type='Create'
      sprint={taskSprint}
      setSprint={setTaskSprint}
      submitting={submitting}
      handleSubmit={createSprint}
    />
  );
};

export default CreateSprint;
