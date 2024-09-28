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
import { names } from "../data/data";
import { projectsSchema } from "../data/schema";
import toast from 'react-hot-toast';



interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const project = projectsSchema.parse(row.original);

  const handleEdit = () => {
    if (project.id) {
      router.push(`/update-project?id=${project.id}`);
    } else {
      console.error("project ID is undefined");
    }
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this project?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/project/${project.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete project ");
        }else{
          toast.success("project has been deleted!");
          router.refresh();
          router.push("/projects"); 
        }
        if (onDelete) {
          onDelete(project.id);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Error deleting project:", error);
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
        <DropdownMenuItem onSelect={handleDelete}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>Make as Completed</DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Names</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={project.label}>
              {names.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator /> */}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
