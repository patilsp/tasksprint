import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function ActivityFeed({ tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <Card key={task._id}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Created: {format(new Date(task.createdAt), "PPP")}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Project: {task.project ? task.project.name : 'Not assigned'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}