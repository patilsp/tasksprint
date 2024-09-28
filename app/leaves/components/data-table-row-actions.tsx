"use client";

import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import toast from 'react-hot-toast';
// import the Leave type instead of using parse
import { Leave } from "../data/schema"; // Ensure this import path is correct
import { leaveTypes } from "../data/data"; // Adjust the path and leaveTypes based on your data structure

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (leaveId: string) => void;
  onDelete: (leaveId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const leave = row.original as Leave; // Cast row.original to the Leave type

  const handleEdit = () => {
    if (leave.id) {
      router.push(`/update-leave?id=${leave.id}`); // Redirect to leave edit page
    } else {
      console.error("Leave ID is undefined");
    }
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this leave request?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/leave/${leave.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete leave request");
        } else {
          toast.success("Leave request has been deleted!");
          router.refresh();
          router.push("/leaves"); // Redirect to the leave management page
        }
        if (onDelete) {
          onDelete(leave.id);
        }
      } catch (error) {
        toast.error("Error deleting leave request:", error);
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
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>

        <DropdownMenuItem onSelect={handleDelete} className="text-red-500" >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
