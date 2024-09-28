"use client";

import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
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

export default function Page() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Demo User";
  
  const [currentDateTime, setCurrentDateTime] = useState(dayjs().format('D MMM, YYYY h:mm A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs().format('D MMM, YYYY h:mm A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
     

          <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hi, Welcome back <span className="text-blue-400">{userName}</span> 👋</h1>
          <p className="text-gray-500">You have 2 leave requests pending.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current time</p>
          <p className="text-lg font-semibold">26 Sept 2023, 12:10 PM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <span className="text-xs font-semibold bg-red-100 text-red-800 rounded-full px-2 py-1">Absent</span>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-yellow-400"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={(1 - 67 / 100) * 2 * Math.PI * 56}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">67%</span>
              </div>
            </div>
            <p className="text-xs text-center text-gray-500">You have not marked yourself as present today!</p>
            <p className="text-xs text-center font-semibold mt-2">Time left : 58m 44s</p>
            <Button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600">Mark Present</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
        <div className="grid gap-4 grid-cols-2">
              {/* Attendance Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <UserCheck className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-xs text-muted-foreground">
                    Your attendance this month
                  </p>
                </CardContent>
              </Card>

              {/* Pending Leaves Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Leaves awaiting approval
                  </p>
                </CardContent>
              </Card>

              {/* Pending Tasks Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <ListChecks className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Tasks pending completion
                  </p>
                </CardContent>
              </Card>

              {/* Completed Tasks Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Tasks completed this month
                  </p>
                </CardContent>
              </Card>
            </div>
          </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Attendance</CardTitle>
            <Button variant="link" className="text-sm">View Stats</Button>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between py-4">
            <div className="relative">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1,031 on time</span>
                    <span className="text-sm font-semibold text-green-500">●</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">191 work from home</span>
                    <span className="text-sm font-semibold text-yellow-500">●</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">150  Present</span>
                    <span className="text-sm font-semibold text-red-500">●</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">66 absent</span>
                    <span className="text-sm font-semibold text-gray-500">●</span>
                  </div>
              </div>
            </div>
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={(1 - 1434 / 1500) * 2 * Math.PI * 56}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">1,434</span>
              </div>
             
            </div>
            
            <div className="mt-4 flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              <span className="text-sm">Better than 91.3% employees!</span>
            </div>
          </CardContent>
        </Card>
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
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alena Gouse</p>
                        <p className="text-xs text-gray-500">UI Designer - UX12</p>
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
