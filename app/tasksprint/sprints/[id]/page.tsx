"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Users, DollarSign, ArrowLeftIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const SprintDetails = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [sprint, setSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Dynamic progress state

  const fetchSprintDetails = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/tasksprint/${id}`);
      if (!response.ok) throw new Error('Failed to fetch sprint details');

      const data = await response.json();
      setSprint(data);

      // Calculate dynamic progress
      if (data.startDate && data.dueDate) {
        const startDate = new Date(data.startDate);
        const dueDate = new Date(data.dueDate);
        const now = new Date();

        const totalDuration = dueDate - startDate; // Total sprint duration
        const timePassed = now - startDate; // Time passed since sprint started
        const progressPercentage = Math.min((timePassed / totalDuration) * 100, 100); // Clamp to max 100%
        
        setProgress(progressPercentage);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprintDetails();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!sprint) return <div className="flex justify-center items-center h-screen">Sprint not found</div>;

  const contributors = [
    { name: 'Emma Smith', avatar: '/avatars/01.png?height=40&width=40', tasksCompleted: 5 },
    { name: 'Melody Macy', avatar: '/avatars/02.png?height=40&width=40', tasksCompleted: 8 },
    { name: 'Max Smith', avatar: '/avatars/03.png?height=40&width=40', tasksCompleted: 3 },
    { name: 'Sean Bean', avatar: '/avatars/04.png?height=40&width=40', tasksCompleted: 3 },
    { name: 'Brian Cox', avatar: '/avatars/05.png?height=40&width=40', tasksCompleted: 4 },
  ];

  const tasks = [
    { name: 'Create Frostbite branding logo', dueDate: '2023-06-14', assignee: 'Emma Smith' },
    { name: 'Schedule a meeting with FireStee CTO John', dueDate: '2023-06-14', assignee: 'Melody Macy' },
    { name: '9 Degree Project Estimation', dueDate: '2023-06-14', assignee: 'Max Smith' },
    { name: 'Dashboard UI & UX for Leafr CRM', dueDate: '2023-06-14', assignee: 'Sean Bean' },
    { name: 'Mivy App R&D, Meeting with clients', dueDate: '2023-06-14', assignee: 'Brian Cox' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sprint Details</h1>
        <Link href="/tasksprint" className="flex items-center space-x-2 bg-primary p-1  rounded-md mb-2 w-fit px-2 hover:text-white"><ArrowLeftIcon className="h-5 w-5 hover:text-white" /> Back </Link>
      </div>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              S
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{sprint.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {sprint.description}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Add User</Button>
            <Button>Add Target</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>{format(new Date(sprint.dueDate), 'dd MMM, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Badge>{sprint.status}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>$500 Budget Spent</span>
              </div>
            </div>
            <div className="flex -space-x-2">
              {contributors.map((contributor, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          {/* Dynamic Progress Bar */}
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="targets">Targets</TabsTrigger> */}
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>New Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{contributor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contributor.tasksCompleted} Tasks Completed
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{contributor.tasksCompleted}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{task.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Due on {format(new Date(task.dueDate), 'dd MMM')} • {task.assignee}
                        </p>
                      </div>
                      <Button variant="ghost" className="ml-auto">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SprintDetails;
