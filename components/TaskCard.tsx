"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const TaskCard = ({ task, handleEdit, handleDelete, handleStatusToggle }) => {
  const { data: session } = useSession();
  
  const [likeStatus, setLikeStatus] = useState(false);

  // Handle the like action
  const handleLike = () => {
    setLikeStatus(!likeStatus);
    // API call for like can be implemented here
  };

  // Determine priority color
  const priorityColor = {
    High: "text-red-600",
    Medium: "text-yellow-500",
    Low: "text-green-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-6">
       
        <p className="font-bold text-gray-700">{task.name}</p>
        <p className="mt-2 mb-4 text-gray-700">{task.description}</p>

        {/* Display priority with a dynamic color */}
        <p className={`text-sm ${priorityColor[task.priority]}`}>
          Priority: {task.priority}
        </p>

        {/* Display due date if available */}
        {task.dueDate && (
          <p className="text-sm text-gray-600">
            Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
          </p>
        )}


        {/* Show edit and delete buttons for the task creator */}
        {session?.user.id === task.creator?._id && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              className="text-sm font-medium text-green-600 hover:text-green-800"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-sm font-medium text-red-600 hover:text-red-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
