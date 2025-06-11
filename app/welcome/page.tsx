"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, PenSquare, Bell, Trash2, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

const Welcome = () => {
  const { user, fetchUser } = useUserStore();
  const [attendanceData, setAttendanceData] = useState([]);

  const loggedInUserId = user?._id;

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 min-h-screen p-4 md:p-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-8">
        <Link href="/dashboard" target="_blank">
          <Image src="/images/logo.png" height={35} width={35} alt="logo" className="object-contain" />
        </Link>
        <h1 className="text-sm md:text-2xl font-bold text-white mb-2">WELCOME TO <span className='text-orange-500'>TASK SPRINT</span></h1>
      </header>

      <div className="flex justify-center flex-col lg:flex-row gap-6">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>

          <Card className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-xl">
            <CardContent className="p-6 flex flex-col items-center">
              <Image src="/images/welcome.png" height={250} width={250} alt="Welcome" className="mb-6" />
              <p className="text-lg mb-4 text-center">Plan and launch your sprint with clearly defined goals, timelines, and responsibilities.</p>
              <Link href="/dashboard">
                <Button className="bg-white text-blue-700 hover:bg-gray-200">Go To Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/tasksprint">
              <Card className="bg-[#f9666e] text-white shadow-md">
                <CardContent className="p-6 flex flex-col items-center">
                  <Image src="/images/10.png" height={100} width={100} alt="Sprint" className="mb-4" />
                  <h4 className="text-xl font-semibold">Start Sprint</h4>
                  <p className="text-sm mt-2 opacity-80 text-center">Organize work into time-boxed iterations and boost team efficiency.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/khanban">
              <Card className="bg-[#35d29a] text-white shadow-md">
                <CardContent className="p-6 flex flex-col items-center">
                  <Image src="/images/1.png" height={100} width={100} alt="Task" className="mb-4" />
                  <h4 className="text-xl font-semibold">Create Task</h4>
                  <p className="text-sm mt-2 opacity-80 text-center">Break projects into actionable items to monitor and complete.</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="border min-h-[220px] bg-gradient-to-br from-yellow-400 to-lime-500 col-span-1 md:col-span-2 hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col md:flex-row items-center justify-center p-6">
                <Image 
                  className="max-w-full h-auto md:h-[180px] mb-5 md:mb-1 md:mr-6" 
                  src="/images/3.png" 
                  alt="Attendance illustration" 
                  height={180}
                  width={180}
                />
                <div className="flex flex-col items-center text-center md:text-start md:items-start">
                  <h3 className="text-white text-xl font-bold mb-4">Today's Attendance</h3>
                  <div className="w-full flex flex-row gap-3">
                    {loggedInUserId && attendanceData.length > 0 ? (
                      <p className="text-center text-white bg-green-500 px-4 py-2 rounded shadow border border-white text-sm font-medium">
                        ✅ You are marked present for today
                      </p>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <AttendanceDialog />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </motion.div>

        <motion.div
          className="flex-1 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>

          <Card className="bg-blue-800 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Task Activity</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Create Tasks</DropdownMenuItem>
                      <DropdownMenuItem>View Assigned</DropdownMenuItem>
                      <DropdownMenuItem>Completed Tasks</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <PenSquare className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-semibold">2 tasks created in Development</p>
                    <p className="text-sm text-blue-300">Today at 4:23 PM</p>
                  </div>
                </div>
                <div className="bg-blue-700 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Optimize Image Loading</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white border">View</Button>
                </div>
                <div className="flex items-start">
                  <Bell className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-semibold">New bugs reported</p>
                    <p className="text-sm text-blue-300">Reported by QA</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Trash2 className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-semibold">Deleted old design files</p>
                    <p className="text-sm text-blue-300">Removed at 11:00 AM</p>
                  </div>
                </div>
                <div className="bg-blue-700 p-3 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    <div>
                      <p className="font-semibold">Project Brief</p>
                      <p className="text-sm text-blue-300">2.4MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white border">View</Button>
                </div>
              </div>
              <Button className="w-full mt-6 bg-blue-900">
                <Link href="/tasks">VIEW ALL TASKS</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
