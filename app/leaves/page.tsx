'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
    <div className='w-full  dark:bg-slate-900 dark:text-white'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 space-y-4 p-1 pt-6 md:p-8'>
          <div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-bold md:text-2xl'>My Leaves</h2>
              {/* <p className='text-sm text-muted-foreground md:text-base'>
                Here&apos;s a list of leave requests for this month!
              </p> */}
            </div>

            <div className='mt-4 md:mt-0'>
              <Link
                href='/create-leave' 
                className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                <PlusCircledIcon className='mr-2 size-4' />
                Apply Leave
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <div className="space-y-4 mb-6">
            <Card>
            <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center">
                <span className="text-blue-500 mr-2">ⓘ</span>
                <span>You were absent on 13 Apr 2024</span>
                </div>
                <div>
                <Button variant="outline" className="mr-2">Apply On Duty</Button>
                <Button className='bg-indigo-400 text-white'>Apply leave</Button>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardContent className="flex items-center justify-between py-4">
                <span>Your compensatory off will expire on 31 Apr 2024</span>
                <div>
                <Button variant="link" className="mr-2">Read leave policy</Button>
                <Button className='bg-red-400 text-white'>Apply leave</Button>
                </div>
            </CardContent>
            </Card>
        </div>



          {/* Cards for filtering by status */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
            <div
              onClick={() => handleFilterStatus('All')}
              className={`cursor-pointer p-4 border rounded-lg ${
                selectedStatus === 'All' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
              }`}
            >
              <h3 className='text-lg font-semibold'>All Leaves</h3>
              <p>Total: {allLeaves.length}</p>
            </div>

            <div
              onClick={() => handleFilterStatus('Approved')}
              className={`cursor-pointer p-4 border rounded-lg ${
                selectedStatus === 'Approved' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
              }`}
            >
              <h3 className='text-lg font-semibold'>Approved</h3>
              <p>Total: {allLeaves.filter((leave) => leave.status === 'Approved').length}</p>
            </div>

            <div
              onClick={() => handleFilterStatus('Pending')}
              className={`cursor-pointer p-4 border rounded-lg ${
                selectedStatus === 'Pending' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
              }`}
            >
              <h3 className='text-lg font-semibold'>Pending</h3>
              <p>Total: {allLeaves.filter((leave) => leave.status === 'Pending').length}</p>
            </div>

            <div
              onClick={() => handleFilterStatus('Rejected')}
              className={`cursor-pointer p-4 border rounded-lg ${
                selectedStatus === 'Rejected' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
              }`}
            >
              <h3 className='text-lg font-semibold'>Rejected</h3>
              <p>Total: {allLeaves.filter((leave) => leave.status === 'Rejected').length}</p>
            </div>
          </div>

          {/* Leave Table */}
          <div className='mt-6 overflow-x-auto'>
            <div className='w-full'>
              <DataTable data={filteredLeaves} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
