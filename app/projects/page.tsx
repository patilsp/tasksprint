
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, BarChart2, MessageCircle, Search, Plus, Maximize2 } from 'lucide-react'

export default function ProjectDashboard() {


  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Fetch Projects from the API
  const fetchProjects = async () => {
    const response = await fetch('/api/project');
    const data = await response.json();

    const transformedProjects = data.map((project) => ({
      ...project,
      id: project._id.toString(),
    }));

    setAllProjects(transformedProjects);
    setFilteredProjects(transformedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterStatus = (status) => {
    setSelectedStatus(status);

    if (status === 'All') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter((project) => project.status === status);
      setFilteredProjects(filtered);
    }
  };


  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className='flex justify-between items-center'>
      <h1 className="text-3xl font-bold">Projects</h1>
      <Link
          href='create-project'
          className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
        >
          <Plus className='mr-2 size-4' />
          Add Project
        </Link>
        </div>
      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
          <CardHeader>
            <CardTitle>Project Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Upcoming Projects</p>
                <p className="text-2xl font-bold">03</p>
              </div>
              <BarChart2 className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Ongoing Projects</p>
                <p className="text-2xl font-bold">08</p>
              </div>
              <BarChart2 className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Completed Projects</p>
                <p className="text-2xl font-bold">84</p>
              </div>
              <BarChart2 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Timeline</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              <span>May 2022</span>
              <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              {Array.from({length: 11}, (_, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm font-medium">M {String(i+1).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {/* Placeholder for project bars */}
              <div className="h-6 bg-blue-200 w-3/4 rounded"></div>
              <div className="h-6 bg-green-200 w-1/2 rounded"></div>
              <div className="h-6 bg-purple-200 w-2/3 rounded"></div>
            </div>
          </CardContent>
        </Card>

        
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="w-full">
          <div className="flex flex-row items-center justify-between p-2">
            <h1 className="font-bold">Project Summary</h1>
            <Button variant="link">View All</Button>
          </div>
          <div className='p-1'>
            <div className='flex flex-col md:flex-row'>
              <div className='flex-1 space-y-4 p-1'>                

                {/* Cards for filtering by status */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                  <div
                    onClick={() => handleFilterStatus('All')}
                    className={`cursor-pointer p-4 border rounded-lg ${
                      selectedStatus === 'All' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
                    }`}
                  >
                    <h3 className='text-lg font-semibold'>All Projects</h3>
                    <p>Total: {allProjects.length}</p>
                  </div>

                  <div
                    onClick={() => handleFilterStatus('In Progress')}
                    className={`cursor-pointer p-4 border rounded-lg ${
                      selectedStatus === 'In Progress' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
                    }`}
                  >
                    <h3 className='text-lg font-semibold'>In Progress</h3>
                    <p>Total: {allProjects.filter((project) => project.status === 'In Progress').length}</p>
                  </div>

                  <div
                    onClick={() => handleFilterStatus('Completed')}
                    className={`cursor-pointer p-4 border rounded-lg ${
                      selectedStatus === 'Completed' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
                    }`}
                  >
                    <h3 className='text-lg font-semibold'>Completed</h3>
                    <p>Total: {allProjects.filter((project) => project.status === 'Completed').length}</p>
                  </div>

                  <div
                    onClick={() => handleFilterStatus('Blocked')}
                    className={`cursor-pointer p-4 border rounded-lg ${
                      selectedStatus === 'Blocked' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'
                    }`}
                  >
                    <h3 className='text-lg font-semibold'>Not Started</h3>
                    <p>Total: {allProjects.filter((project) => project.status === 'Not Started').length}</p>
                  </div>
                </div>

                {/* project Table */}
                <div className='mt-6 overflow-x-auto'>
                  <div className='w-full'>
                    <DataTable data={filteredProjects} columns={columns} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

