'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import TaskCard from "@/components/TaskCard";

const TaskFeed = ({ filter, searchText }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/task");
      const data = await response.json();

      if (Array.isArray(data)) {
        setAllTasks((prevTasks) => {
          const newTasks = data.filter(
            (task) => !prevTasks.some((existingTask) => existingTask._id === task._id)
          );
          return [...prevTasks, ...newTasks];
        });
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTasks = (tasks) => {
    let filteredTasks = tasks;

    // Filter by priority if filter is set
    if (filter && filter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority.toLowerCase() === filter);
    }

    // Search functionality
    if (searchText) {
      const regex = new RegExp(searchText, "i");
      filteredTasks = filteredTasks.filter(
        (task) => regex.test(task.name) || regex.test(task.description)
      );
    }

    return filteredTasks;
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filterTasks(allTasks).map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut" }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center mt-4" ref={loadingRef}>Loading...</p>
      )}
    </section>
  );
};

export default TaskFeed;
