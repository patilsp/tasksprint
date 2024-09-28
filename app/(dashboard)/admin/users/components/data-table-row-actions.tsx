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
import { usersSchema } from "../data/schema";
import toast from 'react-hot-toast';



interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const user = usersSchema.parse(row.original);

  const handleEdit = () => {
    if (user.id) {
      router.push(`/update-user?id=${user.id}`);
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this user?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/user/${user.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user ");
        }else{
          toast.success("User has been deleted!");
          router.refresh();
          router.push("/users"); 
        }
        if (onDelete) {
          onDelete(user.id);
        }
      } catch (error) {
        toast.error("Error deleting user:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8  p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={handleDelete}>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleEdit}>Update User</DropdownMenuItem>
        
        {/* <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Names</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={user.label}>
              {names.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        {/* <DropdownMenuSeparator /> */}
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
