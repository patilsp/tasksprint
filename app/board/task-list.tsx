'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function TaskList() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('/api/task');
    const data = await response.json();

    const transformedTasks = data.map((task) => ({
      ...task,
      id: task._id.toString(),
    }));

    setAllTasks(transformedTasks);
    setFilteredTasks(transformedTasks);
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
              {/* <h2 className='text-xl font-bold md:text-2xl'>Manage Your Tasks</h2> */}
              <p className='text-sm text-muted-foreground md:text-base'>
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>

            {/* <div className='mt-4 md:mt-0'>
              <Link
                href='/create-task'
                className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                <PlusCircledIcon className='mr-2 size-4' />
                Add Task
              </Link>
            </div> */}
          </div>

          <div className='mt-6 overflow-x-auto'>
            <div className='w-full'>
              <DataTable data={filteredTasks} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
