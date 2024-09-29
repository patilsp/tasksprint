'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LeavesPage() {
  const [allLeaves, setAllLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchLeaves = async () => {
    const response = await fetch('/api/leave');
    const data = await response.json();

    const transformedLeaves = data.map((leave) => ({
      ...leave,
      id: leave._id.toString(),
    }));

    setAllLeaves(transformedLeaves);
    setFilteredLeaves(transformedLeaves);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Handle filtering by status
  const handleFilterStatus = (status) => {
    setSelectedStatus(status);

    if (status === 'All') {
      setFilteredLeaves(allLeaves); // Show all leaves
    } else {
      const filtered = allLeaves.filter((leave) => leave.status === status);
      setFilteredLeaves(filtered); // Filter leaves by status
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className='w-full p-4 md:p-8 space-y-6 dark:bg-slate-900 dark:text-white'>
        <div className='flex flex-row sm:items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>My Leaves</h2>
            <p className='text-sm text-muted-foreground'>
              Here&apos;s a list of leave requests for this month!
            </p>
          </div>
          <Link
            href='/create-leave' 
            className='mt-4 sm:mt-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
          >
            <PlusCircledIcon className='mr-2 size-4' />
            Apply Leave
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-24">
              <span className="text-3xl font-bold text-blue-500">16</span>
              <span className="text-sm text-gray-500">Available leaves</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-24">
              <span className="text-3xl font-bold text-blue-500">08</span>
              <span className="text-sm text-gray-500">Previous unused leaves</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-24">
              <span className="text-3xl font-bold text-yellow-500">02</span>
              <span className="text-sm text-gray-500">Pending Leaves Requests</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-24">
              <span className="text-3xl font-bold text-red-500">02</span>
              <span className="text-sm text-gray-500">Rejected Leaves</span>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">        
          <Card>
            <CardContent className="flex flex-row items-center sm:items-center justify-between py-4 space-y-4 sm:space-y-0">
              <span>Your compensatory off will expire on 31 Apr 2024</span>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {/* <Button variant="link">Read leave policy</Button> */}
                <Button className='bg-red-400 text-white'>Apply leave</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
            <div
              key={status}
              onClick={() => handleFilterStatus(status)}
              className={`cursor-pointer p-4 border rounded-lg ${
                selectedStatus === status ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
              }`}
            >
              <h3 className='text-lg font-semibold'>{status} Leaves</h3>
              <p>Total: {status === 'All' ? allLeaves.length : allLeaves.filter((leave) => leave.status === status).length}</p>
            </div>
          ))}
        </div>

        <div className='overflow-x-auto'>
          <DataTable data={filteredLeaves} columns={columns} />
        </div>
      </div>
    </ScrollArea>
  );
}