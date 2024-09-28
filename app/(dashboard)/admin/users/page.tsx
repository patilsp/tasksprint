'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns'; // Adjust columns as per user data
import { DataTable } from './components/data-table';

export default function UserPage() {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();

    const transformedUsers = data.map((user) => ({
      ...user,
      id: user._id.toString(),
    }));

    setAllUsers(transformedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-4 h-screen'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 space-y-4 p-1 pt-6 md:p-8'>
          <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-bold md:text-2xl'>Welcome back!</h2>
              <p className='text-sm text-muted-foreground md:text-base'>
                Here&apos;s a list of your users!
              </p>
            </div>

            <div className='mt-4 md:mt-0 mb-2'>
              <Link
                href='create-user'
                className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                <PlusCircledIcon className='mr-2 size-4' />
                Add User
              </Link>
            </div>
          </div>

          {/* User Table */}
          <div className='mt-6 overflow-x-auto'>
            <div className='w-full'>
              <DataTable data={allUsers} columns={columns} /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
