"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Clock, LogOut, UserCheck,ListChecks } from 'lucide-react';
import dayjs from 'dayjs';
import { Progress } from "@/components/ui/progress"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserStore } from '@/store/useUserStore'
import { AttendanceDialog } from '@/components/AttendanceDialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface AttendanceData {
  _id: string;
  creator: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  checkInTime: string;
  remarks?: string;
}

export default function Attendance() {
  const router = useRouter()
  const { user, fetchUser } = useUserStore()
  const [currentDateTime, setCurrentDateTime] = useState(dayjs().format('D MMM, YYYY h:mm A'));
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs().format('D MMM, YYYY h:mm A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!user?._id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/attendance?userId=${user._id}`);
        if (response.data && response.data.length > 0) {
          const todayAttendance = response.data.find((attendance: AttendanceData) => 
            dayjs(attendance.date).isSame(dayjs(), 'day')
          );
          setAttendanceData(todayAttendance || null);
        } else {
          setAttendanceData(null);
        }
      } catch (err) {
        setError('Failed to fetch attendance data. Please try again later.');
        console.error('Error fetching attendance data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, [user]);

  const markAttendance = async (status: string, remarks: string) => {
    if (!user?._id) {
      toast.error('User not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('/api/attendance', {
        userId: user._id,
        status,
        remarks
      });

      if (response.data) {
        setAttendanceData(response.data);
        toast.success('Attendance marked successfully!');
      }
    } catch (err) {
      toast.error('Failed to mark attendance. Please try again.');
      console.error('Error marking attendance:', err);
    }
  };

  const getAttendancePercentage = () => {
    if (!attendanceData || !attendanceData.checkInTime) return 0;
    const now = dayjs();
    const checkIn = dayjs(attendanceData.checkInTime);
    const workDuration = now.diff(checkIn, 'minute');
    const expectedWorkDuration = 8 * 60; // 8 hours in minutes
    return Math.min(Math.round((workDuration / expectedWorkDuration) * 100), 100);
  };

  const getWorkingHours = () => {
    if (!attendanceData || !attendanceData.checkInTime) return '0h:0m';
    const now = dayjs();
    const checkIn = dayjs(attendanceData.checkInTime);
    const workDuration = now.diff(checkIn, 'minute');
    const hours = Math.floor(workDuration / 60);
    const minutes = workDuration % 60;
    return `${hours}h:${minutes}m`;
  };

  return (
      

      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
     

      <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Hi, Welcome back <span className="text-primary"> {user.name || "Demo User"} </span> 👋 </h1>
          <p className="text-gray-500">You have 2 leave requests pending.</p>
        </div>
        <div className="flex flex-col items-start border border-gray-200 rounded-md p-2">
          <div className="flex justify-between items-center gap-2 font-semibold">
              <p className="text-sm text-gray-500"> Working</p> 
          </div>        
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold mr-2">{getWorkingHours()}</p>
            <span className="text-sm text-gray-500 ">
              <Button variant="link" className="text-sm text-green-400 border border-gray-200 rounded-md px-2 py-1 mr-1"><Clock className="h-3 w-3 text-muted-foreground" />  Break</Button>
              <Button variant="link" className="text-sm text-red-400 border border-gray-200 rounded-md px-2 py-1"> <Clock className="h-3 w-3 text-muted-foreground" />  Check Out</Button>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                <span className={`text-xs font-semibold ${attendanceData ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full px-2 py-1`}>
                  {attendanceData ? attendanceData.status : 'Not Marked'}
                </span>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center">Loading attendance data...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <>
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
                            className={attendanceData ? "text-green-400" : "text-yellow-400"}
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 56}
                            strokeDashoffset={(1 - getAttendancePercentage() / 100) * 2 * Math.PI * 56}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                          />
                        </svg>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">{getAttendancePercentage()}%</span>
                      </div>
                    </div>
                    {attendanceData ? (
                      <>
                        <p className="text-base text-center text-gray-700">You are present today!</p>
                        <p className="text-xs text-center font-semibold mt-2">Check-in time: {dayjs(attendanceData.checkInTime).format('h:mm A')}</p>
                        {/* {attendanceData.remarks && (
                          <p className="text-xs text-center mt-2">Remarks: {attendanceData.remarks}</p>
                        )} */}
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-center text-gray-500">You have not marked your attendance today!</p>
                        <p className="text-xs text-center font-semibold mt-2">Time left: {dayjs().endOf('day').diff(dayjs(), 'minute')}m</p>
                        <div className="flex justify-center py-2">
                          <AttendanceDialog />
                        </div>
                      </>
                    )}
                  </>
                )}
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
                <div className="space-y-2 text-left">
                  <div className="flex justify-start gap-2">
                    <span className="text-sm font-semibold text-green-500">●</span>
                    <span className="text-sm">1,031 on time</span>
                  </div>
                  <div className="flex justify-start gap-2">
                    <span className="text-sm font-semibold text-yellow-500">●</span>
                    <span className="text-sm">191 work from home</span>
                  </div>
                  <div className="flex justify-start gap-2">
                    <span className="text-sm font-semibold text-red-500">●</span>
                    <span className="text-sm">150  Present</span>
                  </div>
                  <div className="flex justify-start gap-2">
                    <span className="text-sm font-semibold text-blue-500">●</span>
                    <span className="text-sm">66 absent</span>
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

      </div>
    </ScrollArea>
  );
}