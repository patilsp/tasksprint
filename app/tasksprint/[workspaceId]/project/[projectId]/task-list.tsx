'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { toast } from '@/components/ui/use-toast';

export default function TaskList() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/task');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();

      const transformedTasks = data.map((task) => ({
        id: task._id.toString(),
        title: task.title || task.name,
        description: task.description || '',
        priority: task.priority?.toLowerCase() || 'medium',
        status: task.status?.toLowerCase() || 'todo',
        dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
        startDate: task.startDate ? new Date(task.startDate) : new Date(),
        project: task.project || null,
        assignedTo: task.assignedTo || [],
      }));

      setAllTasks(transformedTasks);
      setFilteredTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='h-screen'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 space-y-4 p-1'>
          <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='text-sm text-muted-foreground md:text-base'>
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
          </div>

          <div className='mt-6 overflow-x-auto'>
            <div className='w-full'>
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <DataTable data={filteredTasks} columns={columns} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}