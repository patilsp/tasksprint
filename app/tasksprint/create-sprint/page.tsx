"use client";

import { useState, useEffect } from "react";
import TaskSprintForm from '@/components/TaskSprintForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/useUserStore'

const CreateSprint = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [userId, setUserId] = useState(null);  // Use state for userId

  const [taskSprint, setTaskSprint] = useState({
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: 'Low',
    status: 'Planning',
    userId: '',  // Initialize as empty, then set later
  });
  
  const [submitting, setIsSubmitting] = useState(false);

  // Set userId when user data is available
  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
      setTaskSprint(prevState => ({
        ...prevState,
        userId: user._id,  // Update userId in taskSprint when it's available
      }));
    }
  }, [user]);  // Depend on user changes

  const createSprint = async (e) => {
    e.preventDefault();
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

      if (response.ok) {
        toast.success('Your Sprint has been created! 🎉');
        router.push('/tasksprint');
      } else {
        throw new Error('Failed to create task sprint');
      }
    } catch (error) {
      toast.error(`Failed to create task sprint! ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
