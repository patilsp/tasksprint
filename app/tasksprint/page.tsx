'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import TaskSprintCard from '@/components/TaskSprintCard';

export default function TaskSprint() {
  const [allSprints, setAllSprints] = useState([]);

  const fetchSprints = async () => {
    const response = await fetch('/api/tasksprint');
    const data = await response.json();

    const transformedSprints = data.map((sprint) => ({
      ...sprint,
      id: sprint._id.toString(),
    }));

    setAllSprints(transformedSprints);
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  return (
    <div className='p-4 h-screen'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 space-y-4 p-1 pt-6 md:p-8'>
          <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-bold md:text-2xl'>Manage Your Sprints</h2>
              <p className='text-sm text-muted-foreground md:text-base'>
                Here&apos;s a list of your sprints for this month!
              </p>
            </div>

            <div className='mt-4 md:mt-0'>
              <Link
                href='/tasksprint/create-sprint'
                className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                <PlusCircledIcon className='mr-2 size-4' />
                Add Sprint
              </Link>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {allSprints.map((sprint) => (
              <TaskSprintCard
                key={sprint.id}
                sprint={sprint}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
