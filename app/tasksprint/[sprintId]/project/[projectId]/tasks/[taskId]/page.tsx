"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Edit,
  Trash2,
  Zap,
  Clock,
  Target,
  AlertCircle,
} from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";
import { TaskForm } from "@/components/task-form";
import { motion } from "framer-motion";
import type { Task } from "@/types/task";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const sprintId = params.sprintId as string;
  const projectId = params.projectId as string;
  const taskId = params.taskId as string;

  const { currentTask, loading, error, fetchTask, deleteTask } = useTaskStore();

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId, fetchTask]);

  const handleBack = () => {
    router.push(`/tasksprint/${sprintId}/project/${projectId}/tasks`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
      handleBack();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading task details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
            <Button variant="outline" className="mt-4" onClick={handleBack}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
            <p className="text-gray-600">Task not found</p>
            <Button variant="outline" className="mt-4" onClick={handleBack}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskSprint
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tasks
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <TaskForm projectId={projectId} task={currentTask} />
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Task
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          {/* Task Title and Status */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{currentTask.title}</h1>
              <Badge
                variant={
                  currentTask.status === "Done"
                    ? "success"
                    : currentTask.status === "In Progress"
                    ? "warning"
                    : "secondary"
                }
              >
                {currentTask.status}
              </Badge>
            </div>
            <p className="text-gray-600">{currentTask.description}</p>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Task Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Priority</span>
                    <Badge
                      variant={
                        currentTask.priority === "High"
                          ? "destructive"
                          : currentTask.priority === "Medium"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {currentTask.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                      {currentTask.dueDate
                        ? new Date(currentTask.dueDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estimated Hours</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-600" />
                      {currentTask.estimatedHours || 0} hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Actual Hours</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-600" />
                      {currentTask.actualHours || 0} hours
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {currentTask.status === "Done" ? "100" : "0"}%
                    </span>
                    <span className="text-sm text-gray-600">
                      {currentTask.status === "Done" ? "Completed" : "Not Started"}
                    </span>
                  </div>
                  <Progress
                    value={currentTask.status === "Done" ? 100 : 0}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          {currentTask.tags && currentTask.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="w-5 h-5 mr-2 text-purple-600" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentTask.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
} 