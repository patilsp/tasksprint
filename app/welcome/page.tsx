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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceDialog } from '@/components/AttendanceDialog';
import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

const Welcome = () => {
  const { user, fetchUser } = useUserStore();
  const [attendanceData, setAttendanceData] = useState([]);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);

  useEffect(() => {
    fetchUser(); // Fetch the user on component mount
  }, [fetchUser]);

  useEffect(() => {
    const fetchAttendanceStatus = async (userId) => {
      try {
        // Fetch attendance data for the specified user
        const response = await axios.get(`/api/attendance?userId=${userId}`);

        // Log the received data
        console.log("Attendance Data:", response.data);
        
        // Set attendance data
        setAttendanceData(response.data);
        
        // Check if user is present in attendance data
        const userPresent = response.data.some(attendance => attendance.creator === userId);
        
        // Open the attendance dialog if the user is logged in and not present
        if (userId && !userPresent) {
          setIsAttendanceDialogOpen(true);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error.message || error);
      }
    };

    if (user && user._id) {
      fetchAttendanceStatus(user._id); // Fetch attendance only if user is defined
    }
  }, [user]); // Run this effect whenever `user` changes

  const loggedInUserId = user?._id;

  return (
      
    
     <div className="bg-gradient-to-br from-blue-900 to-blue-700 min-h-screen p-4 md:p-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <Link href="/dashboard" target="_blank">
            <Image 
              src="/images/logo.png"
              height={35}
              width={35}
              alt="logo"
              className="object-contain"
            />
          </Link>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-sm md:text-2xl font-bold text-white mb-2">WELCOME TO <span className='text-orange-500 '> TASK SPRINT</span></h1>
          {/* <p className="text-sm md:text-base text-white">Task Sprint is a project management tool that helps you get things done.</p> */}
          {loggedInUserId && attendanceData.length > 0 ? (
            <p className="text-center text-white bg-green-400 p-1 rounded shadow border">You mark as Present Today </p>
          ) : (
            <div className="flex justify-center gap-2">
              {/* <p>Please mark your attendance</p> */}
              <AttendanceDialog />
            </div>
          )}
        </div>
      </header>

      <div className="flex justify-between flex-col lg:flex-row gap-4">
       <div className="flex md:flex-row flex-col justify-between items-center gap-2 md:gap-4">
       <motion.div
          className="flex-1 size-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
            
          <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-4">
           
          <Card className="border bg-gradient-to-br from-[#ffbc00] to-[#f9666e] col-span-1 md:col-span-2">
              <CardContent className="flex flex-col items-center justify-center h-full p-4">
                
                <Image 
                  className="max-w-full h-auto mx-auto mb-20" 
                  src="/images/welcome.png"       
                  alt="Dashboard illustration" 
                  height={250}
                  width={250}
                />
                <Link href="/dashboard">
                  <Button className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white uppercase mb-6">
                    Go To Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        <motion.div
          className="flex-1 size-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
        <div className="w-full  md:w-[530px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <Link href="/tasksprint">
            <Card className="border min-h-[200px] bg-[#f9666e]">
              <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                <Image 
                  className="max-w-full h-[100px] mb-7 mx-auto" 
                  src="/images/10.png" 
                  alt="Start Project illustration" 
                  height={100}
                  width={100}
                />
                <h4 className="text-white text-xl font-semibold">Start Sprint</h4>
              </CardContent>
              </Card>
            </Link>
            <Link href="/khanban">
              <Card className="border min-h-[200px] bg-[#35d29a]">
                <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                  <Image 
                    className="max-w-full h-[100px] mb-7 mx-auto" 
                    src="/images/1.png" 
                    alt="Create account illustration" 
                    height={100}
                    width={100}
                  />
                  <h4 className="text-white text-xl font-semibold">Create Task</h4>
                </CardContent>
              </Card>
            </Link>
            <Card className="border min-h-[220px] bg-[#d5d83d] col-span-1 md:col-span-2">
              <CardContent className="flex flex-col md:flex-row items-center justify-center p-6">
                <Image 
                  className="max-w-full h-auto md:h-[180px] mb-5 md:mb-1 md:mr-6" 
                  src="/images/3.png" 
                  alt="Quick guide illustration" 
                  height={180}
                  width={180}
                />
                <div className="flex flex-col items-center text-center md:text-start md:items-start">
                    <div className="text-white mb-6 pt-6">
                      <span className="text-sm font-normal block pb-2 opacity-75">Get best offer</span>
                      <span className="text-xl font-bold">Upgrade Your Plan</span>
                    </div>
                  <span className="font-base text-white text-sm mb-8 block opacity-75">
                      Supercharge your team's productivity with our Task Sprint project management solutions.
                    </span>
                  <div className="w-full flex flex-row gap-3">
                      <Button className="w-full bg-[#ebee51] text-gray-900 hover:bg-[#d5d83d]">
                        <Link href="/subscription">
                          Upgrade Plan
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full"> Read Guid </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </motion.div>

        </div>
      
        <motion.div
          className="flex-1 lg:max-w-md mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-blue-800 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Task Activity</h2>
               

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 mr-16 flex flex-col justify-start ">
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Create Tasks </DropdownMenuItem>
                      <DropdownMenuItem>View Assigned Tasks </DropdownMenuItem>
                      <DropdownMenuItem>Completed Tasks </DropdownMenuItem>
                    
                    </DropdownMenuGroup>
                    <Button variant="outline" className="w-full mt-4">Generate Report</Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-4 ">
                <div className="flex items-start">
                  <PenSquare className="h-6 w-6 mr-2 mt-1 flex-shrink-0 p-1 text-white bg-blue-900 shadow rounded-full" />
                  <div>
                    <p className="font-semibold">Created 2 new tasks in "Development"</p>
                    <p className="text-sm text-blue-300">Added at 4:23 PM by Demo User</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-blue-700 p-2 rounded-md">
                  <div>
                    <p className="text-white font-semibold">Improve website loading speed</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-300 border border-blue-300">View</Button>
                </div>
                <div className="flex items-start">
                    <Bell className="h-6 w-6 mr-2 mt-1 flex-shrink-0 p-1 text-white bg-blue-900 shadow rounded-full" />
                  <div>
                    <p className="font-semibold">2 new entries in "Bug Fixes"</p>
                    <p className="text-sm text-blue-300">4:23 PM by Jane Smith</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Trash2 className="h-6 w-6 mr-2 mt-1 flex-shrink-0 p-1 text-white bg-blue-900 shadow rounded-full" />
                  <div>
                    <p className="font-semibold">Received 2 new project files</p>
                    <p className="text-sm text-blue-300">Sent at 10:30 PM by You</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-blue-700 p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 flex-shrink-0 p-1 text-white bg-blue-900 shadow rounded-full" />
                    <div>
                      <p className="font-semibold">API Documentation</p>
                      <p className="text-sm text-blue-300">1.9mb</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-300 border border-blue-300 mt-">View</Button>
                </div>
                
              </div>
              <Button variant="outline" className="w-full my-5"><Link href="/tasks">VIEW ALL TASKS</Link></Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
