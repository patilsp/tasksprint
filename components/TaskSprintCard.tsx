"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const TaskSprintCard = ({ sprint, handleEdit, handleDelete }) => {
  // Determine priority color
  const priorityColor = {
    High: "text-red-600",
    Medium: "text-yellow-500",
    Low: "text-green-500",
  };

  return (
    <Link href={`/tasksprint/sprints/${sprint._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      >
        <div className="p-6">
        <div className="font-bold text-gray-700 flex justify-end gap-2">
            <Badge className="text-sm bg-green-500">
              {sprint.priority}
            </Badge>
            </div>
           
            <p className="font-bold text-gray-700 flex justify-start gap-2">
              {sprint.name}
            </p>
            
         
          <p className="mt-2 mb-4 text-gray-700">{sprint.description}</p>

          {/* Display priority with a dynamic color */}
        
          {/* Display start and due dates if available */}
          <div className="flex justify-between gap-2">
            <Badge className="text-sm bg-green-500">
              Start: {new Date(sprint.startDate).toLocaleDateString("en-GB")}
            </Badge>
          {sprint.dueDate && (
              <Badge className="text-sm bg-red-500">
                Due: {new Date(sprint.dueDate).toLocaleDateString("en-GB")}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TaskSprintCard;
