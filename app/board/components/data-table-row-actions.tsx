"use client";

import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import taskSchema from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  // Ensure row.original exists before proceeding
  if (!row.original) {
    toast.error("Task data is missing");
    return null; // Early return to handle error
  }

  let task;
  try {
    task = taskSchema.parse(row.original); // Parse task data using the schema
  } catch (error) {
    console.error("Error parsing task data:", error);
    toast.error("Error parsing task data");
    return null; // Return null if parsing fails
  }

  // Handle task edit action
  const handleEdit = () => {
    if (task.id) {
      router.push(`/tasks/update-task?id=${task.id}`); // Redirect to edit page
    } else {
      console.error("Task ID is undefined");
      toast.error("Task ID is missing");
    }
  };

  // Handle task delete action
  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this task?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/task/${task.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        toast.success("Task has been deleted!");
        router.refresh(); // Refresh the data after deletion
        router.push("/tasks"); // Redirect to task list after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-8 h-8 bg-slate-100 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
