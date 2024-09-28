"use client";

import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  let task;
  try {
    task = taskSchema.parse(row.original);
  } catch (error) {
    console.error("Error parsing task data:", error);
    toast.error("Error parsing task data");
    return null; // Or handle this case accordingly
  }

  const handleEdit = () => {
    if (task.id) {
      router.push(`/tasks/update-task?id=${task.id}`);
    } else {
      console.error("Task ID is undefined");
      toast.error("Task ID is missing");
    }
  };

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
        router.refresh(); // Refresh the data or redirect as needed
        router.push("/tasks"); // Redirect to the tasks list or another relevant page
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
          className="flex size-8 bg-slate-100 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onSelect={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
