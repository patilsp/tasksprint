"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TaskFeed from '@/components/TaskFeed';
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Task() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchText, setSearchText] = useState("");

  return (
    <div className="container mx-auto p-1 space-y-6">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-3xl font-bold text-primary">Tasks Dashboard</CardTitle>
          <Link href="/board">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value)} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <TabsList className="flex w-full sm:w-auto">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="high">High</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a task"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="mt-4">
              <TabsContent value="all">
                <TaskFeed filter="all" searchText={searchText} />
              </TabsContent>
              <TabsContent value="low">
                <TaskFeed filter="low" searchText={searchText} />
              </TabsContent>
              <TabsContent value="medium">
                <TaskFeed filter="medium" searchText={searchText} />
              </TabsContent>
              <TabsContent value="high">
                <TaskFeed filter="high" searchText={searchText} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Task;