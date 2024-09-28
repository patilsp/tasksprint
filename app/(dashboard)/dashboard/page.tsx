"use client";

import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CheckCircle, Clock, ListChecks, UserCheck } from 'lucide-react';
import dayjs from 'dayjs';
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserStore } from '@/store/useUserStore'
import { AttendanceDialog } from '@/components/AttendanceDialog'


export default function Page() {
  
 const router = useRouter()
 const { user, fetchUser, logout } = useUserStore()

  
  const [currentDateTime, setCurrentDateTime] = useState(dayjs().format('D MMM, YYYY h:mm A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs().format('D MMM, YYYY h:mm A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    fetchUser()
  }, [fetchUser])




  const userId = user?._id;
  const userName = user?.name || 'Guest';
  const userEmail = user?.email || 'Guest';
  const userRole = user?.role || 'Guest';
  const userImage = user?.image || '/avatar.png';

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
     

      <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Hi, Welcome back <span className="text-blue-400">{userName}</span> 👋</h1>
          <p className="text-gray-500">You have 2 leave requests pending.</p>
        </div>
        <div className="flex flex-col items-start border border-gray-200 rounded-md p-2">
          <div className="flex justify-between items-center gap-2 font-semibold">
              <p className="text-sm text-gray-500"> Working</p> 
          </div>        
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold mr-2">3h:44m</p>
            <span className="text-sm text-gray-500 ">
              <Button variant="link" className="text-sm text-green-400 border border-gray-200 rounded-md px-2 py-1 mr-1"><Clock className="h-3 w-3 text-muted-foreground" />  Break</Button>
              <Button variant="link" className="text-sm text-red-400 border border-gray-200 rounded-md px-2 py-1"> <Clock className="h-3 w-3 text-muted-foreground" />  Check Out</Button>
            </span>
          </div>
        </div>
      </div>

    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Team</CardTitle>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>in office</span>
              <span className="flex items-center text-xs"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>work from home</span>
              <span className="flex items-center text-xs"><span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>on leave</span>
              <span className="flex items-center text-xs"><span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>absent</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Members</TableHead>
                  <TableHead>Today</TableHead>
                  <TableHead>25/9</TableHead>
                  <TableHead>24/9</TableHead>
                  <TableHead>23/9</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">Full Stack Developer</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Clock className="text-green-500" size={16} /></TableCell>
                  <TableCell><Clock className="text-green-500" size={16} /></TableCell>
                  <TableCell><Clock className="text-green-500" size={16} /></TableCell>
                  <TableCell>weekend</TableCell>
                </TableRow>
                {/* Add more team members here */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Working History</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Show all" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Show all</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Effective time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Today</TableCell>
                  <TableCell>11:19 AM</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={33} className="w-[60px] mr-2" />
                      <span className="text-sm">6.27 hours</span>
                    </div>
                  </TableCell>
                </TableRow>
                {/* Add more history rows here */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>



            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                {/* Replace with your own chart or component */}
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Your latest activities in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Replace with your own component or data */}
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4">
                {/* Replace with your own chart or component */}
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                {/* Replace with your own chart or component */}
                <PieGraph />
              </div>
            </div>
          
      </div>
    </ScrollArea>
  );
}
